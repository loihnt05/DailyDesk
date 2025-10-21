import { PrismaClient } from '../app/generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = global as unknown as {
  // allow storing either a plain PrismaClient or an extended client (use a permissive type)
  prisma?: PrismaClient | any
}

// Nếu có biến tăng tốc Prisma Accelerate (chỉ khi deploy)
const prisma =
  globalForPrisma.prisma ||
  (process.env.NODE_ENV === 'production'
    ? new PrismaClient().$extends(withAccelerate())
    : new PrismaClient())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
