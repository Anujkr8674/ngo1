'use client'

import React, { useState } from 'react'
import { Search, Trash2, Eye, X, FileText } from 'lucide-react'
import { deleteMedicalSupport } from '@/app/actions/getHelp'

const formatDate = (dateString: string) => {
  const d = new Date(dateString)
  if (isNaN(d.getTime())) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export default function MedicalAdminClient({ initialRecords }: { initialRecords: any[] }) {
  const [records, setRecords] = useState(initialRecords)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [zoomImage, setZoomImage] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this medical support request?')) return
    setDeletingId(id)
    try {
      const res = await deleteMedicalSupport(id)
      if (res.success) {
        setRecords(prev => prev.filter(r => r.id !== id))
        if (selectedRecord && selectedRecord.id === id) {
          setSelectedRecord(null)
        }
      } else {
        alert(res.error || 'Failed to delete record')
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred during deletion')
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = records.filter(r => {
    const term = searchTerm.toLowerCase()
    return (
      r.name?.toLowerCase().includes(term) ||
      r.mobile?.toLowerCase().includes(term) ||
      r.state?.toLowerCase().includes(term) ||
      r.healthStatus?.toLowerCase().includes(term) ||
      r.email?.toLowerCase().includes(term)
    )
  })

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Medical Support Submissions</h2>
          <p className="text-xs text-slate-400 mt-1">Manage diagnostics, doctor consultation, and treatment funding assistance.</p>
        </div>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by patient name, mobile, health status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-purple-300 text-sm transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider font-sans">
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4">Patient Name</th>
              <th className="py-4 px-4">Gender</th>
              <th className="py-4 px-4">DOB</th>
              <th className="py-4 px-4">Mobile</th>
              <th className="py-4 px-4">Support Types</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">
                  No records found.
                </td>
              </tr>
            ) : (
              filtered.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/55 transition-colors">
                  <td className="py-4 px-4 text-slate-500 font-medium font-sans">
                    {formatDate(record.createdAt)}
                  </td>
                  <td className="py-4 px-4 text-slate-800 font-semibold">{record.name}</td>
                  <td className="py-4 px-4 text-slate-650">{record.gender}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium font-sans">{record.dob}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{record.mobile}</td>
                  <td className="py-4 px-4 text-slate-500 max-w-[180px] truncate">
                    {record.supportTypes?.join(', ') || 'None'}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-purple-600 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        disabled={deletingId === record.id}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-650 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Delete Submission"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 animate-scaleUp">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="inline-flex px-2 py-0.5 rounded-full font-bold text-[10px] mb-1.5 bg-red-50 text-red-700 border border-red-100">
                  Medical Support Request
                </span>
                <h3 className="text-lg font-bold text-slate-800">Patient & Treatment Details</h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-650">
              {/* Personal Details */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-purple-700 border-b border-purple-50 pb-1.5 mb-3 font-sans">Patient Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Patient Name</h5>
                    <p className="font-bold text-slate-800 mt-0.5">{selectedRecord.name}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Gender</h5>
                    <p className="mt-0.5">{selectedRecord.gender}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Date of Birth</h5>
                    <p className="mt-0.5 font-sans">{selectedRecord.dob}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Mobile</h5>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedRecord.mobile}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Email</h5>
                    <p className="font-medium text-slate-650 mt-0.5">{selectedRecord.email || 'N/A'}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Preferred Language</h5>
                    <p className="mt-0.5">{selectedRecord.language}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Postal Code</h5>
                    <p className="mt-0.5 font-sans">{selectedRecord.postalCode}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Residential Address</h5>
                  <p className="mt-0.5 text-slate-750 font-medium">{selectedRecord.address}, {selectedRecord.state}</p>
                </div>
              </div>

              {/* Health and Treatment details */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-blue-700 border-b border-blue-50 pb-1.5 mb-3 font-sans">Medical Requirements</h4>
                <div className="space-y-3">
                  {selectedRecord.healthStatus && (
                    <div>
                      <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Current Health Status / Medications</h5>
                      <p className="mt-0.5 font-medium text-slate-700">{selectedRecord.healthStatus}</p>
                    </div>
                  )}
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Medical Support Category Required</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecord.supportTypes?.length > 0 ? (
                        selectedRecord.supportTypes.map((type: string) => (
                          <span key={type} className="px-2.5 py-1 bg-blue-50 text-blue-700 font-semibold rounded-lg text-xs border border-blue-100">
                            {type}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 text-xs">None</span>
                      )}
                    </div>
                  </div>
                  {selectedRecord.otherSupport && (
                    <div>
                      <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Other Medical Support Needed</h5>
                      <p className="mt-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-700 font-sans">{selectedRecord.otherSupport}</p>
                    </div>
                  )}
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Reason for Request</h5>
                    <p className="mt-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-700 font-sans">{selectedRecord.reason}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              {selectedRecord.idProofUrl && (
                <div className="border-t border-slate-100 pt-4">
                  <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Patient ID Document</h4>
                  <div className="flex flex-col items-start gap-1">
                    <img
                      src={selectedRecord.idProofUrl}
                      alt="Patient ID Proof"
                      className="max-h-24 w-auto object-cover rounded-xl border border-slate-200 cursor-zoom-in hover:opacity-90 transition-opacity"
                      onClick={() => setZoomImage(selectedRecord.idProofUrl)}
                    />
                    <span className="text-[10px] text-slate-400">Click image to zoom</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 transition-all text-slate-600 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Image Zoom Modal */}
      {zoomImage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 cursor-pointer" onClick={() => setZoomImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2 flex flex-col shadow-2xl cursor-default animate-scaleUp" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/75 rounded-full text-white transition-all cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={zoomImage}
              alt="Zoomed document"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="p-3 text-center text-xs text-slate-500 font-semibold bg-slate-50 border-t border-slate-100 font-sans">
              Original Size Image Preview
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
