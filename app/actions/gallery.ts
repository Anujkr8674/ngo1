'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import fs from 'fs'
import path from 'path'

export async function getGalleryCategories() {
  return prisma.galleryCategory.findMany({
    orderBy: { createdAt: 'asc' },
  })
}

export async function createGalleryCategory(name: string) {
  try {
    const category = await prisma.galleryCategory.create({
      data: { name },
    })
    revalidatePath('/admin/dashboard/gallery')
    revalidatePath('/gallery')
    return { success: true, category }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteGalleryCategory(id: string) {
  try {
    const category = await prisma.galleryCategory.findUnique({ where: { id } })
    if (!category) return { error: 'Category not found' }

    // Delete associated images on local disk
    const images = await prisma.galleryImage.findMany({ where: { categoryId: id } })
    
    const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
    const categoryFolderName = category.name.replace(/[^a-zA-Z0-9_-]/g, '_')
    const categoryDir = path.join(uploadBase, 'Gallery', categoryFolderName)

    // Delete local category directory and all its files
    if (fs.existsSync(categoryDir)) {
      try {
        fs.rmSync(categoryDir, { recursive: true, force: true })
      } catch (err) {
        console.error('Failed to delete category directory:', err)
      }
    }

    await prisma.galleryCategory.delete({ where: { id } })
    revalidatePath('/admin/dashboard/gallery')
    revalidatePath('/gallery')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getGalleryImages(categoryId?: string) {
  return prisma.galleryImage.findMany({
    where: categoryId && categoryId !== 'all' ? { categoryId } : undefined,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function createGalleryImage(data: { url: string; caption?: string; categoryId: string } | FormData) {
  try {
    let url: string
    let caption: string
    let categoryId: string

    if (data instanceof FormData) {
      const file = data.get('file') as File
      caption = (data.get('caption') as string) || ''
      categoryId = data.get('categoryId') as string

      if (!file || !categoryId) {
        return { error: 'File and category are required' }
      }

      const category = await prisma.galleryCategory.findUnique({ where: { id: categoryId } })
      if (!category) return { error: 'Category not found' }

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const categoryFolderName = category.name.replace(/[^a-zA-Z0-9_-]/g, '_')
      
      const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
      const uploadDir = path.join(uploadBase, 'Gallery', categoryFolderName)

      // Ensure directory exists (auto-create dynamically category folder wise)
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      const filePath = path.join(uploadDir, filename)
      fs.writeFileSync(filePath, buffer)
      url = `/uploads/Gallery/${categoryFolderName}/${filename}`
    } else {
      url = data.url
      caption = data.caption || ''
      categoryId = data.categoryId
    }

    if (!url || !categoryId) {
      return { error: 'URL and category are required' }
    }

    const image = await prisma.galleryImage.create({
      data: {
        url,
        caption,
        categoryId
      },
      include: {
        category: true
      }
    })

    revalidatePath('/admin/dashboard/gallery')
    revalidatePath('/gallery')
    return { success: true, image }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    const image = await prisma.galleryImage.findUnique({ where: { id }, include: { category: true } })
    if (!image) return { error: 'Image not found' }

    // Delete image from local disk
    try {
      const urlObj = new URL(image.url, 'http://localhost')
      const pathParts = urlObj.pathname.split('/')
      const galleryIndex = pathParts.findIndex(p => p === 'Gallery')
      if (galleryIndex !== -1) {
        const categoryFolder = pathParts[galleryIndex + 1]
        const filename = pathParts[galleryIndex + 2]
        
        if (categoryFolder && filename) {
          const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
          const oldFilePath = path.join(uploadBase, 'Gallery', decodeURIComponent(categoryFolder), decodeURIComponent(filename))
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath)
          }
        }
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    await prisma.galleryImage.delete({ where: { id } })
    
    revalidatePath('/admin/dashboard/gallery')
    revalidatePath('/gallery')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateGalleryImage(id: string, data: { caption?: string, categoryId?: string }) {
  try {
    const image = await prisma.galleryImage.update({
      where: { id },
      data,
      include: { category: true }
    })
    revalidatePath('/admin/dashboard/gallery')
    revalidatePath('/gallery')
    return { success: true, image }
  } catch (error: any) {
    return { error: error.message }
  }
}
