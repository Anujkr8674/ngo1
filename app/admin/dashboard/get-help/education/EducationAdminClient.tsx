'use client'

import React, { useState } from 'react'
import { Search, Trash2, Eye, X, FileText, Image as ImageIcon } from 'lucide-react'
import { deleteEducationSupport } from '@/app/actions/getHelp'

const formatDate = (dateString: string) => {
  const d = new Date(dateString)
  if (isNaN(d.getTime())) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export default function EducationAdminClient({ initialRecords }: { initialRecords: any[] }) {
  const [records, setRecords] = useState(initialRecords)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [zoomImage, setZoomImage] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education support request?')) return
    setDeletingId(id)
    try {
      const res = await deleteEducationSupport(id)
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
      r.studentName?.toLowerCase().includes(term) ||
      r.parentName?.toLowerCase().includes(term) ||
      r.mobile?.toLowerCase().includes(term) ||
      r.schoolName?.toLowerCase().includes(term) ||
      r.email?.toLowerCase().includes(term)
    )
  })

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Education Support Submissions</h2>
          <p className="text-xs text-slate-400 mt-1">Manage financial aid and scholarship requests for student education.</p>
        </div>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, parent name, mobile, school..."
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
              <th className="py-4 px-4">Student Name</th>
              <th className="py-4 px-4">Class</th>
              <th className="py-4 px-4">School</th>
              <th className="py-4 px-4">Parent Name</th>
              <th className="py-4 px-4">Mobile</th>
              <th className="py-4 px-4">Total Amount</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                  No records found.
                </td>
              </tr>
            ) : (
              filtered.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/55 transition-colors">
                  <td className="py-4 px-4 text-slate-500 font-medium font-sans">
                    {formatDate(record.createdAt)}
                  </td>
                  <td className="py-4 px-4 text-slate-800 font-semibold">{record.studentName}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{record.className}</td>
                  <td className="py-4 px-4 text-slate-500 max-w-[150px] truncate">{record.schoolName}</td>
                  <td className="py-4 px-4 text-slate-650">{record.parentName}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{record.mobile}</td>
                  <td className="py-4 px-4 font-bold text-blue-700">₹{record.totalAmountFigure}</td>
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
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 animate-scaleUp">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="inline-flex px-2 py-0.5 rounded-full font-bold text-[10px] mb-1.5 bg-blue-50 text-blue-700 border border-blue-100">
                  Education Support Application
                </span>
                <h3 className="text-lg font-bold text-slate-800">Student Application Details</h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
               {/* Photo preview if uploaded */}
              {selectedRecord.photoUrl && (
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <img
                    src={selectedRecord.photoUrl}
                    alt="Student Photo"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 cursor-zoom-in hover:opacity-90 transition-opacity"
                    onClick={() => setZoomImage(selectedRecord.photoUrl)}
                  />
                  <div>
                    <h4 className="text-slate-800 font-bold">Student Passport Photo</h4>
                    <span className="text-xs text-slate-400">Click image to zoom</span>
                  </div>
                </div>
              )}

              {/* Personal Details */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-purple-700 border-b border-purple-50 pb-1.5 mb-3 font-sans">Student & Family Information</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Student Name</h5>
                    <p className="font-bold text-slate-800 mt-0.5">{selectedRecord.studentName}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Class</h5>
                    <p className="font-semibold text-slate-700 mt-0.5">{selectedRecord.className}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Gender</h5>
                    <p className="mt-0.5">{selectedRecord.gender}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Date of Birth</h5>
                    <p className="mt-0.5">{selectedRecord.dob}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Parent/Guardian Name</h5>
                    <p className="font-semibold text-slate-700 mt-0.5">{selectedRecord.parentName}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Annual Income</h5>
                    <p className="font-bold text-emerald-600 mt-0.5">
                      {selectedRecord.annualIncome ? `₹${selectedRecord.annualIncome}` : 'N/A'}
                    </p>
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
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Language</h5>
                    <p className="mt-0.5">{selectedRecord.language}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Residential Address</h5>
                  <p className="mt-0.5 text-slate-700 font-medium">{selectedRecord.address}, {selectedRecord.state} - {selectedRecord.postalCode}</p>
                </div>
              </div>

              {/* School Details */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-blue-700 border-b border-blue-50 pb-1.5 mb-3 font-sans">School / Institution Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">School Name</h5>
                    <p className="font-bold text-slate-800 mt-0.5">{selectedRecord.schoolName}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">School Address</h5>
                    <p className="text-slate-700 mt-0.5">{selectedRecord.schoolAddress}, {selectedRecord.schoolState} - {selectedRecord.schoolPin}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Teacher/Principal Reference</h5>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedRecord.teacherName}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Teacher Contact Phone</h5>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedRecord.teacherPhone}</p>
                  </div>
                </div>
              </div>

              {/* Support Amounts */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-700 border-b border-emerald-50 pb-1.5 mb-3 font-sans">Fee Breakdowns & Amount Requested</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Admission Fee</h5>
                    <p className="font-semibold text-slate-750 mt-0.5">₹{selectedRecord.admissionFee || '0'}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Tuition Fee</h5>
                    <p className="font-semibold text-slate-750 mt-0.5">₹{selectedRecord.tuitionFee || '0'}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Books Cost</h5>
                    <p className="font-semibold text-slate-750 mt-0.5">₹{selectedRecord.booksCost || '0'}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Stationery Cost</h5>
                    <p className="font-semibold text-slate-750 mt-0.5">₹{selectedRecord.stationeryCost || '0'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Total Requested Amount</h5>
                    <p className="font-bold text-blue-700 text-base mt-0.5">₹{selectedRecord.totalAmountFigure}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Total in Words</h5>
                    <p className="font-medium text-slate-650 mt-0.5">{selectedRecord.totalAmountWords}</p>
                  </div>
                </div>
                {selectedRecord.otherSupport?.length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Other Educational Support Requested</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecord.otherSupport.map((support: string) => (
                        <span key={support} className="px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded-md text-xs border border-blue-100">
                          {support}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bank Account Details */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-700 border-b border-amber-50 pb-1.5 mb-3 font-sans">Bank Account Information</h4>
                <div className="grid grid-cols-2 gap-4 bg-amber-50/20 p-4 rounded-2xl border border-amber-100/30">
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Account Number</h5>
                    <p className="font-bold text-slate-800 mt-0.5 font-mono">{selectedRecord.accountNo}</p>
                  </div>
                  <div>
                    <h5 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">IFSC Code</h5>
                    <p className="font-bold text-slate-800 mt-0.5 font-mono">{selectedRecord.ifsc}</p>
                </div>
              </div>
            </div>

              {/* Documents */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Verification Documents</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedRecord.idProofUrl && (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs text-slate-500 font-medium">Uploaded ID Proof</span>
                      <img
                        src={selectedRecord.idProofUrl}
                        alt="ID Proof"
                        className="max-h-28 w-auto object-cover rounded-xl border border-slate-200 cursor-zoom-in hover:opacity-90 transition-opacity"
                        onClick={() => setZoomImage(selectedRecord.idProofUrl)}
                      />
                      <span className="text-[10px] text-slate-400">Click image to zoom</span>
                    </div>
                  )}
                  {selectedRecord.passbookUrl && (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs text-slate-500 font-medium">Passbook Scan</span>
                      <img
                        src={selectedRecord.passbookUrl}
                        alt="Passbook Scan"
                        className="max-h-28 w-auto object-cover rounded-xl border border-slate-200 cursor-zoom-in hover:opacity-90 transition-opacity"
                        onClick={() => setZoomImage(selectedRecord.passbookUrl)}
                      />
                      <span className="text-[10px] text-slate-400">Click image to zoom</span>
                    </div>
                  )}
                </div>
              </div>
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
