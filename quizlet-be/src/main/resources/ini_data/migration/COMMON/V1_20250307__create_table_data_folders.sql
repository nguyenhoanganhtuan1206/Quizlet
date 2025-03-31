-- Enable UUID extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table: folders
CREATE TABLE folders (
    id          UUID            PRIMARY KEY,
    name        VARCHAR(50)     NOT NULL,
    description VARCHAR(50),
    created_at  TIMESTAMP       NOT NULL        DEFAULT NOW(),
    updated_at  TIMESTAMP,
    parent_id   UUID            NULL,
    user_id     UUID            NOT NULL,
    CONSTRAINT  fk_user
        FOREIGN KEY (user_id)
        REFERENCES  users (id)
        ON DELETE   CASCADE
);

-- Insert data for folders
INSERT INTO folders (
    id,
    name,
    description,
    created_at,
    updated_at,
    parent_id,
    user_id
)
VALUES
    ('21a95216-b38d-483f-bb26-cc8cbdd9366c', 'English', 'This is folder to learning', NOW(), NULL, NULL, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('817a6914-fc92-458f-9b83-a01d925f90ef', 'IELTS', 'This is folder IELTS within English folder', NOW(), NULL, '21a95216-b38d-483f-bb26-cc8cbdd9366c', '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('7d405eb7-1683-4791-8964-94706f22cb2e', 'TOEIC', 'This is folder TOEIC within English folder', NOW(), NULL, '21a95216-b38d-483f-bb26-cc8cbdd9366c', '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('6d9bf4a9-3bd8-47ad-8555-18dd18e83c42', 'Reading', 'This is folder Reading within IELTS folder', NOW(), NULL, '817a6914-fc92-458f-9b83-a01d925f90ef', '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('4f2dc304-9d65-4f76-afc8-f54a0ed4cfb0', 'Reading', 'This is folder Reading within TOEIC folder', NOW(), NULL, '7d405eb7-1683-4791-8964-94706f22cb2e', '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('b3597882-953e-4a47-b244-2cf1ffd3358f', 'Training', 'This is folder to training', NOW(), NULL, NULL, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b');
