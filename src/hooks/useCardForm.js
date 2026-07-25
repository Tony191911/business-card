import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCardById, saveCard } from '../services/cardService'
import { uploadCardImage } from '../services/imgUploadService'
import { createId } from '../utils/createId'
import { emptyCard, createSampleCard, } from '../data/cardFormData'

export function useCardForm(id) {
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const [formData, setFormData] = useState(emptyCard)
  const [isLoading, setIsLoading] = useState(isEditMode)
  const [errorMessage, setErrorMessage] = useState('')
  const [uploadingType, setUploadingType] = useState(null)
  const [uploadFolder] = useState(
    () => id || crypto.randomUUID()
  )

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

  function updateField(field, value) {
    setFormData((previousFormData) => ({
      ...previousFormData,
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

      const field =
        imageType === 'avatar' ? 'avatarUrl' : 'logoUrl'

      updateField(field, url)
    } catch (error) {
      console.error(error)
      alert(error.message || '圖片上傳失敗')
    } finally {
      setUploadingType(null)
    }
  }

  function updateService(serviceId, value) {
    setFormData((previousFormData) => ({
      ...previousFormData,
      services: previousFormData.services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              serviceName: value,
            }
          : service
      ),
    }))
  }

  function addService() {
    setFormData((previousFormData) => ({
      ...previousFormData,
      services: [
        ...previousFormData.services,
        {
          id: createId(),
          serviceName: '',
          sortOrder: previousFormData.services.length + 1,
        },
      ],
    }))
  }

  function removeService(serviceId) {
    setFormData((previousFormData) => ({
      ...previousFormData,
      services: previousFormData.services
        .filter((service) => service.id !== serviceId)
        .map((service, index) => ({
          ...service,
          sortOrder: index + 1,
        })),
    }))
  }

  async function handleSaveDraft() {
    try {
      await saveCard({
        ...formData,
        status: 'draft',
      })
      alert('已儲存草稿')
      navigate('/admin')
    } catch (error) {
      console.error(error)
      alert(error.message || '儲存草稿失敗')
    }
  }

  async function handlePublish() {
    if (!validatePublishData()) return

    try {
      const savedCard = await saveCard({
        ...formData,
        status: 'published',
      })
      alert('已發布名片')
      navigate(`/admin/cards/${savedCard.id}/preview`)
    } catch (error) {
      console.error(error)
      alert(error.message || '發布名片失敗')
    }
  }

  async function handlePreview() {
    try {
      const savedCard = await saveCard({
        ...formData,
        status: formData.status || 'draft',
      })
      navigate(`/admin/cards/${savedCard.id}/preview`)
    } catch (error) {
      console.error(error)
      alert(error.message || '預覽前儲存失敗')
    }
  }

  function validatePublishData() {
    if (!formData.name.trim()) {
      alert('請輸入姓名')
      return false
    }
    if (!formData.company.trim()) {
      alert('請輸入公司名稱')
      return false
    }
    if (!formData.slug.trim()) {
      alert('請輸入網址代稱')
      return false
    }
    return true
  }

  function fillSampleData() {
    setFormData({
      ...createSampleCard(),
      id: formData.id || '',
    })
  }

  return {
    formData, isEditMode, isLoading, errorMessage, uploadingType,
    updateField, handleImageUpload,
    updateService, addService, removeService,
    handleSaveDraft, handlePublish, handlePreview, fillSampleData,
  }
}