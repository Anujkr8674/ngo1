'use server'

import prisma from '@/lib/prisma'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

async function uploadFileToSupabase(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  const path = `uploads/${filename}`

  const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
    contentType: file.type,
    upsert: false
  })

  if (uploadError) {
    throw new Error(`File upload failed: ${uploadError.message}`)
  }

  const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
  return publicUrlData.publicUrl
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
    const idProofUrl = await uploadFileToSupabase(idFile)
    const photoUrl = await uploadFileToSupabase(photoFile)

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
      if (existing.idProofUrl) {
        const match = existing.idProofUrl.match(/\/assets\/uploads\/(.+)$/)
        if (match) {
          await supabase.storage.from('assets').remove([`uploads/${match[1]}`])
        }
      }
      if (existing.photoUrl) {
        const match = existing.photoUrl.match(/\/assets\/uploads\/(.+)$/)
        if (match) {
          await supabase.storage.from('assets').remove([`uploads/${match[1]}`])
        }
      }
    }
    await prisma.volunteer.delete({ where: { id } })
    revalidatePath('/admin/dashboard/volunteer')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting volunteer record:', error)
    return { error: error.message || 'Something went wrong' }
  }
}
