'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import fs from 'fs'
import path from 'path'

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
      const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
      const uploadDir = path.join(uploadBase, 'archived-material')
      
      // Ensure local directory exists (auto-create)
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      const filePath = path.join(uploadDir, filename)
      fs.writeFileSync(filePath, buffer)
      pdfUrl = `/uploads/archived-material/${filename}`
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
      const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
      const uploadDir = path.join(uploadBase, 'archived-material')
      
      // Ensure local directory exists (auto-create)
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      const filePath = path.join(uploadDir, filename)
      fs.writeFileSync(filePath, buffer)
      pdfUrl = `/uploads/archived-material/${filename}`

      // Try to delete old PDF from local filesystem
      try {
        const urlObj = new URL(existingMaterial.url, 'http://localhost')
        const pathParts = urlObj.pathname.split('/')
        const index = pathParts.findIndex(p => p === 'archived-material')
        if (index !== -1) {
          const oldFilename = pathParts[index + 1]
          if (oldFilename) {
            const oldFilePath = path.join(uploadDir, decodeURIComponent(oldFilename))
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath)
            }
          }
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

    // Try to delete PDF from local disk
    try {
      const urlObj = new URL(material.url, 'http://localhost')
      const pathParts = urlObj.pathname.split('/')
      const index = pathParts.findIndex(p => p === 'archived-material')
      if (index !== -1) {
        const oldFilename = pathParts[index + 1]
        if (oldFilename) {
          const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
          const uploadDir = path.join(uploadBase, 'archived-material')
          const oldFilePath = path.join(uploadDir, decodeURIComponent(oldFilename))
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath)
          }
        }
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
