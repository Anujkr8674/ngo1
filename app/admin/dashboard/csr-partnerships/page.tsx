import { getCsrPartnerships } from '@/app/actions/csrPartnership'
import CsrAdminClient from './CsrAdminClient'

export const dynamic = 'force-dynamic'

export default async function CsrAdminPage() {
  const records = await getCsrPartnerships()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <CsrAdminClient initialRecords={records} />
    </div>
  )
}
