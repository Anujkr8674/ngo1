'use client'

import { useState } from 'react'
import { deleteContactMessage } from '@/app/actions/contact'
import { 
  Trash2, 
  Eye, 
  X, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  MessageSquare
} from 'lucide-react'

interface ContactMessage {
  id: string
  name: string
  email: string
  mobile: string
  subject: string
  message: string
  createdAt: Date
}

interface ContactAdminClientProps {
  initialMessages: ContactMessage[]
}

const ITEMS_PER_PAGE = 10

export default function ContactAdminClient({ initialMessages }: ContactAdminClientProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages)
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null)
  
  // Search & Pagination State
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  // Filtering based on search query
  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.mobile.includes(searchQuery)
  )

  // Pagination calculations
  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE)
  const paginatedMessages = filteredMessages.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // Delete message
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message submission? This action is permanent.')) {
      return
    }

    setLoading(true)
    try {
      const res = await deleteContactMessage(id)
      if (res.success) {
        const filtered = messages.filter(m => m.id !== id)
        setMessages(filtered)
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
        if (currentPage > totalPages) {
          setCurrentPage(Math.max(1, totalPages))
        }
      } else {
        alert(res.error || 'Failed to delete message')
      }
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

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
      <div className="pb-6 border-b border-slate-100">
        <h1 className="text-2xl font-black text-slate-800 font-display">Contact Messages</h1>
        <p className="text-slate-500 text-sm mt-1">Review, search, and manage incoming user form submissions from the contact page.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:max-w-md relative">
          <input
            type="text"
            placeholder="Search by name, email, subject, phone..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
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
          Showing {filteredMessages.length} of {messages.length} submissions
        </div>
      </div>

      {/* Table List */}
      <div className="mt-6 overflow-x-auto border border-slate-100 rounded-2xl">
        <table className="w-full border-collapse text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Sender Info</th>
              <th className="px-6 py-4">Phone Number</th>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Received Date</th>
              <th className="px-6 py-4 w-28 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {paginatedMessages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-semibold">
                  No message submissions logged.
                </td>
              </tr>
            ) : (
              paginatedMessages.map((msg) => (
                <tr key={msg.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">{msg.name}</span>
                      <span className="text-xs text-slate-400">{msg.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <span>{msg.mobile}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-700 block truncate max-w-xs">{msg.subject}</span>
                    <span className="text-xs text-slate-400 line-clamp-1 max-w-xs">{msg.message}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {new Date(msg.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setActiveMessage(msg)}
                        className="p-2 text-slate-400 hover:text-purple-650 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => handleDelete(msg.id)}
                        className="p-2 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                        title="Delete submission"
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

      {renderPagination()}

      {/* Details Lightbox Modal */}
      {activeMessage && (
        <div className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-800 font-display">Contact Submission Details</h2>
              <button 
                onClick={() => setActiveMessage(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <User className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div className="flex flex-col text-sm">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sender Name</span>
                    <span className="font-bold text-slate-700 mt-0.5">{activeMessage.name}</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Mail className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div className="flex flex-col text-sm">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Address</span>
                    <a href={`mailto:${activeMessage.email}`} className="font-bold text-purple-650 hover:underline mt-0.5">{activeMessage.email}</a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Phone className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div className="flex flex-col text-sm">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Phone Number</span>
                    <a href={`tel:${activeMessage.mobile}`} className="font-bold text-slate-700 mt-0.5 hover:underline">{activeMessage.mobile}</a>
                  </div>
                </div>

                {/* Date */}
                <div className="flex gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div className="flex flex-col text-sm">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Received Date</span>
                    <span className="font-bold text-slate-700 mt-0.5">
                      {new Date(activeMessage.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-3">
                <MessageSquare className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div className="flex flex-col text-sm">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Subject</span>
                  <span className="font-bold text-slate-800 mt-0.5">{activeMessage.subject}</span>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Message Body</span>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans font-medium">
                  {activeMessage.message}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex">
                <button
                  onClick={() => setActiveMessage(null)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2.5 rounded-xl text-sm transition-all text-center cursor-pointer hover:opacity-90 shadow-sm"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
