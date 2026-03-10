-- Doc-Summarizer Database Schema
-- Run this file to recreate the database from scratch
-- When used via Docker, the database is already created by MYSQL_DATABASE env var.

-- Users table: stores registered accounts
CREATE TABLE IF NOT EXISTS users (
    id       INT          NOT NULL AUTO_INCREMENT,
    email    VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Contexts table: stores extracted text from uploaded documents (PDF, DOCX, TXT)
CREATE TABLE IF NOT EXISTS contexts (
    id         INT      NOT NULL AUTO_INCREMENT,
    user_id    INT      NOT NULL,
    context    LONGTEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Messages table: stores the Q&A chat history for document summarization
CREATE TABLE IF NOT EXISTS messages (
    id         INT          NOT NULL AUTO_INCREMENT,
    user_id    INT          NOT NULL,
    text       LONGTEXT     NOT NULL,
    sender     VARCHAR(10)  NOT NULL COMMENT 'either "user" or "ai"',
    timestamp  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- YT Contexts table: stores YouTube video transcripts
CREATE TABLE IF NOT EXISTS yt_contexts (
    id         INT          NOT NULL AUTO_INCREMENT,
    user_id    INT          NOT NULL,
    video_url  VARCHAR(512) NOT NULL,
    context    LONGTEXT     NOT NULL,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- YT Messages table: stores the Q&A chat history for YouTube summarization
CREATE TABLE IF NOT EXISTS yt_messages (
    id         INT         NOT NULL AUTO_INCREMENT,
    user_id    INT         NOT NULL,
    text       LONGTEXT    NOT NULL,
    sender     VARCHAR(10) NOT NULL COMMENT 'either "user" or "ai"',
    timestamp  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
