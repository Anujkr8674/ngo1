'use client'

import React, { useState } from 'react'
import { Search, Trash2, Edit, X, Plus } from 'lucide-react'
import { saveHomepageStat, deleteHomepageStat } from '@/app/actions/homepageStat'

export default function StatsAdminClient({ initialRecords }: { initialRecords: any[] }) {
  const [records, setRecords] = useState<any[]>(initialRecords)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    label: '',
    value: 0,
    suffix: '+',
    desc: '',
    order: 0,
  })

  const handleOpenCreateModal = () => {
    setSelectedRecord(null)
    setFormData({
      label: '',
      value: 0,
      suffix: '+',
      desc: '',
      order: records.length,
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (record: any) => {
    setSelectedRecord(record)
    setFormData({
      label: record.label,
      value: record.value,
      suffix: record.suffix,
      desc: record.desc,
      order: record.order,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this stat counter?')) return
    setDeletingId(id)
    try {
      const res = await deleteHomepageStat(id)
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
      const res = await saveHomepageStat(selectedRecord?.id || null, formData)
      if (res.success && res.data) {
        if (selectedRecord) {
          // Update
          setRecords(prev =>
            prev.map(r => (r.id === selectedRecord.id ? res.data : r)).sort((a, b) => a.order - b.order)
          )
        } else {
          // Insert
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
      r.label?.toLowerCase().includes(term) ||
      r.desc?.toLowerCase().includes(term)
    )
  })

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Stats Counters</h2>
          <p className="text-xs text-slate-400 mt-1">Configure live numeric counter cards rendered on the landing page.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by label or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-purple-300 text-sm transition-all"
            />
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] text-[#444444] text-xs font-semibold rounded-xl transition-all shadow-sm hover:opacity-90 w-full sm:w-auto justify-center cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add New Stat
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider font-sans">
              <th className="py-4 px-4">Order</th>
              <th className="py-4 px-4">Counter Value</th>
              <th className="py-4 px-4">Label</th>
              <th className="py-4 px-4">Description</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">
                  No records found.
                </td>
              </tr>
            ) : (
              filtered.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/55 transition-colors">
                  <td className="py-4 px-4 text-slate-500 font-bold font-sans">
                    {record.order}
                  </td>
                  <td className="py-4 px-4 text-slate-800 font-bold text-sm font-sans">
                    {record.value}{record.suffix}
                  </td>
                  <td className="py-4 px-4 text-slate-800 font-semibold">{record.label}</td>
                  <td className="py-4 px-4 text-slate-550 max-w-[250px] truncate">{record.desc}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(record)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-650 hover:text-purple-600 transition-colors cursor-pointer"
                        title="Edit Stat"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        disabled={deletingId === record.id}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-650 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Delete Stat"
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
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {selectedRecord ? 'Edit Stat Counter' : 'Add New Stat Counter'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Define landing page stat numbers and description details.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1">
              <div className="p-6 flex flex-col gap-4 text-xs">
                {/* Label */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-slate-600">Label *</label>
                  <input
                    type="text"
                    required
                    value={formData.label}
                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                    className="p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-300 text-slate-800"
                    placeholder="e.g. Students Sponsored"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Value */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-slate-600">Value *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.value}
                      onChange={e => setFormData({ ...formData, value: parseInt(e.target.value, 10) || 0 })}
                      className="p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-300 text-slate-800 font-sans"
                      placeholder="e.g. 120"
                    />
                  </div>

                  {/* Suffix */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-slate-600">Suffix (e.g. +)</label>
                    <input
                      type="text"
                      value={formData.suffix}
                      onChange={e => setFormData({ ...formData, suffix: e.target.value })}
                      className="p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-300 text-slate-800 font-sans"
                      placeholder="e.g. +"
                    />
                  </div>
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
                  <label className="font-semibold text-slate-600">Description</label>
                  <textarea
                    rows={3}
                    value={formData.desc}
                    onChange={e => setFormData({ ...formData, desc: e.target.value })}
                    className="p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-300 text-slate-800 leading-normal"
                    placeholder="e.g. Across 12 states in India in 50+ institutions"
                  />
                </div>
              </div>

              {/* Modal Footer */}
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
