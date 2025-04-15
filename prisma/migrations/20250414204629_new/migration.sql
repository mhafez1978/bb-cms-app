/*
  Warnings:

  - Added the required column `createdById` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `cost` DOUBLE NULL DEFAULT 0.0,
    ADD COLUMN `createdById` VARCHAR(191) NOT NULL,
    MODIFY `quantity` INTEGER NULL DEFAULT 0,
    MODIFY `price` DOUBLE NULL DEFAULT 0.0;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
