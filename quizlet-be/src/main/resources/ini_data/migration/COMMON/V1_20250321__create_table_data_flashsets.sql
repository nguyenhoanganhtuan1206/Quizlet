-- Enable UUID extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table: flashsets
CREATE TABLE flashsets (
    id          UUID            PRIMARY KEY,
    name        VARCHAR(50)     NOT NULL        UNIQUE,
    description VARCHAR(50),
    created_at  TIMESTAMP       NOT NULL        DEFAULT NOW(),
    updated_at  TIMESTAMP,
    isDrafted   BOOLEAN         DEFAULT TRUE,
    user_id     UUID            NOT NULL,
    CONSTRAINT  fk_user
        FOREIGN KEY (user_id)
        REFERENCES  users (id)
        ON DELETE   CASCADE
);

-- Insert sample flashsets
INSERT INTO flashsets (id, name, description, created_at, isDrafted, user_id) VALUES
    ('361e0317-fbec-4a43-b658-d2dae486b8b9', 'Math Basics', 'Basic math concepts', NOW(), false, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('334e1ff9-14cb-46ae-862f-c0cc58f7fcc9', 'Spanish Vocab', 'Common Spanish words', NOW(), false, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('b5b21889-efa1-41ba-997d-6f17210af2a7', 'History Dates', 'Key historical dates', NOW(), true, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b');