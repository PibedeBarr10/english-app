import { db } from '@/server/orm/kysely'
import { seed } from '../orm/seed'

const addWord = async (body: any) => {
    await db
        .insertInto('words')
        .values([{
            englishWord: body.englishWord,
            polishWord: body.polishWord
        }])
        .execute()
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let word
    try {
        word = await addWord(body)
      } catch (error: any) {
        if (error.message === `relation "words" does not exist`) {
            console.log('Table does not exist, creating and seeding it with dummy data now...')
            
            // Table is not created yet
            await seed()
            word = await addWord(body)
        } else {
            // error 500 after seeding a table? "Do not know how to serialize a BigInt"
            // throw error // Handle errors
            console.error(error)
        }
    }

    return { word }
})
