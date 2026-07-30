import { Contact } from 'lucide-react'
import FormField from './FormField'

function ContactInfoSection({ formData, onFieldChange }) {
  return (
    <section className="rounded-xl border border-[#E0E4E8] bg-white p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-[#041627]">
        <Contact size={20} />
        聯絡資訊
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          label="手機號碼 (Mobile)"
          placeholder="0900-000-000"
          value={formData.mobile}
          onChange={(value) => onFieldChange('mobile', value)}
        />

        <FormField
          label="電子信箱 (Email)"
          placeholder="example@company.com"
          value={formData.email}
          onChange={(value) => onFieldChange('email', value)}
        />

        <FormField
          label="公司電話 (Phone)"
          placeholder="02-1234-5678"
          value={formData.officePhone}
          onChange={(value) => onFieldChange('officePhone', value)}
        />

        <FormField
          label="傳真 (Fax)"
          placeholder="02-1234-5679"
          value={formData.fax}
          onChange={(value) => onFieldChange('fax', value)}
        />

        <FormField
          label="公司地址 (Address)"
          placeholder="請輸入完整地址"
          value={formData.address}
          onChange={(value) => onFieldChange('address', value)}
          full
        />

        <FormField
          label="官方網站 (Website)"
          placeholder="https://www.company.com"
          value={formData.website}
          onChange={(value) => onFieldChange('website', value)}
          full
        />
      </div>
    </section>
  )
}

export default ContactInfoSection
