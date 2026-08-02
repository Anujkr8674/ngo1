'use client'

import React, { useState } from 'react'
import { Search, Trash2, CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import { toggleCommentApproval, deleteBlogComment } from '@/app/actions/blogComment'
import Link from 'next/link'

export default function CommentsAdminClient({ initialRecords }: { initialRecords: any[] }) {
  const [records, setRecords] = useState<any[]>(initialRecords)
  const [searchTerm, setSearchTerm] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    setTogglingId(id)
    try {
      const res = await toggleCommentApproval(id, !currentStatus)
      if (res.success && res.data) {
        setRecords(prev =>
          prev.map(r => (r.id === id ? { ...r, approved: res.data.approved } : r))
        )
      } else {
        alert(res.error || 'Failed to update approval status')
      }
    } catch (err: any) {
      alert(err.message || 'Error updating record')
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return
    setDeletingId(id)
    try {
      const res = await deleteBlogComment(id)
      if (res.success) {
        setRecords(prev => prev.filter(r => r.id !== id))
      } else {
        alert(res.error || 'Failed to delete comment')
      }
    } catch (err: any) {
      alert(err.message || 'Error deleting record')
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = records.filter(r => {
    const term = searchTerm.toLowerCase()
    return (
      r.name?.toLowerCase().includes(term) ||
      r.email?.toLowerCase().includes(term) ||
      r.content?.toLowerCase().includes(term) ||
      r.blog?.title?.toLowerCase().includes(term)
    )
  })

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Blog Comments</h2>
          <p className="text-xs text-slate-400 mt-1">Moderate user discussions and replies posted on blog campaigns.</p>
        </div>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by author, email, comment, or blog title..."
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
              <th className="py-4 px-4">Author</th>
              <th className="py-4 px-4">Comment Details</th>
              <th className="py-4 px-4">Blog Post</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">
                  No comments found.
                </td>
              </tr>
            ) : (
              filtered.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/55 transition-colors">
                  <td className="py-4 px-4 text-slate-800 font-bold max-w-[180px] truncate">
                    <div>{record.name}</div>
                    <div className="text-[10px] text-slate-400 font-medium font-sans mt-0.5">{record.email}</div>
                    {record.website && (
                      <a 
                        href={record.website.startsWith('http') ? record.website : `https://${record.website}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[9px] text-purple-500 hover:underline inline-flex items-center gap-0.5 mt-0.5"
                      >
                        {record.website} <ExternalLink className="w-2 h-2" />
                      </a>
                    )}
                  </td>
                  <td className="py-4 px-4 text-slate-600 max-w-[320px] whitespace-pre-wrap leading-relaxed">
                    {record.content}
                    <div className="text-[9px] text-slate-400 font-sans mt-1.5">
                      {new Date(record.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-medium max-w-[200px] truncate">
                    <Link 
                      href={`/blog/${record.blog?.slug}`}
                      target="_blank"
                      className="hover:text-blue-500 hover:underline"
                    >
                      {record.blog?.title || 'Unknown Post'}
                    </Link>
                  </td>
                  <td className="py-4 px-4">
                    <span 
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        record.approved 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {record.approved ? 'Approved' : 'Hidden'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => handleToggleApproval(record.id, record.approved)}
                        disabled={togglingId === record.id}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          record.approved
                            ? 'bg-amber-50 border-amber-100 text-amber-600 hover:bg-amber-100'
                            : 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100'
                        }`}
                        title={record.approved ? 'Unapprove Comment' : 'Approve Comment'}
                      >
                        {record.approved ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        disabled={deletingId === record.id}
                        className="p-1.5 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Delete Comment"
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
    </div>
  )
}
