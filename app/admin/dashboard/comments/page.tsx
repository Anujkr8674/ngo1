import { getAllCommentsAdmin } from '@/app/actions/blogComment'
import CommentsAdminClient from './CommentsAdminClient'

export const dynamic = 'force-dynamic'

export default async function CommentsAdminPage() {
  const records = await getAllCommentsAdmin()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <CommentsAdminClient initialRecords={records} />
    </div>
  )
}
