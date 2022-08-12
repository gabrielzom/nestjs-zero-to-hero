/*
  Warnings:

  - You are about to drop the column `plan` on the `tab_tasks` table. All the data in the column will be lost.
  - Added the required column `project` to the `tab_tasks` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[tab_tasks] DROP CONSTRAINT [tab_tasks_plan_fkey];

-- AlterTable
ALTER TABLE [dbo].[tab_tasks] DROP COLUMN [plan];
ALTER TABLE [dbo].[tab_tasks] ADD [project] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[tab_users] ALTER COLUMN [password] VARBINARY NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[tab_tasks] ADD CONSTRAINT [tab_tasks_project_fkey] FOREIGN KEY ([project]) REFERENCES [dbo].[tab_projects]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
