import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
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

interface UpdatePlanDto {
  name?: string;
  description?: string;
  price?: number;
  maxUsers?: number;
  maxStorage?: number;
  features?: PlanFeature[];
  isPopular?: boolean;
  sortOrder?: number;
  isActive?: boolean;
}

@Injectable()
export class PlansRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePlanDto) {
    return this.prisma.plan.create({
      data: {
        name: data.name,
        description: data.description,
        billingCycle: data.billingCycle,
        price: data.price,
        currency: data.currency || 'USD',
        trialDays: data.trialDays || 15,
        maxUsers: data.maxUsers,
        maxStorage: data.maxStorage,
        features: data.features as any,
        isPopular: data.isPopular || false,
        sortOrder: data.sortOrder || 0,
        isActive: true,
      },
    });
  }

  async findAll(includeInactive: boolean = false) {
    const where = includeInactive ? {} : { isActive: true };
    
    return this.prisma.plan.findMany({
      where,
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }

  async findById(id: string) {
    return this.prisma.plan.findUnique({
      where: { id },
    });
  }

  async findByBillingCycle(billingCycle: BillingCycle) {
    return this.prisma.plan.findMany({
      where: {
        billingCycle,
        isActive: true,
      },
      orderBy: { price: 'asc' },
    });
  }

  async update(id: string, data: UpdatePlanDto) {
    return this.prisma.plan.update({
      where: { id },
      data: {
        ...data,
        ...(data.features ? { features: data.features as any } : {}),
      } as any,
    });
  }

  async remove(id: string) {
    // Soft delete - marcar como inactivo
    return this.prisma.plan.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async findFreeTrialPlan() {
    return this.prisma.plan.findFirst({
      where: {
        trialDays: { gt: 0 },
        isActive: true,
      },
      orderBy: { trialDays: 'desc' },
    });
  }
}
