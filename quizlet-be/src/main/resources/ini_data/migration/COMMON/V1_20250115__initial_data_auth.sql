-- Enable UUID extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert roles if they do not exist
INSERT INTO roles (id, name)
VALUES
    (1, 'ADMIN'),
    (2, 'USER');

-- Seed data for users
INSERT INTO users (
    id,
    code_reset_password,
    created_at,
    email,
    last_send_reset_password_at,
    password,
    account_disabled,
    full_name,
    image,
    role_id
)
VALUES
    ('d54e9d14-fd3c-4936-8d7f-66b8f48e8661', NULL, NOW(), 'admin@quizlet.tuan', NULL,
        '$2a$12$P3EiXFODL6rumybPKjn.Nui.y7H/yGNlcwI3uI.YdUkWIkJtdMX/K', FALSE, 'Admin', NULL, 1),
    ('237c736b-9aa3-4c4e-8d7e-558166bb3d6b', NULL, NOW(), 'nguyenhoanganhtuan1206@gmail.com', NULL,
        '$2a$10$8LZTNRd9SbEz8ra53nQGtOYrNntm1AA75jv294mxuxyj6/q6jLSi2', FALSE, 'Anh Tuan', NULL, 2),
    ('9cb2ed6a-1753-4232-9c5c-8c523e32546e', NULL, NOW(), 'tranthiminhthu2401@gmail.com', NULL,
        '$2a$10$8LZTNRd9SbEz8ra53nQGtOYrNntm1AA75jv294mxuxyj6/q6jLSi2', FALSE, 'Minh Thu', NULL, 2);