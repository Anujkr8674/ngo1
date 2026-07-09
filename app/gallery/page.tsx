import { getGalleryCategories, getGalleryImages } from '@/app/actions/gallery'
import GalleryClient from './GalleryClient'

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const categories = await getGalleryCategories()
  const images = await getGalleryImages()
  
  return <GalleryClient initialCategories={categories} initialImages={images} />
}
