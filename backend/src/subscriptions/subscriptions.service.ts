import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SubscriptionsRepository } from './repositories/subscriptions.repository';
import { BillingCycle, SubscriptionStatus } from '@prisma/client';

interface CreateSubscriptionDto {
  tenantId: string;
  planName: string;
  billingCycle: BillingCycle;
  price: number;
  currency?: string;
  trialDays?: number;
  maxUsers?: number;
  maxStorage?: number;
  features?: any[];
}

@Injectable()
export class SubscriptionsService {
  constructor(
    private subscriptionsRepository: SubscriptionsRepository,
  ) {}

  async create(data: CreateSubscriptionDto) {
    // Verificar si el tenant ya tiene suscripción
    const existing = await this.subscriptionsRepository.findByTenantId(data.tenantId);
    if (existing) {
      throw new BadRequestException('El tenant ya tiene una suscripción activa');
    }

    return this.subscriptionsRepository.create(data);
  }

  async findByTenant(tenantId: string) {
    const subscription = await this.subscriptionsRepository.findByTenantId(tenantId);
    if (!subscription) {
      throw new NotFoundException('Suscripción no encontrada para este tenant');
    }
    return subscription;
  }

  async renew(tenantId: string) {
    const subscription = await this.findByTenant(tenantId);
    return this.subscriptionsRepository.renew(subscription.id);
  }

  async cancel(tenantId: string) {
    const subscription = await this.findByTenant(tenantId);
    return this.subscriptionsRepository.cancel(subscription.id);
  }

  async updatePlan(tenantId: string, planData: Partial<CreateSubscriptionDto>) {
    const subscription = await this.findByTenant(tenantId);
    
    const updateData: any = {};
    if (planData.planName) updateData.planName = planData.planName;
    if (planData.billingCycle) updateData.billingCycle = planData.billingCycle;
    if (planData.price) updateData.price = planData.price;
    if (planData.features) updateData.features = planData.features;

    return this.subscriptionsRepository.update(subscription.id, updateData);
  }

  async checkStatus(tenantId: string): Promise<{ isActive: boolean; status: string; expiresAt: Date | null }> {
    const subscription = await this.subscriptionsRepository.findByTenantId(tenantId);
    
    if (!subscription) {
      return {
        isActive: false,
        status: 'NO_SUBSCRIPTION',
        expiresAt: null,
      };
    }

    const now = new Date();
    const isExpired = subscription.endDate < now;
    const isActive = subscription.status === SubscriptionStatus.ACTIVE && !isExpired;

    return {
      isActive,
      status: subscription.status,
      expiresAt: subscription.endDate,
    };
  }

  async getExpiringSubscriptions(days: number = 7) {
    return this.subscriptionsRepository.getExpiringSoon(days);
  }

  async processExpiredSubscriptions() {
    const expired = await this.subscriptionsRepository.getExpiredSubscriptions();
    
    const results = [];
    for (const sub of expired) {
      const updated = await this.subscriptionsRepository.update(sub.id, {
        status: SubscriptionStatus.EXPIRED,
      });
      results.push(updated);
    }

    return results;
  }
}
