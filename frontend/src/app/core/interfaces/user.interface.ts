export interface User {
    id: number,
    username: string,
    email: string,
    role?: 'USER' | 'ADMIN',
    token?: string,
    profile_image?: string,
    followers_count?: number,
    following_count?: number,
    is_banned: boolean,
    subscribe?: boolean,
    created_at: Date
}