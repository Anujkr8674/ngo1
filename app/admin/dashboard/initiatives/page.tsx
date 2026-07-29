import { getInitiativeCategories, getInitiatives } from '@/app/actions/initiative'
import InitiativeAdminClient from './InitiativeAdminClient'

export const dynamic = 'force-dynamic'

export default async function InitiativesAdminPage() {
  const [categories, initiatives] = await Promise.all([
    getInitiativeCategories(),
    getInitiatives()
  ])

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <InitiativeAdminClient initialCategories={categories} initialInitiatives={initiatives} />
    </div>
  )
}
