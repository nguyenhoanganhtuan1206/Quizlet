-- Enable UUID extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table: roles
CREATE TABLE roles (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL UNIQUE
);

-- Create table: users
CREATE TABLE users (
    id                          UUID PRIMARY KEY,
    code_reset_password         VARCHAR(255),
    created_at                  TIMESTAMP NOT NULL DEFAULT NOW(),
    email                       VARCHAR(255) NOT NULL UNIQUE,
    last_send_reset_password_at TIMESTAMP,
    password                    VARCHAR(255) NOT NULL,
    account_disabled            BOOLEAN NOT NULL DEFAULT FALSE,
    full_name                   VARCHAR(100) NOT NULL,
    image                       VARCHAR(255),
    role_id                     INTEGER NOT NULL,
    CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES roles (id)
        ON DELETE RESTRICT
);