/*
  Warnings:

  - Added the required column `iv` to the `tab_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tab_users` ADD COLUMN `iv` VARBINARY(16) NOT NULL;
