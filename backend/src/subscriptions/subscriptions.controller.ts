import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Post(':tenantId')
  @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  create(
    @Param('tenantId') tenantId: string,
    @Body() body: any,
  ) {
    return this.subscriptionsService.create({
      tenantId,
      ...body,
    });
  }

  @Get('tenant/:tenantId')
  findByTenant(@Param('tenantId') tenantId: string) {
    return this.subscriptionsService.findByTenant(tenantId);
  }

  @Get('tenant/:tenantId/status')
  checkStatus(@Param('tenantId') tenantId: string) {
    return this.subscriptionsService.checkStatus(tenantId);
  }

  @Post(':tenantId/renew')
  @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  renew(@Param('tenantId') tenantId: string) {
    return this.subscriptionsService.renew(tenantId);
  }

  @Post(':tenantId/cancel')
  @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  cancel(@Param('tenantId') tenantId: string) {
    return this.subscriptionsService.cancel(tenantId);
  }

  @Patch(':tenantId/plan')
  @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  updatePlan(
    @Param('tenantId') tenantId: string,
    @Body() body: any,
  ) {
    return this.subscriptionsService.updatePlan(tenantId, body);
  }

  @Get('expiring')
  @Roles(Role.ADMIN)
  getExpiring(@Request() req) {
    const days = req.query.days ? parseInt(req.query.days as string, 10) : 7;
    return this.subscriptionsService.getExpiringSubscriptions(days);
  }

  @Post('process-expired')
  @Roles(Role.ADMIN)
  processExpired() {
    return this.subscriptionsService.processExpiredSubscriptions();
  }
}
