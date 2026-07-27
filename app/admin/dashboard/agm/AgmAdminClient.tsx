'use client'

import { useState } from 'react'
import { 
  createAgmReport, 
  updateAgmReport, 
  deleteAgmReport, 
  reorderAgmReports 
} from '@/app/actions/agm'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  FileText, 
  Calendar, 
  UploadCloud, 
  Loader2, 
  X, 
  CheckCircle2,
  Eye,
  Download
} from 'lucide-react'

function dbDateToInputDate(dbDateStr: string): string {
  if (!dbDateStr) return ''
  const parts = dbDateStr.trim().split(/\s+/)
  if (parts.length === 2) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    const monthIndex = monthNames.findIndex(m => m.toLowerCase() === parts[0].toLowerCase())
    const year = parseInt(parts[1], 10)
    if (monthIndex !== -1 && !isNaN(year)) {
      const monthStr = String(monthIndex + 1).padStart(2, '0')
      return `${year}-${monthStr}-01`
    }
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(dbDateStr)) {
    return dbDateStr
  }
  return ''
}

function inputDateToDbDate(inputDateStr: string): string {
  if (!inputDateStr) return ''
  const dateObj = new Date(inputDateStr)
  if (isNaN(dateObj.getTime())) return inputDateStr
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const month = monthNames[dateObj.getMonth()]
  const year = dateObj.getFullYear()
  return `${month} ${year}`
}

interface AgmReport {
  id: string
  title: string
  date: string
  url: string
  order: number
}

interface AgmAdminClientProps {
  initialReports: AgmReport[]
}

const ITEMS_PER_PAGE = 10

