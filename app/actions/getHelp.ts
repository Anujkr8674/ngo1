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

// ----------------------------------------------------
// 1. HELP EACH OTHER ACTIONS
// ----------------------------------------------------

export async function submitHelpEachOther(formData: FormData) {
  try {
    const category = formData.get('category') as string
    const name = formData.get('name') as string
    const gender = formData.get('gender') as string
    const ageStr = formData.get('age') as string
    const dob = formData.get('dob') as string
    const address = formData.get('address') as string
    const state = formData.get('state') as string
    const postalCode = formData.get('postalCode') as string
    const mobile = formData.get('mobile') as string
    const email = formData.get('email') as string
    const language = formData.get('language') as string
    const bloodGroup = formData.get('bloodGroup') as string
    const qualification = formData.get('qualification') as string
    const profession = formData.get('profession') as string
    const helpTypesJson = formData.get('helpTypes') as string // array JSON stringified
    const otherHelp = formData.get('otherHelp') as string
    const suggestions = formData.get('suggestions') as string
    const idFile = formData.get('idFile') as File | null

    if (!category || !name || !gender || !dob || !address || !state || !postalCode || !mobile || !language) {
      return { error: 'All required fields must be filled' }
    }

    const helpTypes: string[] = helpTypesJson ? JSON.parse(helpTypesJson) : []
    const idProofUrl = await uploadFileLocally(idFile)
    const age = ageStr ? parseInt(ageStr, 10) : null

    const record = await prisma.helpEachOther.create({
      data: {
        category,
        name: name.trim(),
        gender,
        age,
        dob,
        address: address.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        mobile: mobile.trim(),
        email: email?.trim() || null,
        language: language.trim(),
        bloodGroup: bloodGroup?.trim() || null,
        qualification: qualification?.trim() || null,
        profession: profession?.trim() || null,
        helpTypes,
        otherHelp: otherHelp?.trim() || null,
        suggestions: suggestions?.trim() || null,
        idProofUrl,
      },
    })

    revalidatePath('/admin/dashboard/get-help/each-other')
    return { success: true, data: record }
  } catch (error: any) {
    console.error('Error submitting help each other:', error)
    return { error: error.message || 'Something went wrong' }
  }
}

export async function getHelpEachOther() {
  try {
    return await prisma.helpEachOther.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching Help Each Other records:', error)
    return []
  }
}

export async function deleteHelpEachOther(id: string) {
  try {
    const existing = await prisma.helpEachOther.findUnique({ where: { id } })
    if (existing?.idProofUrl) {
      deleteLocalFile(existing.idProofUrl)
    }
    await prisma.helpEachOther.delete({ where: { id } })
    revalidatePath('/admin/dashboard/get-help/each-other')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting Help Each Other record:', error)
    return { error: error.message || 'Something went wrong' }
  }
}

// ----------------------------------------------------
// 2. EDUCATION SUPPORT ACTIONS
// ----------------------------------------------------

