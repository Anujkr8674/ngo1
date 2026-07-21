import { getGalleryCategories, getGalleryImages } from '@/app/actions/gallery'
import { getBlogCategories } from '@/app/actions/blog'
import CategoriesClient from './CategoriesClient'

export const dynamic = 'force-dynamic'

export default async function CategoriesAdminPage() {
  const galleryCategories = await getGalleryCategories()
  const galleryImages = await getGalleryImages()
  const blogCategories = await getBlogCategories()

  // Calculate image counts
  const galleryCategoriesWithCounts = galleryCategories.map(cat => ({
    ...cat,
    imageCount: galleryImages.filter(img => img.categoryId === cat.id).length
  }))

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <CategoriesClient 
        initialGalleryCategories={galleryCategoriesWithCounts} 
        initialBlogCategories={blogCategories}
      />
    </div>
  )
}
