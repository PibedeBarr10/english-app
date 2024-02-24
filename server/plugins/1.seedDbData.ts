import { seed } from '../orm/seed'
import { db, sql } from '@/server/orm/kysely'

type IBigInt = {
    /** Convert to BigInt to string form in JSON.stringify */
    toJSON: () => string
} & BigIntConstructor

(BigInt.prototype as unknown as IBigInt).toJSON = function () {
    return this.toString()
}

export default defineNitroPlugin(async () => {
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

    if (!result.rows[0]?.exists)
        await seed()
})
