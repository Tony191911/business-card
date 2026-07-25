import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCardById, saveCard } from '../../services/cardService'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminLayout from '../../components/admin/AdminLayout'
import { uploadCardImage } from '../../services/imgUploadService'
import { createId } from '../../utils/createId'
import { emptyCard, createSampleCard, } from '../../data/cardFormData'
import { BasicInfo } from '../../components/cardForm/BasicInfo'
import { ContactInfo } from '../../components/cardForm/ContactInfo'
import { ConstructionInfo } from '../../components/cardForm/ConstructionInfo'
import { Industry } from '../../components/cardForm/Industry'
import { UrlSetting } from '../../components/cardForm/UrlSetting'
import { CardFormActions } from '../../components/cardForm/CardFormActions'

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
      ...createSampleCard(),
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
            <BasicInfo
              formData={formData}
              uploadingType={uploadingType}
              onFieldChange={updateField}
              onImageUpload={handleImageUpload}
            />
            {/* Contact Info */}
            <ContactInfo
              formData={formData}
              onFieldChange={updateField}
            />

            {/* Construction Info */}
            {isConstruction && (
              <ConstructionInfo
                taxId={formData.taxId}
                services={formData.services}
                onFieldChange={updateField}
                onAddService={addService}
                onUpdateService={updateService}
                onRemoveService={removeService}
              />
            )}
          </div>

          {/* Right Column */}
          <aside className="flex flex-col gap-6 xl:col-span-4 xl:sticky xl:top-24">
            {/* Industry */}
            <Industry
              industry={formData.industry}
              onChange={(value) => updateField('industry', value)}
            />

            {/* URL */}
            <UrlSetting
              slug={formData.slug}
              baseUrl={`${window.location.origin}/card/`}
              onChange={(value) => updateField('slug', value)}
            />
          </aside>
        </form>
      </div>

      {/* Bottom Action Bar */}
      <CardFormActions
        onFillSample={fillSampleData}
        onSaveDraft={handleSaveDraft}
        onPreview={handlePreview}
        onPublish={handlePublish}
      />
    </AdminLayout>
  )
}

export default CardFormPage
