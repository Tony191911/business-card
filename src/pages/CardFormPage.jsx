import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Badge, BriefcaseBusiness, Building2, Camera, Contact, Eye, Link as LinkIcon } from 'lucide-react'
import { getCardById, saveCard } from '../services/cardService'
import AdminHeader from '../components/Admin/AdminHeader'
import AdminLayout from '../components/Admin/AdminLayout'
import FormField from '../components/CardForm/FormField'
import UploadBox from '../components/CardForm/UploadBox'
import IndustryOption from '../components/CardForm/IndustryOption'
import ServiceFields from '../components/CardForm/ServiceFields'
import { uploadCardImage } from '../services/storageService'
import { createId } from '../utils/createId'

const emptyCard = {
  id: '',
  slug: '',
  status: 'draft',
  industry: 'general',

  name: '',
  title: '',
  company: '',
  companyEn: '',

  mobile: '',
  officePhone: '',
  fax: '',
  email: '',
  address: '',
  taxId: '',

  website: '',

  avatarUrl: '',
  logoUrl: '',

  services: [],
}

const sampleCard = {
  ...emptyCard,
  slug: 'cheng-li-design',
  status: 'draft',
  industry: 'construction',

  name: '覃慧芬',
  title: '室內設計師',
  company: '承麗實業有限公司',
  companyEn: 'Cheng Li Co., Ltd.',

  mobile: '0937-721470',
  officePhone: '',
  fax: '04-2381-1649',
  email: 'fen19192005@yahoo.com.tw',
  address: '408台中市南屯區楓和路676號',
  taxId: '80433113',

  website: '',

  avatarUrl: '',
  logoUrl: '',

  services: [
    {
      id: createId(),
      serviceName: '住宅裝修設計施工',
      sortOrder: 1,
    },
    {
      id: createId(),
      serviceName: '系統櫥櫃設計施工',
      sortOrder: 2,
    },
    {
      id: createId(),
      serviceName: '辦公室設備銷售',
      sortOrder: 3,
    },
    {
      id: createId(),
      serviceName: '辦公室規劃施工',
      sortOrder: 4,
    },
  ]
}


function CardFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)
  const [formData, setFormData] = useState(emptyCard)
  const [isLoading, setIsLoading] = useState(isEditMode)
  const [errorMessage, setErrorMessage] = useState('')
  const [uploadFolder] = useState(() => id || crypto.randomUUID())
  const [uploadingType, setUploadingType] = useState(null)

  useEffect(() => {
    if (!isEditMode) return

    async function loadCard() {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const card = await getCardById(id)
        setFormData(card)
      } catch (error) {
        console.error(error)
        setErrorMessage('讀取名片失敗')
      } finally {
        setIsLoading(false)
      }
    }

    loadCard()
  }, [id, isEditMode])

  if (isLoading) {
    return (
      <AdminLayout>
        <AdminHeader
          title={isEditMode ? '編輯名片' : '新增名片'}
          backTo="/admin"
        />

        <div className="mx-auto w-full max-w-300 px-6 py-10">
          <div className="rounded-2xl border border-[#E0E4E8] bg-white px-8 py-12 text-center">
            <p className="text-sm text-[#677489]">名片讀取中...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (errorMessage) {
    return (
      <AdminLayout>
        <AdminHeader
          title={isEditMode ? '編輯名片' : '新增名片'}
          backTo="/admin"
        />

        <div className="mx-auto w-full max-w-300 px-6 py-10">
          <div className="rounded-2xl border border-red-100 bg-red-50 px-8 py-12 text-center">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  const isConstruction = formData.industry === 'construction'

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  async function handleImageUpload(imageType, file) {
    try {
      setUploadingType(imageType)
      const { url } = await uploadCardImage({
        file,
        folderId: uploadFolder,
        imageType,
      })
      updateField(
        imageType === 'avatar' ? 'avatarUrl' : 'logoUrl',
        url
      )
    } catch (error) {
      console.error(error)
      alert(error.message || '圖片上傳失敗')
    } finally {
      setUploadingType(null)
    }
  }

  function updateService(serviceId, value) {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.id === serviceId
          ? { ...service, serviceName: value }
          : service
      ),
    }))
  }

  function addService() {
    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          id: createId(),
          serviceName: '',
          sortOrder: prev.services.length + 1,
        },
      ],
    }))
  }

  function removeService(serviceId) {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== serviceId),
    }))
  }

  async function handleSaveDraft() {
    try {
      const nextCard = {
        ...formData,
        status: 'draft',
      }
      await saveCard(nextCard)
      alert('已儲存草稿')
      navigate('/admin')
    } catch (error) {
      console.error(error)
      alert(error.message || '儲存草稿失敗')
    }
  }

  async function handlePublish() {
    if (!formData.name.trim()) {
      alert('請輸入姓名')
      return
    }
    if (!formData.company.trim()) {
      alert('請輸入公司名稱')
      return
    }
    if (!formData.slug.trim()) {
      alert('請輸入網址代稱')
      return
    }
    try {
      const nextCard = {
        ...formData,
        status: 'published',
      }
      const savedCard = await saveCard(nextCard)
      alert('已發布名片')
      navigate(`/admin/cards/${savedCard.id}/preview`)
    } catch (error) {
      console.error(error)
      alert('發布名片失敗')
    }
  }

  async function handlePreview() {
    try {
      const nextCard = {
        ...formData,
        status: formData.status || 'draft',
      }
      const savedCard = await saveCard(nextCard)
      navigate(`/admin/cards/${savedCard.id}/preview`)
    } catch (error) {
      console.error(error);
      alert('預覽前儲存失敗')
    }
  }

  function fillSampleData() {
    setFormData({
      ...sampleCard,
      id: formData.id || '',
    })
  }

  return (
    <AdminLayout>
      {/* Header */}
      <AdminHeader
        title={isEditMode ? '編輯名片' : '新增名片'}
        backTo="/admin"
        status={formData.status}
      />

      {/* Form */}
      <div className="mx-auto w-full max-w-300 flex-1 px-6 pb-32 pt-8">
        <form className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
          {/* Left Column */}
          <div className="flex flex-col gap-6 xl:col-span-8">
            {/* Basic Info */}
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
                  onFileSelect={(file) => handleImageUpload('avatar', file)}
                />

                <UploadBox
                  label="公司商標 (Logo)"
                  icon={<Building2 size={26} />}
                  description="點擊上傳公司 Logo（建議橫式）"
                  imageUrl={formData.logoUrl}
                  uploading={uploadingType === 'logo'}
                  onFileSelect={(file) => handleImageUpload('logo', file)}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  label="姓名 (Name) *"
                  placeholder="請輸入姓名"
                  value={formData.name}
                  onChange={(value) => updateField('name', value)}
                />

                <FormField
                  label="公司名稱 (Company) *"
                  placeholder="請輸入公司名稱"
                  value={formData.company}
                  onChange={(value) => updateField('company', value)}
                />

                <FormField
                  label="公司英文名 (Company English Name)"
                  placeholder="請輸入公司英文名"
                  value={formData.companyEn}
                  onChange={(value) => updateField('companyEn', value)}
                />

                <FormField
                  label="職稱 (Title) *"
                  placeholder="例如：室內設計師"
                  value={formData.title}
                  onChange={(value) => updateField('title', value)}
                />
              </div>
            </section>

            {/* Contact Info */}
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
                  onChange={(value) => updateField('mobile', value)}
                />

                <FormField
                  label="電子信箱 (Email)"
                  placeholder="example@company.com"
                  value={formData.email}
                  onChange={(value) => updateField('email', value)}
                />

                <FormField
                  label="公司電話 (Phone)"
                  placeholder="02-1234-5678"
                  value={formData.officePhone}
                  onChange={(value) => updateField('officePhone', value)}
                />

                <FormField
                  label="傳真 (Fax)"
                  placeholder="02-1234-5679"
                  value={formData.fax}
                  onChange={(value) => updateField('fax', value)}
                />

                <FormField
                  label="公司地址 (Address)"
                  placeholder="請輸入完整地址"
                  value={formData.address}
                  onChange={(value) => updateField('address', value)}
                  full
                />

                <FormField
                  label="官方網站 (Website)"
                  placeholder="https://www.company.com"
                  value={formData.website}
                  onChange={(value) => updateField('website', value)}
                  full
                />
              </div>
            </section>

            {/* Construction Info */}
            {isConstruction && (
              <section className="rounded-xl border border-[#E0E4E8] bg-white p-6 shadow-sm">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-[#041627]">
                  <BriefcaseBusiness size={20} />
                  工程／室內設計資訊
                </h3>

                <div className="space-y-6">
                  <FormField
                    label="統一編號"
                    placeholder="請輸入統一編號"
                    value={formData.taxId}
                    onChange={(value) => updateField('taxId', value)}
                  />

                  <ServiceFields
                    services={formData.services}
                    onAddService={addService}
                    onUpdateService={updateService}
                    onRemoveService={removeService}
                  />
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <aside className="flex flex-col gap-6 xl:col-span-4 xl:sticky xl:top-24">
            {/* Industry */}
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
                  checked={formData.industry === 'general'}
                  title="通用版 (General)"
                  description="適合大多數企業、業務與服務業，強調聯絡資訊與簡潔設計。"
                  onClick={() => updateField('industry', 'general')}
                />

                <IndustryOption
                  checked={formData.industry === 'construction'}
                  title="工程／室內設計版"
                  description="適合室內設計、裝修工程、營造、空間規劃等服務型名片。"
                  onClick={() => updateField('industry', 'construction')}
                />
              </div>
            </section>

            {/* URL */}
            <section className="rounded-xl border border-[#E0E4E8] bg-white p-6 shadow-sm">
              <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-[#041627]">
                <LinkIcon size={20} />
                網址設定
              </h3>

              <p className="mb-5 text-sm leading-relaxed text-[#44474c]">
                設定此名片的專屬公開網址。
              </p>

              <label className="mb-2 block text-xs font-semibold tracking-wider text-[#44474c]">
                網址代稱 Slug
              </label>

              <div className="mb-3 flex">
                <span className="flex h-11 items-center rounded-l-lg border border-r-0 border-[#E0E4E8] bg-[#f3f4f5] px-3 text-sm text-[#677489]">
                  digicard.com/
                </span>

                <input
                  type="text"
                  value={formData.slug}
                  onChange={(event) => updateField('slug', event.target.value)}
                  placeholder="your-slug"
                  className="h-11 min-w-0 flex-1 rounded-r-lg border border-[#E0E4E8] bg-white px-3 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-[#041627] focus:ring-2 focus:ring-[#041627]/10"
                />
              </div>

              <div className="rounded-lg border border-dashed border-[#E0E4E8] bg-[#f8f9fa] p-3">
                <span className="mb-1 block text-xs font-semibold tracking-wider text-[#44474c]">
                  公開網址預覽：
                </span>

                <p className="break-all text-sm text-[#041627]">
                  digicard.com/{formData.slug || 'your-slug'}
                </p>
              </div>
            </section>
          </aside>
        </form>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 right-0 z-30 w-full border-t border-[#E0E4E8] bg-white p-6 shadow-[0px_-4px_12px_rgba(26,43,60,0.02)] lg:w-[calc(100%-16rem)]">
        <div className="mx-auto flex max-w-300 items-center justify-between gap-3">
          <Link
            to="/admin"
            className="rounded-lg border border-[#E0E4E8] px-6 py-3 text-sm font-semibold text-[#44474c] transition-colors hover:bg-[#f3f4f5]"
          >
            返回
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fillSampleData}
              className="rounded-lg border border-[#E0E4E8] px-6 py-3 text-sm font-semibold text-[#677489] transition-colors hover:bg-[#f3f4f5]"
            >
              填入範例資料
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="rounded-lg border border-[#E0E4E8] px-6 py-3 text-sm font-semibold text-[#1A2B3C] transition-colors hover:bg-[#f3f4f5]"
            >
              儲存草稿
            </button>

            <button
              type="button"
              onClick={handlePreview}
              className="flex items-center gap-2 rounded-lg border border-[#041627] px-6 py-3 text-sm font-semibold text-[#041627] transition-colors hover:bg-[#041627]/5"
            >
              <Eye size={18} />
              預覽名片
            </button>

            <button
              type="button"
              onClick={handlePublish}
              className="rounded-lg bg-[#041627] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a2b3c]"
            >
              發布名片
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default CardFormPage