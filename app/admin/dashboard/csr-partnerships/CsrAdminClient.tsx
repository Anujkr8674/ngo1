'use client'

import React, { useState } from 'react'
import { Search, Trash2, Edit, X, Plus } from 'lucide-react'
import { saveCsrPartnership, deleteCsrPartnership } from '@/app/actions/csrPartnership'

export default function CsrAdminClient({ initialRecords }: { initialRecords: any[] }) {
  const [records, setRecords] = useState<any[]>(initialRecords)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    company: '',
    desc: '',
    order: 0,
  })

  const handleOpenCreateModal = () => {
    setSelectedRecord(null)
    setFormData({
      company: '',
      desc: '',
      order: records.length,
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (record: any) => {
    setSelectedRecord(record)
    setFormData({
      company: record.company,
      desc: record.desc,
      order: record.order,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this CSR partnership card?')) return
    setDeletingId(id)
    try {
      const res = await deleteCsrPartnership(id)
      if (res.success) {
        setRecords(prev => prev.filter(r => r.id !== id))
      } else {
        alert(res.error || 'Failed to delete record')
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred during deletion')
    } finally {
      setDeletingId(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await saveCsrPartnership(selectedRecord?.id || null, formData)
      if (res.success && res.data) {
        if (selectedRecord) {
          setRecords(prev =>
            prev.map(r => (r.id === selectedRecord.id ? res.data : r)).sort((a, b) => a.order - b.order)
          )
        } else {
          setRecords(prev => [...prev, res.data].sort((a, b) => a.order - b.order))
        }
        setIsModalOpen(false)
      } else {
        alert(res.error || 'Failed to save record')
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred during submission')
    } finally {
      setSaving(false)
    }
  }

  const filtered = records.filter(r => {
    const term = searchTerm.toLowerCase()
    return (
      r.company?.toLowerCase().includes(term) ||
      r.desc?.toLowerCase().includes(term)
    )
  })

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">CSR Partnerships</h2>
          <p className="text-xs text-slate-400 mt-1">Configure landing page cards showcasing corporate social responsibility partners.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by partner name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-purple-300 text-sm transition-all"
            />
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] text-xs font-semibold rounded-xl transition-all shadow-sm hover:opacity-90 w-full sm:w-auto justify-center cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add Partner
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider font-sans">
              <th className="py-4 px-4">Order</th>
              <th className="py-4 px-4">Partner/Company</th>
              <th className="py-4 px-4">Description of Project</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400 font-medium">
                  No partners found.
                </td>
              </tr>
            ) : (
              filtered.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/55 transition-colors">
                  <td className="py-4 px-4 text-slate-500 font-bold font-sans">
                    {record.order}
                  </td>
                  <td className="py-4 px-4 text-slate-800 font-bold text-sm">
                    {record.company}
                  </td>
                  <td className="py-4 px-4 text-slate-550 max-w-[300px] truncate">{record.desc}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(record)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-650 hover:text-purple-600 transition-colors cursor-pointer"
                        title="Edit Partner"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        disabled={deletingId === record.id}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-650 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Delete Partner"
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

      {/* Edit/Create Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden flex flex-col shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {selectedRecord ? 'Edit CSR Partner' : 'Add CSR Partner'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Configure corporate details for partnerships.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1">
              <div className="p-6 flex flex-col gap-4 text-xs">
                {/* Company Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-slate-600">Partner / Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-300 text-slate-800"
                    placeholder="e.g. M/s Erbe Medical India"
                  />
                </div>

                {/* Display Order */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-slate-600">Display Order</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.order}
                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })}
                    className="p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-300 text-slate-800 font-sans"
                    placeholder="e.g. 0"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-slate-600">Description of Support *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.desc}
                    onChange={e => setFormData({ ...formData, desc: e.target.value })}
                    className="p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-300 text-slate-800 leading-normal"
                    placeholder="e.g. Generously supported the mangrove restoration project..."
                  />
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] font-semibold rounded-xl transition-all shadow-sm hover:opacity-90 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
