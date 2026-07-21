'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function getBlogCategories() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    })
    return categories.map(c => ({
      id: c.id,
      name: c.name,
      postCount: c._count.posts
    }))
  } catch (error: any) {
    console.error('Error fetching blog categories:', error)
    return []
  }
}

export async function createBlogCategory(name: string) {
  try {
    const category = await prisma.blogCategory.create({
      data: { name: name.trim().toUpperCase() }
    })
    revalidatePath('/admin/dashboard/categories')
    revalidatePath('/admin/dashboard/posts')
    revalidatePath('/blog')
    return { success: true, category }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateBlogCategory(id: string, name: string) {
  try {
    const category = await prisma.blogCategory.update({
      where: { id },
      data: { name: name.trim().toUpperCase() }
    })
    revalidatePath('/admin/dashboard/categories')
    revalidatePath('/admin/dashboard/posts')
    revalidatePath('/admin/dashboard/posts/categories')
    revalidatePath('/blog')
    return { success: true, category }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteBlogCategory(id: string) {
  try {
    await prisma.blogCategory.delete({ where: { id } })
    revalidatePath('/admin/dashboard/categories')
    revalidatePath('/admin/dashboard/posts')
    revalidatePath('/admin/dashboard/posts/categories')
    revalidatePath('/blog')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getBlogPosts(categoryId?: string) {
  try {
    return await prisma.blogPost.findMany({
      where: categoryId && categoryId !== 'all' ? { categoryId } : undefined,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch (error: any) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await prisma.blogPost.findUnique({
      where: { slug },
      include: { category: true }
    })
  } catch (error: any) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
}

export async function createBlogPost(data: any) {
  try {
    let title: string
    let slugRaw: string
    let content: string
    let excerpt: string
    let author: string
    let readTime: number
    let published: boolean
    let categoryId: string | null = null
    let imageUrls: string[] = []

    if (data instanceof FormData) {
      title = data.get('title') as string
      slugRaw = data.get('slug') as string
      content = data.get('content') as string
      excerpt = data.get('excerpt') as string
      author = (data.get('author') as string) || 'Admin'
      readTime = parseInt(data.get('readTime') as string) || 3
      published = data.get('published') === 'true'
      categoryId = (data.get('categoryId') as string) || null
      const files = data.getAll('files') as File[]
      const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'assets'

      for (const file of files) {
        if (file && file.size > 0) {
          const arrayBuffer = await file.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
          const slug = slugRaw.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
          const path = `Blogs/${slug}/${filename}`

          const { error: uploadError } = await supabase.storage.from(bucketName).upload(path, buffer, {
            contentType: file.type,
            upsert: false
          })

          if (uploadError) {
            throw new Error(`Supabase upload failed for ${file.name}: ${uploadError.message}`)
          }

          const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(path)
          imageUrls.push(publicUrl)
        }
      }
    } else {
      title = data.title
      slugRaw = data.slug
      content = data.content
      excerpt = data.excerpt || ''
      author = data.author || 'Admin'
      readTime = data.readTime || 3
      published = !!data.published
      categoryId = data.categoryId || null
      imageUrls = data.images || []
    }

    if (!title || !slugRaw || !content) {
      return { error: 'Title, slug, and content are required' }
    }

    // Clean and validate slug
    const slug = slugRaw.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
    const existing = await prisma.blogPost.findUnique({ where: { slug } })
    if (existing) {
      return { error: 'A blog post with this slug already exists' }
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        author,
        readTime,
        images: imageUrls,
        published,
        categoryId: categoryId || undefined
      },
      include: { category: true }
    })

    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)
    revalidatePath('/admin/dashboard/posts')
    return { success: true, post }
  } catch (error: any) {
    console.error('Error creating blog post:', error)
    return { error: error.message }
  }
}

export async function updateBlogPost(id: string, data: any) {
  try {
    let title: string
    let slugRaw: string
    let content: string
    let excerpt: string
    let author: string
    let readTime: number
    let published: boolean
    let categoryId: string | null = null
    let newImageUrls: string[] = []
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'assets'

    if (data instanceof FormData) {
      title = data.get('title') as string
      slugRaw = data.get('slug') as string
      content = data.get('content') as string
      excerpt = data.get('excerpt') as string
      author = (data.get('author') as string) || 'Admin'
      readTime = parseInt(data.get('readTime') as string) || 3
      published = data.get('published') === 'true'
      categoryId = (data.get('categoryId') as string) || null
      const existingImagesStr = data.get('existingImages') as string
      const existingImages: string[] = existingImagesStr ? JSON.parse(existingImagesStr) : []
      const files = data.getAll('files') as File[]
      newImageUrls = [...existingImages]

      const slug = slugRaw.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')

      for (const file of files) {
        if (file && file.size > 0) {
          const arrayBuffer = await file.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
          const path = `Blogs/${slug}/${filename}`

          const { error: uploadError } = await supabase.storage.from(bucketName).upload(path, buffer, {
            contentType: file.type,
            upsert: false
          })

          if (uploadError) {
            throw new Error(`Supabase upload failed for ${file.name}: ${uploadError.message}`)
          }

          const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(path)
          newImageUrls.push(publicUrl)
        }
      }
    } else {
      title = data.title
      slugRaw = data.slug
      content = data.content
      excerpt = data.excerpt || ''
      author = data.author || 'Admin'
      readTime = data.readTime || 3
      published = !!data.published
      categoryId = data.categoryId || null
      newImageUrls = data.images || []
    }

    if (!title || !slugRaw || !content) {
      return { error: 'Title, slug, and content are required' }
    }

    const slug = slugRaw.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
    const existingWithSlug = await prisma.blogPost.findFirst({
      where: {
        slug,
        id: { not: id }
      }
    })
    if (existingWithSlug) {
      return { error: 'A blog post with this slug already exists' }
    }

    const currentPost = await prisma.blogPost.findUnique({ where: { id } })
    if (!currentPost) {
      return { error: 'Blog post not found' }
    }

    // Delete any images that were in currentPost but are no longer in newImageUrls
    const imagesToDelete = currentPost.images.filter(img => !newImageUrls.includes(img))
    if (imagesToDelete.length > 0) {
      const pathsToDelete = imagesToDelete.map(img => {
        try {
          const urlObj = new URL(img)
          const pathParts = urlObj.pathname.split('/')
          const bucketIndex = pathParts.findIndex(p => p === bucketName)
          if (bucketIndex !== -1) {
            return pathParts.slice(bucketIndex + 1).map(decodeURIComponent).join('/')
          }
        } catch (e) {
          console.error('Error parsing image URL for deletion:', img, e)
        }
        return ''
      }).filter(p => p !== '')

      if (pathsToDelete.length > 0) {
        await supabase.storage.from(bucketName).remove(pathsToDelete)
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt,
        author,
        readTime,
        images: newImageUrls,
        published,
        categoryId: categoryId || null
      },
      include: { category: true }
    })

    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)
    if (currentPost.slug !== slug) {
      revalidatePath(`/blog/${currentPost.slug}`)
    }
    revalidatePath('/admin/dashboard/posts')
    return { success: true, post }
  } catch (error: any) {
    console.error('Error updating blog post:', error)
    return { error: error.message }
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const post = await prisma.blogPost.findUnique({ where: { id } })
    if (!post) {
      return { error: 'Blog post not found' }
    }

    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'assets'

    if (post.images && post.images.length > 0) {
      const pathsToDelete = post.images.map(img => {
        try {
          const urlObj = new URL(img)
          const pathParts = urlObj.pathname.split('/')
          const bucketIndex = pathParts.findIndex(p => p === bucketName)
          if (bucketIndex !== -1) {
            return pathParts.slice(bucketIndex + 1).map(decodeURIComponent).join('/')
          }
        } catch (e) {
          console.error('Error parsing image URL for deletion:', img, e)
        }
        return ''
      }).filter(p => p !== '')

      if (pathsToDelete.length > 0) {
        const { error: deleteError } = await supabase.storage.from(bucketName).remove(pathsToDelete)
        if (deleteError) {
          console.error('Error deleting files from Supabase:', deleteError.message)
        }
      }
    }

    await prisma.blogPost.delete({ where: { id } })

    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath('/admin/dashboard/posts')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting blog post:', error)
    return { error: error.message }
  }
}
