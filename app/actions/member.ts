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

export async function submitMember(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const fatherSpouseName = formData.get('fatherSpouseName') as string
    const gender = formData.get('gender') as string
    const dob = formData.get('dob') as string
    const address = formData.get('address') as string
    const state = formData.get('state') as string
    const postalCode = formData.get('postalCode') as string
    const mobile = formData.get('mobile') as string
    const email = formData.get('email') as string
    const pancard = formData.get('pancard') as string
    const education = formData.get('education') as string
    const profession = formData.get('profession') as string
    const company = formData.get('company') as string
    const interestsJson = formData.get('interests') as string
    const otherInterest = formData.get('otherInterest') as string
    const reason = formData.get('reason') as string
    const modeOfPayment = formData.get('modeOfPayment') as string
    const paymentDate = formData.get('paymentDate') as string
    const chequeNo = formData.get('chequeNo') as string
    const bankName = formData.get('bankName') as string
    const transactionId = formData.get('transactionId') as string

    const idFile = formData.get('idFile') as File | null
    const residenceFile = formData.get('residenceFile') as File | null
    const photoFile = formData.get('photoFile') as File | null

    if (!name || !fatherSpouseName || !gender || !dob || !address || !state || !postalCode || !mobile || !email || !pancard || !education || !profession || !company || !modeOfPayment || !paymentDate) {
      return { error: 'All required fields must be filled' }
    }

    const interests: string[] = interestsJson ? JSON.parse(interestsJson) : []
    const idProofUrl = await uploadFileToSupabase(idFile)
    const residenceProofUrl = await uploadFileToSupabase(residenceFile)
    const photoUrl = await uploadFileToSupabase(photoFile)

    const record = await prisma.member.create({
      data: {
        name: name.trim(),
        fatherSpouseName: fatherSpouseName.trim(),
        gender,
        dob,
        address: address.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        pancard: pancard.trim(),
        education: education.trim(),
        profession: profession.trim(),
        company: company.trim(),
        interests,
        otherInterest: otherInterest?.trim() || null,
        reason: reason?.trim() || null,
        modeOfPayment,
        paymentDate,
        chequeNo: chequeNo?.trim() || null,
        bankName: bankName?.trim() || null,
        transactionId: transactionId?.trim() || null,
        idProofUrl,
        residenceProofUrl,
        photoUrl,
      },
    })

    revalidatePath('/admin/dashboard/member')
    return { success: true, data: record }
  } catch (error: any) {
    console.error('Error submitting member:', error)
    return { error: error.message || 'Something went wrong' }
  }
}

export async function getMembers() {
  try {
    return await prisma.member.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching member records:', error)
    return []
  }
}

export async function deleteMember(id: string) {
  try {
    const existing = await prisma.member.findUnique({ where: { id } })
    if (existing) {
      if (existing.idProofUrl) {
        const match = existing.idProofUrl.match(/\/assets\/uploads\/(.+)$/)
        if (match) {
          await supabase.storage.from('assets').remove([`uploads/${match[1]}`])
        }
      }
      if (existing.residenceProofUrl) {
        const match = existing.residenceProofUrl.match(/\/assets\/uploads\/(.+)$/)
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
    await prisma.member.delete({ where: { id } })
    revalidatePath('/admin/dashboard/member')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting member record:', error)
    return { error: error.message || 'Something went wrong' }
  }
}
