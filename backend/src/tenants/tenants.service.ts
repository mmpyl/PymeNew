import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TenantsRepository } from './repositories/tenants.repository';
import { CreateTenantDto, UpdateTenantDto } from './dto';
import { JwtPayload } from '../auth/jwt-payload.type';

@Injectable()
export class TenantsService {
  constructor(private tenantsRepository: TenantsRepository) {}

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

    return {
      tenantId,
      tenantSlug: tenant.slug,
      tenantName: tenant.name,
    };
  }
}
