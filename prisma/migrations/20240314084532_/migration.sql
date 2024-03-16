/*
  Warnings:

  - A unique constraint covering the columns `[paymentCode]` on the table `payment_method` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "payment_method_paymentCode_key" ON "payment_method"("paymentCode");
