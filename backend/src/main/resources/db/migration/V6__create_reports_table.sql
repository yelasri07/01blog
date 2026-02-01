CREATE TABLE reports (
    id BIGSERIAL PRIMARY KEY,
    reason VARCHAR(2000) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    reporter_id BIGINT NOT NULL,
    target_id BIGINT NOT NULL,
    type VARCHAR(10) NOT NULL,
    status VARCHAR(20) NOT NULL
)