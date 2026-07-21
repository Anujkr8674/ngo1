import { getBlogPosts, getBlogCategories } from '@/app/actions/blog'
import BlogClient from './BlogClient'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const blogs = await getBlogPosts()
  const categories = await getBlogCategories()

  return <BlogClient initialBlogs={blogs} initialCategories={categories} />
}
