'use client'

import { useState } from 'react'
import { createGalleryCategory, deleteGalleryCategory } from '@/app/actions/gallery'
import { Loader2, Plus, Trash2, Edit2 } from 'lucide-react'

export default function CategoriesClient({ initialCategories }: { initialCategories: any[] }) {
  const [categories, setCategories] = useState(initialCategories)
  const [newCatName, setNewCatName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName) return
    setLoading(true)
    const res = await createGalleryCategory(newCatName)
    if (res.error) alert(res.error)
    else if (res.category) {
      setCategories([...categories, { ...res.category, imageCount: 0 }])
      setNewCatName('')
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This will delete all images in this category as well.')) return
    const res = await deleteGalleryCategory(id)
    if (res.success) {
      setCategories(categories.filter(c => c.id !== id))
    } else {
      alert(res.error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-[#444444]">Category Management</h1>
        <p className="text-[#444444] mt-2 font-medium">Create and manage gallery categories dynamically.</p>
      </div>

      {/* Add Form */}
      <div className="bg-white border border-slate-100 shadow-sm p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleAdd} className="flex-1 w-full flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="New category name" 
            value={newCatName}
            onChange={e => setNewCatName(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-2.5 bg-[#FCFCFA] border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#DCCFF8] transition-all text-sm text-[#444444]"
          />
          <button disabled={loading} type="submit" className="bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] hover:opacity-90 text-[#444444] text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add Category
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-bold text-[#444444] uppercase tracking-wider">Images</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-sm text-[#444444]">No categories found.</td>
                </tr>
              )}
              {categories.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-[#444444]">{c.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">
                    <span className="bg-slate-100 px-2 py-1 rounded-md">{c.imageCount}</span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end gap-2">
                    <button className="p-1.5 border border-gray-200 rounded-md text-[#444444] hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(c.id)} className="p-1.5 border border-red-100 rounded-md text-red-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
