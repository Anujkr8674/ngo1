'use client'

import { useState, useEffect } from 'react'
import { 
  createInitiativeCategory, 
  updateInitiativeCategory, 
  deleteInitiativeCategory, 
  reorderInitiativeCategories,
  createInitiative, 
  updateInitiative, 
  deleteInitiative, 
  reorderInitiatives 
} from '@/app/actions/initiative'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Image as ImageIcon, 
  UploadCloud, 
  Loader2, 
  X, 
  CheckCircle2,
  Eye,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Compass,
  Sparkles,
  Layers,
  FileText,
  HelpCircle
} from 'lucide-react'

interface InitiativeCategory {
  id: string
  name: string
  slug: string
  iconName: string
  order: number
}

interface Initiative {
  id: string
  title: string
  desc: string
  details: string
  sponsor: string
  image: string
  order: number
  categoryId: string
  category: InitiativeCategory
  createdAt: Date
  updatedAt: Date
}

interface InitiativeAdminClientProps {
  initialCategories: InitiativeCategory[]
  initialInitiatives: Initiative[]
}

const ITEMS_PER_PAGE = 10

// A map to render dynamic Lucide icons for categories
export function renderCategoryIcon(iconName: string, className = "w-5 h-5") {
  switch (iconName) {
    case 'GraduationCap': return <GraduationCap className={className} />
    case 'HeartHandshake': return <HeartHandshake className={className} />
    case 'Leaf': return <Leaf className={className} />
    case 'Compass': return <Compass className={className} />
    case 'Sparkles': return <Sparkles className={className} />
    case 'HelpCircle': return <HelpCircle className={className} />
    default: return <Sparkles className={className} />
  }
}

