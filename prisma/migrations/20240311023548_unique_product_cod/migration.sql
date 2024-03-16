/*
  Warnings:

  - A unique constraint covering the columns `[productCode]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_productCode_key" ON "product"("productCode");
