-- CreateTable
CREATE TABLE "operator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT,
    "uuid" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "operator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "operator_slug_key" ON "operator"("slug");
