-- TechNest Blog — MariaDB schema
-- Run once on your VPS: mysql -u root -p technest < schema.sql

CREATE DATABASE IF NOT EXISTS technest CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE technest;

CREATE TABLE IF NOT EXISTS posts (
  slug          VARCHAR(100)  NOT NULL PRIMARY KEY,
  title         TEXT          NOT NULL,
  seo_excerpt   TEXT          NOT NULL DEFAULT '',
  excerpt       TEXT          NOT NULL DEFAULT '',
  content       LONGTEXT      NOT NULL DEFAULT '',
  tag           VARCHAR(80)   NOT NULL,
  author        VARCHAR(80)   NOT NULL DEFAULT 'Shaan',
  status        ENUM('draft','published') NOT NULL DEFAULT 'draft',
  featured_image_url  TEXT,
  featured_image_alt  VARCHAR(255) NOT NULL DEFAULT '',
  image_url     TEXT,
  image_alt     VARCHAR(255) NOT NULL DEFAULT '',
  read_time     VARCHAR(30)  NOT NULL DEFAULT '',
  date          VARCHAR(30)  NOT NULL,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Newsletter subscribers (replaces Resend audience)
CREATE TABLE IF NOT EXISTS subscribers (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
