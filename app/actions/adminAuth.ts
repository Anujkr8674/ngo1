'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export async function loginAdmin(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: 'Username and password are required' }
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    })

    if (!admin || admin.password !== password) {
      return { error: 'Invalid credentials' }
    }

    // Set an admin session cookie (expires in 1 day)
    const cookieStore = await cookies()
    cookieStore.set('admin_session', admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })

    return { success: true }
  } catch (err) {
    console.error('Login error:', err)
    return { error: 'An error occurred during login' }
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin')
}
