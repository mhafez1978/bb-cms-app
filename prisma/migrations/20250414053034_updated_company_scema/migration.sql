-- AlterTable
ALTER TABLE `Company` ADD COLUMN `createdByUserId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
