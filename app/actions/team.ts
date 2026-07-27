'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function getTeamMembers() {
  return prisma.teamMember.findMany({
    orderBy: { order: 'asc' },
  })
}

export async function createTeamMember(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const email = (formData.get('email') as string) || null
    const mobile = (formData.get('mobile') as string) || null
    const description = formData.get('description') as string
    const imageFile = formData.get('image') as File | null

    if (!name || !role || !description) {
      return { error: 'Name, role, and description are required' }
    }

    let imageUrl = ''

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `Aboutus/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: imageFile.type,
        upsert: false
      })

      if (uploadError) {
        return { error: `Supabase upload failed: ${uploadError.message}` }
      }

      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      imageUrl = publicUrlData.publicUrl
    } else {
      return { error: 'Image is required for a new member' }
    }

    // Get current min order
    const minMember = await prisma.teamMember.findFirst({
      orderBy: { order: 'asc' },
      select: { order: true }
    })
    const nextOrder = minMember ? minMember.order - 1 : 0

    const member = await prisma.teamMember.create({
      data: {
        name,
        role,
        image: imageUrl,
        email,
        mobile,
        description,
        order: nextOrder
      }
    })

    revalidatePath('/about')
    revalidatePath('/admin/dashboard/about')
    return { success: true, member }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateTeamMember(id: string, formData: FormData) {
  try {
    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const email = (formData.get('email') as string) || null
    const mobile = (formData.get('mobile') as string) || null
    const description = formData.get('description') as string
    const imageFile = formData.get('image') as File | null

    if (!name || !role || !description) {
      return { error: 'Name, role, and description are required' }
    }

    const existingMember = await prisma.teamMember.findUnique({ where: { id } })
    if (!existingMember) {
      return { error: 'Team member not found' }
    }

    let imageUrl = existingMember.image

    if (imageFile && imageFile.size > 0) {
      // Upload new image
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `Aboutus/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: imageFile.type,
        upsert: false
      })

      if (uploadError) {
        return { error: `Supabase upload failed: ${uploadError.message}` }
      }

      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      imageUrl = publicUrlData.publicUrl

      // Try to delete old image from storage if it was in the Aboutus folder
      try {
        const urlObj = new URL(existingMember.image)
        const pathParts = urlObj.pathname.split('/')
        const index = pathParts.findIndex(p => p === 'Aboutus')
        if (index !== -1) {
          const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
          await supabase.storage.from('assets').remove([storagePath])
        }
      } catch (e) {
        // Ignore parsing errors for external URLs
      }
    }

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        image: imageUrl,
        email,
        mobile,
        description
      }
    })

    revalidatePath('/about')
    revalidatePath('/admin/dashboard/about')
    return { success: true, member }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteTeamMember(id: string) {
  try {
    const member = await prisma.teamMember.findUnique({ where: { id } })
    if (!member) {
      return { error: 'Team member not found' }
    }

    // Try to delete image from storage
    try {
      const urlObj = new URL(member.image)
      const pathParts = urlObj.pathname.split('/')
      const index = pathParts.findIndex(p => p === 'Aboutus')
      if (index !== -1) {
        const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
        await supabase.storage.from('assets').remove([storagePath])
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    await prisma.teamMember.delete({ where: { id } })

    revalidatePath('/about')
    revalidatePath('/admin/dashboard/about')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function reorderTeamMembers(ids: string[]) {
  try {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.teamMember.update({
          where: { id },
          data: { order: index },
        })
      )
    )
    revalidatePath('/about')
    revalidatePath('/admin/dashboard/about')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
