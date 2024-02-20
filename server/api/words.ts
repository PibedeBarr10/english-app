import { db } from '@/server/orm/kysely'

export default defineEventHandler(async () => {
    const allWords = await db
        .selectFrom('words')
        .selectAll()
        .execute()

    return { allWords }
})
