-- CreateTable
CREATE TABLE `tab_tasks` (
    `id` VARCHAR(40) NOT NULL,
    `title` VARCHAR(60) NOT NULL,
    `description` VARCHAR(255) NULL,
    `status` VARCHAR(11) NOT NULL DEFAULT 'OPEN',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `project` INTEGER NOT NULL,
    `created_by` INTEGER NOT NULL,
    `updated_by` INTEGER NULL,

    UNIQUE INDEX `tab_tasks_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tab_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `last_name` VARCHAR(25) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `password` VARBINARY(128) NOT NULL,
    `role` VARCHAR(12) NOT NULL,

    UNIQUE INDEX `tab_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tab_projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `owner` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tab_tasks` ADD CONSTRAINT `tab_tasks_project_fkey` FOREIGN KEY (`project`) REFERENCES `tab_projects`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tab_tasks` ADD CONSTRAINT `tab_tasks_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `tab_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tab_projects` ADD CONSTRAINT `tab_projects_owner_fkey` FOREIGN KEY (`owner`) REFERENCES `tab_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
