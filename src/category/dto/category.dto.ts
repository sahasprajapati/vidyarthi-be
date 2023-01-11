import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { Category, Course, Prisma } from '@prisma/client';
import { User } from '@gen/prisma-class/user';
import { UserRelations } from '@gen/prisma-class/user_relations';

export class CategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  parentCategoryId?: string;

  @ApiProperty()
  parentCategory?: Category;

  @ApiProperty()
  courseCategory?: Category[];

  @ApiProperty()
  mainCourses: Course[];

  @ApiProperty()
  subCourses: Course[];
}

// Type for FindAll User
export const UserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  role: {
    select: {
      id: true,
      name: true,
    },
  },
});

export type FindAllUserWithSelect = Prisma.UserGetPayload<{
  select: typeof UserSelect;
}>;

export class UserFindAllDto extends IntersectionType(
  User,
  PickType(UserRelations, ['role'] as const),
) {}
