'use client'

import { useState, useEffect } from 'react'
import { 
  createStudentSheet, 
  updateStudentSheet, 
  deleteStudentSheet, 
  reorderStudentSheets 
} from '@/app/actions/studentSheet'
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
  ExternalLink
} from 'lucide-react'

interface StudentSheet {
  id: string
  title: string
  src: string
  order: number
  createdAt: Date
  updatedAt: Date
}

interface StudentSheetAdminClientProps {
  initialSheets: StudentSheet[]
}

const ITEMS_PER_PAGE = 10

export default function StudentSheetAdminClient({ initialSheets }: StudentSheetAdminClientProps) {
  const [sheets, setSheets] = useState<StudentSheet[]>(initialSheets)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSheet, setEditingSheet] = useState<StudentSheet | null>(null)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
  const [previewImageTitle, setPreviewImageTitle] = useState<string>('')
  
  // Pagination & Search State
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  // Form States
  const [title, setTitle] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageFileName, setImageFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [reordering, setReordering] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl])

  // Open modal to Add
  const handleOpenAdd = () => {
    setEditingSheet(null)
    setTitle('')
    setImageFile(null)
    setImageFileName('')
    setImagePreviewUrl(null)
    setMessage(null)
    setIsModalOpen(true)
  }

  // Open modal to Edit
  const handleOpenEdit = (sheet: StudentSheet) => {
    setEditingSheet(sheet)
    setTitle(sheet.title)
    setImageFile(null)
    setImageFileName('')
    setImagePreviewUrl(sheet.src)
    setMessage(null)
    setIsModalOpen(true)
  }

  // Handle image file selection
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

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Title is required' })
      return
    }
    if (!editingSheet && !imageFile) {
      setMessage({ type: 'error', text: 'Image file is required' })
      return
    }

    setLoading(true)
    setMessage(null)

    const formData = new FormData()
    formData.append('title', title.trim())
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      if (editingSheet) {
        const res = await updateStudentSheet(editingSheet.id, formData)
        if (res.error) {
          setMessage({ type: 'error', text: res.error })
        } else if (res.sheet) {
          setSheets(sheets.map(s => s.id === editingSheet.id ? (res.sheet as StudentSheet) : s))
          setMessage({ type: 'success', text: 'Record updated successfully!' })
          setTimeout(() => setIsModalOpen(false), 1500)
        }
      } else {
        const res = await createStudentSheet(formData)
        if (res.error) {
          setMessage({ type: 'error', text: res.error })
        } else if (res.sheet) {
          setSheets([...sheets, res.sheet as StudentSheet]) // Adds at the end
          setCurrentPage(Math.ceil((sheets.length + 1) / ITEMS_PER_PAGE)) // Return to last page to see it
          setMessage({ type: 'success', text: 'Record added successfully!' })
          setTimeout(() => setIsModalOpen(false), 1500)
        }
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student sheet? This will permanently delete the file from storage.')) {
      return
    }

    setLoading(true)
    try {
      const res = await deleteStudentSheet(id)
      if (res.success) {
        const filtered = sheets.filter(s => s.id !== id)
        setSheets(filtered)
        
        // Reset page if it overflows
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
        if (currentPage > totalPages) {
          setCurrentPage(Math.max(1, totalPages))
        }
      } else {
        alert(res.error || 'Failed to delete record')
      }
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // Handle Move / Reorder
  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (reordering) return
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= filteredSheets.length) return

    setReordering(true)
    
    const item1 = filteredSheets[index]
    const item2 = filteredSheets[targetIndex]

    const idx1 = sheets.findIndex(s => s.id === item1.id)
    const idx2 = sheets.findIndex(s => s.id === item2.id)

    if (idx1 !== -1 && idx2 !== -1) {
      const updatedFullList = [...sheets]
      const temp = updatedFullList[idx1]
      updatedFullList[idx1] = updatedFullList[idx2]
      updatedFullList[idx2] = temp

      setSheets(updatedFullList)

      try {
        const res = await reorderStudentSheets(updatedFullList.map(s => s.id))
        if (!res.success) {
          alert('Failed to save order: ' + res.error)
          setSheets(sheets)
        }
      } catch (err: any) {
        console.error(err)
        setSheets(sheets)
      } finally {
        setReordering(false)
      }
    } else {
      setReordering(false)
    }
  }

  // Filtering based on search query
  const filteredSheets = sheets.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination calculations
  const totalPages = Math.ceil(filteredSheets.length / ITEMS_PER_PAGE)
  const paginatedSheets = filteredSheets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

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
                ? 'bg-purple-650 bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Student Sheets & Insights</h1>
          <p className="text-slate-500 text-sm mt-1">Upload and manage active student metrics, coaching schedules, and display sheets.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Student Sheet
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:max-w-md relative">
          <input
            type="text"
            placeholder="Search sheets by title..."
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
        <div className="text-slate-400 text-xs font-semibold">
          Showing {filteredSheets.length} of {sheets.length} records
        </div>
      </div>

      {/* Table List */}
      <div className="mt-6 overflow-x-auto border border-slate-100 rounded-2xl">
        <table className="w-full border-collapse text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 w-12">Sort</th>
              <th className="px-6 py-4 w-28">Preview</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4 w-32">Source</th>
              <th className="px-6 py-4 w-40">Uploaded At</th>
              <th className="px-6 py-4 w-32 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {paginatedSheets.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                  No sheets found. Click "Add Student Sheet" to upload.
                </td>
              </tr>
            ) : (
              paginatedSheets.map((doc, idx) => {
                const absoluteIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx
                const isFirst = absoluteIndex === 0
                const isLast = absoluteIndex === filteredSheets.length - 1
                const isSupabase = doc.src.startsWith('http')

                return (
                  <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 items-center justify-center">
                        <button
                          disabled={isFirst || reordering}
                          onClick={() => handleMove(absoluteIndex, 'up')}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          disabled={isLast || reordering}
                          onClick={() => handleMove(absoluteIndex, 'down')}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div 
                        onClick={() => {
                          setPreviewImageUrl(doc.src)
                          setPreviewImageTitle(doc.title)
                        }}
                        className="w-16 aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 cursor-zoom-in relative group/thumb"
                      >
                        <img 
                          src={doc.src} 
                          alt={doc.title} 
                          className="w-full h-full object-cover object-top" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700">
                      <span className="line-clamp-2">{doc.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isSupabase 
                          ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {isSupabase ? 'Supabase' : 'Public'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(doc.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setPreviewImageUrl(doc.src)
                            setPreviewImageTitle(doc.title)
                          }}
                          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Preview Image"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={doc.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                          title="Open Fullscreen"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenEdit(doc)}
                          className="p-2 text-slate-400 hover:text-purple-650 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Title / File"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Sheet"
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

      {/* Upload/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-800">
                {editingSheet ? 'Edit Sheet Details' : 'Upload Student Sheet'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {message && (
                <div className={`p-4 rounded-xl flex items-start gap-3 border text-sm ${
                  message.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-100' 
                    : 'bg-red-50 text-red-850 border-red-100'
                }`}>
                  {message.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                  <div>{message.text}</div>
                </div>
              )}

              {/* Title Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Sheet Title / Identifier
                </label>
                <input
                  type="text"
                  placeholder="e.g. Students Active Registry List 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm font-semibold"
                  required
                />
              </div>

              {/* File Upload Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Student Image File {editingSheet && <span className="text-[10px] text-slate-400 font-normal lowercase">(optional: select file to replace)</span>}
                </label>
                
                <div className="relative border-2 border-dashed border-slate-200 hover:border-purple-500/50 rounded-2xl p-6 transition-colors flex flex-col items-center justify-center bg-slate-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={loading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                  <p className="text-xs text-slate-500 font-semibold text-center">
                    {imageFileName ? imageFileName : 'Drag and drop image here, or click to browse'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                    PNG, JPG, JPEG, WEBP files.
                  </p>
                </div>

                {editingSheet && !imageFile && (
                  <div className="text-[11px] text-slate-500 font-bold mt-1 bg-slate-100 px-3 py-1 rounded-md inline-block">
                    Current Image URL: <a href={editingSheet.src} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Link</a>
                  </div>
                )}

                {imagePreviewUrl && (
                  <div className="mt-3 flex flex-col items-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 self-start">Image Preview (Click to Zoom)</p>
                    <div 
                      onClick={() => {
                        setPreviewImageUrl(imagePreviewUrl)
                        setPreviewImageTitle(title || 'Selected Image Preview')
                      }}
                      className="w-32 aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 cursor-zoom-in hover:opacity-90 relative group/preview"
                    >
                      <img 
                        src={imagePreviewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover object-top" 
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center transition-opacity">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingSheet ? 'Save Changes' : 'Upload & Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Previewer Modal */}
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
