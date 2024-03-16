-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "name" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "masterPrice" INTEGER NOT NULL,
    "masterJenisProductId" INTEGER NOT NULL,
    "masterProductId" INTEGER NOT NULL,
    "productCode" TEXT NOT NULL,
    "operatorId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
