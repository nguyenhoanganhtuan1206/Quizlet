-- V1.20250321__add_refresh_tokens.sql
CREATE TABLE refresh_tokens (
    id          UUID            PRIMARY KEY,
    user_id     UUID            NOT NULL,
    token       TEXT            NOT NULL    UNIQUE,
    expired_at  TIMESTAMP       NOT NULL,
    created_at  TIMESTAMP       NOT NULL    DEFAULT     NOW(),
    revoked     BOOLEAN         NOT NULL    DEFAULT     FALSE,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);