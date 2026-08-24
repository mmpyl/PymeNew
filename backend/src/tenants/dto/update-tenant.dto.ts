import { IsString, IsOptional, IsEnum, IsEmail, IsObject, IsBoolean } from 'class-validator';
import { ModuleType, TenantStatus } from '@prisma/client';

export class UpdateTenantDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ModuleType)
  @IsOptional()
  moduleType?: ModuleType;

  @IsEnum(TenantStatus)
  @IsOptional()
  status?: TenantStatus;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsObject()
  @IsOptional()
  config?: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
