import { db, sql } from '@/server/orm/kysely'
import { seed } from '../orm/seed'

interface BigInt extends BigIntConstructor {
    /** Convert to BigInt to string form in JSON.stringify */
    toJSON: () => string
}
(BigInt.prototype as unknown as BigInt).toJSON = function () {
    return this.toString()
}

export default defineNitroPlugin(async (nitroApp) => {
    if (import.meta.dev) {
        console.log('--- db seed skipped ---')
        return
    }
    const result = await sql<{ exists: boolean }>`SELECT EXISTS (
        SELECT FROM 
            pg_tables
        WHERE 
            schemaname = 'public' AND tablename  = 'words')`.execute(db)
    console.log('result', result.rows[0]?.exists)

    if (!result.rows[0]?.exists) {
        await seed()
    }
})
