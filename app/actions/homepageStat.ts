'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getHomepageStats() {
  try {
    let stats = await prisma.homepageStat.findMany({
      orderBy: { order: 'asc' },
    })

    if (stats.length === 0) {
      const defaultStats = [
        { value: 120, suffix: "+", label: "Students Sponsored", desc: "Across 12 states in India in 50+ institutions", order: 0 },
        { value: 2900, suffix: "+", label: "Healthcare Beneficiaries", desc: "Free medical testing & cancer screening", order: 1 },
        { value: 40000, suffix: "+", label: "Mangrove Saplings", desc: "Mangrove saplings restored in Sundarbans", order: 2 },
        { value: 1300, suffix: "+", label: "Relief Material Delivered", desc: "Families served with winter & flood relief materials", order: 3 },
      ]
      for (const item of defaultStats) {
        await prisma.homepageStat.create({ data: item })
      }
      stats = await prisma.homepageStat.findMany({
        orderBy: { order: 'asc' },
      })
    }
    return stats
  } catch (error) {
    console.error('Error fetching homepage stats:', error)
    return []
  }
}

export async function saveHomepageStat(
  id: string | null,
  data: { value: number; suffix: string; label: string; desc: string; order: number }
) {
  try {
    if (!data.label || data.value === undefined) {
      return { error: 'Label and Value fields are required' }
    }

    let record
    if (id) {
      record = await prisma.homepageStat.update({
        where: { id },
        data,
      })
    } else {
      record = await prisma.homepageStat.create({
        data,
      })
    }

    revalidatePath('/')
    revalidatePath('/admin/dashboard/stats')
    return { success: true, data: record }
  } catch (error: any) {
    console.error('Error saving homepage stat:', error)
    return { error: error.message || 'Something went wrong' }
  }
}

export async function deleteHomepageStat(id: string) {
  try {
    await prisma.homepageStat.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/dashboard/stats')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting homepage stat:', error)
    return { error: error.message || 'Something went wrong' }
  }
}
