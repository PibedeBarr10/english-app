import { db } from '@/server/orm/kysely'

async function addWord(body: TBody) {
    const result = await db
        .insertInto('words')
        .values([{
            englishWord: body.englishWord,
            polishWord: body.polishWord,
        }])
        .execute()

    return result
}

type TBody = {
    englishWord: string
    polishWord: string
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as TBody
    try {
        const data = await addWord(body)
        return { data }
    }
    catch (error) {
        // error 500 after seeding a table? "Do not know how to serialize a BigInt"
        // throw error // Handle errors
        console.error(error)
    }

    return { data: [] }
})
