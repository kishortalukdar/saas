/*
  Warnings:

  - You are about to drop the column `password` on the `AdminUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNo]` on the table `AdminUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNo` to the `AdminUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminUser" DROP COLUMN "password",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNo" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_phoneNo_key" ON "AdminUser"("phoneNo");
