'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import fs from 'fs'
import path from 'path'

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
      const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
      const uploadDir = path.join(uploadBase, 'students')
      
      // Ensure local directory exists (auto-create)
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      const filePath = path.join(uploadDir, filename)
      fs.writeFileSync(filePath, buffer)
      imageUrl = `/uploads/students/${filename}`
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
      const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
      const uploadDir = path.join(uploadBase, 'students')
      
      // Ensure local directory exists (auto-create)
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      const filePath = path.join(uploadDir, filename)
      fs.writeFileSync(filePath, buffer)
      imageUrl = `/uploads/students/${filename}`

      // Try to delete old image from local disk
      try {
        const urlObj = new URL(existingSheet.src, 'http://localhost')
        const pathParts = urlObj.pathname.split('/')
        const index = pathParts.findIndex(p => p === 'students')
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

    // Try to delete image from local disk
    try {
      const urlObj = new URL(sheet.src, 'http://localhost')
      const pathParts = urlObj.pathname.split('/')
      const index = pathParts.findIndex(p => p === 'students')
      if (index !== -1) {
        const oldFilename = pathParts[index + 1]
        if (oldFilename) {
          const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
          const uploadDir = path.join(uploadBase, 'students')
          const oldFilePath = path.join(uploadDir, decodeURIComponent(oldFilename))
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath)
          }
        }
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
