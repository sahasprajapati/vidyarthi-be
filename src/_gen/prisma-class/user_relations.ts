import { Role } from './role';
import { Rating } from './rating';
import { Course } from './course';
import { CoursesOnStudents } from './courses_on_students';
import { StudentProfile } from './student_profile';
import { TeacherProfile } from './teacher_profile';
import { Order } from './order';
import { Wishlist } from './wishlist';
import { Cart } from './cart';
import { Transaction } from './transaction';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class UserRelations {
  @ApiPropertyOptional({ type: () => Role })
  role?: Role;

  @ApiProperty({ isArray: true, type: () => Rating })
  Rating: Rating[];

  @ApiProperty({ isArray: true, type: () => Course })
  teacherCourses: Course[];

  @ApiProperty({ isArray: true, type: () => CoursesOnStudents })
  coursesOnStudents: CoursesOnStudents[];

  @ApiPropertyOptional({ type: () => StudentProfile })
  studentProfile?: StudentProfile;

  @ApiPropertyOptional({ type: () => TeacherProfile })
  teacherProfile?: TeacherProfile;

  @ApiProperty({ isArray: true, type: () => Order })
  orders: Order[];

  @ApiPropertyOptional({ type: () => Wishlist })
  wishlist?: Wishlist;

  @ApiPropertyOptional({ type: () => Cart })
  cart?: Cart;

  @ApiProperty({ isArray: true, type: () => Transaction })
  paidTransactions: Transaction[];

  @ApiProperty({ isArray: true, type: () => Transaction })
  earnedTransactions: Transaction[];
}
