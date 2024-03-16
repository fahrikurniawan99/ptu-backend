/*
  Warnings:

  - Added the required column `categoryId` to the `operator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "operator" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "operator_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "slug" TEXT NOT NULL,

    CONSTRAINT "operator_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "operator_category_slug_key" ON "operator_category"("slug");

-- AddForeignKey
ALTER TABLE "operator" ADD CONSTRAINT "operator_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "operator_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
