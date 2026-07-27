import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

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

  // Seed Team Members
  console.log('Clearing existing team members and re-seeding from team.json...')
  try {
    await prisma.teamMember.deleteMany()
    const teamDataPath = path.join(process.cwd(), 'app', 'data', 'team.json')
    if (fs.existsSync(teamDataPath)) {
      const teamDataRaw = fs.readFileSync(teamDataPath, 'utf8')
      const teamData = JSON.parse(teamDataRaw)
      
      for (let i = 0; i < teamData.length; i++) {
        const m = teamData[i]
        await prisma.teamMember.create({
          data: {
            name: m.name,
            role: m.role,
            image: m.image,
            email: m.email || null,
            mobile: m.mobile || null,
            description: m.description,
            order: i
          }
        })
      }
      console.log(`Successfully seeded ${teamData.length} team members.`)
    } else {
      console.warn('team.json file not found at', teamDataPath)
    }
  } catch (err) {
    console.error('Error seeding team members:', err)
  }

  // Seed AGM Reports
  console.log('Clearing existing AGM reports and re-seeding...')
  try {
    await prisma.agmReport.deleteMany()
    const reports = [
      {
        title: "May 2026: A Journey of Collective Action",
        date: "May 2026",
        url: "/pdf/May-2026-A-Journey-of-Collective-Action.pdf",
      },
      {
        title: "AGM Jan 28th 2024",
        date: "January 2024",
        url: "/pdf/AGM-Jan-28th-2024.pdf",
      },
      {
        title: "Annual General Meeting 2023",
        date: "December 2023",
        url: "/pdf/AGM-2023.pdf",
      },
      {
        title: "Live4Help Mid-Year Review 2023",
        date: "June 2023",
        url: "/pdf/Live4Help-Mid-Year-Review-2023.pdf",
      },
      {
        title: "AGM Dec 11 2022",
        date: "December 2022",
        url: "/pdf/AGM-Dec-11-2022.pdf",
      },
      {
        title: "Annual General Meeting 2021",
        date: "December 2021",
        url: "/pdf/AGM-2021.pdf",
      },
    ]

    for (let i = 0; i < reports.length; i++) {
      const rep = reports[i]
      await prisma.agmReport.create({
        data: {
          title: rep.title,
          date: rep.date,
          url: rep.url,
          order: i
        }
      })
    }
    console.log(`Successfully seeded ${reports.length} AGM reports.`)
  } catch (err) {
    console.error('Error seeding AGM reports:', err)
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
