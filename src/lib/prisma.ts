import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: `${process.env.DATABASE_URL}`,
  authToken: `${process.env.TURSO_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter });
export { prisma };
