import { Injectable, NotFoundException } from '@nestjs/common';
import { PlansRepository } from './repositories/plans.repository';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { BillingCycle } from '@prisma/client';

interface PlanFeature {
  name: string;
  description?: string;
  included: boolean;
}

interface CreatePlanDto {
  name: string;
  description?: string;
  billingCycle: BillingCycle;
  price: number;
  currency?: string;
  trialDays?: number;
  maxUsers: number;
  maxStorage: number;
  features: PlanFeature[];
  isPopular?: boolean;
  sortOrder?: number;
}

@Injectable()
export class PlansService {
  constructor(
    private plansRepository: PlansRepository,
    private subscriptionsService: SubscriptionsService,
  ) {}

  async create(data: CreatePlanDto) {
    return this.plansRepository.create(data);
  }

  async findAll() {
    return this.plansRepository.findAll();
  }

  async findById(id: string) {
    const plan = await this.plansRepository.findById(id);
    if (!plan) {
      throw new NotFoundException(`Plan con ID ${id} no encontrado`);
    }
    return plan;
  }

  async findByBillingCycle(billingCycle: BillingCycle) {
    return this.plansRepository.findByBillingCycle(billingCycle);
  }

  async update(id: string, data: Partial<CreatePlanDto>) {
    const plan = await this.findById(id);
    return this.plansRepository.update(id, data);
  }

  async remove(id: string) {
    const plan = await this.findById(id);
    return this.plansRepository.remove(id);
  }

  async getRecommendedPlans() {
    const allPlans = await this.findAll();
    
    // Ordenar planes: primero los populares, luego por precio
    return allPlans.sort((a, b) => {
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return a.sortOrder - b.sortOrder || Number(a.price) - Number(b.price);
    });
  }

  async subscribeToPlan(tenantId: string, planId: string) {
    const plan = await this.findById(planId);
    
    return this.subscriptionsService.create({
      tenantId,
      planName: plan.name,
      billingCycle: plan.billingCycle,
      price: Number(plan.price),
      currency: plan.currency,
      trialDays: plan.trialDays,
      maxUsers: plan.maxUsers,
      maxStorage: plan.maxStorage,
      features: plan.features as any,
    });
  }

  async getFreeTrialPlan() {
    return this.plansRepository.findFreeTrialPlan();
  }
}
