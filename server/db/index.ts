/** local DB **/
// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'
// const queryClient = postgres(process.env.DATABASE_URL!)
// export const db = drizzle(queryClient)

/** neon DB **/
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);