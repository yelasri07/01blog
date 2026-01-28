export interface User {
    id: number,
    username: string,
    email: string,
    role?: 'USER' | 'ADMIN',
    token?: string,
    its_me?: boolean,
    profile_image: string,
    followers_count?: number,
    following_count?: number,
    subscribe?: boolean,
    created_at: Date
}