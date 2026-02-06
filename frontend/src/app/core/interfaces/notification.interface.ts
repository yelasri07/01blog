export interface notificationInterface {
    id: number,
    is_read: boolean,
    message: string,
    target_id: number,
    sender_username: string,
    created_at: Date
}