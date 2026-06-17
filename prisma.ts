import { withAccelerate } from "@prisma/extension-accelerate"
import { PrismaClient } from "./app/generated/prisma/client"
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  } as any).$extends(withAccelerate())

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma