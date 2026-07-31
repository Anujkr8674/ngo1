import { getDonations } from '@/app/actions/donation'
import DonationAdminClient from './DonationAdminClient'

export const dynamic = 'force-dynamic'

export default async function DonationsAdminPage() {
  const donations = await getDonations()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <DonationAdminClient initialDonations={donations} />
    </div>
  )
}
