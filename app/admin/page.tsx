'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAdmin } from '@/app/actions/adminAuth'
import { KeyRound, User, Loader2 } from 'lucide-react'

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const res = await loginAdmin(formData)
    
    if (res.error) {
      setError(res.error)
      setLoading(false)
    } else if (res.success) {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFCFA] text-[#444444] font-admin">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-3xl shadow-premium border border-[#CFE8FF]">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <img
              src="/logo/logo.jpg"
              alt="Live 4 Help Foundation Logo"
              className="h-14 w-auto object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
          <p className="text-[#444444]/60 text-sm">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444444]/40 h-5 w-5" />
              <input
                type="text"
                name="username"
                placeholder="Admin ID"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-[#FCFCFA] border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#CFE8FF] focus:border-blue-400 outline-none transition-all placeholder:text-[#444444]/40"
              />
            </div>

            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444444]/40 h-5 w-5" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-[#FCFCFA] border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#CFE8FF] focus:border-blue-400 outline-none transition-all placeholder:text-[#444444]/40"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-soft mt-2"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
