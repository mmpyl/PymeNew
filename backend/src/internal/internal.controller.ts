import { Controller, Get, Param } from '@nestjs/common';
import { TenantsService } from '../tenants/tenants.service';

@Controller('internal/tenants')
export class InternalController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get(':id/status')
  getStatus(@Param('id') id: string) {
    return this.tenantsService.getStatus(id);
  }
}
