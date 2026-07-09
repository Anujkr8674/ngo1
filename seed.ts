import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME || 'Admin'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin#0000'

  const existingAdmin = await prisma.admin.findUnique({
    where: { username: adminUsername },
  })

  if (!existingAdmin) {
    const admin = await prisma.admin.create({
      data: {
        username: adminUsername,
        password: adminPassword,
      },
    })
    console.log(`Created admin user with username: ${admin.username}`)
  } else {
    console.log(`Admin user ${adminUsername} already exists.`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
