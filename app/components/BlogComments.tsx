'use client'

import React, { useState, useEffect } from 'react'
import { getBlogComments, addBlogComment } from '@/app/actions/blogComment'
import { MessageSquare, Calendar, User, Globe } from 'lucide-react'

interface BlogCommentsProps {
  blogId: string
}

export default function BlogComments({ blogId }: BlogCommentsProps) {
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    content: '',
  })
  const [saveInfo, setSaveInfo] = useState(false)

  // Load comments and saved preferences on mount
  useEffect(() => {
    async function loadComments() {
      try {
        const data = await getBlogComments(blogId)
        setComments(data)
      } catch (err) {
        console.error('Failed to load comments:', err)
      } finally {
        setLoading(false)
      }
    }

    loadComments()

    // Restore saved details from localStorage
    const savedName = localStorage.getItem('comment_name')
    const savedEmail = localStorage.getItem('comment_email')
    const savedWebsite = localStorage.getItem('comment_website')
    if (savedName || savedEmail || savedWebsite) {
      setFormData(prev => ({
        ...prev,
        name: savedName || '',
        email: savedEmail || '',
        website: savedWebsite || '',
      }))
      setSaveInfo(true)
    }
  }, [blogId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!formData.content.trim()) {
      setError('Please write a comment message.')
      return
    }
    if (!formData.name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!formData.email.trim()) {
      setError('Please enter your email.')
      return
    }

    setSubmitting(true)
    try {
      const res = await addBlogComment(blogId, {
        name: formData.name,
        email: formData.email,
        content: formData.content,
        website: formData.website,
      })

      if (res.success && res.data) {
        setComments(prev => [...prev, res.data])
        setFormData(prev => ({ ...prev, content: '' })) // Clear message only
        setSuccess(true)

        // Save details to localStorage if selected
        if (saveInfo) {
          localStorage.setItem('comment_name', formData.name)
          localStorage.setItem('comment_email', formData.email)
          localStorage.setItem('comment_website', formData.website)
        } else {
          localStorage.removeItem('comment_name')
          localStorage.removeItem('comment_email')
          localStorage.removeItem('comment_website')
        }
      } else {
        setError(res.error || 'Failed to submit comment.')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full mt-12 pt-8 border-t border-slate-100 flex flex-col gap-10">
      
      {/* Comments List */}
      <div>
        <h3 className="font-display font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Comments ({comments.length})
        </h3>

        {loading ? (
          <div className="py-6 text-slate-400 text-xs font-medium">Loading comments...</div>
        ) : comments.length === 0 ? (
          <p className="text-slate-450 text-xs font-medium italic">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          <div className="flex flex-col gap-6">
            {comments.map((comment) => (
              <div 
                key={comment.id}
                className="p-5 md:p-6 bg-slate-50 border border-slate-200/60 rounded-2xl flex flex-col gap-3.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/50 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{comment.name}</h4>
                      {comment.website && (
                        <a 
                          href={comment.website.startsWith('http') ? comment.website : `https://${comment.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Globe className="w-3 h-3" />
                          {comment.website}
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium sm:text-right">
                    <Calendar className="w-3 h-3 text-slate-300" />
                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-line font-medium font-sans">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Leave A Reply Form Section */}
      <div className="bg-slate-50/60 rounded-3xl p-6 md:p-8 border border-slate-200/60">
        <h4 className="text-sm font-black tracking-wider text-slate-500 uppercase mb-6 font-sans">
          Leave a reply
        </h4>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          {/* Main Comment Textarea */}
          <div className="flex flex-col">
            <textarea
              rows={5}
              required
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              className="p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 text-slate-800 placeholder-slate-400 leading-relaxed"
              placeholder="Comment..."
            />
          </div>

          {/* Contact Fields Input Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="p-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 text-slate-800 placeholder-slate-400"
              placeholder="Name *"
            />
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="p-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 text-slate-800 placeholder-slate-400"
              placeholder="Email *"
            />
            <input
              type="text"
              value={formData.website}
              onChange={e => setFormData({ ...formData, website: e.target.value })}
              className="p-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 text-slate-800 placeholder-slate-400"
              placeholder="Website"
            />
          </div>

          {/* LocalStorage Consent Checkbox */}
          <div className="flex items-start gap-2.5 mt-1 select-none">
            <input
              type="checkbox"
              id="save-browser-info"
              checked={saveInfo}
              onChange={e => setSaveInfo(e.target.checked)}
              className="mt-0.5 border-slate-300 text-slate-650 rounded focus:ring-slate-400 cursor-pointer h-4 w-4"
            />
            <label htmlFor="save-browser-info" className="text-slate-500 font-medium leading-relaxed cursor-pointer">
              Save my name, email, and website in this browser for the next time I comment.
            </label>
          </div>

          {/* Form Messages */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-650 font-bold border border-red-100">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-650 font-bold border border-emerald-100">
              Your comment has been submitted successfully!
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-slate-800 bg-[#CFE8FF] hover:bg-[#b8daff] transition-premium shadow-soft cursor-pointer text-center disabled:opacity-50"
            >
              {submitting ? 'Submitting Comment...' : 'Submit Comment'}
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}
