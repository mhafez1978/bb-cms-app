/*
  Warnings:

  - You are about to drop the `Adel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Adel2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mohamed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nabil` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Made the column `state` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Made the column `state` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `type` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Company` MODIFY `state` ENUM('not_us_territory', 'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new_hampshire', 'new_jersey', 'new_mexico', 'new_york', 'north_carolina', 'north_dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode_island', 'south_carolina', 'south_dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west_virginia', 'wisconsin', 'wyoming') NOT NULL,
    MODIFY `country` ENUM('afghanistan', 'albania', 'algeria', 'andorra', 'angola', 'antigua_and_barbuda', 'argentina', 'armenia', 'australia', 'austria', 'azerbaijan', 'bahamas', 'bahrain', 'bangladesh', 'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bhutan', 'bolivia', 'bosnia_and_herzegovina', 'botswana', 'brazil', 'brunei', 'bulgaria', 'burkina_faso', 'burundi', 'cabo_verde', 'cambodia', 'cameroon', 'canada', 'central_african_republic', 'chad', 'chile', 'china', 'colombia', 'comoros', 'republic_of_the_congo_democratic', 'republic_of_the_congo', 'costa_rica', 'croatia', 'cuba', 'cyprus', 'czech_republic', 'denmark', 'djibouti', 'dominica', 'dominican_republic', 'ecuador', 'egypt', 'el_salvador', 'equatorial_guinea', 'eritrea', 'estonia', 'eswatini', 'ethiopia', 'fiji', 'finland', 'france', 'gabon', 'gambia', 'georgia', 'germany', 'ghana', 'greece', 'grenada', 'guatemala', 'guinea', 'guinea_bissau', 'guyana', 'haiti', 'holy_see', 'honduras', 'hungary', 'iceland', 'india', 'indonesia', 'iran', 'iraq', 'ireland', 'israel', 'italy', 'jamaica', 'japan', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 'north_korea', 'south_korea', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'madagascar', 'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshall_islands', 'mauritania', 'mauritius', 'mexico', 'micronesia', 'moldova', 'monaco', 'mongolia', 'montenegro', 'morocco', 'mozambique', 'myanmar', 'namibia', 'nauru', 'nepal', 'netherlands', 'new_zealand', 'nicaragua', 'niger', 'nigeria', 'north_macedonia', 'norway', 'oman', 'pakistan', 'palau', 'palestine', 'panama', 'papua_new_guinea', 'paraguay', 'peru', 'philippines', 'poland', 'portugal', 'qatar', 'romania', 'russia', 'rwanda', 'saint_kitts_and_nevis', 'saint_lucia', 'saint_vincent_and_the_grenadines', 'samoa', 'san_marino', 'sao_tome_and_principe', 'saudi_arabia', 'senegal', 'serbia', 'seychelles', 'sierra_leone', 'singapore', 'slovakia', 'slovenia', 'solomon_islands', 'somalia', 'south_africa', 'south_sudan', 'spain', 'sri_lanka', 'sudan', 'suriname', 'sweden', 'switzerland', 'syria', 'tajikistan', 'tanzania', 'thailand', 'timor_leste', 'togo', 'tonga', 'trinidad_and_tobago', 'tunisia', 'turkey', 'turkmenistan', 'tuvalu', 'uganda', 'ukraine', 'united_arab_emirates', 'united_kingdom', 'united_states', 'uruguay', 'uzbekistan', 'vanuatu', 'venezuela', 'vietnam', 'yemen', 'zambia', 'zimbabwe') NOT NULL;

-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `status` ENUM('PROSPECT', 'NEW', 'EXISTING', 'VIP') NULL DEFAULT 'PROSPECT',
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `state` ENUM('not_us_territory', 'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new_hampshire', 'new_jersey', 'new_mexico', 'new_york', 'north_carolina', 'north_dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode_island', 'south_carolina', 'south_dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west_virginia', 'wisconsin', 'wyoming') NOT NULL,
    MODIFY `country` ENUM('afghanistan', 'albania', 'algeria', 'andorra', 'angola', 'antigua_and_barbuda', 'argentina', 'armenia', 'australia', 'austria', 'azerbaijan', 'bahamas', 'bahrain', 'bangladesh', 'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bhutan', 'bolivia', 'bosnia_and_herzegovina', 'botswana', 'brazil', 'brunei', 'bulgaria', 'burkina_faso', 'burundi', 'cabo_verde', 'cambodia', 'cameroon', 'canada', 'central_african_republic', 'chad', 'chile', 'china', 'colombia', 'comoros', 'republic_of_the_congo_democratic', 'republic_of_the_congo', 'costa_rica', 'croatia', 'cuba', 'cyprus', 'czech_republic', 'denmark', 'djibouti', 'dominica', 'dominican_republic', 'ecuador', 'egypt', 'el_salvador', 'equatorial_guinea', 'eritrea', 'estonia', 'eswatini', 'ethiopia', 'fiji', 'finland', 'france', 'gabon', 'gambia', 'georgia', 'germany', 'ghana', 'greece', 'grenada', 'guatemala', 'guinea', 'guinea_bissau', 'guyana', 'haiti', 'holy_see', 'honduras', 'hungary', 'iceland', 'india', 'indonesia', 'iran', 'iraq', 'ireland', 'israel', 'italy', 'jamaica', 'japan', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 'north_korea', 'south_korea', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'madagascar', 'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshall_islands', 'mauritania', 'mauritius', 'mexico', 'micronesia', 'moldova', 'monaco', 'mongolia', 'montenegro', 'morocco', 'mozambique', 'myanmar', 'namibia', 'nauru', 'nepal', 'netherlands', 'new_zealand', 'nicaragua', 'niger', 'nigeria', 'north_macedonia', 'norway', 'oman', 'pakistan', 'palau', 'palestine', 'panama', 'papua_new_guinea', 'paraguay', 'peru', 'philippines', 'poland', 'portugal', 'qatar', 'romania', 'russia', 'rwanda', 'saint_kitts_and_nevis', 'saint_lucia', 'saint_vincent_and_the_grenadines', 'samoa', 'san_marino', 'sao_tome_and_principe', 'saudi_arabia', 'senegal', 'serbia', 'seychelles', 'sierra_leone', 'singapore', 'slovakia', 'slovenia', 'solomon_islands', 'somalia', 'south_africa', 'south_sudan', 'spain', 'sri_lanka', 'sudan', 'suriname', 'sweden', 'switzerland', 'syria', 'tajikistan', 'tanzania', 'thailand', 'timor_leste', 'togo', 'tonga', 'trinidad_and_tobago', 'tunisia', 'turkey', 'turkmenistan', 'tuvalu', 'uganda', 'ukraine', 'united_arab_emirates', 'united_kingdom', 'united_states', 'uruguay', 'uzbekistan', 'vanuatu', 'venezuela', 'vietnam', 'yemen', 'zambia', 'zimbabwe') NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('CONTRACTOR', 'PARTNER', 'VENDOR', 'CUSTOMER', 'EMPLOYEE', 'USER', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `Adel`;

-- DropTable
DROP TABLE `Adel2`;

-- DropTable
DROP TABLE `Mohamed`;

-- DropTable
DROP TABLE `Nabil`;

-- DropTable
DROP TABLE `test`;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NULL,
    `avatarUrl` VARCHAR(191) NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_userId_key` ON `Customer`(`userId`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
