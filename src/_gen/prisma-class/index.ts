import { PermissionRelations as _PermissionRelations } from './permission_relations';
import { SubjectRelations as _SubjectRelations } from './subject_relations';
import { RolePermissionRelations as _RolePermissionRelations } from './role_permission_relations';
import { RoleRelations as _RoleRelations } from './role_relations';
import { UserRelations as _UserRelations } from './user_relations';
import { CoursesOnStudentsRelations as _CoursesOnStudentsRelations } from './courses_on_students_relations';
import { ProgressRelations as _ProgressRelations } from './progress_relations';
import { AchievementRelations as _AchievementRelations } from './achievement_relations';
import { StudentProfileRelations as _StudentProfileRelations } from './student_profile_relations';
import { TeacherProfileRelations as _TeacherProfileRelations } from './teacher_profile_relations';
import { SocialProfileRelations as _SocialProfileRelations } from './social_profile_relations';
import { TransactionRelations as _TransactionRelations } from './transaction_relations';
import { RatingRelations as _RatingRelations } from './rating_relations';
import { CourseRelations as _CourseRelations } from './course_relations';
import { CategoryRelations as _CategoryRelations } from './category_relations';
import { DurationRelations as _DurationRelations } from './duration_relations';
import { SectionRelations as _SectionRelations } from './section_relations';
import { LectureRelations as _LectureRelations } from './lecture_relations';
import { NoteRelations as _NoteRelations } from './note_relations';
import { OrderRelations as _OrderRelations } from './order_relations';
import { WishlistRelations as _WishlistRelations } from './wishlist_relations';
import { CartRelations as _CartRelations } from './cart_relations';
import { Permission as _Permission } from './permission';
import { Subject as _Subject } from './subject';
import { RolePermission as _RolePermission } from './role_permission';
import { Role as _Role } from './role';
import { User as _User } from './user';
import { CoursesOnStudents as _CoursesOnStudents } from './courses_on_students';
import { Progress as _Progress } from './progress';
import { Achievement as _Achievement } from './achievement';
import { StudentProfile as _StudentProfile } from './student_profile';
import { TeacherProfile as _TeacherProfile } from './teacher_profile';
import { SocialProfile as _SocialProfile } from './social_profile';
import { Transaction as _Transaction } from './transaction';
import { Rating as _Rating } from './rating';
import { Course as _Course } from './course';
import { Category as _Category } from './category';
import { Duration as _Duration } from './duration';
import { Section as _Section } from './section';
import { Lecture as _Lecture } from './lecture';
import { Note as _Note } from './note';
import { Order as _Order } from './order';
import { Wishlist as _Wishlist } from './wishlist';
import { Cart as _Cart } from './cart';

export namespace PrismaModel {
  export class PermissionRelations extends _PermissionRelations {}
  export class SubjectRelations extends _SubjectRelations {}
  export class RolePermissionRelations extends _RolePermissionRelations {}
  export class RoleRelations extends _RoleRelations {}
  export class UserRelations extends _UserRelations {}
  export class CoursesOnStudentsRelations extends _CoursesOnStudentsRelations {}
  export class ProgressRelations extends _ProgressRelations {}
  export class AchievementRelations extends _AchievementRelations {}
  export class StudentProfileRelations extends _StudentProfileRelations {}
  export class TeacherProfileRelations extends _TeacherProfileRelations {}
  export class SocialProfileRelations extends _SocialProfileRelations {}
  export class TransactionRelations extends _TransactionRelations {}
  export class RatingRelations extends _RatingRelations {}
  export class CourseRelations extends _CourseRelations {}
  export class CategoryRelations extends _CategoryRelations {}
  export class DurationRelations extends _DurationRelations {}
  export class SectionRelations extends _SectionRelations {}
  export class LectureRelations extends _LectureRelations {}
  export class NoteRelations extends _NoteRelations {}
  export class OrderRelations extends _OrderRelations {}
  export class WishlistRelations extends _WishlistRelations {}
  export class CartRelations extends _CartRelations {}
  export class Permission extends _Permission {}
  export class Subject extends _Subject {}
  export class RolePermission extends _RolePermission {}
  export class Role extends _Role {}
  export class User extends _User {}
  export class CoursesOnStudents extends _CoursesOnStudents {}
  export class Progress extends _Progress {}
  export class Achievement extends _Achievement {}
  export class StudentProfile extends _StudentProfile {}
  export class TeacherProfile extends _TeacherProfile {}
  export class SocialProfile extends _SocialProfile {}
  export class Transaction extends _Transaction {}
  export class Rating extends _Rating {}
  export class Course extends _Course {}
  export class Category extends _Category {}
  export class Duration extends _Duration {}
  export class Section extends _Section {}
  export class Lecture extends _Lecture {}
  export class Note extends _Note {}
  export class Order extends _Order {}
  export class Wishlist extends _Wishlist {}
  export class Cart extends _Cart {}

  export const extraModels = [
    PermissionRelations,
    SubjectRelations,
    RolePermissionRelations,
    RoleRelations,
    UserRelations,
    CoursesOnStudentsRelations,
    ProgressRelations,
    AchievementRelations,
    StudentProfileRelations,
    TeacherProfileRelations,
    SocialProfileRelations,
    TransactionRelations,
    RatingRelations,
    CourseRelations,
    CategoryRelations,
    DurationRelations,
    SectionRelations,
    LectureRelations,
    NoteRelations,
    OrderRelations,
    WishlistRelations,
    CartRelations,
    Permission,
    Subject,
    RolePermission,
    Role,
    User,
    CoursesOnStudents,
    Progress,
    Achievement,
    StudentProfile,
    TeacherProfile,
    SocialProfile,
    Transaction,
    Rating,
    Course,
    Category,
    Duration,
    Section,
    Lecture,
    Note,
    Order,
    Wishlist,
    Cart,
  ];
}
