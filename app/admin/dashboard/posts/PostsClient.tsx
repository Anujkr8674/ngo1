'use client'

import { useState } from 'react'
import { createBlogPost, updateBlogPost, deleteBlogPost } from '@/app/actions/blog'
import { Loader2, Plus, Trash2, Edit2, FileText, Upload, X, ArrowLeft, Eye, Play } from 'lucide-react'
import TiptapEditor from '@/app/components/TiptapEditor'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface PostsClientProps {
  initialPosts: any[]
  initialCategories: any[]
}

export default function PostsClient({ initialPosts, initialCategories }: PostsClientProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [categories] = useState(initialCategories)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [playingMedia, setPlayingMedia] = useState<string | null>(null)

  // Form State
  const [postId, setPostId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [author, setAuthor] = useState('Admin')
  const [readTime, setReadTime] = useState(3)
  const [categoryId, setCategoryId] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(true)
  
  // File upload state (multiple images)
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])

  // Automatically update slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!postId) {
      // Auto-generate slug for new posts
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
      setSlug(generated)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length > 0) {
      setFiles(prev => [...prev, ...selectedFiles])
      
      selectedFiles.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviews(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeNewFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const removeExistingImage = (url: string) => {
    setExistingImages(prev => prev.filter(img => img !== url))
  }

  const startCreate = () => {
    setPostId(null)
    setTitle('')
    setSlug('')
    setAuthor('Admin')
    setReadTime(3)
    setCategoryId(categories[0]?.id || '')
    setExcerpt('')
    setContent('')
    setPublished(true)
    setFiles([])
    setPreviews([])
    setExistingImages([])
    setIsEditing(true)
  }

  const startEdit = (post: any) => {
    setPostId(post.id)
    setTitle(post.title)
    setSlug(post.slug)
    setAuthor(post.author || 'Admin')
    setReadTime(post.readTime || 3)
    setCategoryId(post.categoryId || post.category?.id || '')
    setExcerpt(post.excerpt || '')
    setContent(post.content || '')
    setPublished(post.published)
    setFiles([])
    setPreviews([])
    setExistingImages(post.images || [])
    setIsEditing(true)
  }

  const cancelEdit = () => {
    setIsEditing(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !slug || !content) {
      alert('Please fill in all required fields (Title, Slug, and Content)')
      return
    }

    setLoading(true)
    try {
      const uploadedUrls: string[] = []
      const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'assets'

      for (const file of files) {
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        const path = `Blogs/${slug}/${filename}`

        const { error: uploadError } = await supabase.storage.from(bucketName).upload(path, file, {
          contentType: file.type,
          upsert: false
        })

        if (uploadError) {
          throw new Error(`Supabase upload failed for ${file.name}: ${uploadError.message}`)
        }

        const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(path)
        uploadedUrls.push(publicUrl)
      }

      const allImages = [...existingImages, ...uploadedUrls]

      const postData = {
        title,
        slug,
        content,
        excerpt,
        author,
        readTime,
        published,
        categoryId: categoryId || null,
        images: allImages,
      }

      let res
      if (postId) {
        res = await updateBlogPost(postId, postData)
      } else {
        res = await createBlogPost(postData)
      }

      if (res.success && res.post) {
        if (postId) {
          setPosts(prev => prev.map(p => p.id === postId ? res.post : p))
        } else {
          setPosts(prev => [res.post, ...prev])
        }
        setIsEditing(false)
      } else {
        alert(res.error || 'Operation failed')
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred while uploading/saving the post.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return
    
    const res = await deleteBlogPost(id)
    if (res.success) {
      setPosts(prev => prev.filter(p => p.id !== id))
    } else {
      alert(res.error || 'Failed to delete post')
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen text-[#444444] font-sans pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] rounded-2xl p-6 md:p-8 mb-6 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-display text-slate-800 mb-1">
            {isEditing ? (postId ? 'Edit Web Post' : 'Create Web Post') : 'Web Posts Management'}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {isEditing ? 'Compose and upload blog posts with Tiptap editor and Supabase storage.' : 'Add, edit, and publish blogs/articles on the frontend journal.'}
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={startCreate}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-foreground text-background font-bold text-xs uppercase tracking-wider rounded-full hover:scale-102 hover:shadow-soft active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create Post
          </button>
        )}
      </div>

      {isEditing ? (
        /* Form View (Create / Edit) */
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 w-full">
          <button
            onClick={cancelEdit}
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 group cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Posts
          </button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CFE8FF] focus:border-[#90BCE6] transition-all"
                  placeholder="Enter article title"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Slug (URL suffix) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CFE8FF] focus:border-[#90BCE6] transition-all"
                  placeholder="e.g. support-students-education"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={categoryId}
                  onChange={e => setCategoryId(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CFE8FF] focus:border-[#90BCE6] transition-all cursor-pointer font-medium"
                >
                  <option value="">No Category (General)</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CFE8FF] focus:border-[#90BCE6] transition-all"
                  placeholder="Admin"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Read Time (Minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={readTime}
                  onChange={e => setReadTime(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CFE8FF] focus:border-[#90BCE6] transition-all"
                />
              </div>

              <div className="flex items-center h-full pt-6">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={e => setPublished(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-slate-600">Publish Immediately</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                Excerpt (Brief summary)
              </label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CFE8FF] focus:border-[#90BCE6] transition-all resize-none"
                placeholder="A brief snippet displayed on the card grid view..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                Rich Text Content <span className="text-red-500">*</span>
              </label>
              <TiptapEditor content={content} onChange={setContent} />
            </div>

            {/* Multiple Images/Videos Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">
                Post Media Files (First item is Featured Cover/Media; subsequent items are displayed in detail gallery)
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-dashed border-[#CFE8FF] rounded-2xl p-6 bg-slate-50/50">
                {/* Upload drag & drop zone */}
                <div>
                  <label className="flex flex-col items-center justify-center w-full h-48 cursor-pointer bg-white border border-slate-200 border-dashed rounded-xl hover:bg-blue-50/30 transition-all">
                    <div className="flex flex-col items-center justify-center p-5 text-center">
                      <div className="w-10 h-10 bg-[#CFE8FF] rounded-full flex items-center justify-center mb-2.5 text-blue-600 shadow-sm">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-blue-600 mb-1">Click to Upload Media Files</p>
                      <p className="text-[10px] text-slate-500">Upload multiple files (PNG, JPG, WEBP, MP4, WEBM, MOV)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {/* Previews grid */}
                <div className="h-48 overflow-y-auto pr-1">
                  <div className="grid grid-cols-3 gap-2">
                    {/* Render Existing Media */}
                    {existingImages.map((img, idx) => {
                      const isVid = img.toLowerCase().match(/\.(mp4|webm|mov|avi|mkv)$/i)
                      return (
                        <div key={`existing-${idx}`} className="relative group aspect-square rounded-lg border border-slate-200 overflow-hidden bg-white shadow-sm">
                          {isVid ? (
                            <video src={img} muted className="w-full h-full object-cover bg-slate-900" />
                          ) : (
                            <img src={img} alt="Existing Preview" className="w-full h-full object-cover" />
                          )}
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-blue-500/90 text-white font-bold text-[8px] uppercase tracking-widest z-10 shadow-sm">
                            {idx === 0 ? 'Featured' : `Media ${idx}`}
                          </span>
                          {isVid && (
                            <span className="absolute bottom-1.5 right-1.5 p-1 rounded bg-black/60 backdrop-blur-md text-white z-10 shadow-sm">
                              <Play className="w-3 h-3 fill-white text-white" />
                            </span>
                          )}
                          {/* Hover Action Overlay */}
                          <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2 z-20">
                            <button
                              type="button"
                              onClick={() => setPlayingMedia(img)}
                              className="p-2 bg-white/95 hover:bg-white text-slate-800 rounded-full transition-transform hover:scale-110 shadow-md cursor-pointer"
                              title={isVid ? "Play Video in Admin" : "Preview Image"}
                            >
                              {isVid ? <Play className="w-4 h-4 text-blue-600 fill-blue-600" /> : <Eye className="w-4 h-4 text-blue-600" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeExistingImage(img)}
                              className="p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-full transition-transform hover:scale-110 shadow-md cursor-pointer"
                              title="Remove Media"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}

                    {/* Render New Previews */}
                    {previews.map((preview, idx) => {
                      const absoluteIdx = existingImages.length + idx
                      const fileObj = files[idx]
                      const isVid = fileObj?.type?.startsWith('video/') || preview.startsWith('data:video/') || fileObj?.name?.match(/\.(mp4|webm|mov|avi|mkv)$/i)
                      return (
                        <div key={`new-${idx}`} className="relative group aspect-square rounded-lg border border-slate-200 overflow-hidden bg-white shadow-sm">
                          {isVid ? (
                            <video src={preview} muted className="w-full h-full object-cover bg-slate-900" />
                          ) : (
                            <img src={preview} alt="New Preview" className="w-full h-full object-cover" />
                          )}
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-green-500/95 text-white font-bold text-[8px] uppercase tracking-widest z-10 shadow-sm">
                            {absoluteIdx === 0 ? 'Featured' : `New ${idx + 1}`}
                          </span>
                          {isVid && (
                            <span className="absolute bottom-1.5 right-1.5 p-1 rounded bg-black/60 backdrop-blur-md text-white z-10 shadow-sm">
                              <Play className="w-3 h-3 fill-white text-white" />
                            </span>
                          )}
                          {/* Hover Action Overlay */}
                          <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2 z-20">
                            <button
                              type="button"
                              onClick={() => setPlayingMedia(preview)}
                              className="p-2 bg-white/95 hover:bg-white text-slate-800 rounded-full transition-transform hover:scale-110 shadow-md cursor-pointer"
                              title={isVid ? "Play Video in Admin" : "Preview Image"}
                            >
                              {isVid ? <Play className="w-4 h-4 text-blue-600 fill-blue-600" /> : <Eye className="w-4 h-4 text-blue-600" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeNewFile(idx)}
                              className="p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-full transition-transform hover:scale-110 shadow-md cursor-pointer"
                              title="Remove Media"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}

                    {existingImages.length === 0 && previews.length === 0 && (
                      <div className="col-span-full h-40 flex flex-col items-center justify-center text-slate-400 text-xs">
                        <FileText className="w-8 h-8 text-slate-300 mb-2" />
                        No images uploaded yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-slate-100">
              <button
                disabled={loading}
                type="submit"
                className="px-6 py-2.5 text-sm bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] hover:opacity-90 disabled:opacity-50 text-[#444444] font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm min-w-[125px] cursor-pointer"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (postId ? 'Save Changes' : 'Create Post')}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="px-5 py-2 text-sm bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {posts.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <FileText className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium">No blog posts found.</p>
              <p className="text-xs text-slate-400 mt-1">Create your first blog post to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[30%] min-w-[280px]">Post details</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[15%] min-w-[130px]">Category</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[20%] max-w-[200px]">Slug</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[10%] min-w-[90px]">Author</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[8%] min-w-[80px]">Read Time</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[9%] min-w-[90px]">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[8%] min-w-[80px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 w-[30%] min-w-[280px] align-middle">
                        <div className="flex items-center gap-3 min-w-0">
                          {post.images && post.images.length > 0 ? (
                            post.images[0].toLowerCase().match(/\.(mp4|webm|mov|avi|mkv)$/i) ? (
                              <video
                                src={post.images[0]}
                                muted
                                className="w-14 h-10 rounded-lg object-cover border border-slate-100 shadow-sm bg-slate-900 shrink-0"
                              />
                            ) : (
                              <img
                                src={post.images[0]}
                                alt={post.title}
                                className="w-14 h-10 rounded-lg object-cover border border-slate-100 shadow-sm bg-slate-50 shrink-0"
                              />
                            )
                          ) : (
                            <div className="w-14 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="font-semibold text-sm block text-slate-800 truncate" title={post.title}>
                              {post.title}
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {new Date(post.createdAt).toLocaleDateString('en-US')}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs align-middle">
                        <span className="inline-flex px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-100/80 text-[11px]">
                          {post.category?.name || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-500 w-[20%] max-w-[200px] truncate align-middle" title={post.slug}>
                        {post.slug}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 w-[10%] min-w-[90px] align-middle">{post.author || 'Admin'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 w-[8%] min-w-[80px] align-middle">{post.readTime || 3} min</td>
                      <td className="px-6 py-4 w-[9%] min-w-[90px] align-middle">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          post.published 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 w-[5%] min-w-[70px] align-middle">
                        {post.images ? post.images.length : 0}
                      </td>
                      <td className="px-6 py-4 text-right w-[10%] min-w-[120px] align-middle">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
                            title="Preview Post"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => startEdit(post)}
                            className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-[#444444] hover:bg-slate-50 transition-all cursor-pointer"
                            title="Edit Post"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer"
                            title="Delete Post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Admin Media Preview / Video Player Modal */}
      {playingMedia && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer"
          onClick={() => setPlayingMedia(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-2xl p-2 border border-slate-700 cursor-default"
            onClick={e => e.stopPropagation()}
          >
            <button 
              type="button"
              onClick={() => setPlayingMedia(null)} 
              className="absolute top-4 right-4 z-20 p-2 text-white bg-black/60 hover:bg-black/90 rounded-full transition-colors cursor-pointer border border-white/10"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {playingMedia.toLowerCase().match(/\.(mp4|webm|mov|avi|mkv)$/i) || playingMedia.startsWith('data:video/') ? (
              <video 
                src={playingMedia} 
                controls 
                autoPlay 
                className="max-w-full max-h-[80vh] w-auto h-auto rounded-xl shadow-lg"
              />
            ) : (
              <img 
                src={playingMedia} 
                alt="Media Preview" 
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-xl shadow-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
