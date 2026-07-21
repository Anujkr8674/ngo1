import { getBlogCategories } from '@/app/actions/blog'
import PostCategoriesClient from './PostCategoriesClient'

export const dynamic = 'force-dynamic'

export default async function PostCategoriesPage() {
  const categories = await getBlogCategories()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <PostCategoriesClient initialCategories={categories} />
    </div>
  )
}
