import { getElderlySupport } from '@/app/actions/getHelp'
import ElderlyAdminClient from './ElderlyAdminClient'

export const dynamic = 'force-dynamic'

export default async function ElderlyAdminPage() {
  const records = await getElderlySupport()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <ElderlyAdminClient initialRecords={records} />
    </div>
  )
}
