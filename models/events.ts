import {z} from 'zod';

export const EventSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string().datetime(),
    label: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
})

export type EventType = z.infer<typeof EventSchema>;