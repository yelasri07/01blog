export interface blogInterface {
    id: number,
    title: string,
    content?: string,
    created_at: Date,
    like_count: number
    user_id: number,
    username: string
}