import { PartialType } from '@nestjs/swagger';
import {
  CreateCartDto,
  CreateOrderDto,
  CreateStudentProfileDto,
  CreateTeacherProfileDto,
  CreateWishlistDto,
} from './create-profile.dto';

export class UpdateStudentProfileDto extends PartialType(
  CreateStudentProfileDto,
) {}
export class UpdateTeacherProfileDto extends PartialType(
  CreateTeacherProfileDto,
) {}
export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {}
export class UpdateCartDto extends PartialType(CreateCartDto) {}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
