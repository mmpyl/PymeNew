import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsRepository } from './repositories/subscriptions.repository';
import { PrismaModule } from '../prisma.module';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsRepository],
  imports: [PrismaModule],
  exports: [SubscriptionsService, SubscriptionsRepository],
})
export class SubscriptionsModule {}
