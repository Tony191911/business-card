import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Badge,
  BriefcaseBusiness,
  Building2,
  Camera,
  Contact,
  Eye,
  Link as LinkIcon,
  Plus,
  Save,
  Send,
  Settings,
  Trash2,
} from 'lucide-react'
import { mockCards } from '../config/mockCards'
import CardNotFound from '../components/NotFound'

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

function CardFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const isEditMode = Boolean(id)

  const initialCard = useMemo(() => {
    if (!isEditMode) return emptyCard

    const foundCard = mockCards.find((card) => card.id === id)
    return foundCard || null
  }, [id, isEditMode])

  const [formData, setFormData] = useState(initialCard || emptyCard)

  if (!initialCard) {
    return <CardNotFound />
  }

  const isConstruction = formData.industry === 'construction'

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
          id: crypto.randomUUID(),
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

  function handleSaveDraft() {
    alert('之後接資料庫時，這裡會儲存草稿')
  }

  function handlePublish() {
    alert('之後接資料庫時，這裡會發布名片')
  }

  function handlePreview() {
    if (isEditMode) {
      navigate(`/admin/cards/${formData.id}/preview`)
      return
    }

    alert('新增模式下，之後會先建立草稿，再導到預覽頁')
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1A2B3C]">
      <div className="flex min-h-screen">
        {/* Side Nav */}
        <aside className="hidden w-64 shrink-0 border-r border-[#E0E4E8] bg-white px-4 py-6 lg:block">
          <div className="mb-10 px-2">
            <h1 className="text-xl font-semibold text-[#041627]">
              DigiCard Admin
            </h1>
            <p className="mt-1 text-sm text-[#677489]">電子名片管理</p>
          </div>

          <nav className="space-y-2">
            <Link
              to="/admin"
              className="flex items-center gap-3 border-r-4 border-[#041627] bg-[#f3f4f5] px-3 py-3 text-sm font-semibold text-[#041627]"
            >
              <Contact size={20} />
              名片管理
            </Link>

            <button
              type="button"
              className="flex w-full items-center gap-3 border-r-4 border-transparent px-3 py-3 text-sm font-semibold text-[#677489] hover:bg-[#f3f4f5]"
            >
              <Settings size={20} />
              系統設定
            </button>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex min-h-screen flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E0E4E8] bg-white px-6 py-4">
            <div className="flex items-center gap-3">
              <Link
                to="/admin"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#44474c] hover:bg-[#f3f4f5]"
              >
                <ArrowLeft size={22} />
              </Link>

              <h2 className="text-xl font-semibold text-[#041627]">
                {isEditMode ? '編輯名片' : '新增名片'}
              </h2>
            </div>

            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-500">
              {formData.status === 'published' ? '已發布' : '草稿'}
            </span>
          </header>

          {/* Form */}
          <div className="mx-auto w-full max-w-[1200px] flex-1 px-6 pb-32 pt-8">
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
                    />

                    <UploadBox
                      label="公司商標 (Logo)"
                      icon={<Building2 size={26} />}
                      description="點擊上傳公司 Logo（建議橫式）"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <TextField
                      label="姓名 (Name) *"
                      placeholder="請輸入姓名"
                      value={formData.name}
                      onChange={(value) => updateField('name', value)}
                    />

                    <TextField
                      label="公司名稱 (Company) *"
                      placeholder="請輸入公司名稱"
                      value={formData.company}
                      onChange={(value) => updateField('company', value)}
                    />

                    <TextField
                      label="公司英文名 (Company English Name)"
                      placeholder="請輸入公司英文名"
                      value={formData.companyEn}
                      onChange={(value) => updateField('companyEn', value)}
                    />

                    <TextField
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
                    <TextField
                      label="手機號碼 (Mobile)"
                      placeholder="0900-000-000"
                      value={formData.mobile}
                      onChange={(value) => updateField('mobile', value)}
                    />

                    <TextField
                      label="電子信箱 (Email)"
                      placeholder="example@company.com"
                      value={formData.email}
                      onChange={(value) => updateField('email', value)}
                    />

                    <TextField
                      label="公司電話 (Phone)"
                      placeholder="02-1234-5678"
                      value={formData.officePhone}
                      onChange={(value) => updateField('officePhone', value)}
                    />

                    <TextField
                      label="傳真 (Fax)"
                      placeholder="02-1234-5679"
                      value={formData.fax}
                      onChange={(value) => updateField('fax', value)}
                    />

                    <TextField
                      label="公司地址 (Address)"
                      placeholder="請輸入完整地址"
                      value={formData.address}
                      onChange={(value) => updateField('address', value)}
                      full
                    />

                    <TextField
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
                      <TextField
                        label="統一編號"
                        placeholder="請輸入統一編號"
                        value={formData.taxId}
                        onChange={(value) => updateField('taxId', value)}
                      />

                      <div>
                        <label className="mb-2 block text-xs font-semibold tracking-wider text-[#44474c]">
                          服務項目
                        </label>

                        <div className="mb-3 flex flex-col gap-3">
                          {formData.services.map((service) => (
                            <div key={service.id} className="flex items-center gap-3">
                              <input
                                type="text"
                                value={service.serviceName}
                                onChange={(event) =>
                                  updateService(service.id, event.target.value)
                                }
                                placeholder="請輸入服務項目"
                                className="h-11 flex-1 rounded-lg border border-[#E0E4E8] bg-white px-3 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-[#041627] focus:ring-2 focus:ring-[#041627]/10"
                              />

                              <button
                                type="button"
                                onClick={() => removeService(service.id)}
                                className="flex h-11 w-11 items-center justify-center text-gray-400 transition-colors hover:text-red-500"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={addService}
                          className="flex items-center gap-2 text-sm font-semibold text-[#041627] hover:text-[#1a2b3c]"
                        >
                          <Plus size={18} />
                          新增服務項目
                        </button>
                      </div>
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
            <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3">
              <Link
                to="/admin"
                className="rounded-lg border border-[#E0E4E8] px-6 py-3 text-sm font-semibold text-[#44474c] transition-colors hover:bg-[#f3f4f5]"
              >
                返回
              </Link>

              <div className="flex items-center gap-3">
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
        </main>
      </div>
    </div>
  )
}

function UploadBox({ label, icon, description, square = false }) {
  return (
    <div className={square ? 'w-full md:w-32 md:shrink-0' : 'flex-1'}>
      <label className="mb-3 block text-xs font-semibold tracking-wider text-[#44474c]">
        {label}
      </label>

      <button
        type="button"
        className={`flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E0E4E8] bg-white p-3 text-[#74777d] transition-colors hover:border-[#041627] hover:bg-[#f3f4f5] ${
          square ? 'aspect-square md:h-32 md:w-32' : 'h-32'
        }`}
      >
        {icon}
        <span className="mt-2 text-center text-xs leading-relaxed">
          {description}
        </span>
      </button>
    </div>
  )
}

function TextField({ label, value, onChange, placeholder, full = false }) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="mb-2 block text-xs font-semibold tracking-wider text-[#44474c]">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-[#E0E4E8] bg-white px-3 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-[#041627] focus:ring-2 focus:ring-[#041627]/10"
      />
    </div>
  )
}

function IndustryOption({ checked, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
        checked
          ? 'border-[#041627] bg-[#041627]/5'
          : 'border-[#E0E4E8] hover:border-[#041627]/50 hover:bg-[#f3f4f5]'
      }`}
    >
      <span
        className={`mt-1 h-4 w-4 rounded-full border ${
          checked ? 'border-[#041627] bg-[#041627]' : 'border-[#E0E4E8]'
        }`}
      />

      <span className="flex flex-col">
        <span className="text-sm font-semibold text-[#041627]">{title}</span>
        <span className="mt-1 text-sm leading-relaxed text-[#44474c]">
          {description}
        </span>
      </span>
    </button>
  )
}

export default CardFormPage