/*
  Warnings:

  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[tasks];

-- CreateTable
CREATE TABLE [dbo].[tab_tasks] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(60) NOT NULL,
    [description] NVARCHAR(255),
    [status] CHAR(11) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [tab_tasks_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [created_by] NVARCHAR(60) NOT NULL,
    [updated_by] NVARCHAR(60),
    CONSTRAINT [tab_tasks_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [tab_tasks_title_key] UNIQUE NONCLUSTERED ([title])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
