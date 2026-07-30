import { Plus, Trash2 } from 'lucide-react'

function ServiceFields({
  services,
  onAddService,
  onUpdateService,
  onRemoveService,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold tracking-wider text-[#44474c]">
        服務項目
      </label>

      <div className="mb-3 flex flex-col gap-3">
        {services.map((service) => (
          <div key={service.id} className="flex items-center gap-3">
            <input
              type="text"
              value={service.serviceName}
              onChange={(event) =>
                onUpdateService(service.id, event.target.value)
              }
              placeholder="請輸入服務項目"
              className="h-11 flex-1 rounded-lg border border-[#E0E4E8] bg-white px-3 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-[#041627] focus:ring-2 focus:ring-[#041627]/10"
            />

            <button
              type="button"
              onClick={() => onRemoveService(service.id)}
              className="flex h-11 w-11 items-center justify-center text-gray-400 transition-colors hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAddService}
        className="flex items-center gap-2 text-sm font-semibold text-[#041627] hover:text-[#1a2b3c]"
      >
        <Plus size={18} />
        新增服務項目
      </button>
    </div>
  )
}

export default ServiceFields