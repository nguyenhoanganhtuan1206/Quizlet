CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create junction table: folder_flashsetitems (for many-to-many relationship between folders and flashsetitems)
CREATE TABLE folder_flashset (
    id              UUID            NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    folder_id       UUID            NOT NULL,
    flashset_id     UUID            NOT NULL,
    CONSTRAINT  fk_folder
        FOREIGN KEY (folder_id)
        REFERENCES  folders (id)
        ON DELETE   CASCADE,
    CONSTRAINT  fk_flashsets
        FOREIGN KEY (flashset_id)
        REFERENCES  flashsets (id)
        ON DELETE   CASCADE
);

-- Insert flashset Math Basics to folder training, IELTS  and TOEIC
INSERT INTO folder_flashset (folder_id, flashset_id) VALUES
    ('21a95216-b38d-483f-bb26-cc8cbdd9366c', '361e0317-fbec-4a43-b658-d2dae486b8b9'),
    ('b3597882-953e-4a47-b244-2cf1ffd3358f', '361e0317-fbec-4a43-b658-d2dae486b8b9'),
    ('7d405eb7-1683-4791-8964-94706f22cb2e', '361e0317-fbec-4a43-b658-d2dae486b8b9');

-- Insert flashset History Dates to folder training and TOEIC
INSERT INTO folder_flashset (folder_id, flashset_id) VALUES
    ('21a95216-b38d-483f-bb26-cc8cbdd9366c', '334e1ff9-14cb-46ae-862f-c0cc58f7fcc9'),
    ('6d9bf4a9-3bd8-47ad-8555-18dd18e83c42', '334e1ff9-14cb-46ae-862f-c0cc58f7fcc9');

-- Leave History Dates without folder