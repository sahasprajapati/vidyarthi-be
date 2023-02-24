-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "coursesOnStudentsCourseId" INTEGER NOT NULL,
    "coursesOnStudentsStudentId" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_coursesOnStudentsCourseId_coursesOnStudentsStud_key" ON "Achievement"("coursesOnStudentsCourseId", "coursesOnStudentsStudentId");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_coursesOnStudentsCourseId_coursesOnStudentsStu_fkey" FOREIGN KEY ("coursesOnStudentsCourseId", "coursesOnStudentsStudentId") REFERENCES "CoursesOnStudents"("courseId", "studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
