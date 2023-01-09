/*
  Warnings:

  - Made the column `iv` on table `tab_users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tab_users` MODIFY `iv` VARBINARY(16) NOT NULL;
