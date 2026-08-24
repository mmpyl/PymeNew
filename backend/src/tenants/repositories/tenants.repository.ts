import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Tenant, TenantMember } from '@prisma/client';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';

@Injectable()
export class TenantsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTenantDto, ownerId: string): Promise<Tenant> {
    return this.prisma.tenant.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        moduleType: data.moduleType || 'CUSTOM',
        email: data.email,
        phone: data.phone,
        address: data.address,
        config: data.config || {},
        ownerId,
        // Crear módulo por defecto
        modules: {
          create: {
            name: this.getModuleName(data.moduleType || 'CUSTOM'),
            type: data.moduleType || 'CUSTOM',
            isEnabled: true,
            config: {},
          },
        },
      },
      include: {
        owner: true,
        subscription: true,
        modules: true,
      },
    });
  }

  async findAll(): Promise<Tenant[]> {
    return this.prisma.tenant.findMany({
      include: {
        owner: true,
        subscription: true,
        modules: true,
        _count: {
          select: { members: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<any> {
    return this.prisma.tenant.findUnique({
      where: { id },
      include: {
        owner: true,
        subscription: true,
        modules: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                roles: true,
              },
            },
          },
        },
      },
    });
  }

  async findBySlug(slug: string): Promise<Tenant | null> {
    return this.prisma.tenant.findUnique({
      where: { slug },
      include: {
        owner: true,
        subscription: true,
        modules: true,
      },
    });
  }

  async findByUserId(userId: string): Promise<Tenant[]> {
    return this.prisma.tenant.findMany({
      where: {
        OR: [
          { ownerId: userId },
          {
            members: {
              some: {
                userId,
                isActive: true,
              },
            },
          },
        ],
      },
      include: {
        owner: true,
        subscription: true,
        modules: true,
      },
    });
  }

  async update(id: string, data: UpdateTenantDto): Promise<Tenant> {
    return this.prisma.tenant.update({
      where: { id },
      data,
      include: {
        owner: true,
        subscription: true,
        modules: true,
      },
    });
  }

  async remove(id: string): Promise<Tenant> {
    return this.prisma.tenant.delete({
      where: { id },
    });
  }

  async addMember(tenantId: string, userId: string, role: string): Promise<TenantMember> {
    return this.prisma.tenantMember.create({
      data: {
        tenantId,
        userId,
        role: role as any,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            roles: true,
          },
        },
      },
    });
  }

  async removeMember(tenantId: string, userId: string): Promise<void> {
    await this.prisma.tenantMember.delete({
      where: {
        userId_tenantId: {
          userId,
          tenantId,
        },
      },
    });
  }

  async getMembers(tenantId: string): Promise<TenantMember[]> {
    return this.prisma.tenantMember.findMany({
      where: { tenantId, isActive: true },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            roles: true,
          },
        },
      },
    });
  }

  private getModuleName(type: string): string {
    const names: Record<string, string> = {
      BOTICA: 'Módulo de Botica',
      FERRETERIA: 'Módulo de Ferretería',
      BODEGA: 'Módulo de Bodega',
      RESTAURANTE: 'Módulo de Restaurante',
      PELUQUERIA: 'Módulo de Peluquería',
      GIMNASIO: 'Módulo de Gimnasio',
      CUSTOM: 'Módulo Personalizado',
    };
    return names[type] || 'Módulo Base';
  }
}
