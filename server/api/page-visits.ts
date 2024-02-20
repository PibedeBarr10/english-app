export default defineEventHandler(async (event) => {
    const storage = useStorage('kv')

    let pageVisits = (await storage.getItem('pageVisits') ?? 0) as number
    const updatedPageVisits = pageVisits + 1
    await storage.setItem('pageVisits', updatedPageVisits)

    return {
        pageVisits: updatedPageVisits
    }
})
