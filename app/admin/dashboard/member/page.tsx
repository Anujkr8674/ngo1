import { getMembers } from '@/app/actions/member'
import MemberAdminClient from './MemberAdminClient'

export const dynamic = 'force-dynamic'

export default async function MemberAdminPage() {
  const records = await getMembers()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <MemberAdminClient initialRecords={records} />
    </div>
  )
}
