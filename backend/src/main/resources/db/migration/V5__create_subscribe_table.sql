CREATE TABLE subscribe (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    subscriber_id BIGINT NOT NULL,
    subscribed_to_id BIGINT NOT NULL,
    FOREIGN KEY(subscriber_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(subscribed_to_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
)