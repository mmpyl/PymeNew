import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TenantsRepository } from './repositories/tenants.repository';
import { CreateTenantDto, UpdateTenantDto } from './dto';
import { JwtPayload } from '../auth/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { SubscriptionStatus } from '@prisma/client';

@Injectable()
export class TenantsService {
  constructor(
    private tenantsRepository: TenantsRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
    private subscriptionsService: SubscriptionsService,
  ) {}

  async create(createTenantDto: CreateTenantDto, user: JwtPayload) {
    // Verificar si el slug ya existe
    const existingTenant = await this.tenantsRepository.findBySlug(createTenantDto.slug);
    if (existingTenant) {
      throw new BadRequestException('El slug ya está en uso');
    }

    return this.tenantsRepository.create(createTenantDto, user.sub);
  }

  async findAll() {
    return this.tenantsRepository.findAll();
  }

  async findOne(id: string) {
    const tenant = await this.tenantsRepository.findById(id);
    if (!tenant) {
      throw new NotFoundException(`Tenant con ID ${id} no encontrado`);
    }
    return tenant;
  }

  async findByUser(user: JwtPayload) {
    return this.tenantsRepository.findByUserId(user.sub);
  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    const tenant = await this.findOne(id);
    return this.tenantsRepository.update(id, updateTenantDto);
  }

  async remove(id: string) {
    const tenant = await this.findOne(id);
    return this.tenantsRepository.remove(id);
  }

  async addMember(tenantId: string, userId: string, role: string) {
    const tenant = await this.findOne(tenantId);
    
    // Verificar si el usuario ya es miembro
    const members = await this.tenantsRepository.getMembers(tenantId);
    const existingMember = members.find(m => m.userId === userId);
    
    if (existingMember) {
      throw new BadRequestException('El usuario ya es miembro de este tenant');
    }

    return this.tenantsRepository.addMember(tenantId, userId, role);
  }

  async removeMember(tenantId: string, userId: string) {
    const tenant = await this.findOne(tenantId);
    return this.tenantsRepository.removeMember(tenantId, userId);
  }

  async getMembers(tenantId: string) {
    const tenant = await this.findOne(tenantId);
    return this.tenantsRepository.getMembers(tenantId);
  }

  async switchTenant(tenantId: string, user: JwtPayload) {
    const tenant = await this.findOne(tenantId);
    
    // Verificar si el usuario pertenece al tenant
    const isMember = tenant.ownerId === user.sub || 
      tenant.members.some((m: any) => m.userId === user.sub && m.isActive);
    
    if (!isMember) {
      throw new NotFoundException('No tienes acceso a este tenant');
    }

    // Obtener información de suscripción
    let subscriptionStatus: SubscriptionStatus | undefined;
    try {
      const subscriptionInfo = await this.subscriptionsService.checkStatus(tenantId);
      subscriptionStatus = subscriptionInfo.status as SubscriptionStatus;
    } catch (e) {
      // Si no hay suscripción, dejar undefined o usar un valor por defecto
      subscriptionStatus = undefined;
    }

    // Obtener el módulo principal del tenant
    const moduleType = tenant.modules?.[0]?.type || 'CUSTOM';

    // Crear payload para el nuevo JWT
    const payload: JwtPayload = {
      sub: user.sub,
      email: user.email,
      roles: user.roles,
      tenantId,
      tenantSlug: tenant.slug,
      moduleType,
      subscriptionStatus,
    };

    // Firmar nuevo token JWT
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '1h'),
    });

    return {
      accessToken,
      tenantId,
      tenantSlug: tenant.slug,
      tenantName: tenant.name,
      moduleType,
      subscriptionStatus,
    };
  }

  async getStatus(tenantId: string) {
    const tenant = await this.findOne(tenantId);
    
    // Obtener información de suscripción
    let subscriptionInfo;
    try {
      subscriptionInfo = await this.subscriptionsService.checkStatus(tenantId);
    } catch (e) {
      subscriptionInfo = {
        isActive: false,
        status: 'NO_SUBSCRIPTION',
        expiresAt: null,
      };
    }

    // Obtener el módulo principal del tenant
    const moduleType = tenant.modules?.[0]?.type || 'CUSTOM';

    return {
      tenantId,
      tenantSlug: tenant.slug,
      tenantName: tenant.name,
      isActive: subscriptionInfo.isActive,
      status: subscriptionInfo.status,
      expiresAt: subscriptionInfo.expiresAt,
      moduleType,
    };
  }
}
