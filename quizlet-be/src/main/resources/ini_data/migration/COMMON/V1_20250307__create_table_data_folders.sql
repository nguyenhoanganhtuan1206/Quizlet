-- Enable UUID extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table: folders
CREATE TABLE folders (
    id          UUID            PRIMARY KEY,
    name        VARCHAR(50)     NOT NULL        UNIQUE,
    description VARCHAR(50),
    created_at  TIMESTAMP       NOT NULL        DEFAULT NOW(),
    updated_at  TIMESTAMP,
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
    user_id
)
VALUES
    ('21a95216-b38d-483f-bb26-cc8cbdd9366c', 'English', 'This is folder to learning', NOW(), NULL, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('b3597882-953e-4a47-b244-2cf1ffd3358f', 'Training', 'This is folder to training', NOW(), NULL, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b');
