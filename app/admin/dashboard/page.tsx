import prisma from '@/lib/prisma'
import Link from 'next/link'
import { 
  FileText, 
  Image as ImageIcon, 
  Users, 
  FileBarChart2, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Activity,
  Archive
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardOverview() {
  const [
    totalPosts,
    totalBlogCategories,
    totalImages,
    totalGalleryCategories,
    totalTeamMembers,
    totalAgmReports,
    totalAdmins,
    totalArchivedMaterials
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogCategory.count(),
    prisma.galleryImage.count(),
    prisma.galleryCategory.count(),
    prisma.teamMember.count(),
    prisma.agmReport.count(),
    prisma.admin.count(),
    prisma.archivedMaterial.count()
  ])

  // Fetch some quick details
  const [latestPost, latestImage, latestReport, latestArchived] = await Promise.all([
    prisma.blogPost.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { title: true }
    }),
    prisma.galleryImage.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { caption: true }
    }),
    prisma.agmReport.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { title: true }
    }),
    prisma.archivedMaterial.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { title: true }
    })
  ])

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] rounded-2xl p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
          <Sparkles className="w-64 h-64 text-[#444444]" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight text-[#444444]">Dashboard Overview</h1>
          <p className="text-[#444444] mt-2 font-semibold">Welcome back to your premium admin portal.</p>
        </div>
      </div>

      {/* Quick Stats Banner */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Admins */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Administrators</h3>
            <div className="w-8 h-8 rounded-full bg-[#DCCFF8]/30 flex items-center justify-center text-[#DCCFF8] group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4 text-[#444444]" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#444444]">{totalAdmins}</span>
            <span className="text-sm text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Sessions</h3>
            <div className="w-8 h-8 rounded-full bg-[#CFE8FF]/50 flex items-center justify-center text-[#CFE8FF] group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4 text-[#444444]" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#444444]">1</span>
            <span className="text-sm text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Current Session</span>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">System Status</h3>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">Healthy</span>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="border-t border-slate-200/60 pt-4">
        <h2 className="text-xl font-bold text-[#444444] mb-1">Section Overview</h2>
        <p className="text-slate-500 text-xs font-medium">Quick stats and direct management links for each database section</p>
      </div>

      {/* Entire Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Web Posts Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-500">Content Section</span>
                <h3 className="text-lg font-bold text-[#444444]">Web Posts & Blogs</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:rotate-6 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Posts</p>
                <p className="text-2xl font-black text-slate-700 mt-1">{totalPosts}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Categories</p>
                <p className="text-2xl font-black text-slate-700 mt-1">{totalBlogCategories}</p>
              </div>
            </div>

            {latestPost && (
              <div className="mt-4 text-xs bg-purple-50/50 text-purple-800 px-3 py-2 rounded-lg border border-purple-50 flex items-center gap-1.5">
                <span className="font-bold shrink-0">Latest Post:</span>
                <span className="truncate">"{latestPost.title}"</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-slate-50/30 p-4 flex gap-3">
            <Link 
              href="/admin/dashboard/posts" 
              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl py-2 px-3 text-xs font-bold text-center inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              Manage Posts
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link 
              href="/admin/dashboard/posts/categories" 
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl py-2 px-3 text-xs font-bold text-center inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              Categories
            </Link>
          </div>
        </div>

        {/* Media Gallery Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Visual Assets</span>
                <h3 className="text-lg font-bold text-[#444444]">Media Gallery</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:rotate-6 transition-transform">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Images</p>
                <p className="text-2xl font-black text-slate-700 mt-1">{totalImages}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Categories</p>
                <p className="text-2xl font-black text-slate-700 mt-1">{totalGalleryCategories}</p>
              </div>
            </div>

            {latestImage && (
              <div className="mt-4 text-xs bg-blue-50/50 text-blue-800 px-3 py-2 rounded-lg border border-blue-50 flex items-center gap-1.5">
                <span className="font-bold shrink-0">Latest Image:</span>
                <span className="truncate">"{latestImage.caption || 'No caption'}"</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-slate-50/30 p-4 flex gap-3">
            <Link 
              href="/admin/dashboard/gallery" 
              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl py-2 px-3 text-xs font-bold text-center inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              Manage Gallery
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link 
              href="/admin/dashboard/categories" 
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl py-2 px-3 text-xs font-bold text-center inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              Categories
            </Link>
          </div>
        </div>

        {/* AGM Reports Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Documents</span>
                <h3 className="text-lg font-bold text-[#444444]">AGM Reports</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:rotate-6 transition-transform">
                <FileBarChart2 className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Reports Uploaded</p>
                <p className="text-2xl font-black text-slate-700 mt-1">{totalAgmReports}</p>
              </div>
            </div>

            {latestReport && (
              <div className="mt-4 text-xs bg-emerald-50/50 text-emerald-800 px-3 py-2 rounded-lg border border-emerald-50 flex items-center gap-1.5">
                <span className="font-bold shrink-0">Latest Report:</span>
                <span className="truncate">"{latestReport.title}"</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-slate-50/30 p-4 flex">
            <Link 
              href="/admin/dashboard/agm" 
              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl py-2 px-3 text-xs font-bold text-center inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              Manage AGM Reports
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Archived Material Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Exemptions & Records</span>
                <h3 className="text-lg font-bold text-[#444444]">Archived Material</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Archive className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Documents Uploaded</p>
                <p className="text-2xl font-black text-slate-700 mt-1">{totalArchivedMaterials}</p>
              </div>
            </div>

            {latestArchived && (
              <div className="mt-4 text-xs bg-rose-50/50 text-rose-800 px-3 py-2 rounded-lg border border-rose-50 flex items-center gap-1.5">
                <span className="font-bold shrink-0">Latest Doc:</span>
                <span className="truncate">"{latestArchived.title}"</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-slate-50/30 p-4 flex">
            <Link 
              href="/admin/dashboard/archived-material" 
              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl py-2 px-3 text-xs font-bold text-center inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              Manage Archives
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Organization</span>
                <h3 className="text-lg font-bold text-[#444444]">About Us (Team)</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Team Members</p>
                <p className="text-2xl font-black text-slate-700 mt-1">{totalTeamMembers}</p>
              </div>
            </div>

            <div className="mt-4 text-xs bg-amber-50/50 text-amber-800 px-3 py-2 rounded-lg border border-amber-50 flex items-center gap-1.5">
              <span className="font-semibold text-slate-500">Core organizational foundation roster</span>
            </div>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/30 p-4 flex">
            <Link 
              href="/admin/dashboard/about" 
              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl py-2 px-3 text-xs font-bold text-center inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              Manage Team Members
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

