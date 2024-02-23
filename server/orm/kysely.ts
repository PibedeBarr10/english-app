import { createKysely } from '@vercel/postgres-kysely'
import type { TDatabase } from './types/db'

export const db = createKysely<TDatabase>()
export { sql } from 'kysely'