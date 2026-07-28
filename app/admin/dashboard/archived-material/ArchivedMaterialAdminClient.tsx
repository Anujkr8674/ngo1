'use client'

import { useState } from 'react'
import { 
  createArchivedMaterial, 
  updateArchivedMaterial, 
  deleteArchivedMaterial, 
  reorderArchivedMaterials 
} from '@/app/actions/archivedMaterial'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  FileText, 
  UploadCloud, 
  Loader2, 
  X, 
  CheckCircle2,
  Eye,
  Download
} from 'lucide-react'

interface ArchivedMaterial {
  id: string
  title: string
  size: string
  url: string
  order: number
  createdAt: Date
  updatedAt: Date
}

interface ArchivedMaterialAdminClientProps {
  initialMaterials: ArchivedMaterial[]
}

const ITEMS_PER_PAGE = 10

export default function ArchivedMaterialAdminClient({ initialMaterials }: ArchivedMaterialAdminClientProps) {
  const [materials, setMaterials] = useState<ArchivedMaterial[]>(initialMaterials)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState<ArchivedMaterial | null>(null)
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null)
  const [previewPdfTitle, setPreviewPdfTitle] = useState<string>('')
  
  // Pagination & Search State
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  // Form States
  const [title, setTitle] = useState('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfFileName, setPdfFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [reordering, setReordering] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Open modal to Add
  const handleOpenAdd = () => {
    setEditingMaterial(null)
    setTitle('')
    setPdfFile(null)
    setPdfFileName('')
    setMessage(null)
    setIsModalOpen(true)
  }

  // Open modal to Edit
  const handleOpenEdit = (material: ArchivedMaterial) => {
    setEditingMaterial(material)
    setTitle(material.title)
    setPdfFile(null)
    setPdfFileName('')
    setMessage(null)
    setIsModalOpen(true)
  }

  // Handle PDF file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a valid PDF file.')
        return
      }
      setPdfFile(file)
      setPdfFileName(file.name)
    }
  }

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Title is required' })
      return
    }
    if (!editingMaterial && !pdfFile) {
      setMessage({ type: 'error', text: 'PDF document file is required' })
      return
    }

    setLoading(true)
    setMessage(null)

    const formData = new FormData()
    formData.append('title', title.trim())
    if (pdfFile) {
      formData.append('pdf', pdfFile)
    }

    try {
      if (editingMaterial) {
        const res = await updateArchivedMaterial(editingMaterial.id, formData)
        if (res.error) {
          setMessage({ type: 'error', text: res.error })
        } else if (res.material) {
          setMaterials(materials.map(m => m.id === editingMaterial.id ? (res.material as ArchivedMaterial) : m))
          setMessage({ type: 'success', text: 'Document updated successfully!' })
          setTimeout(() => setIsModalOpen(false), 1500)
        }
      } else {
        const res = await createArchivedMaterial(formData)
        if (res.error) {
          setMessage({ type: 'error', text: res.error })
        } else if (res.material) {
          setMaterials([res.material as ArchivedMaterial, ...materials]) // Adds at the top
          setCurrentPage(1) // Return to first page
          setMessage({ type: 'success', text: 'Document added successfully!' })
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
    if (!confirm('Are you sure you want to delete this document? This will permanently delete the file from storage.')) {
      return
    }

    setLoading(true)
    try {
      const res = await deleteArchivedMaterial(id)
      if (res.success) {
        const filtered = materials.filter(m => m.id !== id)
        setMaterials(filtered)
        
        // Reset page if it overflows
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
        if (currentPage > totalPages) {
          setCurrentPage(Math.max(1, totalPages))
        }
      } else {
        alert(res.error || 'Failed to delete document')
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
    if (targetIndex < 0 || targetIndex >= filteredMaterials.length) return

    setReordering(true)
    
    // Perform swap on active list
    const activeList = [...filteredMaterials]
    const temp = activeList[index]
    activeList[index] = activeList[targetIndex]
    activeList[targetIndex] = temp

    // Reconstruct full list with updated order
    const updatedFullList = materials.map(m => {
      const activeIdx = activeList.findIndex(am => am.id === m.id)
      if (activeIdx !== -1) {
        return activeList[activeIdx]
      }
      return m
    })

    setMaterials(updatedFullList)

    try {
      const res = await reorderArchivedMaterials(updatedFullList.map(m => m.id))
      if (!res.success) {
        alert('Failed to save order: ' + res.error)
      }
    } catch (err: any) {
      console.error(err)
    } finally {
      setReordering(false)
    }
  }

  // Filtering based on search query
  const filteredMaterials = materials.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination calculations
  const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE)
  const paginatedMaterials = filteredMaterials.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

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
                ? 'bg-blue-600 text-white'
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
          <h1 className="text-2xl font-black text-slate-800">Archived Material Management</h1>
          <p className="text-slate-500 text-sm mt-1">Upload and manage tax, compliance, operational sheets & virtual meeting transcripts.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Document
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:max-w-md relative">
          <input
            type="text"
            placeholder="Search archived materials..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-4 pr-10 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
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
          Showing {filteredMaterials.length} of {materials.length} records
        </div>
      </div>

      {/* Table List */}
      <div className="mt-6 overflow-x-auto border border-slate-100 rounded-2xl">
        <table className="w-full border-collapse text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 w-12">Sort</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4 w-24">Size</th>
              <th className="px-6 py-4 w-40">Uploaded At</th>
              <th className="px-6 py-4 w-32 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {paginatedMaterials.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  No documents found. Click "Add Document" to upload a PDF.
                </td>
              </tr>
            ) : (
              paginatedMaterials.map((doc, idx) => {
                const absoluteIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx
                const isFirst = absoluteIndex === 0
                const isLast = absoluteIndex === filteredMaterials.length - 1

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
                    <td className="px-6 py-4 font-bold text-slate-700">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-500 shrink-0" />
                        <span className="line-clamp-2">{doc.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md text-xs">
                        {doc.size}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(doc.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setPreviewPdfUrl(doc.url)
                            setPreviewPdfTitle(doc.title)
                          }}
                          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Preview PDF"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenEdit(doc)}
                          className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Document"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Document"
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
                {editingMaterial ? 'Edit Document Details' : 'Upload Archived Document'}
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
                  Document Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Annual Compliance Audit Report FY 2024-25"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-semibold"
                  required
                />
              </div>

              {/* File Upload Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  PDF Document File {editingMaterial && <span className="text-[10px] text-slate-400 font-normal lowercase">(optional: select file to replace existing)</span>}
                </label>
                
                <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-500/50 rounded-2xl p-6 transition-colors flex flex-col items-center justify-center bg-slate-50/50">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    disabled={loading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                  <p className="text-xs text-slate-500 font-semibold text-center">
                    {pdfFileName ? pdfFileName : 'Drag and drop PDF here, or click to browse'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                    PDF files only. Size is computed automatically on upload.
                  </p>
                </div>

                {editingMaterial && !pdfFile && (
                  <div className="text-[11px] text-slate-500 font-bold mt-1 bg-slate-100 px-3 py-1 rounded-md inline-block">
                    Current URL: <a href={editingMaterial.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link</a>
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
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingMaterial ? 'Save Changes' : 'Upload & Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF Previewer Modal */}
      {previewPdfUrl && (
        <div className="fixed inset-0 bg-black/60 z-[120] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] border border-slate-100 shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-500" />
                <h2 className="text-base font-black text-slate-800 truncate max-w-xl">{previewPdfTitle}</h2>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Open Fullscreen
                </a>
                <button 
                  onClick={() => {
                    setPreviewPdfUrl(null)
                    setPreviewPdfTitle('')
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-100 relative">
              <iframe
                src={`${previewPdfUrl}#toolbar=0`}
                className="w-full h-full border-none"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
