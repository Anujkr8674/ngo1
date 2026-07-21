import { useState, useEffect, useRef } from 'react'

interface SmoothImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  aspectRatioClassName?: string
}

export default function SmoothImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatioClassName = 'aspect-square'
}: SmoothImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current) {
      if (imgRef.current.complete) {
        setIsLoaded(true)
      } else {
        setIsLoaded(false)
        setError(false)
      }
    }
  }, [src])

  return (
    <div className={`relative overflow-hidden w-full ${aspectRatioClassName} ${containerClassName}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes custom-shimmer {
          0% { transform: translateX(-150%); }
          50% { transform: translateX(-60%); }
          100% { transform: translateX(150%); }
        }
        .animate-custom-shimmer {
          animation: custom-shimmer 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}} />

      {/* Shimmer / Skeleton */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-[#EFF6FF] flex items-center justify-center overflow-hidden">
          {/* Shimmer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-custom-shimmer" />
          
          {/* Spinner inside a circular glassmorphic container */}
          <div className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm z-10">
            <div className="w-5 h-5 rounded-full border-2 border-[#DCCFF8] border-t-transparent animate-spin" />
          </div>
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center text-slate-400 text-xs p-2">
          <span>Failed to load image</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded 
              ? 'opacity-100 scale-100 blur-0' 
              : 'opacity-0 scale-95 blur-md'
          } ${className}`}
        />
      )}
    </div>
  )
}
