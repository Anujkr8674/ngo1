'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

// --- CATEGORY ACTIONS ---

export async function getInitiativeCategories() {
  try {
    let categories = await prisma.initiativeCategory.findMany({
      orderBy: { order: 'asc' },
    })

    if (categories.length === 0) {
      const defaultCategories = [
        { name: "Education", slug: "education", iconName: "GraduationCap", order: 0 },
        { name: "Healthcare", slug: "healthcare", iconName: "HeartHandshake", order: 1 },
        { name: "Environment", slug: "environment", iconName: "Leaf", order: 2 },
        { name: "Relief Work", slug: "relief", iconName: "Compass", order: 3 },
      ]

      await prisma.initiativeCategory.createMany({
        data: defaultCategories,
      })

      categories = await prisma.initiativeCategory.findMany({
        orderBy: { order: 'asc' },
      })
    }

    return categories
  } catch (error) {
    console.error('Error fetching initiative categories:', error)
    return []
  }
}

export async function createInitiativeCategory(name: string, slug: string, iconName: string) {
  try {
    if (!name.trim() || !slug.trim()) {
      return { error: 'Name and Slug are required' }
    }

    const cleanedSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '')
    const existing = await prisma.initiativeCategory.findUnique({ where: { slug: cleanedSlug } })
    if (existing) {
      return { error: 'A category with this slug already exists' }
    }

    const last = await prisma.initiativeCategory.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    })
    const nextOrder = last ? last.order + 1 : 0

    const category = await prisma.initiativeCategory.create({
      data: {
        name: name.trim(),
        slug: cleanedSlug,
        iconName: iconName || 'Sparkles',
        order: nextOrder
      }
    })

    revalidatePath('/initiatives')
    revalidatePath('/admin/dashboard/initiatives')
    return { success: true, category }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateInitiativeCategory(id: string, name: string, slug: string, iconName: string) {
  try {
    if (!name.trim() || !slug.trim()) {
      return { error: 'Name and Slug are required' }
    }

    const cleanedSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '')
    const existing = await prisma.initiativeCategory.findFirst({
      where: { slug: cleanedSlug, NOT: { id } }
    })
    if (existing) {
      return { error: 'A category with this slug already exists' }
    }

    const category = await prisma.initiativeCategory.update({
      where: { id },
      data: {
        name: name.trim(),
        slug: cleanedSlug,
        iconName: iconName || 'Sparkles'
      }
    })

    revalidatePath('/initiatives')
    revalidatePath('/admin/dashboard/initiatives')
    return { success: true, category }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteInitiativeCategory(id: string) {
  try {
    // Check if category has associated initiatives
    const count = await prisma.initiative.count({ where: { categoryId: id } })
    if (count > 0) {
      return { error: 'Cannot delete category. Please delete or reassign its initiatives first.' }
    }

    await prisma.initiativeCategory.delete({ where: { id } })

    revalidatePath('/initiatives')
    revalidatePath('/admin/dashboard/initiatives')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function reorderInitiativeCategories(ids: string[]) {
  try {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.initiativeCategory.update({
          where: { id },
          data: { order: index },
        })
      )
    )
    revalidatePath('/initiatives')
    revalidatePath('/admin/dashboard/initiatives')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}


// --- INITIATIVE ACTIONS ---

export async function getInitiatives() {
  try {
    // Ensure categories are loaded/seeded first
    const categories = await getInitiativeCategories()

    let initiatives = await prisma.initiative.findMany({
      orderBy: { order: 'asc' },
      include: { category: true }
    })

    if (initiatives.length === 0 && categories.length > 0) {
      const getCatId = (slug: string) => categories.find(c => c.slug === slug)?.id || categories[0].id

      const defaultInitiatives = [
        {
          title: "Underprivileged Student Sponsoring",
          desc: "Direct support for school/semester fees, books, stationaries, tuition fees, and transport expenses for students at risk of dropping out.",
          details: "Currently supporting 28 needy students from six states of India (Delhi, West Bengal, Orissa, Uttarakhand, Uttar Pradesh, Bihar), of which 57% (16) are girls.",
          sponsor: "Patrons & General Donations",
          image: "/student/Students.png",
          categoryId: getCatId("education"),
          order: 0
        },
        {
          title: "Free Coaching Center Pilot",
          desc: "Launched a pilot project in a village in Paschim Medinipur district of West Bengal to provide free offline coaching to needy students.",
          details: "Provides free academic support to 10 needy students who cannot afford tuition fees, engaging local volunteers to bridge the educational gap.",
          sponsor: "Live 4 Help Volunteers",
          image: "/focus/Picture7.png",
          categoryId: getCatId("education"),
          order: 1
        },
        {
          title: "Clinical Diagnostics & Tests",
          desc: "Organizing medical camps in remote villages to provide free medical tests and create general healthcare awareness.",
          details: "Benefited 225 adults in 2022 through free tests and preliminary screenings, supported by Erbe Medical India Pvt. Ltd. CSR funding.",
          sponsor: "M/s Erbe Medical India",
          image: "/focus/L4H-Medical-Camp-Photo-1.jpg",
          categoryId: getCatId("healthcare"),
          order: 2
        },
        {
          title: "Cancer Awareness Sessions",
          desc: "Creating cancer awareness sessions in villages of West Bengal to help school children and rural residents recognize early signs.",
          details: "Facilitated by Dr. Shyamsundar Mondal (retired ex. HOD, Department of Epidemiology & Biostatistics at Chittaranjan National Cancer Institute, Kolkata).",
          sponsor: "Roymoni Smriti Foundation & Erbe CSR",
          image: "/focus/Picture7.png",
          categoryId: getCatId("healthcare"),
          order: 3
        },
        {
          title: "Sundarban Mangrove Restoration",
          desc: "Mangrove plantation drive in the Sundarbans of West Bengal to revive critical coastal protection destroyed during Cyclone Amphan.",
          details: "Planted approximately 3000 mangrove saplings in 2021-2022. Area fenced to protect from cattle; committed to a 3-year maintenance cycle, with plants reaching 6-8 ft in height.",
          sponsor: "M/s ABS Professional India Pvt Ltd",
          image: "/focus/Live-4-Help-Mangrove-Plantation-26th-Jan22_Photo-39.jpg",
          categoryId: getCatId("environment"),
          order: 4
        },
        {
          title: "Winter Blankets Distribution",
          desc: "Distributing blankets during the winter season to daily wage migrant laborers, construction workers, and villagers.",
          details: "Privileged to support more than 300 underprivileged people through these winter drives over the last three years.",
          sponsor: "Patrons & Well-Wishers",
          image: "/focus/Cloth-Distribution-Photo-3.jpg",
          categoryId: getCatId("relief"),
          order: 5
        }
      ]

      for (const ini of defaultInitiatives) {
        await prisma.initiative.create({ data: ini })
      }

      initiatives = await prisma.initiative.findMany({
        orderBy: { order: 'asc' },
        include: { category: true }
      })
    }

    return initiatives
  } catch (error) {
    console.error('Error fetching initiatives:', error)
    return []
  }
}

export async function createInitiative(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const desc = formData.get('desc') as string
    const details = formData.get('details') as string
    const sponsor = formData.get('sponsor') as string
    const categoryId = formData.get('categoryId') as string
    const imageFile = formData.get('image') as File | null

    if (!title || !desc || !categoryId) {
      return { error: 'Title, Description, and Category are required' }
    }

    let imageUrl = ''

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `initiatives/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: imageFile.type,
        upsert: false
      })

      if (uploadError) {
        return { error: `Supabase upload failed: ${uploadError.message}` }
      }

      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      imageUrl = publicUrlData.publicUrl
    } else {
      return { error: 'Image file is required for a new initiative' }
    }

    const last = await prisma.initiative.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    })
    const nextOrder = last ? last.order + 1 : 0

    const initiative = await prisma.initiative.create({
      data: {
        title: title.trim(),
        desc: desc.trim(),
        details: (details || '').trim(),
        sponsor: (sponsor || 'Patrons').trim(),
        image: imageUrl,
        categoryId,
        order: nextOrder
      },
      include: { category: true }
    })

    revalidatePath('/initiatives')
    revalidatePath('/admin/dashboard/initiatives')
    return { success: true, initiative }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateInitiative(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const desc = formData.get('desc') as string
    const details = formData.get('details') as string
    const sponsor = formData.get('sponsor') as string
    const categoryId = formData.get('categoryId') as string
    const imageFile = formData.get('image') as File | null

    if (!title || !desc || !categoryId) {
      return { error: 'Title, Description, and Category are required' }
    }

    const existing = await prisma.initiative.findUnique({ where: { id } })
    if (!existing) {
      return { error: 'Initiative not found' }
    }

    let imageUrl = existing.image

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `initiatives/${filename}`

      const { error: uploadError } = await supabase.storage.from('assets').upload(path, buffer, {
        contentType: imageFile.type,
        upsert: false
      })

      if (uploadError) {
        return { error: `Supabase upload failed: ${uploadError.message}` }
      }

      const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(path)
      imageUrl = publicUrlData.publicUrl

      try {
        const urlObj = new URL(existing.image)
        const pathParts = urlObj.pathname.split('/')
        const index = pathParts.findIndex(p => p === 'initiatives')
        if (index !== -1) {
          const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
          await supabase.storage.from('assets').remove([storagePath])
        }
      } catch (e) {
        // Ignore URL parsing errors
      }
    }

    const initiative = await prisma.initiative.update({
      where: { id },
      data: {
        title: title.trim(),
        desc: desc.trim(),
        details: (details || '').trim(),
        sponsor: (sponsor || 'Patrons').trim(),
        image: imageUrl,
        categoryId
      },
      include: { category: true }
    })

    revalidatePath('/initiatives')
    revalidatePath('/admin/dashboard/initiatives')
    return { success: true, initiative }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteInitiative(id: string) {
  try {
    const initiative = await prisma.initiative.findUnique({ where: { id } })
    if (!initiative) {
      return { error: 'Initiative not found' }
    }

    try {
      const urlObj = new URL(initiative.image)
      const pathParts = urlObj.pathname.split('/')
      const index = pathParts.findIndex(p => p === 'initiatives')
      if (index !== -1) {
        const storagePath = pathParts.slice(index).map(decodeURIComponent).join('/')
        await supabase.storage.from('assets').remove([storagePath])
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    await prisma.initiative.delete({ where: { id } })

    revalidatePath('/initiatives')
    revalidatePath('/admin/dashboard/initiatives')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function reorderInitiatives(ids: string[]) {
  try {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.initiative.update({
          where: { id },
          data: { order: index },
        })
      )
    )
    revalidatePath('/initiatives')
    revalidatePath('/admin/dashboard/initiatives')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
