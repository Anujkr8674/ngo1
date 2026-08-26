'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import fs from 'fs'
import path from 'path'

export async function getBlogCategories() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: [
        { order: 'asc' },
        { name: 'asc' }
      ] as any,
      include: {
        _count: {
          select: { posts: true }
        }
      }
    })
    return categories.map(c => ({
      id: c.id,
      name: c.name,
      order: (c as any).order ?? 0,
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

export async function reorderBlogCategories(ids: string[]) {
  try {
    for (let i = 0; i < ids.length; i++) {
      await prisma.blogCategory.update({
        where: { id: ids[i] },
        data: { order: i } as any
      })
    }
    revalidatePath('/admin/dashboard/categories')
    revalidatePath('/blog')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getBlogPosts(categoryId?: string) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: categoryId && categoryId !== 'all' ? { categoryId } : undefined,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })
    const mapped = posts.map(p => ({
      ...p,
      order: (p as any).order ?? 0
    }))
    return mapped.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  } catch (error: any) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function reorderBlogPosts(ids: string[]) {
  try {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.blogPost.update({
          where: { id },
          data: { order: index } as any,
        })
      )
    )
    revalidatePath('/blog')
    revalidatePath('/admin/dashboard/posts')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
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
    let imageTitles: string[] = []

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
      
      const fileTitlesJson = data.get('fileTitles') as string
      const fileTitles: string[] = fileTitlesJson ? JSON.parse(fileTitlesJson) : []

      const slug = slugRaw.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
      const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
      const uploadDir = path.join(uploadBase, 'blogs', slug)

      // Ensure directory exists dynamically per blog post
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      let fileIdx = 0
      for (const file of files) {
        if (file && file.size > 0) {
          const arrayBuffer = await file.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
          
          const filePath = path.join(uploadDir, filename)
          fs.writeFileSync(filePath, buffer)
          imageUrls.push(`/uploads/blogs/${slug}/${filename}`)
          imageTitles.push(fileTitles[fileIdx] || '')
        }
        fileIdx++
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
      imageTitles = data.imageTitles || []
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
        imageTitles: imageTitles,
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
    let newImageTitles: string[] = []

    const currentPost = await prisma.blogPost.findUnique({ where: { id } })
    if (!currentPost) {
      return { error: 'Blog post not found' }
    }

    const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
    const oldSlug = currentPost.slug

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
      
      const existingImageTitlesStr = data.get('existingImageTitles') as string
      const existingImageTitles: string[] = existingImageTitlesStr ? JSON.parse(existingImageTitlesStr) : []

      const files = data.getAll('files') as File[]
      
      const fileTitlesJson = data.get('fileTitles') as string
      const fileTitles: string[] = fileTitlesJson ? JSON.parse(fileTitlesJson) : []

      newImageUrls = [...existingImages]
      newImageTitles = [...existingImageTitles]

      const slug = slugRaw.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')

      // Rename directory if slug changed
      let finalSlug = slug
      if (oldSlug !== slug) {
        const oldDir = path.join(uploadBase, 'blogs', oldSlug)
        const newDir = path.join(uploadBase, 'blogs', slug)
        if (fs.existsSync(oldDir)) {
          if (!fs.existsSync(newDir)) {
            fs.mkdirSync(path.dirname(newDir), { recursive: true })
            fs.renameSync(oldDir, newDir)
          }
        }
        // Update urls list to new paths
        newImageUrls = newImageUrls.map(img => {
          return img.replace(`/uploads/blogs/${oldSlug}/`, `/uploads/blogs/${slug}/`)
        })
      }

      const uploadDir = path.join(uploadBase, 'blogs', finalSlug)
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      let fileIdx = 0
      for (const file of files) {
        if (file && file.size > 0) {
          const arrayBuffer = await file.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
          
          const filePath = path.join(uploadDir, filename)
          fs.writeFileSync(filePath, buffer)
          newImageUrls.push(`/uploads/blogs/${finalSlug}/${filename}`)
          newImageTitles.push(fileTitles[fileIdx] || '')
        }
        fileIdx++
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
      newImageTitles = data.imageTitles || []
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

    // Delete any images that were in currentPost but are no longer in newImageUrls
    const imagesToDelete = currentPost.images.filter(img => !newImageUrls.includes(img))
    for (const img of imagesToDelete) {
      try {
        const urlObj = new URL(img, 'http://localhost')
        const pathParts = urlObj.pathname.split('/')
        const blogsIndex = pathParts.findIndex(p => p === 'blogs')
        if (blogsIndex !== -1) {
          const postSlug = pathParts[blogsIndex + 1]
          const filename = pathParts[blogsIndex + 2]
          if (postSlug && filename) {
            const oldFilePath = path.join(uploadBase, 'blogs', decodeURIComponent(postSlug), decodeURIComponent(filename))
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath)
            }
          }
        }
      } catch (e) {
        console.error('Error deleting local blog image:', img, e)
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
        imageTitles: newImageTitles,
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

    const uploadBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
    const blogDir = path.join(uploadBase, 'blogs', post.slug)

    // Delete entire dynamic subfolder recursively
    if (fs.existsSync(blogDir)) {
      try {
        fs.rmSync(blogDir, { recursive: true, force: true })
      } catch (err) {
        console.error('Failed to delete blog directory:', err)
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
