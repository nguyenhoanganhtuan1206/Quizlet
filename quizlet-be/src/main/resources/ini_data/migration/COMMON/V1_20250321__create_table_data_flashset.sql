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
    folder_id   UUID            NULL,
    user_id     UUID            NOT NULL,
    CONSTRAINT  fk_folder
        FOREIGN KEY (folder_id)
        REFERENCES  folders (id)
        ON DELETE   CASCADE,
    CONSTRAINT  fk_user
        FOREIGN KEY (user_id)
        REFERENCES  users (id)
        ON DELETE   CASCADE
);

-- Create table: flashsetitems
CREATE TABLE flashsetitems (
    id          UUID            PRIMARY KEY,
    answer      VARCHAR(50)     NOT NULL,
    question    VARCHAR(50)     NOT NULL,
    created_at  TIMESTAMP       NOT NULL        DEFAULT NOW(),
    updated_at  TIMESTAMP,
    flashset_id UUID            NULL,
    user_id     UUID            NOT NULL,
    CONSTRAINT  fk_flashset
        FOREIGN KEY (flashset_id)
        REFERENCES  flashsets (id)
        ON DELETE   CASCADE,
    CONSTRAINT  fk_user
        FOREIGN KEY (user_id)
        REFERENCES  users (id)
        ON DELETE   CASCADE
);

-- Insert sample flashsets
INSERT INTO flashsets (id, name, description, created_at, isDrafted, user_id, folder_id) VALUES
    ('361e0317-fbec-4a43-b658-d2dae486b8b9', 'Math Basics', 'Basic math concepts', NOW(), false, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b', '21a95216-b38d-483f-bb26-cc8cbdd9366c'),
    ('334e1ff9-14cb-46ae-862f-c0cc58f7fcc9', 'Spanish Vocab', 'Common Spanish words', NOW(), false, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b', 'b3597882-953e-4a47-b244-2cf1ffd3358f'),
    ('b5b21889-efa1-41ba-997d-6f17210af2a7', 'History Dates', 'Key historical dates', NOW(), true, '237c736b-9aa3-4c4e-8d7e-558166bb3d6b', NULL);

-- Insert sample flashsetitems
INSERT INTO flashsetitems (id, answer, question, created_at, flashset_id, user_id) VALUES
    -- Math Basics items
    ('2c7b5a1f-b14d-47cb-bb6b-5ae9dbfa6aa6', '4', 'What is 2 + 2?', NOW(),
        '361e0317-fbec-4a43-b658-d2dae486b8b9', '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('b6ad1c85-3cf4-4db5-806b-c18830b8528d', '9', 'What is 3 squared?', NOW(),
        '361e0317-fbec-4a43-b658-d2dae486b8b9', '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    -- Spanish Vocab items
    ('b62933ed-72a8-45e5-ab63-35576569a2e0', 'Hello', 'What does "Hola" mean?', NOW(),
        '334e1ff9-14cb-46ae-862f-c0cc58f7fcc9', '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('2df46b85-f7dc-41d4-9999-385d4193fccd', 'Thank you', 'What does "Gracias" mean?', NOW(),
        '334e1ff9-14cb-46ae-862f-c0cc58f7fcc9', '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    -- History Dates items
    ('000e6a75-d9ad-4aea-9c27-d2381eb534ea', '1776', 'When was the US Declaration signed?', NOW(),
        'b5b21889-efa1-41ba-997d-6f17210af2a7', '237c736b-9aa3-4c4e-8d7e-558166bb3d6b'),
    ('e5ad3d89-02b4-46fc-aea7-c5fdbc909c9f', '1492', 'When did Columbus reach America?', NOW(),
        'b5b21889-efa1-41ba-997d-6f17210af2a7', '237c736b-9aa3-4c4e-8d7e-558166bb3d6b');