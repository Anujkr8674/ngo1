'use client'

import React, { useState } from 'react'
import { Search, Trash2, Eye, X, FileText, Image as ImageIcon } from 'lucide-react'
import { deleteMember } from '@/app/actions/member'

const formatDate = (dateString: string) => {
  const d = new Date(dateString)
  if (isNaN(d.getTime())) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export default function MemberAdminClient({ initialRecords }: { initialRecords: any[] }) {
  const [records, setRecords] = useState(initialRecords)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [zoomImage, setZoomImage] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member submission?')) return
    setDeletingId(id)
    try {
      const res = await deleteMember(id)
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
      r.fatherSpouseName?.toLowerCase().includes(term) ||
      r.mobile?.toLowerCase().includes(term) ||
      r.email?.toLowerCase().includes(term) ||
      r.pancard?.toLowerCase().includes(term) ||
      r.education?.toLowerCase().includes(term) ||
      r.profession?.toLowerCase().includes(term)
    )
  })

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Member Submissions</h2>
          <p className="text-xs text-slate-400 mt-1">Manage, view, and verify registered member details and payment receipts.</p>
        </div>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, father/spouse, mobile, pancard..."
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
              <th className="py-4 px-4">Name</th>
              <th className="py-4 px-4">Father/Spouse</th>
              <th className="py-4 px-4">Mobile</th>
              <th className="py-4 px-4">PAN Card</th>
              <th className="py-4 px-4">Payment Mode</th>
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
                  <td className="py-4 px-4 text-slate-650">{record.fatherSpouseName}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{record.mobile}</td>
                  <td className="py-4 px-4 text-slate-600 font-mono">{record.pancard}</td>
                  <td className="py-4 px-4 text-slate-500">
                    <span className="inline-flex px-2 py-0.5 rounded-full font-bold text-[10px] bg-blue-50 text-blue-700 border border-blue-100">
                      {record.modeOfPayment}
                    </span>
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
                <span className="inline-flex px-2 py-0.5 rounded-full font-bold text-[10px] mb-1.5 bg-[#CBB6F5]/20 text-[#6B46C1] border border-[#CBB6F5]/40">
                  Membership Registration
                </span>
                <h3 className="text-lg font-bold text-slate-800">Member Details</h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 text-slate-700">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs">
                <div>
                  <span className="block text-slate-400 font-semibold mb-0.5">Name</span>
                  <span className="font-semibold text-slate-800 text-sm">{selectedRecord.name}</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold mb-0.5">Father / Spouse Name</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.fatherSpouseName}</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold mb-0.5">Gender</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.gender}</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold mb-0.5">Date of Birth</span>
                  <span className="font-semibold text-slate-800 font-sans">{selectedRecord.dob}</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold mb-0.5">Mobile Number</span>
                  <span className="font-semibold text-slate-800 font-sans">{selectedRecord.mobile}</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold mb-0.5">Email Address</span>
                  <span className="font-semibold text-slate-800 font-sans">{selectedRecord.email}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-slate-400 font-semibold mb-0.5">PAN Card Number</span>
                  <span className="font-semibold text-slate-800 font-mono uppercase">{selectedRecord.pancard}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-slate-400 font-semibold mb-0.5">Postal Address</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.address}, {selectedRecord.state} - {selectedRecord.postalCode}</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold mb-0.5">Education / Qualification</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.education}</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold mb-0.5">Profession</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.profession}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-slate-400 font-semibold mb-0.5">Company Name</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.company || 'N/A'}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-slate-400 font-semibold mb-0.5">Area of Interest</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedRecord.interests?.map((i: string) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium">
                        {i}
                      </span>
                    )) || <span className="text-slate-400">None selected</span>}
                  </div>
                </div>
                {selectedRecord.otherInterest && (
                  <div className="col-span-2">
                    <span className="block text-slate-400 font-semibold mb-0.5">Other Interest</span>
                    <span className="text-slate-800">{selectedRecord.otherInterest}</span>
                  </div>
                )}
                {selectedRecord.reason && (
                  <div className="col-span-2">
                    <span className="block text-slate-400 font-semibold mb-0.5">Reasons for joining</span>
                    <p className="text-slate-650 leading-relaxed font-sans bg-slate-50 p-3 rounded-xl border border-slate-100 whitespace-pre-wrap">{selectedRecord.reason}</p>
                  </div>
                )}
              </div>

              {/* Payment Info Card */}
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Fee / Payment Details</h4>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="block text-slate-405 font-semibold mb-0.5">Mode of Payment</span>
                    <span className="font-bold text-purple-700 text-sm">{selectedRecord.modeOfPayment}</span>
                  </div>
                  <div>
                    <span className="block text-slate-405 font-semibold mb-0.5">Date of Payment</span>
                    <span className="font-bold text-slate-800">{selectedRecord.paymentDate}</span>
                  </div>
                  {selectedRecord.chequeNo && (
                    <div>
                      <span className="block text-slate-405 font-semibold mb-0.5">Cheque / DD Number</span>
                      <span className="font-bold text-slate-850">{selectedRecord.chequeNo}</span>
                    </div>
                  )}
                  {selectedRecord.bankName && (
                    <div>
                      <span className="block text-slate-405 font-semibold mb-0.5">Bank Name</span>
                      <span className="font-bold text-slate-850">{selectedRecord.bankName}</span>
                    </div>
                  )}
                  {selectedRecord.transactionId && (
                    <div className="col-span-2">
                      <span className="block text-slate-405 font-semibold mb-0.5">Transaction ID / Reference Number</span>
                      <span className="font-mono font-bold text-slate-850 break-all bg-white border border-slate-200/60 p-2 rounded-lg block mt-1">{selectedRecord.transactionId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Uploaded Documents */}
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Attached Documents</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* ID Proof */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-650">ID Proof</span>
                      {selectedRecord.idProofUrl && (
                        <a
                          href={selectedRecord.idProofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-purple-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3 h-3" /> Download
                        </a>
                      )}
                    </div>
                    {selectedRecord.idProofUrl ? (
                      <div className="relative group border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 aspect-video max-h-[140px] flex items-center justify-center">
                        <img
                          src={selectedRecord.idProofUrl}
                          alt="ID Proof"
                          className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300"
                          onClick={() => setZoomImage(selectedRecord.idProofUrl)}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 pointer-events-none">
                          <Eye className="w-5 h-5 text-white" />
                          <span className="text-[10px] font-semibold text-white">Click to Zoom</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[100px] border border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-xs text-slate-400 font-medium">
                        Not Uploaded
                      </div>
                    )}
                  </div>

                  {/* Residence Proof */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-650">Residence Proof</span>
                      {selectedRecord.residenceProofUrl && (
                        <a
                          href={selectedRecord.residenceProofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-green-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3 h-3" /> Download
                        </a>
                      )}
                    </div>
                    {selectedRecord.residenceProofUrl ? (
                      <div className="relative group border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 aspect-video max-h-[140px] flex items-center justify-center">
                        <img
                          src={selectedRecord.residenceProofUrl}
                          alt="Residence Proof"
                          className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300"
                          onClick={() => setZoomImage(selectedRecord.residenceProofUrl)}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 pointer-events-none">
                          <Eye className="w-5 h-5 text-white" />
                          <span className="text-[10px] font-semibold text-white">Click to Zoom</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[100px] border border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-xs text-slate-400 font-medium">
                        Not Uploaded
                      </div>
                    )}
                  </div>

                  {/* Photo */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-650">Passport Photo</span>
                      {selectedRecord.photoUrl && (
                        <a
                          href={selectedRecord.photoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-650 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3 h-3" /> Download
                        </a>
                      )}
                    </div>
                    {selectedRecord.photoUrl ? (
                      <div className="relative group border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 aspect-video max-h-[140px] flex items-center justify-center">
                        <img
                          src={selectedRecord.photoUrl}
                          alt="Passport Photo"
                          className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300"
                          onClick={() => setZoomImage(selectedRecord.photoUrl)}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 pointer-events-none">
                          <Eye className="w-5 h-5 text-white" />
                          <span className="text-[10px] font-semibold text-white">Click to Zoom</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[100px] border border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-xs text-slate-400 font-medium">
                        Not Uploaded
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-350 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Zoom Overlay */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 cursor-pointer"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative bg-white rounded-3xl p-2 max-w-4xl max-h-[90vh] shadow-2xl flex flex-col items-center animate-scaleUp cursor-default"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/65 hover:bg-black/85 rounded-full text-white transition-colors cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={zoomImage}
              alt="Zoomed document"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="p-3 text-center text-xs text-slate-500 font-semibold font-sans">
              Original Size Image View
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
