'use client'

import { useState } from 'react'
import { createGalleryImage, deleteGalleryImage, updateGalleryImage } from '@/app/actions/gallery'
import { Loader2, Plus, Trash2, Edit2, Eye, Upload, X } from 'lucide-react'
import SmoothImage from '@/app/components/SmoothImage'
import { supabase } from '@/lib/supabase'

export default function GalleryClient({ initialCategories, initialImages }: { initialCategories: any[], initialImages: any[] }) {
  const [categories] = useState(initialCategories)
  const [images, setImages] = useState(initialImages)
  
  const [filter, setFilter] = useState('all')
  const [isUploading, setIsUploading] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [selectedCat, setSelectedCat] = useState(initialCategories[0]?.id || '')
  const [imgLoading, setImgLoading] = useState(false)
  const [imgError, setImgError] = useState('')

  const [viewingImage, setViewingImage] = useState<string | null>(null)
  const [editingImage, setEditingImage] = useState<any | null>(null)
  const [editCaption, setEditCaption] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  const handleEditClick = (img: any) => {
    setEditingImage(img)
    setEditCaption(img.caption || '')
    setEditCategory(img.categoryId)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingImage) return
    setIsUpdating(true)
    const res = await updateGalleryImage(editingImage.id, { caption: editCaption, categoryId: editCategory })
    if (res.success && res.image) {
      const cat = categories.find(c => c.id === editCategory)
      setImages(images.map(img => img.id === editingImage.id ? { ...res.image, category: cat } : img))
      setEditingImage(null)
    } else {
      alert(res.error || 'Update failed')
    }
    setIsUpdating(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(selected)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !selectedCat) return setImgError('File and category are required.')
    
    setImgLoading(true)
    setImgError('')
    
    try {
      const cat = categories.find(c => c.id === selectedCat)
      const categoryName = cat ? cat.name : 'Uncategorized'
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `Gallery/${categoryName}/${filename}`

      // 1. Upload directly from browser to Supabase Storage
      const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'assets'
      const { error: uploadError } = await supabase.storage.from(bucketName).upload(path, file, {
        contentType: file.type,
        upsert: false
      })

      if (uploadError) {
        throw new Error(`Supabase upload failed: ${uploadError.message}`)
      }

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage.from('assets').getPublicUrl(path)

      // 3. Save URL in Supabase Postgres
      const res = await createGalleryImage({ url: publicUrl, caption, categoryId: selectedCat })
      if (res.error) {
        setImgError(res.error)
      } else if (res.image) {
        setImages([{ ...res.image, category: cat }, ...images])
        setFile(null)
        setPreview(null)
        setCaption('')
        setIsUploading(false)
      }
    } catch (err: any) {
      setImgError(err.message || 'Upload failed')
    } finally {
      setImgLoading(false)
    }
  }

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    const res = await deleteGalleryImage(id)
    if (res.success) {
      setImages(images.filter(i => i.id !== id))
    } else {
      alert(res.error)
    }
  }

  const filteredImages = filter === 'all' ? images : images.filter(img => img.categoryId === filter)

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-[#444444]">Gallery Management</h1>
        <p className="text-[#444444] mt-2 font-medium">Upload and manage gallery images with dynamic categories.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#CFE8FF] transition-all text-[#444444] shadow-sm cursor-pointer"
        >
          <option value="all">All categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {!isUploading && (
          <button 
            onClick={() => {
              setIsUploading(true)
              if (!selectedCat && categories.length > 0) {
                setSelectedCat(filter !== 'all' ? filter : categories[0].id)
              }
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] hover:opacity-90 text-[#444444] text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Upload Image
          </button>
        )}
      </div>

      {isUploading ? (
        /* Upload Form */
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-8">
          <h3 className="text-lg font-bold text-[#444444] mb-5">Upload Image</h3>
          <form onSubmit={handleUpload} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1.5">Title</label>
                <input 
                  type="text"
                  placeholder="Image title or description"
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FCFCFA] border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#CFE8FF] transition-all text-[#444444]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1.5">Category <span className="text-red-500">*</span></label>
                <select 
                  value={selectedCat} 
                  onChange={e => setSelectedCat(e.target.value)}
                  className={`w-full px-3 py-2 text-sm bg-[#FCFCFA] border rounded-lg outline-none focus:ring-2 focus:ring-[#CFE8FF] transition-all text-[#444444] cursor-pointer ${!selectedCat ? 'border-amber-300 ring-2 ring-amber-100' : 'border-gray-200'}`}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {!selectedCat && (
                  <p className="text-amber-600 text-[11px] mt-1 font-medium">Please select a category to enable upload.</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#444444] mb-1.5">Image <span className="text-red-500">*</span></label>
              <div className="border border-dashed border-[#CFE8FF] rounded-lg p-2 bg-[#FCFCFA]">
                {preview ? (
                  <div className="relative rounded-md overflow-hidden h-48 border border-gray-100">
                    <img src={preview} alt="Preview" className="w-full h-full object-contain bg-gray-50" />
                    <button type="button" onClick={() => { setFile(null); setPreview(null) }} className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full p-1.5 shadow-sm text-red-500 hover:bg-red-50 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 cursor-pointer hover:bg-blue-50/50 transition-all rounded-md">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-10 h-10 bg-[#CFE8FF] rounded-full flex items-center justify-center mb-2 text-blue-600">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-semibold text-blue-600 mb-0.5">Click to Upload Image</p>
                      <p className="text-xs text-[#444444]">PNG, JPG, WEBP</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} required />
                  </label>
                )}
              </div>
            </div>

            {imgError && <p className="text-red-500 text-xs bg-red-50 p-2 rounded-lg border border-red-100">{imgError}</p>}

            <div className="flex gap-2 pt-1">
              <button disabled={imgLoading || !file || !selectedCat} type="submit" className="px-6 py-2.5 text-sm bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] hover:opacity-90 disabled:opacity-50 text-[#444444] font-bold rounded-xl flex justify-center items-center gap-2 transition-all shadow-sm min-w-[120px] cursor-pointer">
                {imgLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Upload Image'}
              </button>
              <button type="button" onClick={() => setIsUploading(false)} className="px-5 py-2 text-sm bg-white border border-gray-200 hover:bg-gray-50 text-[#444444] font-semibold rounded-lg transition-colors cursor-pointer">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Image Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredImages.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-slate-500 font-medium">No images found.</p>
            </div>
          )}
          {filteredImages.map(img => (
            <div key={img.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div 
                className="aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-gray-100 relative cursor-pointer"
                onClick={() => setViewingImage(img.url)}
              >
                <SmoothImage
                  src={img.url}
                  alt={img.caption || ''}
                  aspectRatioClassName="aspect-[4/3]"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 mb-1.5">
                  {img.category?.name}
                </span>
                <p className="text-[#444444] text-xs font-semibold leading-relaxed mb-3 flex-1 line-clamp-2">
                  {img.caption || 'No description'}
                </p>
                <div className="flex items-center gap-1.5 mt-auto">
                  <button onClick={() => setViewingImage(img.url)} className="p-1.5 border border-gray-200 rounded-md text-[#444444] hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleEditClick(img)} className="p-1.5 border border-gray-200 rounded-md text-[#444444] hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDeleteImage(img.id)} className="p-1.5 border border-red-100 rounded-md text-red-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors ml-auto">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {viewingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setViewingImage(null)}>
          <button onClick={() => setViewingImage(null)} className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
          <img src={viewingImage} alt="Fullscreen View" className="max-w-full max-h-full object-contain rounded-md shadow-2xl" />
        </div>
      )}

      {/* Edit Image Modal */}
      {editingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button onClick={() => setEditingImage(null)} className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-[#444444] mb-5">Edit Image Details</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#444444] mb-1.5">Title</label>
                <input 
                  type="text"
                  value={editCaption}
                  onChange={e => setEditCaption(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FCFCFA] border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#CFE8FF] text-[#444444]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#444444] mb-1.5">Category</label>
                <select 
                  value={editCategory} 
                  onChange={e => setEditCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FCFCFA] border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#CFE8FF] text-[#444444]"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-2 flex gap-2">
                <button disabled={isUpdating} type="submit" className="flex-1 bg-[#CFE8FF] hover:bg-[#b8daff] text-[#444444] font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
