import { getHelpEachOther } from '@/app/actions/getHelp'
import EachOtherAdminClient from './EachOtherAdminClient'

export const dynamic = 'force-dynamic'

export default async function EachOtherAdminPage() {
  const records = await getHelpEachOther()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <EachOtherAdminClient initialRecords={records} />
    </div>
  )
}
