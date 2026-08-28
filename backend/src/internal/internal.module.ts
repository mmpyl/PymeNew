import { Module } from '@nestjs/common';
import { InternalController } from './internal.controller';
import { TenantsModule } from '../tenants/tenants.module';

@Module({
  imports: [TenantsModule],
  controllers: [InternalController],
})
export class InternalModule {}
