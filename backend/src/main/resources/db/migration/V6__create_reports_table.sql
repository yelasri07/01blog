CREATE TABLE reports (
    id BIGSERIAL PRIMARY KEY,
    reason VARCHAR(2000) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    reported_user_id BIGINT NOT NULL,
    reported_by_user_id BIGINT NOT NULL,
    FOREIGN KEY(reported_user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(reported_by_user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
)