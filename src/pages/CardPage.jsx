import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPublishedCardBySlug  } from '../services/cardService'
import Wrapper from '../assets/wrappers/PublicPage'
import NotFound from '../components/NotFound'
import CardContent from '../components/CardContent'

function CardPage() {
  const { slug } = useParams()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadCard() {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const card = await getPublishedCardBySlug(slug)
        if (!card) {
          setErrorMessage('找不到名片')
          return
        }
        setData(card)
      } catch (error) {
        console.error(error)
        setErrorMessage('讀取名片失敗')
      } finally {
        setIsLoading(false)
      }
    }

    loadCard()
  }, [slug])

  if (isLoading) {
    return (
      <Wrapper>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-gray-500">名片讀取中...</p>
        </div>
      </Wrapper>
    )
  }

  if (errorMessage || !data) {
    return <NotFound />
  }

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.onload = () => resolve(image)
      image.onerror = () => reject(new Error('頭像讀取失敗'))
      image.src = url
    })
  }

  async function imageUrlToJpegBase64(url) {
    const image = await loadImage(url)
    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('無法處理頭像')
    }

    context.drawImage(image, 0, 0)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
    return dataUrl.split(',')[1]
  }

  async function handleAddContact() {
    try {
      const cardUrl = `${window.location.origin}/card/${data.slug}`
      let photoLine = ''

      if (data.avatarUrl) {
        const photoBase64 = await imageUrlToJpegBase64(data.avatarUrl)
        photoLine = `PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`
      }

      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${data.name || ''}`,
        `ORG:${data.company || ''}`,
        `TITLE:${data.title || ''}`,
        data.mobile ? `TEL;TYPE=CELL:${data.mobile}` : '',
        data.email ? `EMAIL:${data.email}` : '',
        data.address ? `ADR;TYPE=WORK:;;${data.address};;;;` : '',
        photoLine,
        `NOTE:電子名片：${cardUrl}`,
        'END:VCARD',
      ].filter(Boolean)

      const vcard = lines.join('\r\n')
      const blob = new Blob([vcard], {
        type: 'text/vcard;charset=utf-8',
      })

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${data.name || 'contact'}.vcf`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      alert(error.message || '建立聯絡人檔案失敗')
    }
  }

  return (
    <Wrapper>
      <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white lg:min-h-190 lg:max-w-107.5 lg:rounded-2xl lg:shadow-2xl">
        <CardContent data={data} onAddContact={handleAddContact} />
      </main>
    </Wrapper>
  )
}

export default CardPage