/*
  Warnings:

  - The primary key for the `issues` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "issues" DROP CONSTRAINT "issues_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "issues_pkey" PRIMARY KEY ("id");
