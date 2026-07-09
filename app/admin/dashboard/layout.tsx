'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, LogOut, Settings, Users, Menu, X, Image as ImageIcon, ListTree } from 'lucide-react'
import { logoutAdmin } from '../../actions/adminAuth'

const navItems = [
  { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Categories', href: '/admin/dashboard/categories', icon: ListTree },
  { name: 'Gallery', href: '/admin/dashboard/gallery', icon: ImageIcon },
  { name: 'Users', href: '#', icon: Users },
  { name: 'Settings', href: '#', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col h-full w-full">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#DCCFF8] to-[#CFE8FF] rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-[#444444] font-black text-xl">N</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-[#444444]">Admin Portal</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
                isActive 
                  ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm' 
                  : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
              }`}
            >
              <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <button 
          onClick={() => logoutAdmin()}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all font-medium group"
        >
          <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors" />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="h-screen bg-slate-50 flex text-[#444444] font-admin relative">
      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* Sidebar Desktop */}
      <aside className="w-72 bg-white border-r border-slate-200 flex-col hidden md:flex z-50">
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col md:hidden shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 md:hidden flex items-center justify-between px-6 bg-white border-b border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-[#444444] hover:text-blue-600 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
            <img
              src="https://live4help.org/wp-content/uploads/2021/01/live4help-01-01-01-scaled.jpg"
              alt="Live 4 Help Foundation Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
          <button onClick={() => logoutAdmin()} className="text-[#444444] hover:text-red-600">
            <LogOut className="h-5 w-5" />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
