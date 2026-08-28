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
import { TenantsService } from './tenants.service';
import { CreateTenantDto, UpdateTenantDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('tenants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto, @Request() req: any) {
    return this.tenantsService.create(createTenantDto, req.user);
  }

  @Get()
  findAll(@Request() req: any) {
    // Si es admin, muestra todos; si no, solo los del usuario
    if (req.user.roles.includes(Role.ADMIN)) {
      return this.tenantsService.findAll();
    }
    return this.tenantsService.findByUser(req.user);
  }

  @Get('my-tenants')
  findMyTenants(@Request() req: any) {
    return this.tenantsService.findByUser(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }

  @Post(':id/members')
  @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  addMember(
    @Param('id') id: string,
    @Body() body: { userId: string; role: string },
  ) {
    return this.tenantsService.addMember(id, body.userId, body.role);
  }

  @Delete(':id/members/:userId')
  @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  removeMember(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.tenantsService.removeMember(id, userId);
  }

  @Get(':id/members')
  @Roles(Role.ADMIN, Role.TENANT_ADMIN)
  getMembers(@Param('id') id: string) {
    return this.tenantsService.getMembers(id);
  }

  @Post(':id/switch')
  switchTenant(@Param('id') id: string, @Request() req: any) {
    return this.tenantsService.switchTenant(id, req.user);
  }

  @Get(':id/status')
  getStatus(@Param('id') id: string) {
    return this.tenantsService.getStatus(id);
  }
}
