-- AlterTable
ALTER TABLE `Order` ADD COLUMN `employeeId` VARCHAR(191) NULL,
    MODIFY `customerId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
