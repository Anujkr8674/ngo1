'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function getDonorCSRMembers() {
  try {
    let members = await prisma.donorCSRMember.findMany({
      orderBy: { order: 'asc' },
    })

    if (members.length === 0) {
      const defaultSheets = [
        {
          title: "Patron Donors & Life Members - Sheet 1",
          src: "/donar/Members-1-June-18.png",
          order: 0,
        },
        {
          title: "Patron Donors & Life Members - Sheet 2",
          src: "/donar/Members-2-June-18.png",
          order: 1,
        },
        {
          title: "Patron Donors & Life Members - Sheet 3",
          src: "/donar/Members-3-June-18-.png",
          order: 2,
        },
      ]

      await prisma.donorCSRMember.createMany({
        data: defaultSheets,
      })

      members = await prisma.donorCSRMember.findMany({
        orderBy: { order: 'asc' },
      })
    }

    return members
  } catch (error) {
    console.error('Error fetching donors/CSR members:', error)
    return []
  }
}

export async function createDonorCSRMember(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const imageFile = formData.get('image') as File | null

    if (!title) {
      return { error: 'Title is required' }
    }

    let imageUrl = ''

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `donors-csr-sponsors-members/${filename}`

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
      return { error: 'Image file is required for a new sheet/sponsor' }
    }

    // Get current max order to place at the end
    const lastMember = await prisma.donorCSRMember.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    })
    const nextOrder = lastMember ? lastMember.order + 1 : 0

    const member = await prisma.donorCSRMember.create({
      data: {
        title,
        src: imageUrl,
        order: nextOrder
      }
    })

    revalidatePath('/donors-csr-sponsors-members')
    revalidatePath('/admin/dashboard/donors-csr-sponsors-members')
    return { success: true, member }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateDonorCSRMember(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const imageFile = formData.get('image') as File | null

    if (!title) {
      return { error: 'Title is required' }
    }

    const existingMember = await prisma.donorCSRMember.findUnique({ where: { id } })
    if (!existingMember) {
      return { error: 'Record not found' }
    }

    let imageUrl = existingMember.src

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `donors-csr-sponsors-members/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: imageFile.type,
        upsert: false
      })

      if (uploadError) {
        return { error: `Supabase upload failed: ${uploadError.message}` }
      }

      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      imageUrl = publicUrlData.publicUrl

      try {
        const urlObj = new URL(existingMember.src)
        const pathParts = urlObj.pathname.split('/')
        const index = pathParts.findIndex(p => p === 'donors-csr-sponsors-members')
        if (index !== -1) {
          const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
          await supabase.storage.from('assets').remove([storagePath])
        }
      } catch (e) {
        // Ignore URL parsing errors
      }
    }

    const member = await prisma.donorCSRMember.update({
      where: { id },
      data: {
        title,
        src: imageUrl
      }
    })

    revalidatePath('/donors-csr-sponsors-members')
    revalidatePath('/admin/dashboard/donors-csr-sponsors-members')
    return { success: true, member }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteDonorCSRMember(id: string) {
  try {
    const member = await prisma.donorCSRMember.findUnique({ where: { id } })
    if (!member) {
      return { error: 'Record not found' }
    }

    try {
      const urlObj = new URL(member.src)
      const pathParts = urlObj.pathname.split('/')
      const index = pathParts.findIndex(p => p === 'donors-csr-sponsors-members')
      if (index !== -1) {
        const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
        await supabase.storage.from('assets').remove([storagePath])
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    await prisma.donorCSRMember.delete({ where: { id } })

    revalidatePath('/donors-csr-sponsors-members')
    revalidatePath('/admin/dashboard/donors-csr-sponsors-members')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function reorderDonorCSRMembers(ids: string[]) {
  try {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.donorCSRMember.update({
          where: { id },
          data: { order: index },
        })
      )
    )
    revalidatePath('/donors-csr-sponsors-members')
    revalidatePath('/admin/dashboard/donors-csr-sponsors-members')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
