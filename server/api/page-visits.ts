export default defineEventHandler(async () => {
    const storage = useStorage('kv')

    const pageVisits = (await storage.getItem('pageVisits') ?? 0) as number
    const updatedPageVisits = pageVisits + 1
    await storage.setItem('pageVisits', updatedPageVisits)

    return {
        pageVisits: updatedPageVisits,
    }
})
