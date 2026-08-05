'use client'

import { useState } from 'react'
import { createGalleryCategory, deleteGalleryCategory, updateGalleryCategory, reorderGalleryCategories } from '@/app/actions/gallery'
import { createBlogCategory, deleteBlogCategory, updateBlogCategory, reorderBlogCategories } from '@/app/actions/blog'
import { Loader2, Plus, Trash2, Tag, Image as ImageIcon, FileText, ArrowUp, ArrowDown, Edit2, Check, X } from 'lucide-react'

interface CategoriesClientProps {
  initialGalleryCategories: any[]
  initialBlogCategories: any[]
}

export default function CategoriesClient({ initialGalleryCategories, initialBlogCategories }: CategoriesClientProps) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'blog'>('blog')
  
  const [galleryCats, setGalleryCats] = useState(initialGalleryCategories)
  const [blogCats, setBlogCats] = useState(initialBlogCategories)
  
  const [newCatName, setNewCatName] = useState('')
  const [loading, setLoading] = useState(false)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [savingEdit, setSavingEdit] = useState(false)

  const handleStartEdit = (id: string, name: string) => {
    setEditingId(id)
    setEditingName(name)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingName('')
  }

  const handleSaveEdit = async (id: string) => {
    if (!editingName.trim()) return
    setSavingEdit(true)

    if (activeTab === 'gallery') {
      const res = await updateGalleryCategory(id, editingName)
      if (res.error) alert(res.error)
      else if (res.category) {
        setGalleryCats(galleryCats.map(c => c.id === id ? { ...c, name: res.category.name } : c))
        handleCancelEdit()
      }
    } else {
      const res = await updateBlogCategory(id, editingName)
      if (res.error) alert(res.error)
      else if (res.category) {
        setBlogCats(blogCats.map(c => c.id === id ? { ...c, name: res.category.name } : c))
        handleCancelEdit()
      }
    }
    setSavingEdit(false)
  }

  const handleMoveUp = async (index: number) => {
    if (index === 0) return
    const list = activeTab === 'gallery' ? [...galleryCats] : [...blogCats]
    const temp = list[index]
    list[index] = list[index - 1]
    list[index - 1] = temp

    if (activeTab === 'gallery') {
      setGalleryCats(list)
      const res = await reorderGalleryCategories(list.map(c => c.id))
      if (res.error) {
        alert(res.error)
        setGalleryCats(galleryCats)
      }
    } else {
      setBlogCats(list)
      const res = await reorderBlogCategories(list.map(c => c.id))
      if (res.error) {
        alert(res.error)
        setBlogCats(blogCats)
      }
    }
  }

  const handleMoveDown = async (index: number) => {
    const list = activeTab === 'gallery' ? [...galleryCats] : [...blogCats]
    if (index === list.length - 1) return
    const temp = list[index]
    list[index] = list[index + 1]
    list[index + 1] = temp

    if (activeTab === 'gallery') {
      setGalleryCats(list)
      const res = await reorderGalleryCategories(list.map(c => c.id))
      if (res.error) {
        alert(res.error)
        setGalleryCats(galleryCats)
      }
    } else {
      setBlogCats(list)
      const res = await reorderBlogCategories(list.map(c => c.id))
      if (res.error) {
        alert(res.error)
        setBlogCats(blogCats)
      }
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName.trim()) return
    setLoading(true)

    if (activeTab === 'gallery') {
      const res = await createGalleryCategory(newCatName)
      if (res.error) alert(res.error)
      else if (res.category) {
        setGalleryCats([...galleryCats, { ...res.category, imageCount: 0 }])
        setNewCatName('')
      }
    } else {
      const res = await createBlogCategory(newCatName)
      if (res.error) alert(res.error)
      else if (res.category) {
        setBlogCats([...blogCats, { ...res.category, postCount: 0 }])
        setNewCatName('')
      }
    }
    setLoading(false)
  }

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure? This will delete all images in this gallery category.')) return
    const res = await deleteGalleryCategory(id)
    if (res.success) {
      setGalleryCats(galleryCats.filter(c => c.id !== id))
    } else {
      alert(res.error)
    }
  }

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure? Posts in this category will become uncategorized.')) return
    const res = await deleteBlogCategory(id)
    if (res.success) {
      setBlogCats(blogCats.filter(c => c.id !== id))
    } else {
      alert(res.error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-[#444444]">Category Management</h1>
        <p className="text-[#444444] mt-2 font-medium">Create and manage dynamic categories for Web Posts & Photo Gallery.</p>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => { setActiveTab('blog'); setNewCatName('') }}
          className={`flex items-center gap-2 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'blog'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          Web Posts Categories ({blogCats.length})
        </button>
        <button
          onClick={() => { setActiveTab('gallery'); setNewCatName('') }}
          className={`flex items-center gap-2 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'gallery'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Gallery Categories ({galleryCats.length})
        </button>
      </div>

      {/* Add Form */}
      <div className="bg-white border border-slate-100 shadow-sm p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleAdd} className="flex-1 w-full flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder={activeTab === 'blog' ? "New Web Post Category (e.g. EDUCATION, HEALTHCARE)" : "New Gallery Category (e.g. EVENTS)"}
              value={newCatName}
              onChange={e => setNewCatName(e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 bg-[#FCFCFA] border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#DCCFF8] transition-all text-sm text-[#444444]"
            />
          </div>
          <button disabled={loading} type="submit" className="bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] hover:opacity-90 text-[#444444] text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add {activeTab === 'blog' ? 'Post Category' : 'Gallery Category'}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === 'blog' ? (
            /* Web Post Categories Table */
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">Sort</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Web Post Category</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#444444] uppercase tracking-wider">Assigned Posts</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogCats.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-[#444444]">No web post categories found. Create your first category above!</td>
                  </tr>
                )}
                {blogCats.map((c, idx) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center justify-center gap-1 w-6 mx-auto">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMoveUp(idx)}
                          className="text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === blogCats.length - 1}
                          onClick={() => handleMoveDown(idx)}
                          className="text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#444444]">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-blue-600 shrink-0" />
                        {editingId === c.id ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={e => setEditingName(e.target.value.toUpperCase())}
                            className="px-2.5 py-1.5 border border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 text-sm font-bold text-[#444444] bg-[#FCFCFA] w-full max-w-[240px]"
                            autoFocus
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleSaveEdit(c.id)
                              else if (e.key === 'Escape') handleCancelEdit()
                            }}
                          />
                        ) : (
                          <span>{c.name}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">
                      <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-md text-xs border border-blue-100">{c.postCount || 0} Posts</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === c.id ? (
                          <>
                            <button
                              disabled={savingEdit}
                              onClick={() => handleSaveEdit(c.id)}
                              className="p-1.5 border border-green-100 rounded-md text-green-500 hover:text-green-700 hover:border-green-200 hover:bg-green-50 transition-colors cursor-pointer"
                              title="Save Changes"
                            >
                              {savingEdit ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              disabled={savingEdit}
                              onClick={handleCancelEdit}
                              className="p-1.5 border border-gray-100 rounded-md text-gray-400 hover:text-gray-600 hover:border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleStartEdit(c.id, c.name)}
                              className="p-1.5 border border-blue-100 rounded-md text-blue-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
                              title="Edit Category"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(c.id)}
                              className="p-1.5 border border-red-100 rounded-md text-red-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete Category"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* Gallery Categories Table */
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">Sort</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Gallery Category</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#444444] uppercase tracking-wider">Images</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {galleryCats.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-[#444444]">No gallery categories found.</td>
                  </tr>
                )}
                {galleryCats.map((c, idx) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center justify-center gap-1 w-6 mx-auto">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMoveUp(idx)}
                          className="text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === galleryCats.length - 1}
                          onClick={() => handleMoveDown(idx)}
                          className="text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#444444]">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-blue-600 shrink-0" />
                        {editingId === c.id ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={e => setEditingName(e.target.value.toUpperCase())}
                            className="px-2.5 py-1.5 border border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 text-sm font-bold text-[#444444] bg-[#FCFCFA] w-full max-w-[240px]"
                            autoFocus
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleSaveEdit(c.id)
                              else if (e.key === 'Escape') handleCancelEdit()
                            }}
                          />
                        ) : (
                          <span>{c.name}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">
                      <span className="bg-slate-100 px-2 py-1 rounded-md text-xs font-bold text-slate-700">{c.imageCount || 0} Images</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === c.id ? (
                          <>
                            <button
                              disabled={savingEdit}
                              onClick={() => handleSaveEdit(c.id)}
                              className="p-1.5 border border-green-100 rounded-md text-green-500 hover:text-green-700 hover:border-green-200 hover:bg-green-50 transition-colors cursor-pointer"
                              title="Save Changes"
                            >
                              {savingEdit ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              disabled={savingEdit}
                              onClick={handleCancelEdit}
                              className="p-1.5 border border-gray-100 rounded-md text-gray-400 hover:text-gray-600 hover:border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleStartEdit(c.id, c.name)}
                              className="p-1.5 border border-blue-100 rounded-md text-blue-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
                              title="Edit Category"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteGallery(c.id)}
                              className="p-1.5 border border-red-100 rounded-md text-red-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete Category"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
