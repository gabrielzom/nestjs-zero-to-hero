/*
  Warnings:

  - The primary key for the `tab_tasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tab_tasks` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Char(37)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[tab_tasks] DROP CONSTRAINT [tab_tasks_pkey];
ALTER TABLE [dbo].[tab_tasks] ALTER COLUMN [id] CHAR(37) NOT NULL;
ALTER TABLE [dbo].[tab_tasks] ADD CONSTRAINT tab_tasks_pkey PRIMARY KEY CLUSTERED ([id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
