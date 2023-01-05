import { Prisma } from '@prisma/client';
import { writeFile } from 'fs/promises';
export const modelNameGenerator = async () => {
  const enumStart = 'export enum PermissionSubject {' + '\n';
  let enumBody = '';
  Prisma.dmmf.datamodel.models.map((model) => {
    enumBody += `  '${model.name.trim()}' = '${model.name
      .trim()
      .toLowerCase()}', \n`;
  });
  const enumEnd = '}';

  const enumFile = enumStart + enumBody + enumEnd;
  await writeFile(
    './src/common/enums/permission-subject.enum.ts',
    enumFile,
    'utf-8',
  ).catch((err) => {
    console.error('Error generating models', err);
  });
  console.log('Generated  models from enum');
};
