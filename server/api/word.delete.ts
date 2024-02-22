import { db } from '@/server/orm/kysely'

const deleteWord = async (body: any) => {
    console.warn(`Deleting "words" row with id: ${body.id}`)
    const result = await db
        .deleteFrom('words')
        .where('words.id', '=', body.id)
        .executeTakeFirst()

    return result
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let data
    try {
        data = await deleteWord(body)
    } catch (error: any) {
        // error 500 after seeding a table? "Do not know how to serialize a BigInt"
        // throw error // Handle errors
        console.error(error)
    }

    return { data }
})
