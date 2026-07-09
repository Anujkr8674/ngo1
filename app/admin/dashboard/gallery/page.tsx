import { getGalleryCategories, getGalleryImages } from '@/app/actions/gallery'
import GalleryClient from './GalleryClient'

export const dynamic = 'force-dynamic';

export default async function GalleryAdminPage() {
  const categories = await getGalleryCategories()
  const images = await getGalleryImages()

  return (
    <div className="space-y-6 pb-20">
      <GalleryClient initialCategories={categories} initialImages={images} />
    </div>
  )
}
