export interface User {
    id: number,
    username: string,
    email: string,
    role?: 'USER' | 'ADMIN',
    token?: string,
    its_me?: boolean,
    subscribe?: boolean,
    created_at: Date
}