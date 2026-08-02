'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Get approved comments for a specific blog post
export async function getBlogComments(blogId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        blogId,
        approved: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    return comments
  } catch (error) {
    console.error('Error fetching blog comments:', error)
    return []
  }
}

// Add a new comment to a blog post
export async function addBlogComment(
  blogId: string,
  data: { name: string; email: string; content: string; website?: string }
) {
  try {
    if (!data.name || !data.email || !data.content) {
      return { error: 'Name, Email, and Comment message are required.' }
    }

    const comment = await prisma.comment.create({
      data: {
        blogId,
        name: data.name,
        email: data.email,
        content: data.content,
        website: data.website || null,
        approved: true, // Default to true, customizable via admin dashboard
      },
    })

    // Fetch slug of the blog post to revalidate page
    const blog = await prisma.blogPost.findUnique({
      where: { id: blogId },
      select: { slug: true },
    })

    if (blog) {
      revalidatePath(`/blog/${blog.slug}`)
    }
    revalidatePath('/admin/dashboard/comments')

    return { success: true, data: comment }
  } catch (error: any) {
    console.error('Error creating comment:', error)
    return { error: error.message || 'Something went wrong.' }
  }
}

// Admin: Get all comments across all posts
export async function getAllCommentsAdmin() {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        blog: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return comments
  } catch (error) {
    console.error('Error retrieving all comments for admin:', error)
    return []
  }
}

// Admin: Delete a comment
export async function deleteBlogComment(id: string) {
  try {
    const comment = await prisma.comment.delete({
      where: { id },
      include: {
        blog: {
          select: {
            slug: true,
          },
        },
      },
    })

    if (comment?.blog?.slug) {
      revalidatePath(`/blog/${comment.blog.slug}`)
    }
    revalidatePath('/admin/dashboard/comments')
    revalidatePath('/admin/dashboard')

    return { success: true }
  } catch (error: any) {
    console.error('Error deleting comment:', error)
    return { error: error.message || 'Something went wrong.' }
  }
}

// Admin: Toggle approval status
export async function toggleCommentApproval(id: string, approved: boolean) {
  try {
    const comment = await prisma.comment.update({
      where: { id },
      data: { approved },
      include: {
        blog: {
          select: {
            slug: true,
          },
        },
      },
    })

    if (comment?.blog?.slug) {
      revalidatePath(`/blog/${comment.blog.slug}`)
    }
    revalidatePath('/admin/dashboard/comments')

    return { success: true, data: comment }
  } catch (error: any) {
    console.error('Error toggling comment approval:', error)
    return { error: error.message || 'Something went wrong.' }
  }
}
