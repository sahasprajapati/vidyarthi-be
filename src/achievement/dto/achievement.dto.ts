import { Achievement } from './../entities/achievement.entity';
import { Prisma } from '@prisma/client';

// // Type for FindAll Customer
// const AchievementSelect = Prisma.validator<Prisma.Achievement>()({
//   id: true,
//   image: true,
//   createdAt: true,
//   updatedAt: true,
// });

// export type FindAllAchievementWithSelect = Prisma.AchievementGetPayload<{
//   select: typeof AchievementSelect;
// }>;
