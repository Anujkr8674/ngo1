'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function getArchivedMaterials() {
  return prisma.archivedMaterial.findMany({
    orderBy: { order: 'asc' },
  })
}

export async function createArchivedMaterial(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const pdfFile = formData.get('pdf') as File | null

    if (!title) {
      return { error: 'Title is required' }
    }

    let pdfUrl = ''
    let sizeStr = '0.0 MB'

    if (pdfFile && pdfFile.size > 0) {
      const sizeInMB = pdfFile.size / (1024 * 1024)
      sizeStr = `${sizeInMB.toFixed(1)} MB`

      const arrayBuffer = await pdfFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const filename = `${Date.now()}-${pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `archived-material/${filename}`

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
      return { error: 'PDF file is required for a new archived material' }
    }

    // Get current min order to place at the top
    const minMaterial = await prisma.archivedMaterial.findFirst({
      orderBy: { order: 'asc' },
      select: { order: true }
    })
    const nextOrder = minMaterial ? minMaterial.order - 1 : 0

    const material = await prisma.archivedMaterial.create({
      data: {
        title,
        size: sizeStr,
        url: pdfUrl,
        order: nextOrder
      }
    })

    revalidatePath('/archived-material')
    revalidatePath('/admin/dashboard/archived-material')
    return { success: true, material }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateArchivedMaterial(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const pdfFile = formData.get('pdf') as File | null

    if (!title) {
      return { error: 'Title is required' }
    }

    const existingMaterial = await prisma.archivedMaterial.findUnique({ where: { id } })
    if (!existingMaterial) {
      return { error: 'Archived material not found' }
    }

    let pdfUrl = existingMaterial.url
    let sizeStr = existingMaterial.size

    if (pdfFile && pdfFile.size > 0) {
      const sizeInMB = pdfFile.size / (1024 * 1024)
      sizeStr = `${sizeInMB.toFixed(1)} MB`

      const arrayBuffer = await pdfFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const filename = `${Date.now()}-${pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `archived-material/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: pdfFile.type,
        upsert: false
      })

      if (uploadError) {
        return { error: `Supabase upload failed: ${uploadError.message}` }
      }

      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      pdfUrl = publicUrlData.publicUrl

      // Try to delete old PDF from storage if it was in the archived-material folder
      try {
        const urlObj = new URL(existingMaterial.url)
        const pathParts = urlObj.pathname.split('/')
        const index = pathParts.findIndex(p => p === 'archived-material')
        if (index !== -1) {
          const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
          await supabase.storage.from('assets').remove([storagePath])
        }
      } catch (e) {
        // Ignore URL parsing errors
      }
    }

    const material = await prisma.archivedMaterial.update({
      where: { id },
      data: {
        title,
        size: sizeStr,
        url: pdfUrl
      }
    })

    revalidatePath('/archived-material')
    revalidatePath('/admin/dashboard/archived-material')
    return { success: true, material }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteArchivedMaterial(id: string) {
  try {
    const material = await prisma.archivedMaterial.findUnique({ where: { id } })
    if (!material) {
      return { error: 'Archived material not found' }
    }

    // Try to delete PDF from storage
    try {
      const urlObj = new URL(material.url)
      const pathParts = urlObj.pathname.split('/')
      const index = pathParts.findIndex(p => p === 'archived-material')
      if (index !== -1) {
        const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
        await supabase.storage.from('assets').remove([storagePath])
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    await prisma.archivedMaterial.delete({ where: { id } })

    revalidatePath('/archived-material')
    revalidatePath('/admin/dashboard/archived-material')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function reorderArchivedMaterials(ids: string[]) {
  try {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.archivedMaterial.update({
          where: { id },
          data: { order: index },
        })
      )
    )
    revalidatePath('/archived-material')
    revalidatePath('/admin/dashboard/archived-material')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