export default function InitiativeAdminClient({ initialCategories, initialInitiatives }: InitiativeAdminClientProps) {
  const [activeTab, setActiveTab] = useState<'initiatives' | 'categories'>('initiatives')
  const [categories, setCategories] = useState<InitiativeCategory[]>(initialCategories)
  const [initiatives, setInitiatives] = useState<Initiative[]>(initialInitiatives)

  // Lightbox Preview State
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
  const [previewImageTitle, setPreviewImageTitle] = useState<string>('')

  // ----------------------------------------
  // CATEGORIES MANAGEMENT STATE & HANDLERS
  // ----------------------------------------
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<InitiativeCategory | null>(null)
  const [categoryName, setCategoryName] = useState('')
  const [categorySlug, setCategorySlug] = useState('')
  const [categoryIcon, setCategoryIcon] = useState('Sparkles')
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [categoryMessage, setCategoryMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleOpenAddCategory = () => {
    setEditingCategory(null)
    setCategoryName('')
    setCategorySlug('')
    setCategoryIcon('Sparkles')
    setCategoryMessage(null)
    setIsCategoryModalOpen(true)
  }

  const handleOpenEditCategory = (cat: InitiativeCategory) => {
    setEditingCategory(cat)
    setCategoryName(cat.name)
    setCategorySlug(cat.slug)
    setCategoryIcon(cat.iconName)
    setCategoryMessage(null)
    setIsCategoryModalOpen(true)
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryName.trim() || !categorySlug.trim()) {
      setCategoryMessage({ type: 'error', text: 'Name and slug are required' })
      return
    }

    setCategoryLoading(true)
    setCategoryMessage(null)

    try {
      if (editingCategory) {
        const res = await updateInitiativeCategory(editingCategory.id, categoryName, categorySlug, categoryIcon)
        if (res.error) {
          setCategoryMessage({ type: 'error', text: res.error })
        } else if (res.category) {
          setCategories(categories.map(c => c.id === editingCategory.id ? (res.category as InitiativeCategory) : c))
          setCategoryMessage({ type: 'success', text: 'Category updated successfully!' })
          setTimeout(() => setIsCategoryModalOpen(false), 1500)
        }
      } else {
        const res = await createInitiativeCategory(categoryName, categorySlug, categoryIcon)
        if (res.error) {
          setCategoryMessage({ type: 'error', text: res.error })
        } else if (res.category) {
          setCategories([...categories, res.category as InitiativeCategory])
          setCategoryMessage({ type: 'success', text: 'Category created successfully!' })
          setTimeout(() => setIsCategoryModalOpen(false), 1500)
        }
      }
    } catch (err: any) {
      setCategoryMessage({ type: 'error', text: err.message || 'Something went wrong' })
    } finally {
      setCategoryLoading(false)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? It will fail if initiatives are still using it.')) {
      return
    }
    try {
      const res = await deleteInitiativeCategory(id)
      if (res.success) {
        setCategories(categories.filter(c => c.id !== id))
      } else {
        alert(res.error || 'Failed to delete category')
      }
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
    }
  }

  const handleCategoryMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= categories.length) return

    const updated = [...categories]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp

    setCategories(updated)

    try {
      const res = await reorderInitiativeCategories(updated.map(c => c.id))
      if (!res.success) {
        alert('Failed to save category order: ' + res.error)
      }
    } catch (err: any) {
      console.error(err)
    }
  }

  // Auto-generate slug from category name when writing
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setCategoryName(val)
    if (!editingCategory) {
      setCategorySlug(val.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''))
    }
  }

  // ----------------------------------------
  // INITIATIVES MANAGEMENT STATE & HANDLERS
  // ----------------------------------------
  const [isInitiativeModalOpen, setIsInitiativeModalOpen] = useState(false)
  const [editingInitiative, setEditingInitiative] = useState<Initiative | null>(null)
  
  // Initiative Form Fields
  const [iniTitle, setIniTitle] = useState('')
  const [iniDesc, setIniDesc] = useState('')
  const [iniDetails, setIniDetails] = useState('')
  const [iniSponsor, setIniSponsor] = useState('')
  const [iniCategoryId, setIniCategoryId] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageFileName, setImageFileName] = useState('')
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  const [iniLoading, setIniLoading] = useState(false)
  const [iniReordering, setIniReordering] = useState(false)
  const [iniMessage, setIniMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Search & Pagination
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    return () => {
      if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl])

  const handleOpenAddInitiative = () => {
    setEditingInitiative(null)
    setIniTitle('')
    setIniDesc('')
    setIniDetails('')
    setIniSponsor('')
    setIniCategoryId(categories[0]?.id || '')
    setImageFile(null)
    setImageFileName('')
    setImagePreviewUrl(null)
    setIniMessage(null)
    setIsInitiativeModalOpen(true)
  }

  const handleOpenEditInitiative = (ini: Initiative) => {
    setEditingInitiative(ini)
    setIniTitle(ini.title)
    setIniDesc(ini.desc)
    setIniDetails(ini.details)
    setIniSponsor(ini.sponsor)
    setIniCategoryId(ini.categoryId)
    setImageFile(null)
    setImageFileName('')
    setImagePreviewUrl(ini.image)
    setIniMessage(null)
    setIsInitiativeModalOpen(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (PNG, JPG, JPEG, WEBP).')
        return
      }
      setImageFile(file)
      setImageFileName(file.name)
      setImagePreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleInitiativeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!iniTitle.trim() || !iniDesc.trim() || !iniCategoryId) {
      setIniMessage({ type: 'error', text: 'Title, Description, and Category are required' })
      return
    }
    if (!editingInitiative && !imageFile) {
      setIniMessage({ type: 'error', text: 'Image file is required' })
      return
    }

    setIniLoading(true)
    setIniMessage(null)

    const formData = new FormData()
    formData.append('title', iniTitle.trim())
    formData.append('desc', iniDesc.trim())
    formData.append('details', iniDetails.trim())
    formData.append('sponsor', iniSponsor.trim())
    formData.append('categoryId', iniCategoryId)
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      if (editingInitiative) {
        const res = await updateInitiative(editingInitiative.id, formData)
        if (res.error) {
          setIniMessage({ type: 'error', text: res.error })
        } else if (res.initiative) {
          setInitiatives(initiatives.map(i => i.id === editingInitiative.id ? (res.initiative as Initiative) : i))
          setIniMessage({ type: 'success', text: 'Initiative updated successfully!' })
          setTimeout(() => setIsInitiativeModalOpen(false), 1500)
        }
      } else {
        const res = await createInitiative(formData)
        if (res.error) {
          setIniMessage({ type: 'error', text: res.error })
        } else if (res.initiative) {
          setInitiatives([...initiatives, res.initiative as Initiative])
          setCurrentPage(Math.ceil((initiatives.length + 1) / ITEMS_PER_PAGE))
          setIniMessage({ type: 'success', text: 'Initiative created successfully!' })
          setTimeout(() => setIsInitiativeModalOpen(false), 1500)
        }
      }
    } catch (err: any) {
      setIniMessage({ type: 'error', text: err.message || 'Something went wrong' })
    } finally {
      setIniLoading(false)
    }
  }

  const handleDeleteInitiative = async (id: string) => {
    if (!confirm('Are you sure you want to delete this initiative? This will permanently remove the record and storage image.')) {
      return
    }
    try {
      const res = await deleteInitiative(id)
      if (res.success) {
        const filtered = initiatives.filter(i => i.id !== id)
        setInitiatives(filtered)
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
        if (currentPage > totalPages) {
          setCurrentPage(Math.max(1, totalPages))
        }
      } else {
        alert(res.error || 'Failed to delete initiative')
      }
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
    }
  }

  const handleInitiativeMove = async (index: number, direction: 'up' | 'down') => {
    if (iniReordering) return
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= filteredInitiatives.length) return

    setIniReordering(true)

    const activeList = [...filteredInitiatives]
    const temp = activeList[index]
    activeList[index] = activeList[targetIndex]
    activeList[targetIndex] = temp

    const updatedFullList = initiatives.map(i => {
      const activeIdx = activeList.findIndex(ai => ai.id === i.id)
      if (activeIdx !== -1) {
        return activeList[activeIdx]
      }
      return i
    })

    setInitiatives(updatedFullList)

    try {
      const res = await reorderInitiatives(updatedFullList.map(i => i.id))
      if (!res.success) {
        alert('Failed to save order: ' + res.error)
      }
    } catch (err: any) {
      console.error(err)
    } finally {
      setIniReordering(false)
    }
  }

  // Filter initiatives by search query
  const filteredInitiatives = initiatives.filter(i => 
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination calculations
  const totalPages = Math.ceil(filteredInitiatives.length / ITEMS_PER_PAGE)
  const paginatedInitiatives = filteredInitiatives.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const renderPagination = () => {
    if (totalPages <= 1) return null

    return (
      <div className="flex items-center justify-center gap-1.5 mt-8 pt-4 border-t border-slate-100">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={`w-8 h-8 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              currentPage === p
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                : 'border border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
      {/* Header and Switch Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Initiatives & Categories</h1>
          <p className="text-slate-500 text-sm mt-1">Manage active NGO field operations, program categories, and sponsors.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('initiatives')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'initiatives'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            Initiatives
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Categories
          </button>
        </div>
      </div>

      {/* ----------------------------------------
          TAB 1: INITIATIVES MANAGEMENT PANEL
          ---------------------------------------- */}
      {activeTab === 'initiatives' && (
        <div className="mt-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="w-full sm:max-w-md relative">
              <input
                type="text"
                placeholder="Search initiatives by title or category..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-4 pr-10 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={handleOpenAddInitiative}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              Add Initiative
            </button>
          </div>

          {/* Initiatives Table */}
          <div className="overflow-x-auto border border-slate-100 rounded-2xl">
            <table className="w-full border-collapse text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 w-12">Sort</th>
                  <th className="px-6 py-4 w-28">Image</th>
                  <th className="px-6 py-4">Title & Description</th>
                  <th className="px-6 py-4 w-32">Category</th>
                  <th className="px-6 py-4 w-40">Sponsor</th>
                  <th className="px-6 py-4 w-32 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {paginatedInitiatives.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      No initiatives found. Click "Add Initiative" to create one.
                    </td>
                  </tr>
                ) : (
                  paginatedInitiatives.map((item, idx) => {
                    const absoluteIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx
                    const isFirst = absoluteIndex === 0
                    const isLast = absoluteIndex === filteredInitiatives.length - 1

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1 items-center justify-center">
                            <button
                              disabled={isFirst || iniReordering}
                              onClick={() => handleInitiativeMove(absoluteIndex, 'up')}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              disabled={isLast || iniReordering}
                              onClick={() => handleInitiativeMove(absoluteIndex, 'down')}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div 
                            onClick={() => {
                              setPreviewImageUrl(item.image)
                              setPreviewImageTitle(item.title)
                            }}
                            className="w-16 aspect-[16/10] rounded-lg overflow-hidden border border-slate-200 cursor-zoom-in relative group/thumb"
                          >
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                              <Eye className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1 max-w-lg">
                            <span className="font-bold text-slate-700 line-clamp-1">{item.title}</span>
                            <span className="text-xs text-slate-400 line-clamp-2 font-normal leading-relaxed">{item.desc}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            {renderCategoryIcon(item.category.iconName, "w-4 h-4 text-purple-650")}
                            <span className="font-bold text-xs uppercase tracking-wider">{item.category.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-700 font-semibold text-xs line-clamp-1 bg-slate-100 px-2 py-1 rounded border border-slate-200/50 w-fit">
                            {item.sponsor}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setPreviewImageUrl(item.image)
                                setPreviewImageTitle(item.title)
                              }}
                              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <a
                              href={item.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => handleOpenEditInitiative(item)}
                              className="p-2 text-slate-400 hover:text-purple-650 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteInitiative(item.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {renderPagination()}
        </div>
      )}

      {/* ----------------------------------------
          TAB 2: CATEGORIES MANAGEMENT PANEL
          ---------------------------------------- */}
      {activeTab === 'categories' && (
        <div className="mt-6 space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Configure dynamic initiative filtering categories</p>
            <button
              onClick={handleOpenAddCategory}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>

          {/* Categories Table */}
          <div className="overflow-x-auto border border-slate-100 rounded-2xl">
            <table className="w-full border-collapse text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 w-12">Sort</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4 w-28">Icon</th>
                  <th className="px-6 py-4 w-32 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                      No categories defined. Click "Add Category" to get started.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat, idx) => {
                    const isFirst = idx === 0
                    const isLast = idx === categories.length - 1

                    return (
                      <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1 items-center justify-center">
                            <button
                              disabled={isFirst}
                              onClick={() => handleCategoryMove(idx, 'up')}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              disabled={isLast}
                              onClick={() => handleCategoryMove(idx, 'down')}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-700">
                          {cat.name}
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-slate-500">
                          {cat.slug}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1 rounded-xl w-fit text-xs font-bold border border-slate-200/50">
                            {renderCategoryIcon(cat.iconName, "w-4 h-4 text-slate-650")}
                            <span>{cat.iconName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditCategory(cat)}
                              className="p-2 text-slate-400 hover:text-purple-650 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------------------
          MODAL A: ADD / EDIT INITIATIVE
          ---------------------------------------- */}
      {isInitiativeModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-800">
                {editingInitiative ? 'Edit Initiative Details' : 'Add New Initiative'}
              </h2>
              <button 
                onClick={() => setIsInitiativeModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInitiativeSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {iniMessage && (
                <div className={`p-4 rounded-xl flex items-start gap-3 border text-sm ${
                  iniMessage.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-100' 
                    : 'bg-red-50 text-red-850 border-red-100'
                }`}>
                  {iniMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                  <div>{iniMessage.text}</div>
                </div>
              )}

              {/* Title Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Mangrove Plantation Campaign"
                  value={iniTitle}
                  onChange={(e) => setIniTitle(e.target.value)}
                  disabled={iniLoading}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm font-semibold"
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Category</label>
                <select
                  value={iniCategoryId}
                  onChange={(e) => setIniCategoryId(e.target.value)}
                  disabled={iniLoading}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm font-semibold bg-white"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Description (desc) */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Short Description</label>
                <textarea
                  placeholder="Summarize this initiative in 2 sentences..."
                  value={iniDesc}
                  onChange={(e) => setIniDesc(e.target.value)}
                  disabled={iniLoading}
                  rows={2}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm font-semibold"
                  required
                />
              </div>

              {/* Details Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Detailed Impact Metrics / Stats</label>
                <textarea
                  placeholder="e.g. Benefited 300+ daily wage workers. Planted 3000 saplings in Sundarbans."
                  value={iniDetails}
                  onChange={(e) => setIniDetails(e.target.value)}
                  disabled={iniLoading}
                  rows={2}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm font-semibold"
                />
              </div>

              {/* Sponsor Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Sponsor / Supporter</label>
                <input
                  type="text"
                  placeholder="e.g. Patrons, ABS Professional India Pvt Ltd"
                  value={iniSponsor}
                  onChange={(e) => setIniSponsor(e.target.value)}
                  disabled={iniLoading}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm font-semibold"
                />
              </div>

              {/* Image File Uploader */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Initiative Image {editingInitiative && <span className="text-[10px] text-slate-400 font-normal lowercase">(optional: replace)</span>}
                </label>
                <div className="relative border-2 border-dashed border-slate-200 hover:border-purple-500/50 rounded-2xl p-6 transition-colors flex flex-col items-center justify-center bg-slate-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={iniLoading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                  <p className="text-xs text-slate-500 font-semibold text-center">
                    {imageFileName ? imageFileName : 'Drag and drop image here, or click to browse'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-semibold">PNG, JPG, JPEG, WEBP files.</p>
                </div>

                {imagePreviewUrl && (
                  <div className="mt-3 flex flex-col items-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 self-start">Image Preview (Click to Zoom)</p>
                    <div 
                      onClick={() => {
                        setPreviewImageUrl(imagePreviewUrl)
                        setPreviewImageTitle(iniTitle || 'Selected Image Preview')
                      }}
                      className="w-36 aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 cursor-zoom-in hover:opacity-90 relative group/preview"
                    >
                      <img 
                        src={imagePreviewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center transition-opacity">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInitiativeModalOpen(false)}
                  disabled={iniLoading}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={iniLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {iniLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingInitiative ? 'Save Changes' : 'Create & Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------------------------------
          MODAL B: ADD / EDIT CATEGORY
          ---------------------------------------- */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-800">
                {editingCategory ? 'Edit Category' : 'Add Initiative Category'}
              </h2>
              <button 
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
              {categoryMessage && (
                <div className={`p-4 rounded-xl flex items-start gap-3 border text-sm ${
                  categoryMessage.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-100' 
                    : 'bg-red-50 text-red-850 border-red-100'
                }`}>
                  {categoryMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                  <div>{categoryMessage.text}</div>
                </div>
              )}

              {/* Category Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Relief Work"
                  value={categoryName}
                  onChange={handleNameChange}
                  disabled={categoryLoading}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm font-semibold"
                  required
                />
              </div>

              {/* Category Slug */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Category Slug (URL path)</label>
                <input
                  type="text"
                  placeholder="e.g. relief"
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  disabled={categoryLoading || !!editingCategory}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm font-semibold font-mono disabled:bg-slate-50 disabled:text-slate-400"
                  required
                />
              </div>

              {/* Category Icon Selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Display Icon</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                  {['GraduationCap', 'HeartHandshake', 'Leaf', 'Compass', 'Sparkles', 'HelpCircle'].map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setCategoryIcon(icon)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                        categoryIcon === icon 
                          ? 'border-purple-600 bg-purple-50 text-purple-600 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      {renderCategoryIcon(icon, "w-5 h-5")}
                      <span className="text-[9px] mt-1 font-semibold truncate max-w-full leading-none">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  disabled={categoryLoading}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={categoryLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {categoryLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------------------------------
          MODAL C: IMAGE PREVIEW LIGHTBOX
          ---------------------------------------- */}
      {previewImageUrl && (
        <div className="fixed inset-0 bg-black/80 z-[120] backdrop-blur-sm flex items-center justify-center p-4 sm:p-8" onClick={() => setPreviewImageUrl(null)}>
          <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 p-2" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-4 right-4 z-50">
              <button 
                onClick={() => {
                  setPreviewImageUrl(null)
                  setPreviewImageTitle('')
                }}
                className="p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer shadow"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <img
              src={previewImageUrl}
              alt={previewImageTitle}
              className="max-w-[85vw] max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="py-3 px-4 w-full text-center bg-slate-50 border-t border-slate-100 rounded-b-2xl shrink-0 font-bold text-slate-700 text-sm">
              {previewImageTitle}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
