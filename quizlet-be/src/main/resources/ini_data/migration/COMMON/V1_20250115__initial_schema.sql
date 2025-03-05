-- Insert roles if they do not exist
INSERT INTO roles (id, name)
VALUES (1, 'ADMIN'),
       (2, 'USER');

---- Seed Data for Users
INSERT INTO users (id, code_reset_password, created_at, email, last_send_reset_password_at, password,
                   phone_number, account_disabled, full_name)
VALUES
    ('d54e9d14-fd3c-4936-8d7f-66b8f48e8661', NULL, NOW(), 'admin@quizlet.tuan', NULL,
        '$2a$12$P3EiXFODL6rumybPKjn.Nui.y7H/yGNlcwI3uI.YdUkWIkJtdMX/K', NULL, FALSE, 'Admin'),
    ('237c736b-9aa3-4c4e-8d7e-558166bb3d6b', NULL, NOW(), 'nguyenhoanganhtuan1206@gmail.com', NULL,
        '$2a$10$8LZTNRd9SbEz8ra53nQGtOYrNntm1AA75jv294mxuxyj6/q6jLSi2', '0903703541', FALSE, 'Anh Tuan'),
    ('9cb2ed6a-1753-4232-9c5c-8c523e32546e', NULL, NOW(), 'tranthiminhthu2401@gmail.com', NULL,
        '$2a$10$8LZTNRd9SbEz8ra53nQGtOYrNntm1AA75jv294mxuxyj6/q6jLSi2', '0903703541', FALSE, 'Minh Thu');

-- Seed Data for User Roles
INSERT INTO users_roles (user_id, role_id)
VALUES
    ((SELECT id FROM users WHERE email = 'admin@quizlet.tuan'), 1),
    ('9cb2ed6a-1753-4232-9c5c-8c523e32546e', 2),
    ('237c736b-9aa3-4c4e-8d7e-558166bb3d6b', 2),
    ('237c736b-9aa3-4c4e-8d7e-558166bb3d6b', 3),
    ('054cbe26-67b7-4ead-b4f7-e72687d5f3ac', 2),
    ('054cbe26-67b7-4ead-b4f7-e72687d5f3ac', 3);
