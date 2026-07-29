'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function getTestimonials() {
  try {
    let testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    })

    if (testimonials.length === 0) {
      const defaultTestimonials = [
        {
          name: "Baishali Roy",
          video: "/testimonal/1.mp4",
          image: "https://live4help.org/wp-content/uploads/2026/03/Baishali-Roy-scaled.png",
          order: 0,
        },
        {
          name: "Prabuddha Biswas",
          video: "/testimonal/3.mp4",
          image: "https://live4help.org/wp-content/uploads/2026/03/Prabuddha-Biswas-scaled.png",
          order: 1,
        },
        {
          name: "Rajan Sarkar",
          video: "/testimonal/6.mp4",
          image: "https://live4help.org/wp-content/uploads/2026/03/Rajan-Sarkar-scaled.png",
          order: 2,
        }
      ]

      await prisma.testimonial.createMany({
        data: defaultTestimonials,
      })

      testimonials = await prisma.testimonial.findMany({
        orderBy: { order: 'asc' },
      })
    }

    return testimonials
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function createTestimonial(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const imageFile = formData.get('image') as File | null
    const videoFile = formData.get('video') as File | null

    if (!name) {
      return { error: 'Name is required' }
    }
    if (!videoFile || videoFile.size === 0) {
      return { error: 'Video file is required' }
    }

    let imageUrl = ''
    let videoUrl = ''

    // Upload Cover Image (Optional)
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `testimonal/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: imageFile.type,
        upsert: false
      })
      if (uploadError) {
        return { error: `Cover image upload failed: ${uploadError.message}` }
      }
      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      imageUrl = publicUrlData.publicUrl
    } else {
      // Default placeholder or empty string
      imageUrl = 'https://live4help.org/wp-content/uploads/2026/03/Baishali-Roy-scaled.png'
    }

    // Upload Video File
    if (videoFile && videoFile.size > 0) {
      const arrayBuffer = await videoFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const filename = `${Date.now()}-${videoFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `testimonal/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: videoFile.type,
        upsert: false
      })
      if (uploadError) {
        return { error: `Video upload failed: ${uploadError.message}` }
      }
      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      videoUrl = publicUrlData.publicUrl
    }

    const last = await prisma.testimonial.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    })
    const nextOrder = last ? last.order + 1 : 0

    const testimonial = await prisma.testimonial.create({
      data: {
        name: name.trim(),
        image: imageUrl,
        video: videoUrl,
        order: nextOrder
      }
    })

    revalidatePath('/')
    revalidatePath('/testimonials')
    revalidatePath('/admin/dashboard/testimonials')
    return { success: true, testimonial }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateTestimonial(id: string, formData: FormData) {
  try {
    const name = formData.get('name') as string
    const imageFile = formData.get('image') as File | null
    const videoFile = formData.get('video') as File | null

    if (!name) {
      return { error: 'Name is required' }
    }

    const existing = await prisma.testimonial.findUnique({ where: { id } })
    if (!existing) {
      return { error: 'Testimonial not found' }
    }

    let imageUrl = existing.image
    let videoUrl = existing.video

    // Update Cover Image
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `testimonal/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: imageFile.type,
        upsert: false
      })
      if (uploadError) {
        return { error: `Cover image upload failed: ${uploadError.message}` }
      }
      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      imageUrl = publicUrlData.publicUrl

      // Clean up old image if it was a Supabase file
      try {
        const urlObj = new URL(existing.image)
        const pathParts = urlObj.pathname.split('/')
        const index = pathParts.findIndex(p => p === 'testimonal')
        if (index !== -1) {
          const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
          await supabase.storage.from('assets').remove([storagePath])
        }
      } catch (e) {
        // Ignore URL parsing errors
      }
    }

    // Update Video File
    if (videoFile && videoFile.size > 0) {
      const arrayBuffer = await videoFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const filename = `${Date.now()}-${videoFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `testimonal/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: videoFile.type,
        upsert: false
      })
      if (uploadError) {
        return { error: `Video upload failed: ${uploadError.message}` }
      }
      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      videoUrl = publicUrlData.publicUrl

      // Clean up old video if it was a Supabase file
      try {
        const urlObj = new URL(existing.video)
        const pathParts = urlObj.pathname.split('/')
        const index = pathParts.findIndex(p => p === 'testimonal')
        if (index !== -1) {
          const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
          await supabase.storage.from('assets').remove([storagePath])
        }
      } catch (e) {
        // Ignore URL parsing errors
      }
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: name.trim(),
        image: imageUrl,
        video: videoUrl
      }
    })

    revalidatePath('/')
    revalidatePath('/testimonials')
    revalidatePath('/admin/dashboard/testimonials')
    return { success: true, testimonial }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteTestimonial(id: string) {
  try {
    const testimonial = await prisma.testimonial.findUnique({ where: { id } })
    if (!testimonial) {
      return { error: 'Testimonial not found' }
    }

    // Delete cover image from Supabase
    try {
      const urlObj = new URL(testimonial.image)
      const pathParts = urlObj.pathname.split('/')
      const index = pathParts.findIndex(p => p === 'testimonal')
      if (index !== -1) {
        const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
        await supabase.storage.from('assets').remove([storagePath])
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    // Delete video from Supabase
    try {
      const urlObj = new URL(testimonial.video)
      const pathParts = urlObj.pathname.split('/')
      const index = pathParts.findIndex(p => p === 'testimonal')
      if (index !== -1) {
        const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
        await supabase.storage.from('assets').remove([storagePath])
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    await prisma.testimonial.delete({ where: { id } })

    revalidatePath('/')
    revalidatePath('/testimonials')
    revalidatePath('/admin/dashboard/testimonials')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function reorderTestimonials(ids: string[]) {
  try {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.testimonial.update({
          where: { id },
          data: { order: index },
        })
      )
    )
    revalidatePath('/')
    revalidatePath('/testimonials')
    revalidatePath('/admin/dashboard/testimonials')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
