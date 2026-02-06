CREATE TABLE notification (
    id BIGSERIAL PRIMARY KEY,
    is_read BOOLEAN NOT NULL,
    message VARCHAR(200) NOT NULL,
    target_id BIGINT NOT NULL,
    recipient_id BIGINT NOT NULL,
    sender_username VARCHAR(255) NOT NULL,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
)