export async function submitEducationSupport(formData: FormData) {
  try {
    const studentName = formData.get('studentName') as string
    const className = formData.get('className') as string
    const gender = formData.get('gender') as string
    const dob = formData.get('dob') as string
    const parentName = formData.get('parentName') as string
    const annualIncomeStr = formData.get('annualIncome') as string
    const address = formData.get('address') as string
    const state = formData.get('state') as string
    const postalCode = formData.get('postalCode') as string
    const mobile = formData.get('mobile') as string
    const email = formData.get('email') as string
    const language = formData.get('language') as string
    const schoolName = formData.get('schoolName') as string
    const schoolAddress = formData.get('schoolAddress') as string
    const schoolState = formData.get('schoolState') as string
    const schoolPin = formData.get('schoolPin') as string
    const teacherName = formData.get('teacherName') as string
    const teacherPhone = formData.get('teacherPhone') as string
    const admissionFeeStr = formData.get('admissionFee') as string
    const tuitionFeeStr = formData.get('tuitionFee') as string
    const booksCostStr = formData.get('booksCost') as string
    const stationeryCostStr = formData.get('stationeryCost') as string
    const totalAmountWords = formData.get('totalAmountWords') as string
    const totalAmountFigureStr = formData.get('totalAmountFigure') as string
    const otherSupportJson = formData.get('otherSupport') as string
    const accountNo = formData.get('accountNo') as string
    const ifsc = formData.get('ifsc') as string

    const idFile = formData.get('idFile') as File | null
    const photoFile = formData.get('photoFile') as File | null
    const passbookFile = formData.get('passbookFile') as File | null

    if (
      !studentName || !className || !gender || !dob || !parentName || !address || 
      !state || !postalCode || !mobile || !language || !schoolName || !schoolAddress || 
      !schoolState || !schoolPin || !teacherName || !teacherPhone || !totalAmountWords || 
      !totalAmountFigureStr || !accountNo || !ifsc
    ) {
      return { error: 'All required fields must be filled' }
    }

    const annualIncome = annualIncomeStr ? parseFloat(annualIncomeStr) : null
    const admissionFee = admissionFeeStr ? parseFloat(admissionFeeStr) : null
    const tuitionFee = tuitionFeeStr ? parseFloat(tuitionFeeStr) : null
    const booksCost = booksCostStr ? parseFloat(booksCostStr) : null
    const stationeryCost = stationeryCostStr ? parseFloat(stationeryCostStr) : null
    const totalAmountFigure = parseFloat(totalAmountFigureStr)

    const otherSupport: string[] = otherSupportJson ? JSON.parse(otherSupportJson) : []

    const idProofUrl = await uploadFileLocally(idFile)
    const photoUrl = await uploadFileLocally(photoFile)
    const passbookUrl = await uploadFileLocally(passbookFile)

    const record = await prisma.educationSupport.create({
      data: {
        studentName: studentName.trim(),
        className: className.trim(),
        gender,
        dob,
        parentName: parentName.trim(),
        annualIncome,
        address: address.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        mobile: mobile.trim(),
        email: email?.trim() || null,
        language: language.trim(),
        schoolName: schoolName.trim(),
        schoolAddress: schoolAddress.trim(),
        schoolState: schoolState.trim(),
        schoolPin: schoolPin.trim(),
        teacherName: teacherName.trim(),
        teacherPhone: teacherPhone.trim(),
        admissionFee,
        tuitionFee,
        booksCost,
        stationeryCost,
        totalAmountWords: totalAmountWords.trim(),
        totalAmountFigure,
        otherSupport,
        accountNo: accountNo.trim(),
        ifsc: ifsc.trim(),
        idProofUrl,
        photoUrl,
        passbookUrl,
      },
    })

    revalidatePath('/admin/dashboard/get-help/education')
    return { success: true, data: record }
  } catch (error: any) {
    console.error('Error submitting education support:', error)
    return { error: error.message || 'Something went wrong' }
  }
}

export async function getEducationSupport() {
  try {
    return await prisma.educationSupport.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching Education Support records:', error)
    return []
  }
}

export async function deleteEducationSupport(id: string) {
  try {
    const existing = await prisma.educationSupport.findUnique({ where: { id } })
    if (existing) {
      deleteLocalFile(existing.idProofUrl)
      deleteLocalFile(existing.photoUrl)
      deleteLocalFile(existing.passbookUrl)
    }
    await prisma.educationSupport.delete({ where: { id } })
    revalidatePath('/admin/dashboard/get-help/education')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting Education Support record:', error)
    return { error: error.message || 'Something went wrong' }
  }
}

// ----------------------------------------------------
// 3. ELDERLY SUPPORT ACTIONS
// ----------------------------------------------------

