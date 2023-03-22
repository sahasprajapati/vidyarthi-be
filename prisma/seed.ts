import { PrismaClient } from '@prisma/client';
import { modelNameGenerator } from './generator';
import { PermissionSubject } from '../src/common/enums/permission-subject.enum';
import { PermissionAction } from '../src/common/enums/permission.enum';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await modelNameGenerator();
  const role = await prisma.role.upsert({
    where: {
      name: 'super',
    },
    update: {},
    create: {
      name: 'super',
    },
  });

  const student = await prisma.role.upsert({
    where: {
      name: 'student',
    },
    update: {},
    create: {
      name: 'student',
    },
  });

  const instructor = await prisma.role.upsert({
    where: {
      name: 'instructor',
    },
    update: {},
    create: {
      name: 'instructor',
    },
  });

  // const subjects = await Promise.all(
  //   Object.values(PermissionSubject).map(async (subject) => {
  //     const sub = await prisma.subject.upsert({
  //       where: {
  //         name: subject,
  //       },
  //       update: {},
  //       create: {
  //         name: subject,
  //       },
  //     });

  //     return sub;
  //   }),
  // );
  const subjects = [];
  for (const subject of Object.values(PermissionSubject)) {
    const sub = await prisma.subject.upsert({
      where: {
        name: subject,
      },
      update: {},
      create: {
        name: subject,
      },
    });
    subjects.push(sub);
  }

  for (const action of Object.values(PermissionAction)) {
    for (const subject of subjects) {
      const permission = await prisma.permission.upsert({
        where: {
          action_subjectId: {
            subjectId: subject.id,
            action: action,
          },
        },
        update: {},
        create: {
          subjectId: subject.id,
          action: action,
        },
      });

      const permission_role = await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permission.id,
        },
      });

      if (action !== 'delete') {
        const permission_role = await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: instructor.id,
              permissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: instructor.id,
            permissionId: permission.id,
          },
        });
      }
      if (action === 'read') {
        const permission_role = await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: student.id,
              permissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: student.id,
            permissionId: permission.id,
          },
        });
      }
    }
  }
  // await Promise.all(
  //   Object.values(PermissionAction).map(async (action) => {
  //     return await Promise.all(
  //       subjects.map(async (subject) => {
  //         const permission = await prisma.permission.upsert({
  //           where: {
  //             action_subjectId: {
  //               subjectId: subject.id,
  //               action: action,
  //             },
  //           },
  //           update: {},
  //           create: {
  //             subjectId: subject.id,
  //             action: action,
  //           },
  //         });

  //         const permission_role = await prisma.rolePermission.upsert({
  //           where: {
  //             roleId_permissionId: {
  //               roleId: role.id,
  //               permissionId: permission.id,
  //             },
  //           },
  //           update: {},
  //           create: {
  //             roleId: role.id,
  //             permissionId: permission.id,
  //           },
  //         });

  //         if (action !== 'delete') {
  //           const permission_role = await prisma.rolePermission.upsert({
  //             where: {
  //               roleId_permissionId: {
  //                 roleId: instructor.id,
  //                 permissionId: permission.id,
  //               },
  //             },
  //             update: {},
  //             create: {
  //               roleId: instructor.id,
  //               permissionId: permission.id,
  //             },
  //           });
  //         }
  //         if (action === 'read') {
  //           const permission_role = await prisma.rolePermission.upsert({
  //             where: {
  //               roleId_permissionId: {
  //                 roleId: student.id,
  //                 permissionId: permission.id,
  //               },
  //             },
  //             update: {},
  //             create: {
  //               roleId: student.id,
  //               permissionId: permission.id,
  //             },
  //           });
  //         }
  //       }),
  //     );
  //   }),
  // );

  const superUser = await prisma.user.upsert({
    where: { email: 'super@admin.com' },
    update: {},
    create: {
      email: 'super@admin.com',
      name: 'Super Admin',
      password: 'Hello1@%',
      roleId: role.id,
    },
  });
  console.log({ superUser });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
