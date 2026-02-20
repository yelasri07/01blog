export interface commentInterface {
    id: number,
    content: string,
    created_at: Date,
    blog_id: number,
    user_id: number,
    username: string,
    profile_image?: string
}