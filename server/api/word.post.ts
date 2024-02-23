import { db } from '@/server/orm/kysely'

async function addWord(body: any) {
    const result = await db
        .insertInto('words')
        .values([{
            englishWord: body.englishWord,
            polishWord: body.polishWord,
        }])
        .execute()

    return result
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        const data = await addWord(body)
        return { data }
    }
    catch (error: any) {
        // error 500 after seeding a table? "Do not know how to serialize a BigInt"
        // throw error // Handle errors
        console.error(error)
    }
})
