import { TWordTable } from './tables/words'

// Keys of this interface are table names.
export type TDatabase = {
    words: TWordTable
}
