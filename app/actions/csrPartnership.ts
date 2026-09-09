'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const DEFAULT_CSR_PARTNERS = [
  {
    id: "default-1",
    company: "M/s Erbe Medical India",
    desc: "Generously sponsored the Darjeeling Hills University Cancer Awareness session and rural Sundarbans diagnostic medical camps.",
    order: 0,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "default-2",
    company: "M/s ABS Professional India",
    desc: "Generously supported the large-scale Mangrove Plantation restoration project in coastal Sundarbans to buffer climatic storms.",
    order: 1,
    createdAt: new Date("2026-01-02"),
  },
]

export async function getCsrPartnerships() {
  try {
    let records = await prisma.csrPartnership.findMany({
      orderBy: { createdAt: 'desc' },
    })

    if (records.length === 0) {
      try {
        for (const item of DEFAULT_CSR_PARTNERS) {
          await prisma.csrPartnership.create({
            data: {
              company: item.company,
              desc: item.desc,
              order: item.order,
            },
          })
        }
        records = await prisma.csrPartnership.findMany({
          orderBy: { createdAt: 'desc' },
        })
      } catch (seedErr) {
        console.error('Error seeding defaults:', seedErr)
        return DEFAULT_CSR_PARTNERS
      }
    }
    return records.length > 0 ? records : DEFAULT_CSR_PARTNERS
  } catch (error) {
    console.error('Error fetching CSR partnerships:', error)
    return DEFAULT_CSR_PARTNERS
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
    revalidatePath('/donors-csr-sponsors-members')
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
    revalidatePath('/donors-csr-sponsors-members')
    revalidatePath('/admin/dashboard/csr-partnerships')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting CSR partnership:', error)
    return { error: error.message || 'Something went wrong' }
  }
}
