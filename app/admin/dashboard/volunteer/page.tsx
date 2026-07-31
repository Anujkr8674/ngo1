import { getVolunteers } from '@/app/actions/volunteer'
import VolunteerAdminClient from './VolunteerAdminClient'

export const dynamic = 'force-dynamic'

export default async function VolunteerAdminPage() {
  const records = await getVolunteers()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <VolunteerAdminClient initialRecords={records} />
    </div>
  )
}
