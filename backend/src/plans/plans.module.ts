import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { PlansRepository } from './repositories/plans.repository';
import { PrismaModule } from '../prisma.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';

@Module({
  controllers: [PlansController],
  providers: [PlansService, PlansRepository],
  imports: [PrismaModule, SubscriptionsModule],
  exports: [PlansService, PlansRepository],
})
export class PlansModule {}
