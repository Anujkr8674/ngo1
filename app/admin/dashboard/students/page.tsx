import { getStudentSheets } from '@/app/actions/studentSheet'
import StudentSheetAdminClient from './StudentSheetAdminClient'

export const dynamic = 'force-dynamic'

export default async function StudentSheetsAdminPage() {
  const sheets = await getStudentSheets()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <StudentSheetAdminClient initialSheets={sheets} />
    </div>
  )
}
