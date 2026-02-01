export interface reportInterface {
    id: number,
    reason: string,
    created_at: Date,
    reporter_id: number,
    target_id: number,
    type: string,
    status: string,
    show_more: boolean
}