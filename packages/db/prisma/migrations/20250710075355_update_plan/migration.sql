/*
  Warnings:

  - Added the required column `admin_user_id` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_user_id` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_user_id` to the `PlanFeature` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feature" ADD COLUMN     "admin_user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "admin_user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "PlanFeature" ADD COLUMN     "admin_user_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_admin_user_id_fkey" FOREIGN KEY ("admin_user_id") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_admin_user_id_fkey" FOREIGN KEY ("admin_user_id") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanFeature" ADD CONSTRAINT "PlanFeature_admin_user_id_fkey" FOREIGN KEY ("admin_user_id") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
