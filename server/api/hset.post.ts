import { kv } from '@vercel/kv'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        await kv.hset('dictionary_ENG_PL', {
            eng: body.eng,
            pl: body.pl
        })
    } catch (error) {
        // Handle errors
        console.error(error)
    }
})
