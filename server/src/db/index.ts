import { drizzle } from 'drizzle-orm/postgres-js'
import postegres from 'postgres'
import * as schema from './schema'
import { env } from '../env'

export const client = postegres(env.DATABASE_URL)
export const db = drizzle(client, {schema, logger: true})