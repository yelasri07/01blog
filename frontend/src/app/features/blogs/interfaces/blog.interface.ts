export interface blogInterface {
    id: number,
    title: string,
    content?: string,
    created_at: Date,
    user_id: number,
    username: string
}