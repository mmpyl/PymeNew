import { Role, ModuleType, SubscriptionStatus } from '@prisma/client';

export type JwtPayload = {
  sub: string;
  email: string;
  roles: Role[];
  tenantId?: string;
  tenantSlug?: string;
  moduleType?: ModuleType;
  subscriptionStatus?: SubscriptionStatus;
};
