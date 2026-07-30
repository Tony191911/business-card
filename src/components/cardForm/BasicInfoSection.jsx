import { Badge, Building2, Camera } from 'lucide-react'
import FormField from './FormField'
import UploadBox from './UploadBox'

function BasicInfoSection({ formData, uploadingType, onFieldChange, onImageUpload, }) {
  return (
    <section className="rounded-xl border border-[#E0E4E8] bg-white p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-[#041627]">
        <Badge size={20} />
        基本資訊
      </h3>

      <div className="mb-6 flex flex-col gap-6 md:flex-row">
        <UploadBox
          label="大頭照上傳 (Avatar)"
          icon={<Camera size={26} />}
          description="點擊上傳"
          square
          imageUrl={formData.avatarUrl}
          uploading={uploadingType === 'avatar'}
          onFileSelect={(file) => onImageUpload('avatar', file)}
        />

        <UploadBox
          label="公司商標 (Logo)"
          icon={<Building2 size={26} />}
          description="點擊上傳公司 Logo（建議橫式）"
          imageUrl={formData.logoUrl}
          uploading={uploadingType === 'logo'}
          onFileSelect={(file) => onImageUpload('logo', file)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          label="姓名 (Name) *"
          placeholder="請輸入姓名"
          value={formData.name}
          onChange={(value) => onFieldChange('name', value)}
        />

        <FormField
          label="公司名稱 (Company) *"
          placeholder="請輸入公司名稱"
          value={formData.company}
          onChange={(value) => onFieldChange('company', value)}
        />

        <FormField
          label="公司英文名 (Company English Name)"
          placeholder="請輸入公司英文名"
          value={formData.companyEn}
          onChange={(value) => onFieldChange('companyEn', value)}
        />

        <FormField
          label="職稱 (Title) *"
          placeholder="例如：室內設計師"
          value={formData.title}
          onChange={(value) => onFieldChange('title', value)}
        />
      </div>
    </section>
  )
}

export default BasicInfoSection
