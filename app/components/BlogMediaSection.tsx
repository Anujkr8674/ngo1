'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Eye, X, ChevronLeft, ChevronRight, Play, Film } from 'lucide-react'

interface BlogMediaSectionProps {
  images: string[]
  title: string
  excerpt?: string | null
  content: string
}

const isVideoUrl = (url: string) => {
  if (!url) return false
  const lower = url.toLowerCase().split('?')[0]
  return (
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.avi') ||
    lower.endsWith('.mkv')
  )
}

export default function BlogMediaSection({ images, title, excerpt, content }: BlogMediaSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handlePrev = useCallback(() => {
    if (selectedIndex === null || images.length <= 1) return
    setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length))
  }, [selectedIndex, images.length])

  const handleNext = useCallback(() => {
    if (selectedIndex === null || images.length <= 1) return
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length))
  }, [selectedIndex, images.length])

  const handleClose = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  // Listen for keyboard navigation (Escape, Left Arrow, Right Arrow)
  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedIndex, handleClose, handlePrev, handleNext])

  return (
    <main className="lg:col-span-8 w-full flex flex-col gap-6">
      {/* Featured Post Media (Image or Video) */}
      {images && images.length > 0 && (
        <div className="w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 mb-2 relative group">
          {isVideoUrl(images[0]) ? (
            <div className="w-full relative">
              <video 
                src={images[0]} 
                controls 
                preload="metadata"
                className="w-full max-h-[500px] object-contain mx-auto bg-black rounded-2xl" 
              />
            </div>
          ) : (
            <div 
              onClick={() => setSelectedIndex(0)}
              className="w-full cursor-pointer relative"
            >
              <img 
                referrerPolicy="no-referrer"
                src={images[0]}
                alt={title}
                className="w-full max-h-[500px] object-contain mx-auto bg-slate-50 transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Eye className="w-4 h-4 text-blue-600" />
                  Click to view full image
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Post Excerpt / Subheading */}
      {excerpt && (
        <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-700 text-base font-medium leading-relaxed italic">
          {excerpt}
        </div>
      )}

      {/* Paragraph Content Section - Full Width */}
      <article 
        className="w-full font-sans text-base text-slate-800 leading-relaxed blog-content-prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Campaign Gallery Grid (Photos & Videos) */}
      {images && images.length > 1 && (
        <section className="pt-8 border-t border-slate-100 mt-6">
          <h3 className="font-display font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
            <Film className="w-5 h-5 text-blue-600" />
            Campaign Gallery & Videos
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.slice(1).map((item: string, i: number) => {
              const actualIndex = i + 1
              const isVideo = isVideoUrl(item)

              return (
                <div 
                  key={i} 
                  onClick={() => setSelectedIndex(actualIndex)}
                  className="aspect-square rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm relative group cursor-pointer"
                >
                  {isVideo ? (
                    <>
                      <video 
                        src={item} 
                        muted 
                        preload="metadata"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 bg-slate-900"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Play className="w-3 h-3 fill-white text-white" />
                        Video
                      </div>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                        <div className="p-3 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-800">
                          <Play className="w-5 h-5 text-blue-600 fill-blue-600" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img 
                        referrerPolicy="no-referrer"
                        src={item}
                        alt={`${title} detail ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                        <div className="p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-800">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL (Image or Video) */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose()
          }}
        >
          {/* Top Bar Controls */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-50 pointer-events-none px-2 sm:px-6">
            <span className="px-3.5 py-1.5 bg-black/60 text-white/90 rounded-full text-xs font-medium backdrop-blur-md border border-white/10 pointer-events-auto shadow-md">
              {selectedIndex + 1} / {images.length}
            </span>
            <button 
              onClick={handleClose}
              className="p-2.5 text-white/90 hover:text-white bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-md border border-white/10 transition-all pointer-events-auto shadow-md cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Media Container */}
          <div className="relative max-w-5xl max-h-[85vh] flex items-center justify-center w-full h-full my-auto">
            {isVideoUrl(images[selectedIndex]) ? (
              <video 
                src={images[selectedIndex]} 
                controls 
                autoPlay
                className="max-w-full max-h-[85vh] w-auto h-auto rounded-xl shadow-2xl border border-white/10"
              />
            ) : (
              <img 
                src={images[selectedIndex]} 
                alt={`${title} preview ${selectedIndex + 1}`}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10 transition-transform duration-300"
              />
            )}
          </div>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-white bg-black/50 hover:bg-black/80 hover:scale-105 rounded-full backdrop-blur-md border border-white/10 transition-all shadow-xl cursor-pointer z-50"
              title="Previous item (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-white bg-black/50 hover:bg-black/80 hover:scale-105 rounded-full backdrop-blur-md border border-white/10 transition-all shadow-xl cursor-pointer z-50"
              title="Next item (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </main>
  )
}
