import { BriefcaseBusiness } from 'lucide-react'
import IndustryOption from './IndustryOption'

function Industry({ industry, onChange }) {
  return (
    <section className="rounded-xl border border-[#E0E4E8] bg-white p-6 shadow-sm">
      <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-[#041627]">
        <BriefcaseBusiness size={20} />
        產業版本
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-[#44474c]">
        選擇適合您產業的名片版型與功能。
      </p>

      <div className="space-y-3">
        <IndustryOption
          checked={industry === 'general'}
          title="通用版 (General)"
          description="適合大多數企業、業務與服務業，強調聯絡資訊與簡潔設計。"
          onClick={() => onChange('general')}
        />

        <IndustryOption
          checked={industry === 'construction'}
          title="工程／室內設計版"
          description="適合室內設計、裝修工程、營造、空間規劃等服務型名片。"
          onClick={() => onChange('construction')}
        />
      </div>
    </section>
  )
}

export default Industry