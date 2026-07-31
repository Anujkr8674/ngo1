'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface DonationData {
  title: string
  name: string
  mobile: string
  email: string
  state: string
  address: string
  postalCode: string
  amount: number
  purpose: string
  paymentMode: string
  dateOfPayment: string
  transactionId: string
  panCard?: string
  suggestions?: string
}

export async function submitDonation(data: DonationData) {
  try {
    const {
      title,
      name,
      mobile,
      email,
      state,
      address,
      postalCode,
      amount,
      purpose,
      paymentMode,
      dateOfPayment,
      transactionId,
      panCard,
      suggestions,
    } = data

    if (
      !title ||
      !name ||
      !mobile ||
      !email ||
      !state ||
      !address ||
      !postalCode ||
      !amount ||
      !purpose ||
      !paymentMode ||
      !dateOfPayment ||
      !transactionId
    ) {
      return { error: 'All required fields must be filled' }
    }

    const newDonation = await prisma.donation.create({
      data: {
        title,
        name: name.trim(),
        mobile: mobile.trim(),
        email: email.trim().toLowerCase(),
        state: state.trim(),
        address: address.trim(),
        postalCode: postalCode.trim(),
        amount: Number(amount),
        purpose: purpose.trim(),
        paymentMode: paymentMode.trim(),
        dateOfPayment: dateOfPayment.trim(),
        transactionId: transactionId.trim(),
        panCard: panCard?.trim() || null,
        suggestions: suggestions?.trim() || null,
      },
    })

    revalidatePath('/admin/dashboard/donations')
    return { success: true, donation: newDonation }
  } catch (error: any) {
    console.error('Error submitting donation details:', error)
    return { error: error.message || 'Something went wrong saving donation details' }
  }
}

export async function getDonations() {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return donations
  } catch (error) {
    console.error('Error fetching donations:', error)
    return []
  }
}

export async function deleteDonation(id: string) {
  try {
    await prisma.donation.delete({
      where: { id },
    })
    revalidatePath('/admin/dashboard/donations')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting donation:', error)
    return { error: error.message || 'Something went wrong' }
  }
}
