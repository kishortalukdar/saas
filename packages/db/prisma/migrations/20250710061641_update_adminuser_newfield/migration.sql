/*
  Warnings:

  - You are about to drop the column `email` on the `AdminUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_name]` on the table `AdminUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `AdminUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `AdminUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `AdminUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AdminUser_email_key";

-- AlterTable
ALTER TABLE "AdminUser" DROP COLUMN "email",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_user_name_key" ON "AdminUser"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_password_key" ON "AdminUser"("password");
