import { db } from '@/server/orm/kysely'

async function deleteWord(body: TBody) {
    console.warn(`Deleting "words" row with id: ${body.id}`)
    const result = await db
        .deleteFrom('words')
        .where('words.id', '=', body.id)
        .executeTakeFirst()

    return result
}

type TBody = {
    id: number
}

export default defineEventHandler(async (event) => {
    const body: TBody = await readBody(event)
    let data
    try {
        data = await deleteWord(body)
    }
    catch (error: any) {
        // error 500 after seeding a table? "Do not know how to serialize a BigInt"
        // throw error // Handle errors
        console.error(error)
    }

    return { data }
})
