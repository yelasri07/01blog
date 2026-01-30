export interface blogInterface {
    id: number,
    title: string,
    content?: string,
    created_at: Date,
    like_count: number
    is_hidden?: boolean
    like: boolean
    user_id: number,
    username: string
    profile_image?: string
}