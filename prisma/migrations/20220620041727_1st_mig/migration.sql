BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tab_tasks] (
    [id] NVARCHAR(40) NOT NULL,
    [title] NVARCHAR(60) NOT NULL,
    [description] NVARCHAR(255),
    [status] NVARCHAR(11) NOT NULL CONSTRAINT [tab_tasks_status_df] DEFAULT 'OPEN',
    [created_at] DATETIME2 NOT NULL CONSTRAINT [tab_tasks_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [plan] INT NOT NULL,
    [created_by] INT NOT NULL,
    [updated_by] INT,
    CONSTRAINT [tab_tasks_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [tab_tasks_title_key] UNIQUE NONCLUSTERED ([title])
);

-- CreateTable
CREATE TABLE [dbo].[tab_users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(25) NOT NULL,
    [last_name] NVARCHAR(25) NOT NULL,
    [email] NVARCHAR(60) NOT NULL,
    [password] VARBINARY NOT NULL,
    [role] NVARCHAR(12) NOT NULL,
    CONSTRAINT [tab_users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [tab_users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[tab_projects] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(50) NOT NULL,
    [owner] INT NOT NULL,
    CONSTRAINT [tab_projects_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[tab_tasks] ADD CONSTRAINT [tab_tasks_created_by_fkey] FOREIGN KEY ([created_by]) REFERENCES [dbo].[tab_users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tab_tasks] ADD CONSTRAINT [tab_tasks_plan_fkey] FOREIGN KEY ([plan]) REFERENCES [dbo].[tab_projects]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tab_projects] ADD CONSTRAINT [tab_projects_owner_fkey] FOREIGN KEY ([owner]) REFERENCES [dbo].[tab_users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
