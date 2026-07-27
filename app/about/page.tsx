import { getTeamMembers } from '@/app/actions/team'
import AboutClient from './AboutClient'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const teamMembers = await getTeamMembers()

  return <AboutClient teamMembers={teamMembers} />
}
