'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCsrPartnerships() {
  try {
    let records = await prisma.csrPartnership.findMany({
      orderBy: { order: 'asc' },
    })

    if (records.length === 0) {
      const defaults = [
        {
          company: "M/s Erbe Medical India",
          desc: "Generously sponsored the Darjeeling Hills University Cancer Awareness session and rural Sundarbans diagnostic medical camps.",
          order: 0,
        },
        {
          company: "M/s ABS Professional India",
          desc: "Generously supported the large-scale Mangrove Plantation restoration project in coastal Sundarbans to buffer climatic storms.",
          order: 1,
        },
      ]
      for (const item of defaults) {
        await prisma.csrPartnership.create({ data: item })
      }
      records = await prisma.csrPartnership.findMany({
        orderBy: { order: 'asc' },
      })
    }
    return records
  } catch (error) {
    console.error('Error fetching CSR partnerships:', error)
    return []
  }
}

export async function saveCsrPartnership(
  id: string | null,
  data: { company: string; desc: string; order: number }
) {
  try {
    if (!data.company || !data.desc) {
      return { error: 'Company Name and Description fields are required' }
    }

    let record
    if (id) {
      record = await prisma.csrPartnership.update({
        where: { id },
        data,
      })
    } else {
      record = await prisma.csrPartnership.create({
        data,
      })
    }

    revalidatePath('/')
    revalidatePath('/admin/dashboard/csr-partnerships')
    return { success: true, data: record }
  } catch (error: any) {
    console.error('Error saving CSR partnership:', error)
    return { error: error.message || 'Something went wrong' }
  }
}

export async function deleteCsrPartnership(id: string) {
  try {
    await prisma.csrPartnership.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/dashboard/csr-partnerships')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting CSR partnership:', error)
    return { error: error.message || 'Something went wrong' }
  }
}
