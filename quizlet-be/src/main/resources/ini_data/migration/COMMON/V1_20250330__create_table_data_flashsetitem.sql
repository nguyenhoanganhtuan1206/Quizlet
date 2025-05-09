-- Create table: flashsetitems
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE flashsetitems (
    id          UUID            PRIMARY KEY,
    answer      VARCHAR(255)    NOT NULL,
    question    VARCHAR(255)    NULL,
    order_position INT          NOT NULL                     ,
    created_at  TIMESTAMP       NOT NULL        DEFAULT NOW(),
    updated_at  TIMESTAMP,
    flashset_id UUID            NOT NULL,
    CONSTRAINT  fk_flashset
        FOREIGN KEY (flashset_id)
        REFERENCES  flashsets (id)
        ON DELETE   CASCADE
);

-- Insert sample flashsetitems
INSERT INTO flashsetitems (id, answer, question, order_position, created_at, flashset_id) VALUES
    -- Math Basics items
    ('2c7b5a1f-b14d-47cb-bb6b-5ae9dbfa6aa6', '4', 'What is 2 + 2?', 1 , NOW(),
        '361e0317-fbec-4a43-b658-d2dae486b8b9'),
    ('b6ad1c85-3cf4-4db5-806b-c18830b8528d', '9', 'What is 3 squared?', 2 , NOW(),
        '361e0317-fbec-4a43-b658-d2dae486b8b9'),
    -- Spanish Vocab items
    ('b62933ed-72a8-45e5-ab63-35576569a2e0', 'Hello', 'What does "Hola" mean?', 1 , NOW(),
        '334e1ff9-14cb-46ae-862f-c0cc58f7fcc9'),
    ('2df46b85-f7dc-41d4-9999-385d4193fccd', 'Thank you', 'What does "Gracias" mean?', 2 , NOW(),
        '334e1ff9-14cb-46ae-862f-c0cc58f7fcc9'),
    -- History Dates items
    ('000e6a75-d9ad-4aea-9c27-d2381eb534ea', '1776', 'When was the US Declaration signed?', 1 , NOW(),
        'b5b21889-efa1-41ba-997d-6f17210af2a7'),
    ('e5ad3d89-02b4-46fc-aea7-c5fdbc909c9f', '1492', 'When did Columbus reach America?', 2 , NOW(),
        'b5b21889-efa1-41ba-997d-6f17210af2a7')
        ;