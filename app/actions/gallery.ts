'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

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
    // Delete all images in this category from Supabase first
    const images = await prisma.galleryImage.findMany({ where: { categoryId: id }, include: { category: true } })
    
    if (images.length > 0) {
      const pathsToDelete = images.map(img => {
        const urlObj = new URL(img.url)
        const pathParts = urlObj.pathname.split('/')
        const galleryIndex = pathParts.findIndex(p => p === 'Gallery')
        if (galleryIndex !== -1) {
          return pathParts.slice(galleryIndex).map(decodeURIComponent).join('/')
        }
        return ''
      }).filter(p => p !== '')

      if (pathsToDelete.length > 0) {
        const { error: removeError } = await supabase.storage.from('assets').remove(pathsToDelete)
        if (removeError) {
          return { error: `Supabase Storage Error: ${removeError.message}` }
        }
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
      const path = `Gallery/${category.name}/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: file.type,
        upsert: false
      })

      if (uploadError) {
        throw new Error(`Supabase upload failed: ${uploadError.message}`)
      }

      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      url = publicUrlData.publicUrl
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

    // Extract path from URL
    const urlObj = new URL(image.url)
    const pathParts = urlObj.pathname.split('/')
    const galleryIndex = pathParts.findIndex(p => p === 'Gallery')
    if (galleryIndex !== -1) {
      const storagePath = pathParts.slice(galleryIndex).map(decodeURIComponent).join('/')
      const { error: removeError } = await supabase.storage.from('assets').remove([storagePath])
      
      if (removeError) {
        return { error: `Supabase Storage Error: ${removeError.message}` }
      }
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
