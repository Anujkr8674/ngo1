'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import fs from 'fs'
import path from 'path'

// Helper to upload files locally
async function uploadFileLocally(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

  const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
  const uploadDir = path.join(uploadBase, 'uploads')

  // Ensure local directory exists (auto-create)
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const filePath = path.join(uploadDir, filename)
  fs.writeFileSync(filePath, buffer)
  return `/uploads/uploads/${filename}`
}

// Helper to delete local file from disk using its URL
function deleteLocalFile(url: string | null) {
  if (!url) return
  try {
    const urlObj = new URL(url, 'http://localhost')
    const pathParts = urlObj.pathname.split('/')
    const uploadsIndex = pathParts.findIndex((p, idx) => p === 'uploads' && pathParts[idx + 1] === 'uploads')
    if (uploadsIndex !== -1) {
      const filename = pathParts[uploadsIndex + 2]
      if (filename) {
        const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
        const filePath = path.join(uploadBase, 'uploads', decodeURIComponent(filename))
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      }
    }
  } catch (e) {
    console.error('Error deleting local file:', e)
  }
}

export async function submitVolunteer(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const gender = formData.get('gender') as string
    const dob = formData.get('dob') as string
    const address = formData.get('address') as string
    const state = formData.get('state') as string
    const postalCode = formData.get('postalCode') as string
    const mobile = formData.get('mobile') as string
    const email = formData.get('email') as string
    const language = formData.get('language') as string
    const qualification = formData.get('qualification') as string
    const profession = formData.get('profession') as string
    const company = formData.get('company') as string
    const interestsJson = formData.get('interests') as string
    const otherInterest = formData.get('otherInterest') as string
    const hoursPerWeek = formData.get('hoursPerWeek') as string
    const reason = formData.get('reason') as string
    const idFile = formData.get('idFile') as File | null
    const photoFile = formData.get('photoFile') as File | null

    if (!name || !gender || !dob || !address || !state || !postalCode || !mobile || !email || !language || !qualification || !profession || !hoursPerWeek) {
      return { error: 'All required fields must be filled' }
    }

    const interests: string[] = interestsJson ? JSON.parse(interestsJson) : []
    const idProofUrl = await uploadFileLocally(idFile)
    const photoUrl = await uploadFileLocally(photoFile)

    const record = await prisma.volunteer.create({
      data: {
        name: name.trim(),
        gender,
        dob,
        address: address.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        language: language.trim(),
        qualification: qualification.trim(),
        profession: profession.trim(),
        company: company?.trim() || "",
        interests,
        otherInterest: otherInterest?.trim() || null,
        hoursPerWeek: hoursPerWeek.trim(),
        reason: reason?.trim() || null,
        idProofUrl,
        photoUrl,
      },
    })

    revalidatePath('/admin/dashboard/volunteer')
    return { success: true, data: record }
  } catch (error: any) {
    console.error('Error submitting volunteer:', error)
    return { error: error.message || 'Something went wrong' }
  }
}

export async function getVolunteers() {
  try {
    return await prisma.volunteer.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching volunteer records:', error)
    return []
  }
}

export async function deleteVolunteer(id: string) {
  try {
    const existing = await prisma.volunteer.findUnique({ where: { id } })
    if (existing) {
      deleteLocalFile(existing.idProofUrl)
      deleteLocalFile(existing.photoUrl)
    }
    await prisma.volunteer.delete({ where: { id } })
    revalidatePath('/admin/dashboard/volunteer')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting volunteer record:', error)
    return { error: error.message || 'Something went wrong' }
  }
}
