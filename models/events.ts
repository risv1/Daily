import {z} from 'zod';

export const EventSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string().datetime(),
    label: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
})

export type EventType = z.infer<typeof EventSchema>;