import { getBlogPosts, getBlogCategories } from '@/app/actions/blog'
import PostsClient from './PostsClient'

export const dynamic = 'force-dynamic'

export default async function AdminPostsPage() {
  const posts = await getBlogPosts()
  const categories = await getBlogCategories()

  return <PostsClient initialPosts={posts} initialCategories={categories} />
}
