import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { BillingCycle } from '@prisma/client';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @Get('recommended')
  getRecommended() {
    return this.plansService.getRecommendedPlans();
  }

  @Get('billing-cycle/:cycle')
  findByBillingCycle(@Param('cycle') cycle: string) {
    const billingCycle = BillingCycle[cycle.toUpperCase() as keyof typeof BillingCycle];
    if (!billingCycle) {
      return { error: 'Ciclo de facturación inválido' };
    }
    return this.plansService.findByBillingCycle(billingCycle);
  }

  @Get('free-trial')
  getFreeTrial() {
    return this.plansService.getFreeTrialPlan();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plansService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() body: any) {
    return this.plansService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() body: any) {
    return this.plansService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.plansService.remove(id);
  }

  @Post(':id/subscribe')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TENANT_ADMIN, Role.ADMIN)
  subscribeToPlan(
    @Param('id') id: string,
    @Body() body: { tenantId: string },
    @Request() req,
  ) {
    // Verificar que el usuario tiene acceso al tenant
    return this.plansService.subscribeToPlan(body.tenantId, id);
  }
}
