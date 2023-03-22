import { Category } from './category';
import { User } from './user';
import { CoursesOnStudents } from './courses_on_students';
import { Rating } from './rating';
import { Section } from './section';
import { Order } from './order';
import { Wishlist } from './wishlist';
import { Cart } from './cart';
import { Transaction } from './transaction';
import { ApiProperty } from '@nestjs/swagger';

export class CourseRelations {
  @ApiProperty({ type: () => Category })
  category: Category;

  @ApiProperty({ type: () => Category })
  subCategory: Category;

  @ApiProperty({ isArray: true, type: () => User })
  instructors: User[];

  @ApiProperty({ isArray: true, type: () => CoursesOnStudents })
  coursesOnStudents: CoursesOnStudents[];

  @ApiProperty({ isArray: true, type: () => Rating })
  ratings: Rating[];

  @ApiProperty({ isArray: true, type: () => Section })
  sections: Section[];

  @ApiProperty({ isArray: true, type: () => Order })
  order: Order[];

  @ApiProperty({ isArray: true, type: () => Wishlist })
  Wishlist: Wishlist[];

  @ApiProperty({ isArray: true, type: () => Cart })
  Cart: Cart[];

  @ApiProperty({ isArray: true, type: () => Transaction })
  transaction: Transaction[];
}
