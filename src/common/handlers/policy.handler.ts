import { MongoAbility, AnyMongoAbility } from '@casl/ability';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { PermissionAction } from '@common/enums/permission.enum';
import { Action } from 'rxjs/internal/scheduler/Action';

interface IPolicyHandler {
  handle(ability: AnyMongoAbility): boolean;
}

type PolicyHandlerCallback = (ability: AnyMongoAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

// export class ReadArticlePolicyHandler implements IPolicyHandler {
//   handle(ability: AppAbility) {
//     return ability.can(Action.Read, Article);
//   }
// }

export class CustomPolicyHandler implements IPolicyHandler {
  permission: string;
  subject: string;

  constructor(permission: string, subject: string) {
    this.permission = permission;
    this.subject = subject;
  }
  handle(ability: MongoAbility) {
    return ability.can(this.permission, this.subject);
  }
}
