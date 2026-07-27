'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function getAgmReports() {
  return prisma.agmReport.findMany({
    orderBy: { order: 'asc' },
  })
}

export async function createAgmReport(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const pdfFile = formData.get('pdf') as File | null

    if (!title || !date) {
      return { error: 'Title and date are required' }
    }

    let pdfUrl = ''

    if (pdfFile && pdfFile.size > 0) {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const filename = `${Date.now()}-${pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `agm-pdf/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: pdfFile.type,
        upsert: false
      })

      if (uploadError) {
        return { error: `Supabase upload failed: ${uploadError.message}` }
      }

      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      pdfUrl = publicUrlData.publicUrl
    } else {
      return { error: 'PDF file is required for a new report' }
    }

    // Get current min order to place at the top
    const minReport = await prisma.agmReport.findFirst({
      orderBy: { order: 'asc' },
      select: { order: true }
    })
    const nextOrder = minReport ? minReport.order - 1 : 0

    const report = await prisma.agmReport.create({
      data: {
        title,
        date,
        url: pdfUrl,
        order: nextOrder
      }
    })

    revalidatePath('/agm')
    revalidatePath('/admin/dashboard/agm')
    return { success: true, report }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateAgmReport(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const pdfFile = formData.get('pdf') as File | null

    if (!title || !date) {
      return { error: 'Title and date are required' }
    }

    const existingReport = await prisma.agmReport.findUnique({ where: { id } })
    if (!existingReport) {
      return { error: 'AGM report not found' }
    }

    let pdfUrl = existingReport.url

    if (pdfFile && pdfFile.size > 0) {
      // Upload new PDF
      const arrayBuffer = await pdfFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const filename = `${Date.now()}-${pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `agm-pdf/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: pdfFile.type,
        upsert: false
      })

      if (uploadError) {
        return { error: `Supabase upload failed: ${uploadError.message}` }
      }

      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      pdfUrl = publicUrlData.publicUrl

      // Try to delete old PDF from storage if it was in the agm-pdf folder
      try {
        const urlObj = new URL(existingReport.url)
        const pathParts = urlObj.pathname.split('/')
        const index = pathParts.findIndex(p => p === 'agm-pdf')
        if (index !== -1) {
          const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
          await supabase.storage.from('assets').remove([storagePath])
        }
      } catch (e) {
        // Ignore parsing errors for external/local relative paths
      }
    }

    const report = await prisma.agmReport.update({
      where: { id },
      data: {
        title,
        date,
        url: pdfUrl
      }
    })

    revalidatePath('/agm')
    revalidatePath('/admin/dashboard/agm')
    return { success: true, report }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteAgmReport(id: string) {
  try {
    const report = await prisma.agmReport.findUnique({ where: { id } })
    if (!report) {
      return { error: 'AGM report not found' }
    }

    // Try to delete PDF from storage if it was in the agm-pdf folder
    try {
      const urlObj = new URL(report.url)
      const pathParts = urlObj.pathname.split('/')
      const index = pathParts.findIndex(p => p === 'agm-pdf')
      if (index !== -1) {
        const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
        await supabase.storage.from('assets').remove([storagePath])
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    await prisma.agmReport.delete({ where: { id } })

    revalidatePath('/agm')
    revalidatePath('/admin/dashboard/agm')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function reorderAgmReports(ids: string[]) {
  try {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.agmReport.update({
          where: { id },
          data: { order: index },
        })
      )
    )
    revalidatePath('/agm')
    revalidatePath('/admin/dashboard/agm')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
