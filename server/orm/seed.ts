import { db, sql } from '@/server/orm/kysely'
import { initialWords } from './initialData'

const createWordsTable = async () => await db.schema
    .createTable('words')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('englishWord', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('polishWord', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('createdAt', sql`timestamp with time zone`, (cb) =>
        cb.defaultTo(sql`current_timestamp`)
    )
    .execute()

const addWords = async () => await db
    .insertInto('words')
    .values(initialWords)
    .execute()

export async function seed() {
    await createWordsTable()
    console.log(`Created "words" table`)

    addWords()
    console.log(`Seeded database with ${initialWords.length} rows in table "words"`)
}