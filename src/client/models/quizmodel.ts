import {z} from 'zod'
export const QuizStructure = z.object({
    name: z.string(),
    age: z.string(),
    cats: z.boolean().optional(),
    hobbies: z.string(),
    StateManagement: z.enum(['Redux', 'Flux']).optional(),
    Backend: z.string(),
    preferredLanguage: z.string(),
    API: z.string(),
    OAuth: z.string()
})