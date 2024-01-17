-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('folder', 'file');

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "owner_id" INTEGER,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
