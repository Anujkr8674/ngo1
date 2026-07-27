import { getAgmReports } from '@/app/actions/agm'
import AgmClient from './AgmClient'

export const dynamic = 'force-dynamic'

export default async function AgmPage() {
  const reports = await getAgmReports()

  return <AgmClient reports={reports} />
}