export async function submitElderlySupport(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const gender = formData.get('gender') as string
    const ageStr = formData.get('age') as string
    const address = formData.get('address') as string
    const mobile = formData.get('mobile') as string
    const email = formData.get('email') as string
    const livingStatus = formData.get('livingStatus') as string
    const language = formData.get('language') as string
    const emergencyContact = formData.get('emergencyContact') as string
    const emergencyPhone = formData.get('emergencyPhone') as string
    const healthStatus = formData.get('healthStatus') as string
    const supportTypesJson = formData.get('supportTypes') as string
    const otherSupport = formData.get('otherSupport') as string
    const suggestions = formData.get('suggestions') as string

    const idFile = formData.get('idFile') as File | null
    const photoFile = formData.get('photoFile') as File | null

    if (!name || !gender || !ageStr || !address || !mobile || !livingStatus || !language || !emergencyContact || !emergencyPhone) {
      return { error: 'All required fields must be filled' }
    }

    const age = parseInt(ageStr, 10)
    const supportTypes: string[] = supportTypesJson ? JSON.parse(supportTypesJson) : []

    const idProofUrl = await uploadFileLocally(idFile)
    const photoUrl = await uploadFileLocally(photoFile)

    const record = await prisma.elderlySupport.create({
      data: {
        name: name.trim(),
        gender,
        age,
        address: address.trim(),
        mobile: mobile.trim(),
        email: email?.trim() || null,
        livingStatus,
        language: language.trim(),
        emergencyContact: emergencyContact.trim(),
        emergencyPhone: emergencyPhone.trim(),
        healthStatus: healthStatus?.trim() || null,
        supportTypes,
        otherSupport: otherSupport?.trim() || null,
        suggestions: suggestions?.trim() || null,
        idProofUrl,
        photoUrl,
      },
    })

    revalidatePath('/admin/dashboard/get-help/elderly')
    return { success: true, data: record }
  } catch (error: any) {
    console.error('Error submitting elderly support:', error)
    return { error: error.message || 'Something went wrong' }
  }
}

export async function getElderlySupport() {
  try {
    return await prisma.elderlySupport.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching Elderly Support records:', error)
    return []
  }
}

export async function deleteElderlySupport(id: string) {
  try {
    const existing = await prisma.elderlySupport.findUnique({ where: { id } })
    if (existing) {
      deleteLocalFile(existing.idProofUrl)
      deleteLocalFile(existing.photoUrl)
    }
    await prisma.elderlySupport.delete({ where: { id } })
    revalidatePath('/admin/dashboard/get-help/elderly')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting Elderly Support record:', error)
    return { error: error.message || 'Something went wrong' }
  }
}

// ----------------------------------------------------
// 4. MEDICAL SUPPORT ACTIONS
// ----------------------------------------------------

export async function submitMedicalSupport(formData: FormData) {
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
    const healthStatus = formData.get('healthStatus') as string
    const supportTypesJson = formData.get('supportTypes') as string
    const otherSupport = formData.get('otherSupport') as string
    const reason = formData.get('reason') as string

    const idFile = formData.get('idFile') as File | null

    if (!name || !gender || !dob || !address || !state || !postalCode || !mobile || !language || !reason) {
      return { error: 'All required fields must be filled' }
    }

    const supportTypes: string[] = supportTypesJson ? JSON.parse(supportTypesJson) : []
    const idProofUrl = await uploadFileLocally(idFile)

    const record = await prisma.medicalSupport.create({
      data: {
        name: name.trim(),
        gender,
        dob,
        address: address.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        mobile: mobile.trim(),
        email: email?.trim() || null,
        language: language.trim(),
        healthStatus: healthStatus?.trim() || null,
        supportTypes,
        otherSupport: otherSupport?.trim() || null,
        reason: reason.trim(),
        idProofUrl,
      },
    })

    revalidatePath('/admin/dashboard/get-help/medical')
    return { success: true, data: record }
  } catch (error: any) {
    console.error('Error submitting medical support:', error)
    return { error: error.message || 'Something went wrong' }
  }
}

export async function getMedicalSupport() {
  try {
    return await prisma.medicalSupport.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching Medical Support records:', error)
    return []
  }
}

export async function deleteMedicalSupport(id: string) {
  try {
    const existing = await prisma.medicalSupport.findUnique({ where: { id } })
    if (existing?.idProofUrl) {
      deleteLocalFile(existing.idProofUrl)
    }
    await prisma.medicalSupport.delete({ where: { id } })
    revalidatePath('/admin/dashboard/get-help/medical')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting Medical Support record:', error)
    return { error: error.message || 'Something went wrong' }
  }
}
