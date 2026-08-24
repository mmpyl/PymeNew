import { IsString, IsOptional, IsEnum, IsEmail, IsObject, MinLength } from 'class-validator';
import { ModuleType } from '@prisma/client';

export class CreateTenantDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsString()
  @MinLength(3)
  slug!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ModuleType)
  @IsOptional()
  moduleType?: ModuleType;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsObject()
  @IsOptional()
  config?: Record<string, any>;
}
