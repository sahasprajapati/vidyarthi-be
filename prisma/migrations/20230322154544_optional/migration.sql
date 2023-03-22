-- AlterTable
ALTER TABLE `Course` MODIFY `learnableContent` JSON NULL,
    MODIFY `skills` JSON NULL;

-- AlterTable
ALTER TABLE `Note` MODIFY `noteFiles` JSON NULL;

-- AlterTable
ALTER TABLE `TeacherProfile` MODIFY `notifications` JSON NULL;
