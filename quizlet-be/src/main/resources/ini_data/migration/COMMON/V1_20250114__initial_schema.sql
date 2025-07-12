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
    full_name                   VARCHAR(100) NOT NULL,
    email                       VARCHAR(255) NOT NULL UNIQUE,
    password                    VARCHAR(255) NULL,
    user_google_id              VARCHAR(255) NULL UNIQUE,
    user_facebook_id            VARCHAR(255) NULL UNIQUE,
    last_send_reset_password_at TIMESTAMP,
    code_reset_password         VARCHAR(255),
    account_disabled            BOOLEAN NOT NULL DEFAULT FALSE,
    created_at                  TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login_at              TIMESTAMP,
    profile_picture_url         VARCHAR(255),
    role_id                     INTEGER NOT NULL,
    CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES roles (id)
        ON DELETE RESTRICT
);