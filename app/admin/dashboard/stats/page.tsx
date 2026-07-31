import { getHomepageStats } from '@/app/actions/homepageStat'
import StatsAdminClient from './StatsAdminClient'

export const dynamic = 'force-dynamic'

export default async function StatsAdminPage() {
  const records = await getHomepageStats()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <StatsAdminClient initialRecords={records} />
    </div>
  )
}
