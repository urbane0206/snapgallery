CREATE DATABASE IF NOT EXISTS snapgallery;
USE snapgallery;

CREATE TABLE IF NOT EXISTS images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    filePath VARCHAR(255) NOT NULL,
    uploadDate DATETIME NOT NULL,
    category VARCHAR(255) NOT NULL
);
