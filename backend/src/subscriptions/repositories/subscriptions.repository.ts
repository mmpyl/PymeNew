import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Subscription, BillingCycle, SubscriptionStatus } from '@prisma/client';

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

interface UpdateSubscriptionDto {
  planName?: string;
  billingCycle?: BillingCycle;
  price?: number;
  status?: SubscriptionStatus;
  cancelledAt?: Date;
  endDate?: Date;
}

@Injectable()
export class SubscriptionsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSubscriptionDto): Promise<Subscription> {
    const endDate = this.calculateEndDate(
      data.billingCycle,
      data.trialDays || 0,
    );

    return this.prisma.subscription.create({
      data: {
        tenantId: data.tenantId,
        planName: data.planName,
        billingCycle: data.billingCycle,
        price: data.price,
        currency: data.currency || 'USD',
        status: data.trialDays ? SubscriptionStatus.PENDING : SubscriptionStatus.ACTIVE,
        endDate,
        trialDays: data.trialDays || 0,
        maxUsers: data.maxUsers || 5,
        maxStorage: data.maxStorage || 1000,
        features: data.features || [],
      },
      include: {
        tenant: true,
      },
    });
  }

  async findByTenantId(tenantId: string): Promise<Subscription | null> {
    return this.prisma.subscription.findUnique({
      where: { tenantId },
      include: {
        tenant: true,
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  async findById(id: string): Promise<Subscription | null> {
    return this.prisma.subscription.findUnique({
      where: { id },
      include: {
        tenant: true,
        payments: true,
      },
    });
  }

  async update(id: string, data: UpdateSubscriptionDto): Promise<Subscription> {
    return this.prisma.subscription.update({
      where: { id },
      data,
      include: {
        tenant: true,
      },
    });
  }

  async cancel(id: string): Promise<Subscription> {
    return this.prisma.subscription.update({
      where: { id },
      data: {
        status: SubscriptionStatus.CANCELLED,
        cancelledAt: new Date(),
      },
      include: {
        tenant: true,
      },
    });
  }

  async renew(subscriptionId: string): Promise<Subscription> {
    const subscription = await this.findById(subscriptionId);
    
    if (!subscription) {
      throw new NotFoundException('Suscripción no encontrada');
    }

    const newEndDate = this.calculateEndDate(
      subscription.billingCycle,
      0,
    );

    return this.prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: SubscriptionStatus.ACTIVE,
        endDate: newEndDate,
        cancelledAt: null,
      },
      include: {
        tenant: true,
      },
    });
  }

  async getExpiredSubscriptions(): Promise<Subscription[]> {
    return this.prisma.subscription.findMany({
      where: {
        endDate: {
          lt: new Date(),
        },
        status: {
          not: SubscriptionStatus.EXPIRED,
        },
      },
      include: {
        tenant: true,
      },
    });
  }

  async getExpiringSoon(days: number = 7): Promise<Subscription[]> {
    const expiringDate = new Date();
    expiringDate.setDate(expiringDate.getDate() + days);

    return this.prisma.subscription.findMany({
      where: {
        endDate: {
          gte: new Date(),
          lte: expiringDate,
        },
        status: SubscriptionStatus.ACTIVE,
      },
      include: {
        tenant: true,
      },
    });
  }

  private calculateEndDate(billingCycle: BillingCycle, trialDays: number): Date {
    const endDate = new Date();
    
    // Si hay días de prueba, empezar desde ahí
    if (trialDays > 0) {
      endDate.setDate(endDate.getDate() + trialDays);
      return endDate;
    }

    // Calcular según el ciclo de facturación
    switch (billingCycle) {
      case BillingCycle.MONTHLY:
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case BillingCycle.QUARTERLY:
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case BillingCycle.YEARLY:
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
      case BillingCycle.LIFETIME:
        // Fecha muy lejana para lifetime
        endDate.setFullYear(endDate.getFullYear() + 100);
        break;
    }

    return endDate;
  }
}
