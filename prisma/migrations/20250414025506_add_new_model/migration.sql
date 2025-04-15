/*
  Warnings:

  - You are about to alter the column `status` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `status` ENUM('TO_DO', 'IN_PROGRESS', 'DONE', 'BLOCKED', 'CANCELED') NULL DEFAULT 'TO_DO';

-- CreateTable
CREATE TABLE `test` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