export default function AgmAdminClient({ initialReports }: AgmAdminClientProps) {
  const [reports, setReports] = useState<AgmReport[]>(initialReports)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReport, setEditingReport] = useState<AgmReport | null>(null)
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null)
  const [previewPdfTitle, setPreviewPdfTitle] = useState<string>('')
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)

  // Form States
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfFileName, setPdfFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [reordering, setReordering] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Open modal to Add
  const handleOpenAdd = () => {
    setEditingReport(null)
    setTitle('')
    setDate(new Date().toISOString().split('T')[0])
    setPdfFile(null)
    setPdfFileName('')
    setMessage(null)
    setIsModalOpen(true)
  }

  // Open modal to Edit
  const handleOpenEdit = (report: AgmReport) => {
    setEditingReport(report)
    setTitle(report.title)
    setDate(dbDateToInputDate(report.date))
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
    if (!date.trim()) {
      setMessage({ type: 'error', text: 'Date is required' })
      return
    }
    if (!editingReport && !pdfFile) {
      setMessage({ type: 'error', text: 'PDF document file is required' })
      return
    }

    setLoading(true)
    setMessage(null)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('date', inputDateToDbDate(date))
    if (pdfFile) {
      formData.append('pdf', pdfFile)
    }

    try {
      if (editingReport) {
        const res = await updateAgmReport(editingReport.id, formData)
        if (res.error) {
          setMessage({ type: 'error', text: res.error })
        } else if (res.report) {
          setReports(reports.map(r => r.id === editingReport.id ? (res.report as AgmReport) : r))
          setMessage({ type: 'success', text: 'Report updated successfully!' })
          setTimeout(() => setIsModalOpen(false), 1500)
        }
      } else {
        const res = await createAgmReport(formData)
        if (res.error) {
          setMessage({ type: 'error', text: res.error })
        } else if (res.report) {
          setReports([res.report as AgmReport, ...reports]) // Adds at the top
          setCurrentPage(1) // Return to first page to see the new item
          setMessage({ type: 'success', text: 'Report added successfully!' })
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
    if (!confirm('Are you sure you want to delete this report? This will delete the document file from storage.')) {
      return
    }

    setLoading(true)
    try {
      const res = await deleteAgmReport(id)
      if (res.success) {
        const filtered = reports.filter(r => r.id !== id)
        setReports(filtered)
        
        // Reset page if it overflows
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
        if (currentPage > totalPages) {
          setCurrentPage(Math.max(1, totalPages))
        }
      } else {
        alert(res.error || 'Failed to delete report')
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
    if (targetIndex < 0 || targetIndex >= reports.length) return

    setReordering(true)
    const updated = [...reports]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp

    setReports(updated)

    try {
      const res = await reorderAgmReports(updated.map(r => r.id))
      if (!res.success) {
        alert('Failed to save order in database: ' + res.error)
      }
    } catch (err: any) {
      console.error(err)
    } finally {
      setReordering(false)
    }
  }

  // Pagination calculations
  const totalPages = Math.ceil(reports.length / ITEMS_PER_PAGE)
  const paginatedReports = reports.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

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
        
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                currentPage === pageNum
                  ? 'bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] border-transparent text-[#444444] shadow-sm'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          )
        })}

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
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] rounded-2xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#444444]">AGM Reports Dashboard</h1>
          <p className="text-[#444444] mt-2 font-medium">Publish, sort, and manage Annual General Meeting documents and reviews.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-white text-[#444444] font-bold px-5 py-3 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4 text-purple-600" />
          Add Report PDF
        </button>
      </div>

      {/* Reports List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-6">
          <FileText className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-bold text-[#444444]">Annual Reports List</h2>
          <span className="ml-auto bg-purple-50 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-md border border-purple-100">
            {reports.length} Reports
          </span>
        </div>

        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="h-48 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm">
              No AGM reports published yet.
            </div>
          ) : (
            paginatedReports.map((r, i) => {
              // Calculate overall index
              const originalIndex = (currentPage - 1) * ITEMS_PER_PAGE + i
              return (
                <div key={r.id} className="p-4 border border-slate-100 rounded-2xl flex gap-4 items-center hover:bg-slate-50/50 transition-all group">
                  {/* File Thumbnail Icon */}
                  <div 
                    onClick={() => { setPreviewPdfUrl(r.url); setPreviewPdfTitle(r.title) }}
                    className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0 cursor-pointer hover:bg-red-100 transition-colors"
                    title="Click to view PDF inline"
                  >
                    <FileText className="w-6 h-6 fill-current opacity-20" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => { setPreviewPdfUrl(r.url); setPreviewPdfTitle(r.title) }}
                      className="font-bold text-[#444444] text-sm break-words leading-snug cursor-pointer hover:text-blue-600 transition-colors"
                    >
                      {r.title}
                    </h4>
                    
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-slate-400 mt-1">
                      <Calendar className="w-3 h-3" /> {r.date}
                    </span>
                  </div>

                  {/* Actions & Reordering */}
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <div className="flex flex-col gap-0.5">
                      <button 
                        disabled={originalIndex === 0 || reordering}
                        onClick={() => handleMove(originalIndex, 'up')}
                        className="p-1 rounded-md hover:bg-slate-200 disabled:opacity-30 text-slate-500 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        disabled={originalIndex === reports.length - 1 || reordering}
                        onClick={() => handleMove(originalIndex, 'down')}
                        className="p-1 rounded-md hover:bg-slate-200 disabled:opacity-30 text-slate-500 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="w-px h-6 bg-slate-200 mx-1" />

                    <button 
                      onClick={() => { setPreviewPdfUrl(r.url); setPreviewPdfTitle(r.title) }}
                      className="p-2 border border-slate-100 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer" 
                      title="View PDF Inline"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <a 
                      href={r.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-slate-100 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center" 
                      title="Download PDF File"
                    >
                      <Download className="w-4 h-4" />
                    </a>

                    <button 
                      onClick={() => handleOpenEdit(r)}
                      className="p-2 border border-blue-50 rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer" 
                      title="Edit Details"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button 
                      onClick={() => handleDelete(r.id)}
                      className="p-2 border border-red-50 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer" 
                      title="Delete Report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {renderPagination()}
      </div>

      {/* Add / Edit Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#444444]">
                  {editingReport ? 'Edit AGM Report Details' : 'Publish AGM Report'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Provide a title, publication date and upload the document PDF.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#444444] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 border text-sm font-medium ${
                  message.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-100' 
                    : 'bg-red-50 text-red-800 border-red-100'
                }`}>
                  {message.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                  <span>{message.text}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Report Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. AGM Dec 11 2022 or May 2026: A Journey of Collective Action"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CFE8FF] focus:border-[#90BCE6] transition-all text-sm text-[#444444]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Publication Date <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date" 
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CFE8FF] focus:border-[#90BCE6] transition-all text-sm text-[#444444]"
                  required
                />
              </div>

              {/* PDF Document Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Document PDF File <span className="text-red-500">{editingReport ? '' : '*'}</span>
                </label>
                
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#CFE8FF] hover:border-blue-400 bg-blue-50/10 hover:bg-blue-50/20 rounded-2xl cursor-pointer transition-all">
                  <div className="flex flex-col items-center justify-center p-5 text-center">
                    <UploadCloud className="w-10 h-10 text-blue-500 mb-1" />
                    <p className="text-xs font-bold text-slate-700">
                      {pdfFileName ? `Selected: ${pdfFileName}` : 'Click to upload PDF document'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">Accepts only .pdf files. Saved under &quot;agm-pdf&quot; folder in storage.</p>
                  </div>
                  <input 
                    type="file" 
                    accept="application/pdf" 
                    onChange={handleFileChange}
                    className="hidden" 
                    required={!editingReport}
                  />
                </label>
              </div>
            </form>

            {/* Footer Buttons */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-semibold border border-slate-200 rounded-xl text-slate-500 hover:text-[#444444] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] hover:opacity-90 disabled:opacity-50 text-[#444444] text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Publish Report'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Lightbox Modal Viewer */}
      {previewPdfUrl && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-pointer"
          onClick={() => setPreviewPdfUrl(null)}
        >
          <div 
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#444444] truncate max-w-xs md:max-w-xl text-base">{previewPdfTitle}</h3>
                <p className="text-[10px] text-slate-400 font-medium">Viewing Document</p>
              </div>
              
              <div className="flex items-center gap-2">
                <a 
                  href={previewPdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-[#444444] transition-colors flex items-center justify-center"
                  title="Download File"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => setPreviewPdfUrl(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#444444] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded Iframe */}
            <div className="flex-1 bg-slate-100 relative">
              <iframe 
                src={`${previewPdfUrl}#toolbar=0&navpanes=0`} 
                className="absolute inset-0 w-full h-full border-0"
                title="PDF Inline Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
