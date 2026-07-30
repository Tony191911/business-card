import { BriefcaseBusiness } from 'lucide-react'
import FormField from './FormField'
import ServiceFields from './ServiceFields'

function ConstructionInfoSection({ 
    taxId, services, onFieldChange, onAddService, onUpdateService, onRemoveService, }) {
  return (
    <section className="rounded-xl border border-[#E0E4E8] bg-white p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-[#041627]">
        <BriefcaseBusiness size={20} />
        工程／室內設計資訊
      </h3>

      <div className="space-y-6">
        <FormField
          label="統一編號"
          placeholder="請輸入統一編號"
          value={taxId}
          onChange={(value) => onFieldChange('taxId', value)}
        />

        <ServiceFields
          services={services}
          onAddService={onAddService}
          onUpdateService={onUpdateService}
          onRemoveService={onRemoveService}
        />
      </div>
    </section>
  )
}

export default ConstructionInfoSection
