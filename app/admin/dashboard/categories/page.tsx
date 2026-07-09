import { getGalleryCategories, getGalleryImages } from '@/app/actions/gallery'
import CategoriesClient from './CategoriesClient'

export const dynamic = 'force-dynamic'

export default async function CategoriesAdminPage() {
  const categories = await getGalleryCategories()
  const images = await getGalleryImages()

  // Calculate image counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    imageCount: images.filter(img => img.categoryId === cat.id).length
  }))

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <CategoriesClient initialCategories={categoriesWithCounts} />
    </div>
  )
}
