'use client'

import { useState } from 'react'
import { createBlogCategory, updateBlogCategory, deleteBlogCategory } from '@/app/actions/blog'
import { Loader2, Plus, Trash2, Edit2, Tag, ArrowLeft, Check, X } from 'lucide-react'
import Link from 'next/link'

interface PostCategoriesClientProps {
  initialCategories: any[]
}

export default function PostCategoriesClient({ initialCategories }: PostCategoriesClientProps) {
  const [categories, setCategories] = useState(initialCategories)
  const [newCatName, setNewCatName] = useState('')
  const [loading, setLoading] = useState(false)

  // Edit modal state
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [editingCatName, setEditingCatName] = useState('')
  const [editLoading, setEditLoading] = useState(false)

  // Create
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName.trim()) return
    setLoading(true)
    const res = await createBlogCategory(newCatName)
    if (res.error) {
      alert(res.error)
    } else if (res.category) {
      setCategories([...categories, { ...res.category, postCount: 0 }])
      setNewCatName('')
    }
    setLoading(false)
  }

  // Update
  const startEdit = (cat: any) => {
    setEditingCatId(cat.id)
    setEditingCatName(cat.name)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCatId || !editingCatName.trim()) return
    setEditLoading(true)
    const res = await updateBlogCategory(editingCatId, editingCatName)
    if (res.error) {
      alert(res.error)
    } else if (res.category) {
      setCategories(categories.map(c => c.id === editingCatId ? { ...c, name: res.category.name } : c))
      setEditingCatId(null)
      setEditingCatName('')
    }
    setEditLoading(false)
  }

  // Delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this web post category? Associated posts will become uncategorized.')) return
    const res = await deleteBlogCategory(id)
    if (res.success) {
      setCategories(categories.filter(c => c.id !== id))
    } else {
      alert(res.error || 'Failed to delete category')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header & Navigation */}
      <div className="flex items-center gap-3">
        <Link 
          href="/admin/dashboard/posts"
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Web Posts / Categories</span>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] rounded-2xl p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#444444]">Web Post Categories (CRUD)</h1>
          <p className="text-[#444444] mt-2 font-medium">Create, edit, and manage category classifications for your blog articles.</p>
        </div>
        <Link 
          href="/admin/dashboard/posts"
          className="bg-white/80 hover:bg-white text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all shadow-sm w-fit whitespace-nowrap"
        >
          View All Web Posts
        </Link>
      </div>

      {/* Create Form */}
      <div className="bg-white border border-slate-100 shadow-sm p-5 rounded-2xl">
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <input 
              type="text" 
              placeholder="Enter new web post category name (e.g. EDUCATION, HEALTHCARE, CSR, DISASTER RELIEF)"
              value={newCatName}
              onChange={e => setNewCatName(e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 bg-[#FCFCFA] border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#DCCFF8] transition-all text-sm text-[#444444] font-medium"
              required
            />
          </div>
          <button 
            disabled={loading} 
            type="submit" 
            className="w-full md:w-auto bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] hover:opacity-90 disabled:opacity-50 text-[#444444] text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Create Category
          </button>
        </form>
      </div>

      {/* Categories CRUD Table */}
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[40%]">Category Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[35%]">Assigned Web Posts</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-[25%]">Actions (Edit / Delete)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-sm text-slate-400">
                    No web post categories created yet. Add one above!
                  </td>
                </tr>
              )}
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                  {/* Category Name */}
                  <td className="px-6 py-4 text-sm font-bold text-[#444444]">
                    {editingCatId === c.id ? (
                      <form onSubmit={handleUpdate} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editingCatName}
                          onChange={e => setEditingCatName(e.target.value.toUpperCase())}
                          className="px-3 py-1.5 text-sm font-bold bg-white border border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
                          autoFocus
                        />
                        <button
                          type="submit"
                          disabled={editLoading}
                          className="p-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          title="Save Changes"
                        >
                          {editLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingCatId(null)}
                          className="p-1.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                          <Tag className="w-4 h-4" />
                        </div>
                        <span>{c.name}</span>
                      </div>
                    )}
                  </td>

                  {/* Assigned Posts Count */}
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">
                    <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full text-xs border border-blue-100/80">
                      {c.postCount || 0} Web Posts
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => startEdit(c)}
                        className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit Category Name"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(c.id)} 
                        className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
