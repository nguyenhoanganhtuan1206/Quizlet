-- Enable UUID extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table: folders
CREATE TABLE folders (
    id          UUID            PRIMARY KEY,
    name        VARCHAR(50)     NOT NULL,
    description VARCHAR(255),
    created_at  TIMESTAMP       NOT NULL        DEFAULT NOW(),
    updated_at  TIMESTAMP,
    user_id     UUID            NOT NULL,
    CONSTRAINT  fk_user
        FOREIGN KEY (user_id)
        REFERENCES  users (id)
        ON DELETE   CASCADE
);

-- Create table: folders_parent
CREATE TABLE folder_parents (
    id          UUID            PRIMARY KEY,
    parent_folder_id         UUID    NOT NULL,
    child_folder_id          UUID    NOT NULL,
    created_at              TIMESTAMP       DEFAULT NOW(),
    CONSTRAINT fk_child_folder
        FOREIGN KEY (child_folder_id)
        REFERENCES folders(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_parent_folder
        FOREIGN KEY (parent_folder_id)
        REFERENCES folders(id)
        ON DELETE CASCADE,
    CHECK (child_folder_id != parent_folder_id)
);
-- Insert data for folders
INSERT INTO folders (
    id,
    name,
    description,
    created_at,
    updated_at,
    user_id
)
VALUES
    ('21a95216-b38d-483f-bb26-cc8cbdd9366c', 'English', 'This is folder to learning', NOW(), NULL, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('817a6914-fc92-458f-9b83-a01d925f90ef', 'IELTS', 'This is folder IELTS within English folder', NOW(), NULL, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('7d405eb7-1683-4791-8964-94706f22cb2e', 'TOEIC', 'This is folder TOEIC within English folder', NOW(), NULL,  '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('6d9bf4a9-3bd8-47ad-8555-18dd18e83c42', 'Reading', 'This is folder Reading within IELTS folder', NOW(), NULL, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('4f2dc304-9d65-4f76-afc8-f54a0ed4cfb0', 'Reading', 'This is folder Reading within TOEIC folder', NOW(), NULL, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('b3597882-953e-4a47-b244-2cf1ffd3358f', 'Training', 'This is folder to training', NOW(), NULL, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b');

-- Insert the folder parent
INSERT INTO folder_parents (id, parent_folder_id, child_folder_id)
VALUES
    ('b5ed642f-ddef-4603-ba61-245834fb0020', '21a95216-b38d-483f-bb26-cc8cbdd9366c', '817a6914-fc92-458f-9b83-a01d925f90ef'),
    ('bb8242ea-7fff-4f78-be02-0cc9291aeb79', '21a95216-b38d-483f-bb26-cc8cbdd9366c', '7d405eb7-1683-4791-8964-94706f22cb2e'),
    ('1e83c0a7-8d80-4cb5-aa85-713ea3a25a95', '817a6914-fc92-458f-9b83-a01d925f90ef', '6d9bf4a9-3bd8-47ad-8555-18dd18e83c42'),
    ('e5bbcc7b-6296-4afd-9c2c-680dab1273f2', '7d405eb7-1683-4791-8964-94706f22cb2e', '4f2dc304-9d65-4f76-afc8-f54a0ed4cfb0');
