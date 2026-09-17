import { Contact } from 'lucide-react'
import FormField from './FormField'
import { FIELDS } from '../../config/fields'

function ContactInfoSection({ formData, onFieldChange }) {
  // 把 key 展開成 FormField 需要的 props，label / placeholder 一律查登記表
  const field = (key, extra = {}) => ({
    label: FIELDS[key].formLabel,
    placeholder: FIELDS[key].placeholder,
    value: formData[key],
    onChange: (value) => onFieldChange(key, value),
    ...extra,
  })

  return (
    <section className="rounded-xl border border-[#E0E4E8] bg-white p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-[#041627]">
        <Contact size={20} />
        聯絡資訊
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField {...field('mobile')} />
        <FormField {...field('email')} />
        <FormField {...field('officePhone')} />
        <FormField {...field('fax')} />
        <FormField {...field('address', { full: true })} />
        <FormField {...field('website', { full: true })} />
      </div>
    </section>
  )
}

export default ContactInfoSection
