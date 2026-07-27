'use client'

import { useState } from 'react'
import { 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember, 
  reorderTeamMembers 
} from '@/app/actions/team'
import TiptapEditor from '@/app/components/TiptapEditor'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Mail, 
  Phone, 
  UploadCloud, 
  Loader2, 
  X,
  User,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  email: string | null
  mobile: string | null
  description: string
  order: number
}

interface AboutAdminClientProps {
  initialTeamMembers: TeamMember[]
}

const ITEMS_PER_PAGE = 10

export default function AboutAdminClient({ initialTeamMembers }: AboutAdminClientProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
  const [founderPage, setFounderPage] = useState(1)
  const [advisorPage, setAdvisorPage] = useState(1)
  
  // Form states
  const [name, setName] = useState('')
  const [role, setRole] = useState('Founder')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [reordering, setReordering] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Open modal for adding
  const handleOpenAdd = () => {
    setEditingMember(null)
    setName('')
    setRole('Founder')
    setEmail('')
    setMobile('')
    setDescription('')
    setImageFile(null)
    setImagePreview('')
    setMessage(null)
    setIsModalOpen(true)
  }

  // Open modal for editing
  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member)
    setName(member.name)
    setRole(member.role)
    setEmail(member.email || '')
    setMobile(member.mobile || '')
    setDescription(member.description)
    setImageFile(null)
    setImagePreview(member.image)
    setMessage(null)
    setIsModalOpen(true)
  }

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle Form Submit (Add or Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Name is required' })
      return
    }
    if (!role.trim()) {
      setMessage({ type: 'error', text: 'Role is required' })
      return
    }
    if (!description.trim() || description === '<p></p>') {
      setMessage({ type: 'error', text: 'Description is required' })
      return
    }
    if (!editingMember && !imageFile) {
      setMessage({ type: 'error', text: 'Image is required for new team members' })
      return
    }

    setLoading(true)
    setMessage(null)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('role', role)
    formData.append('email', email)
    formData.append('mobile', mobile)
    formData.append('description', description)
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      if (editingMember) {
        const res = await updateTeamMember(editingMember.id, formData)
        if (res.error) {
          setMessage({ type: 'error', text: res.error })
        } else if (res.member) {
          setMembers(members.map(m => m.id === editingMember.id ? (res.member as TeamMember) : m))
          setMessage({ type: 'success', text: 'Team member updated successfully!' })
          setTimeout(() => setIsModalOpen(false), 1500)
        }
      } else {
        const res = await createTeamMember(formData)
        if (res.error) {
          setMessage({ type: 'error', text: res.error })
        } else if (res.member) {
          setMembers([...members, res.member as TeamMember])
          setMessage({ type: 'success', text: 'Team member added successfully!' })
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
    if (!confirm('Are you sure you want to delete this team member? This will also delete their image from storage.')) {
      return
    }

    setLoading(true)
    try {
      const res = await deleteTeamMember(id)
      if (res.success) {
        const newMembers = members.filter(m => m.id !== id)
        setMembers(newMembers)
        
        // Adjust pagination page if needed
        const newFounders = newMembers.filter(m => m.role.toLowerCase() === 'founder')
        const newGuidance = newMembers.filter(m => m.role.toLowerCase() !== 'founder')
        
        const newTotalFounderPages = Math.ceil(newFounders.length / ITEMS_PER_PAGE)
        const newTotalAdvisorPages = Math.ceil(newGuidance.length / ITEMS_PER_PAGE)
        
        if (founderPage > newTotalFounderPages) {
          setFounderPage(Math.max(1, newTotalFounderPages))
        }
        if (advisorPage > newTotalAdvisorPages) {
          setAdvisorPage(Math.max(1, newTotalAdvisorPages))
        }
      } else {
        alert(res.error || 'Failed to delete team member')
      }
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // Handle Reordering
  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (reordering) return
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= members.length) return

    setReordering(true)
    const updatedMembers = [...members]
    const temp = updatedMembers[index]
    updatedMembers[index] = updatedMembers[targetIndex]
    updatedMembers[targetIndex] = temp

    setMembers(updatedMembers)

    try {
      const res = await reorderTeamMembers(updatedMembers.map(m => m.id))
      if (!res.success) {
        console.error('Reordering failed:', res.error)
        alert('Failed to save the new order in database: ' + res.error)
      }
    } catch (err: any) {
      console.error(err)
    } finally {
      setReordering(false)
    }
  }

  const renderPagination = (currentPage: number, totalPages: number, setPage: (page: number) => void) => {
    if (totalPages <= 1) return null

    return (
      <div className="flex items-center justify-center gap-1.5 mt-6 pt-4 border-t border-slate-100">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => setPage(pageNum)}
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
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    )
  }

  // Grouping members for display
  const founders = members.filter(m => m.role.toLowerCase() === 'founder')
  const guidance = members.filter(m => m.role.toLowerCase() !== 'founder')

  const totalFounderPages = Math.ceil(founders.length / ITEMS_PER_PAGE)
  const totalAdvisorPages = Math.ceil(guidance.length / ITEMS_PER_PAGE)

  const paginatedFounders = founders.slice((founderPage - 1) * ITEMS_PER_PAGE, founderPage * ITEMS_PER_PAGE)
  const paginatedGuidance = guidance.slice((advisorPage - 1) * ITEMS_PER_PAGE, advisorPage * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] rounded-2xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#444444]">About Us Backend Portal</h1>
          <p className="text-[#444444] mt-2 font-medium">Add, edit, reorder, or remove Founders and Leadership/Advisor members dynamically.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-white text-[#444444] font-bold px-5 py-3 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4 text-purple-600" />
          Add Member
        </button>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Founders Column */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#444444]">Founders Section</h2>
              <p className="text-xs text-slate-500 font-medium">Members with the exact role of &quot;Founder&quot;</p>
            </div>
            <span className="ml-auto bg-purple-50 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-md border border-purple-100">
              {founders.length}
            </span>
          </div>

          <div className="space-y-4 flex-1">
            {founders.length === 0 ? (
              <div className="h-48 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                No founders added yet.
              </div>
            ) : (
              paginatedFounders.map((m, i) => {
                // Find overall index in members array for reordering
                const originalIndex = members.findIndex(item => item.id === m.id)
                return (
                  <div key={m.id} className="p-4 border border-slate-100 rounded-xl flex gap-4 items-start hover:bg-slate-50/50 transition-all group">
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="w-20 h-20 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0 cursor-pointer hover:opacity-85 transition-opacity" 
                      onClick={() => setPreviewImageUrl(m.image)}
                      title="Click to view full image"
                    />
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <h4 className="font-bold text-[#444444] text-sm break-words leading-snug">{m.name}</h4>
                      <p className="text-xs text-purple-600 font-bold">{m.role}</p>
                      
                      <div className="flex flex-col gap-1 mt-1 text-slate-400">
                        {m.email && (
                          <span className="flex items-center gap-1.5 text-[11px] font-medium">
                            <Mail className="w-3.5 h-3.5 shrink-0" />
                            <span className="break-all select-all">{m.email}</span>
                          </span>
                        )}
                        {m.mobile && (
                          <span className="flex items-center gap-1.5 text-[11px] font-medium">
                            <Phone className="w-3.5 h-3.5 shrink-0" />
                            <span className="break-words select-all">{m.mobile}</span>
                          </span>
                        )}
                      </div>

                      {/* Actions and Sorting Row */}
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <button 
                            disabled={originalIndex === 0 || reordering}
                            onClick={() => handleMove(originalIndex, 'up')}
                            className="p-1 rounded-md hover:bg-slate-200 disabled:opacity-30 text-slate-500 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            disabled={originalIndex === members.length - 1 || reordering}
                            onClick={() => handleMove(originalIndex, 'down')}
                            className="p-1 rounded-md hover:bg-slate-200 disabled:opacity-30 text-slate-500 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => handleOpenEdit(m)}
                            className="p-1.5 border border-blue-50 rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer" 
                            title="Edit Member"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(m.id)}
                            className="p-1.5 border border-red-50 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer" 
                            title="Delete Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
            {renderPagination(founderPage, totalFounderPages, setFounderPage)}
          </div>
        </div>

        {/* Guidance Column */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#444444]">Advisors & Guidance Team</h2>
              <p className="text-xs text-slate-500 font-medium">Members with advisor or other specific leadership titles</p>
            </div>
            <span className="ml-auto bg-orange-50 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-md border border-orange-100">
              {guidance.length}
            </span>
          </div>

          <div className="space-y-4 flex-1">
            {guidance.length === 0 ? (
              <div className="h-48 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                No advisor team members added yet.
              </div>
            ) : (
              paginatedGuidance.map((m, i) => {
                const originalIndex = members.findIndex(item => item.id === m.id)
                return (
                  <div key={m.id} className="p-4 border border-slate-100 rounded-xl flex gap-4 items-start hover:bg-slate-50/50 transition-all group">
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="w-20 h-20 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0 cursor-pointer hover:opacity-85 transition-opacity" 
                      onClick={() => setPreviewImageUrl(m.image)}
                      title="Click to view full image"
                    />
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <h4 className="font-bold text-[#444444] text-sm break-words leading-snug">{m.name}</h4>
                      <p className="text-xs text-orange-600 font-bold">{m.role}</p>
                      
                      <div className="flex flex-col gap-1 mt-1 text-slate-400">
                        {m.email && (
                          <span className="flex items-center gap-1.5 text-[11px] font-medium">
                            <Mail className="w-3.5 h-3.5 shrink-0" />
                            <span className="break-all select-all">{m.email}</span>
                          </span>
                        )}
                        {m.mobile && (
                          <span className="flex items-center gap-1.5 text-[11px] font-medium">
                            <Phone className="w-3.5 h-3.5 shrink-0" />
                            <span className="break-words select-all">{m.mobile}</span>
                          </span>
                        )}
                      </div>

                      {/* Actions and Sorting Row */}
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <button 
                            disabled={originalIndex === 0 || reordering}
                            onClick={() => handleMove(originalIndex, 'up')}
                            className="p-1 rounded-md hover:bg-slate-200 disabled:opacity-30 text-slate-500 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            disabled={originalIndex === members.length - 1 || reordering}
                            onClick={() => handleMove(originalIndex, 'down')}
                            className="p-1 rounded-md hover:bg-slate-200 disabled:opacity-30 text-slate-500 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => handleOpenEdit(m)}
                            className="p-1.5 border border-blue-50 rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer" 
                            title="Edit Member"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(m.id)}
                            className="p-1.5 border border-red-50 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer" 
                            title="Delete Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
            {renderPagination(advisorPage, totalAdvisorPages, setAdvisorPage)}
          </div>
        </div>

      </div>

      {/* Modal Dialog Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#444444]">
                  {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Fill in the details. Form supports TipTap rich text description.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#444444] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
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

              {/* Grid 2 Column Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Tarun Maiti"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CFE8FF] focus:border-[#90BCE6] transition-all text-sm text-[#444444]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                    Role Title <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={role.startsWith('Advisor') ? 'Advisor' : role === 'Founder' ? 'Founder' : 'Custom'}
                      onChange={e => {
                        const val = e.target.value
                        if (val === 'Founder') setRole('Founder')
                        else if (val === 'Advisor') setRole('Advisor (Education)')
                        else setRole('')
                      }}
                      className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm text-[#444444]"
                    >
                      <option value="Founder">Founder</option>
                      <option value="Advisor">Advisor</option>
                      <option value="Custom">Custom Role</option>
                    </select>
                    <input 
                      type="text" 
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      placeholder="e.g. Advisor (Healthcare)"
                      className="flex-1 w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CFE8FF] focus:border-[#90BCE6] transition-all text-sm text-[#444444]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. info@live4help.org"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CFE8FF] focus:border-[#90BCE6] transition-all text-sm text-[#444444]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                    Mobile Number / Contact Display
                  </label>
                  <input 
                    type="text" 
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    placeholder="e.g. +91 98107 45206 or In Remembrance"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CFE8FF] focus:border-[#90BCE6] transition-all text-sm text-[#444444]"
                  />
                </div>
              </div>

              {/* Image upload area */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Profile Picture <span className="text-red-500">{editingMember ? '' : '*'}</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Preview box */}
                  <div 
                    className={`md:col-span-3 h-28 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden relative group ${imagePreview ? 'cursor-pointer' : ''}`}
                    onClick={() => imagePreview && setPreviewImageUrl(imagePreview)}
                    title={imagePreview ? "Click to view full image" : ""}
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold bg-black/60 px-2 py-1 rounded-md">View Original</span>
                        </div>
                      </>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold uppercase">No Photo</span>
                    )}
                  </div>

                  {/* Drag drop upload container */}
                  <label className="md:col-span-9 flex flex-col items-center justify-center h-28 border-2 border-dashed border-[#CFE8FF] hover:border-blue-400 bg-blue-50/10 hover:bg-blue-50/20 rounded-xl cursor-pointer transition-all">
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <UploadCloud className="w-8 h-8 text-blue-500 mb-1.5" />
                      <p className="text-xs font-bold text-slate-700">Click to upload photo</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Supports PNG, JPG, JPEG. Saved under &quot;Aboutus&quot; Supabase folder.</p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="hidden" 
                      required={!editingMember}
                    />
                  </label>
                </div>
              </div>

              {/* Rich Text Editor */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Description / Biography <span className="text-red-500">*</span>
                </label>
                <TiptapEditor content={description} onChange={setDescription} />
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
                  'Save Team Member'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Image Preview Modal */}
      {previewImageUrl && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewImageUrl(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setPreviewImageUrl(null)}
              className="absolute -top-12 right-0 md:-top-4 md:-right-12 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={previewImageUrl} 
              alt="Full Preview" 
              className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl border-4 border-white bg-slate-900 cursor-default"
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
