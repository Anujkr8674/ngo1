import { getEducationSupport } from '@/app/actions/getHelp'
import EducationAdminClient from './EducationAdminClient'

export const dynamic = 'force-dynamic'

export default async function EducationAdminPage() {
  const records = await getEducationSupport()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <EducationAdminClient initialRecords={records} />
    </div>
  )
}
