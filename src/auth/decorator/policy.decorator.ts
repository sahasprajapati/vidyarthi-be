import { PolicyHandler } from "@common/handlers/policy.handler";
import { SetMetadata } from "@nestjs/common";

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
