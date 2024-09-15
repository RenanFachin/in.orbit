import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: './.migrations', // nome da pasta que vão ficar as migrations
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  }
})