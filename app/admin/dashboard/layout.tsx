'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { LayoutDashboard, LogOut, Settings, Users, Menu, X, Image as ImageIcon, ListTree, FileText, ChevronDown, ChevronRight, FolderPlus, Plus, Archive, HeartHandshake, GraduationCap, Sparkles, Play, Mail, Heart, Shield } from 'lucide-react'
import { logoutAdmin } from '../../actions/adminAuth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWebPostsOpen, setIsWebPostsOpen] = useState(false)
  const [isGetHelpOpen, setIsGetHelpOpen] = useState(false)

  // Expand Web Posts & Get Help menus automatically if current route matches
  useEffect(() => {
    if (pathname.startsWith('/admin/dashboard/posts')) {
      setIsWebPostsOpen(true)
    }
    if (pathname.startsWith('/admin/dashboard/get-help')) {
      setIsGetHelpOpen(true)
    }
  }, [pathname])

  const sidebarContent = (
    <div className="flex flex-col h-full w-full">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <img
            src="/logo/logo.jpg"
            alt="Live 4 Help Foundation Logo"
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {/* Overview */}
        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
            pathname === '/admin/dashboard'
              ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
              : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
          }`}
        >
          <LayoutDashboard className={`h-5 w-5 transition-colors ${pathname === '/admin/dashboard' ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
          Overview
        </Link>

        {/* Gallery Categories */}
        <Link
          href="/admin/dashboard/categories"
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
            pathname === '/admin/dashboard/categories'
              ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
              : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
          }`}
        >
          <ListTree className={`h-5 w-5 transition-colors ${pathname === '/admin/dashboard/categories' ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
          Categories
        </Link>

        {/* Gallery */}
        <Link
          href="/admin/dashboard/gallery"
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
            pathname === '/admin/dashboard/gallery'
              ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
              : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
          }`}
        >
          <ImageIcon className={`h-5 w-5 transition-colors ${pathname === '/admin/dashboard/gallery' ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
          Gallery
        </Link>

        {/* AGM Reports */}
        <Link
          href="/admin/dashboard/agm"
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
            pathname === '/admin/dashboard/agm'
              ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
              : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
          }`}
        >
          <FileText className={`h-5 w-5 transition-colors ${pathname === '/admin/dashboard/agm' ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
          AGM Reports
        </Link>

        {/* Archived Material */}
        <Link
          href="/admin/dashboard/archived-material"
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
            pathname === '/admin/dashboard/archived-material'
              ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
              : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
          }`}
        >
          <Archive className={`h-5 w-5 transition-colors ${pathname === '/admin/dashboard/archived-material' ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
          Archived Material
        </Link>

        {/* Donors & CSR Sponsors */}
        <Link
          href="/admin/dashboard/donors-csr-sponsors-members"
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
            pathname === '/admin/dashboard/donors-csr-sponsors-members'
              ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
              : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
          }`}
        >
          <HeartHandshake className={`h-5 w-5 transition-colors ${pathname === '/admin/dashboard/donors-csr-sponsors-members' ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
          Donors & CSR Sponsors
        </Link>

        {/* Student Sheets */}
        <Link
          href="/admin/dashboard/students"
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
            pathname === '/admin/dashboard/students'
              ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
              : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
          }`}
        >
          <GraduationCap className={`h-5 w-5 transition-colors ${pathname === '/admin/dashboard/students' ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
          Student Sheets
        </Link>

        {/* Initiatives & Categories */}
        <Link
          href="/admin/dashboard/initiatives"
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
            pathname === '/admin/dashboard/initiatives'
              ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
              : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
          }`}
        >
          <Sparkles className={`h-5 w-5 transition-colors ${pathname === '/admin/dashboard/initiatives' ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
          Initiatives
        </Link>

        {/* Testimonials */}
        <Link
          href="/admin/dashboard/testimonials"
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
            pathname === '/admin/dashboard/testimonials'
              ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
              : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
          }`}
        >
          <Play className={`h-5 w-5 transition-colors ${pathname === '/admin/dashboard/testimonials' ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
          Testimonials
        </Link>

        {/* Contact Messages */}
        <Link
          href="/admin/dashboard/contact"
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
            pathname === '/admin/dashboard/contact'
              ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
              : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
          }`}
        >
          <Mail className={`h-5 w-5 transition-colors ${pathname === '/admin/dashboard/contact' ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
          Contact Messages
        </Link>

        {/* Donations */}
        <Link
          href="/admin/dashboard/donations"
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
            pathname === '/admin/dashboard/donations'
              ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
              : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
          }`}
        >
          <Heart className={`h-5 w-5 transition-colors ${pathname === '/admin/dashboard/donations' ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
          Donations
        </Link>

        {/* Get Help Requests Dropdown */}
        <div>
          <button
            type="button"
            onClick={() => setIsGetHelpOpen(!isGetHelpOpen)}
            className={`flex items-center justify-between px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group cursor-pointer ${
              pathname.startsWith('/admin/dashboard/get-help')
                ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
                : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <HeartHandshake className={`h-5 w-5 transition-colors ${pathname.startsWith('/admin/dashboard/get-help') ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
              <span>Get Help Requests</span>
            </div>
            {isGetHelpOpen ? (
              <ChevronDown className="h-4 w-4 text-[#444444]" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#444444]" />
            )}
          </button>

          {isGetHelpOpen && (
            <div className="mt-1 ml-4 pl-3 border-l-2 border-purple-200 space-y-1">
              <Link
                href="/admin/dashboard/get-help/each-other"
                className={`flex items-center gap-2.5 px-3 py-2.5 w-full rounded-lg transition-all text-xs font-semibold ${
                  pathname === '/admin/dashboard/get-help/each-other'
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Users className="h-4 w-4 text-purple-500" />
                Help Each Other
              </Link>
              <Link
                href="/admin/dashboard/get-help/education"
                className={`flex items-center gap-2.5 px-3 py-2.5 w-full rounded-lg transition-all text-xs font-semibold ${
                  pathname === '/admin/dashboard/get-help/education'
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <GraduationCap className="h-4 w-4 text-blue-500" />
                Education Support
              </Link>
              <Link
                href="/admin/dashboard/get-help/elderly"
                className={`flex items-center gap-2.5 px-3 py-2.5 w-full rounded-lg transition-all text-xs font-semibold ${
                  pathname === '/admin/dashboard/get-help/elderly'
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Shield className="h-4 w-4 text-green-500" />
                Elderly Support
              </Link>
              <Link
                href="/admin/dashboard/get-help/medical"
                className={`flex items-center gap-2.5 px-3 py-2.5 w-full rounded-lg transition-all text-xs font-semibold ${
                  pathname === '/admin/dashboard/get-help/medical'
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Heart className="h-4 w-4 text-red-500" />
                Medical Support
              </Link>
            </div>
          )}
        </div>

        {/* Web Posts Dropdown Menu */}
        <div>
          <button
            type="button"
            onClick={() => setIsWebPostsOpen(!isWebPostsOpen)}
            className={`flex items-center justify-between px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group cursor-pointer ${
              pathname.startsWith('/admin/dashboard/posts')
                ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
                : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className={`h-5 w-5 transition-colors ${pathname.startsWith('/admin/dashboard/posts') ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
              <span>Web Posts</span>
            </div>
            {isWebPostsOpen ? (
              <ChevronDown className="h-4 w-4 text-[#444444]" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#444444]" />
            )}
          </button>

          {/* Submenu links */}
          {isWebPostsOpen && (
            <div className="mt-1 ml-4 pl-3 border-l-2 border-blue-200 space-y-1">
              <Link
                href="/admin/dashboard/posts/categories"
                className={`flex items-center gap-2.5 px-3 py-2.5 w-full rounded-lg transition-all text-xs font-semibold ${
                  pathname === '/admin/dashboard/posts/categories'
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <FolderPlus className="h-4 w-4 text-purple-500" />
                Post Categories
              </Link>
              <Link
                href="/admin/dashboard/posts"
                className={`flex items-center gap-2.5 px-3 py-2.5 w-full rounded-lg transition-all text-xs font-semibold ${
                  pathname === '/admin/dashboard/posts'
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <FileText className="h-4 w-4 text-blue-500" />
                Web Posts
              </Link>
            </div>
          )}
        </div>

        {/* About Us (Team) */}
        <Link
          href="/admin/dashboard/about"
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm group ${
            pathname === '/admin/dashboard/about'
              ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-bold shadow-sm'
              : 'text-slate-500 hover:text-[#444444] hover:bg-slate-50'
          }`}
        >
          <Users className={`h-5 w-5 transition-colors ${pathname === '/admin/dashboard/about' ? 'text-[#444444]' : 'text-slate-400 group-hover:text-[#444444]'}`} />
          About Us (Team)
        </Link>

        {/* Settings */}
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all font-medium text-sm text-slate-500 hover:text-[#444444] hover:bg-slate-50 group"
        >
          <Settings className="h-5 w-5 text-slate-400 group-hover:text-[#444444]" />
          Settings
        </Link>
      </nav>

      <div className="p-4">
        <button 
          onClick={() => logoutAdmin()}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all font-medium group cursor-pointer"
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
        {sidebarContent}
      </aside>

      {/* Sidebar Mobile Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col md:hidden shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
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
              src="/logo/logo.jpg"
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
