import { Module } from '@nestjs/common';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { TenantsRepository } from './repositories/tenants.repository';
import { PrismaModule } from '../prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService, TenantsRepository],
  imports: [PrismaModule, JwtModule, SubscriptionsModule],
  exports: [TenantsService, TenantsRepository],
})
export class TenantsModule {}
