-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordHash" TEXT,
ALTER COLUMN "provider" DROP NOT NULL,
ALTER COLUMN "providerID" DROP NOT NULL;
