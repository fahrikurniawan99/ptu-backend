/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `payment_method` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId]` on the table `payment_method` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `payment_method_category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "payment_method" DROP CONSTRAINT "payment_method_categoryId_fkey";

-- AlterTable
ALTER TABLE "payment_method" ALTER COLUMN "categoryId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "payment_method_uuid_key" ON "payment_method"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "payment_method_categoryId_key" ON "payment_method"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_method_category_uuid_key" ON "payment_method_category"("uuid");

-- AddForeignKey
ALTER TABLE "payment_method" ADD CONSTRAINT "payment_method_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "payment_method_category"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
