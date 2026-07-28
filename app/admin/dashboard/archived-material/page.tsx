import { getArchivedMaterials } from '@/app/actions/archivedMaterial'
import ArchivedMaterialAdminClient from './ArchivedMaterialAdminClient'

export const dynamic = 'force-dynamic'

export default async function ArchivedMaterialAdminPage() {
  const materials = await getArchivedMaterials()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <ArchivedMaterialAdminClient initialMaterials={materials} />
    </div>
  )
}
