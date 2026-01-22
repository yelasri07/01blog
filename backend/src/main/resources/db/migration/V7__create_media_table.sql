CREATE TABLE media (
    id BIGSERIAL PRIMARY KEY,
    public_id TEXT NOT NULL,
    is_done BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL
)