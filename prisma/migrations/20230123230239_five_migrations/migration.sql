-- CreateTable
CREATE TABLE `tab_historys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` LONGTEXT NOT NULL,
    `object` LONGTEXT NULL,
    `type` VARCHAR(20) NOT NULL DEFAULT 'LOG',
    `created_by` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tab_historys` ADD CONSTRAINT `tab_historys_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `tab_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
