import { PrismaClient } from './generated/client'

// Isso garante que você use a mesma conexão em todo o app
const prisma = new PrismaClient()

export default prisma