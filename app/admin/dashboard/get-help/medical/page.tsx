import { getMedicalSupport } from '@/app/actions/getHelp'
import MedicalAdminClient from './MedicalAdminClient'

export const dynamic = 'force-dynamic'

export default async function MedicalAdminPage() {
  const records = await getMedicalSupport()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <MedicalAdminClient initialRecords={records} />
    </div>
  )
}
