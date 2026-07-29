'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function getStudentSheets() {
  try {
    let sheets = await prisma.studentSheet.findMany({
      orderBy: { order: 'asc' },
    })

    if (sheets.length === 0) {
      const defaultSheets = [
        {
          title: "Students Insight",
          src: "/student/Students.png",
          order: 0,
        }
      ]

      await prisma.studentSheet.createMany({
        data: defaultSheets,
      })

      sheets = await prisma.studentSheet.findMany({
        orderBy: { order: 'asc' },
      })
    }

    return sheets
  } catch (error) {
    console.error('Error fetching student sheets:', error)
    return []
  }
}

export async function createStudentSheet(formData: FormData) {
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
      const path = `students/${filename}`

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
      return { error: 'Image file is required for a new student list' }
    }

    const lastSheet = await prisma.studentSheet.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    })
    const nextOrder = lastSheet ? lastSheet.order + 1 : 0

    const sheet = await prisma.studentSheet.create({
      data: {
        title,
        src: imageUrl,
        order: nextOrder
      }
    })

    revalidatePath('/students')
    revalidatePath('/admin/dashboard/students')
    return { success: true, sheet }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateStudentSheet(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const imageFile = formData.get('image') as File | null

    if (!title) {
      return { error: 'Title is required' }
    }

    const existingSheet = await prisma.studentSheet.findUnique({ where: { id } })
    if (!existingSheet) {
      return { error: 'Record not found' }
    }

    let imageUrl = existingSheet.src

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `students/${filename}`

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
        const urlObj = new URL(existingSheet.src)
        const pathParts = urlObj.pathname.split('/')
        const index = pathParts.findIndex(p => p === 'students')
        if (index !== -1) {
          const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
          await supabase.storage.from('assets').remove([storagePath])
        }
      } catch (e) {
        // Ignore URL parsing errors
      }
    }

    const sheet = await prisma.studentSheet.update({
      where: { id },
      data: {
        title,
        src: imageUrl
      }
    })

    revalidatePath('/students')
    revalidatePath('/admin/dashboard/students')
    return { success: true, sheet }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteStudentSheet(id: string) {
  try {
    const sheet = await prisma.studentSheet.findUnique({ where: { id } })
    if (!sheet) {
      return { error: 'Record not found' }
    }

    try {
      const urlObj = new URL(sheet.src)
      const pathParts = urlObj.pathname.split('/')
      const index = pathParts.findIndex(p => p === 'students')
      if (index !== -1) {
        const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
        await supabase.storage.from('assets').remove([storagePath])
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    await prisma.studentSheet.delete({ where: { id } })

    revalidatePath('/students')
    revalidatePath('/admin/dashboard/students')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function reorderStudentSheets(ids: string[]) {
  try {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.studentSheet.update({
          where: { id },
          data: { order: index },
        })
      )
    )
    revalidatePath('/students')
    revalidatePath('/admin/dashboard/students')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
