import { getContactMessages } from '@/app/actions/contact'
import ContactAdminClient from './ContactAdminClient'

export const dynamic = 'force-dynamic'

export default async function ContactAdminPage() {
  const messages = await getContactMessages()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <ContactAdminClient initialMessages={messages} />
    </div>
  )
}
