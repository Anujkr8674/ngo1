import { getDonorCSRMembers } from '@/app/actions/donorCSRMember'
import DonorCSRMemberAdminClient from './DonorCSRMemberAdminClient'

export const dynamic = 'force-dynamic'

export default async function DonorCSRMembersAdminPage() {
  const members = await getDonorCSRMembers()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <DonorCSRMemberAdminClient initialMembers={members} />
    </div>
  )
}
