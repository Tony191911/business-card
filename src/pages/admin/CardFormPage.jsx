import { useParams } from 'react-router-dom'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminLayout from '../../components/admin/AdminLayout'
import BasicInfoSection from '../../components/cardForm/BasicInfoSection'
import ContactInfoSection from '../../components/cardForm/ContactInfoSection'
import ConstructionInfoSection from '../../components/cardForm/ConstructionInfoSection'
import IndustrySection from '../../components/cardForm/IndustrySection'
import UrlSettingSection from '../../components/cardForm/UrlSettingSection'
import CardFormActions  from '../../components/cardForm/CardFormActions'
import { useCardForm } from '../../hooks/useCardForm'

function CardFormPage() {
  const { id } = useParams()

  const {
    formData, isEditMode, isLoading, errorMessage, uploadingType,
    updateField, handleImageUpload,
    updateService, addService, removeService,
    handleSaveDraft, handlePublish, handlePreview, fillSampleData,
  } = useCardForm(id)

  const isConstruction = formData.industry === 'construction'

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
            <BasicInfoSection
              formData={formData}
              uploadingType={uploadingType}
              onFieldChange={updateField}
              onImageUpload={handleImageUpload}
            />
            {/* Contact Info */}
            <ContactInfoSection
              formData={formData}
              onFieldChange={updateField}
            />

            {/* Construction Info */}
            {isConstruction && (
              <ConstructionInfoSection
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
            <IndustrySection
              industry={formData.industry}
              onChange={(value) => updateField('industry', value)}
            />

            {/* URL */}
            <UrlSettingSection
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
