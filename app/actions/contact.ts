'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface ContactMessageData {
  name: string
  email: string
  mobile: string
  subject: string
  message: string
}

export async function submitContactMessage(data: ContactMessageData) {
  try {
    const { name, email, mobile, subject, message } = data

    if (!name || !email || !mobile || !subject || !message) {
      return { error: 'All fields are required' }
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
    })

    revalidatePath('/admin/dashboard/contact')
    return { success: true, message: newMessage }
  } catch (error: any) {
    console.error('Error submitting contact message:', error)
    return { error: error.message || 'Something went wrong' }
  }
}

export async function getContactMessages() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return messages
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return []
  }
}

export async function deleteContactMessage(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    })
    revalidatePath('/admin/dashboard/contact')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting contact message:', error)
    return { error: error.message || 'Something went wrong' }
  }
}
