'use client'

import { useState } from 'react'
import { deleteDonation } from '@/app/actions/donation'
import { 
  Trash2, 
  Eye, 
  X, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  MapPin,
  CreditCard,
  FileText
} from 'lucide-react'

interface Donation {
  id: string
  title: string
  name: string
  mobile: string
  email: string
  state: string
  address: string
  postalCode: string
  amount: number
  purpose: string
  paymentMode: string
  dateOfPayment: string
  transactionId: string
  panCard: string | null
  suggestions: string | null
  createdAt: Date
}

interface DonationAdminClientProps {
  initialDonations: Donation[]
}

const ITEMS_PER_PAGE = 10

export default function DonationAdminClient({ initialDonations }: DonationAdminClientProps) {
  const [donations, setDonations] = useState<Donation[]>(initialDonations)
  const [activeDonation, setActiveDonation] = useState<Donation | null>(null)
  
  // Search & Pagination State
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  // Filtering based on search query
  const filteredDonations = donations.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.mobile.includes(searchQuery)
  )

  // Pagination calculations
  const totalPages = Math.ceil(filteredDonations.length / ITEMS_PER_PAGE)
  const paginatedDonations = filteredDonations.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // Delete donation
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this donation record? This action is permanent.')) {
      return
    }

    setLoading(true)
    try {
      const res = await deleteDonation(id)
      if (res.success) {
        const filtered = donations.filter(d => d.id !== id)
        setDonations(filtered)
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
        if (currentPage > totalPages) {
          setCurrentPage(Math.max(1, totalPages))
        }
      } else {
        alert(res.error || 'Failed to delete donation record')
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
        <h1 className="text-2xl font-black text-slate-800 font-display">Donations</h1>
        <p className="text-slate-500 text-sm mt-1">Review, search, and manage incoming user donation form submissions.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:max-w-md relative">
          <input
            type="text"
            placeholder="Search by name, email, transaction UTR, purpose..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm bg-white"
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
          Showing {filteredDonations.length} of {donations.length} submissions
        </div>
      </div>

      {/* Table List */}
      <div className="mt-6 overflow-x-auto border border-slate-100 rounded-2xl">
        <table className="w-full border-collapse text-left text-sm text-slate-500">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Donor Name</th>
              <th className="px-6 py-4">Mobile</th>
              <th className="px-6 py-4">Purpose</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Payment Date</th>
              <th className="px-6 py-4">Transaction UTR</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 border-t border-slate-100">
            {paginatedDonations.length > 0 ? (
              paginatedDonations.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    <span className="text-xs text-slate-400 mr-1">{d.title}</span> {d.name}
                  </td>
                  <td className="px-6 py-4">{d.mobile}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-[#DCCFF8]/40 text-[#444444] text-[10px] font-bold uppercase">
                      {d.purpose}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">₹{d.amount}</td>
                  <td className="px-6 py-4">{d.dateOfPayment}</td>
                  <td className="px-6 py-4 font-mono text-xs">{d.transactionId}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setActiveDonation(d)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer border-0 bg-transparent"
                        title="View Details"
                      >
                        <Eye className="w-4.5 h-4.5" />
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => handleDelete(d.id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-40 transition-colors cursor-pointer border-0 bg-transparent"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileText className="w-8 h-8 text-slate-300" />
                    <span className="font-semibold text-sm">No donation submissions found</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {renderPagination()}

      {/* Details Modal */}
      {activeDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-slate-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setActiveDonation(null)}
              className="absolute right-6 top-6 w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer border-0"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    <span className="text-sm font-normal text-slate-400 mr-1">{activeDonation.title}</span>
                    {activeDonation.name}
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">Submitted on {new Date(activeDonation.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Contact Info</span>
                  <div className="mt-2.5 space-y-2 text-sm text-slate-700 font-medium">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <a href={`mailto:${activeDonation.email}`} className="hover:text-purple-600 hover:underline">{activeDonation.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span>{activeDonation.mobile}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Donation & Purpose</span>
                  <div className="mt-2.5 space-y-2 text-sm text-slate-900 font-bold">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-normal">Amount:</span>
                      <span className="text-lg text-emerald-600">₹{activeDonation.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-normal">Purpose:</span>
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] uppercase font-bold">
                        {activeDonation.purpose}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 col-span-1">
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Address details</span>
                  <div className="mt-2.5 text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl flex gap-3 items-start border border-slate-100">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold leading-relaxed">{activeDonation.address}</p>
                      <p className="text-xs text-slate-400 font-bold mt-1">
                        State: {activeDonation.state} | Postal Code: {activeDonation.postalCode}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Payment Details</span>
                  <div className="mt-2.5 space-y-2 text-sm text-slate-700 font-semibold">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-slate-400" />
                      <span>Method: <strong className="text-slate-900">{activeDonation.paymentMode}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Date: <strong className="text-slate-900">{activeDonation.dateOfPayment}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span className="font-mono text-xs">UTR: <strong className="text-slate-900">{activeDonation.transactionId}</strong></span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">80G Details</span>
                  <div className="mt-2.5 space-y-2 text-sm text-slate-700 font-semibold">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>PAN Card: <strong className="text-slate-900 font-mono text-xs">{activeDonation.panCard || 'Not Provided'}</strong></span>
                    </div>
                  </div>
                </div>

                {activeDonation.suggestions && (
                  <div className="md:col-span-2 col-span-1 border-t border-slate-100 pt-4">
                    <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Suggestions / Comments</span>
                    <p className="mt-2.5 text-sm text-slate-600 bg-purple-50/30 border border-purple-50 p-4 rounded-2xl leading-relaxed italic">
                      "{activeDonation.suggestions}"
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveDonation(null)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border-0"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
