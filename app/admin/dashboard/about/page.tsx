import { getTeamMembers } from '@/app/actions/team'
import AboutAdminClient from './AboutAdminClient'

export const dynamic = 'force-dynamic'

export default async function AboutAdminPage() {
  const teamMembers = await getTeamMembers()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <AboutAdminClient initialTeamMembers={teamMembers} />
    </div>
  )
}
