import { getAgmReports } from '@/app/actions/agm'
import AgmAdminClient from './AgmAdminClient'

export const dynamic = 'force-dynamic'

export default async function AgmAdminPage() {
  const reports = await getAgmReports()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <AgmAdminClient initialReports={reports} />
    </div>
  )
}
