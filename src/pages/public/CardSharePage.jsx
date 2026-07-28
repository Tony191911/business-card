import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPublishedCardBySlug } from '../../services/cardService'
import Wrapper from '../../style/PublicPageWrapper'
import NotFound from '../../components/common/CardNotFound'
import CornerMark from '../../components/card/CornerMark'
import ShareCardIdentity from '../../components/card/cardShare/ShareCardIdentity'
import QrCodeSection from '../../components/card/cardShare/QrCodeSection'

function CardSharePage() {
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
          <p className="text-sm text-[#8C7A63]">名片讀取中...</p>
        </div>
      </Wrapper>
    )
  }

  if (errorMessage || !data) {
    return <NotFound />
  }

  const cardUrl = `${window.location.origin}/card/${data.slug}`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(cardUrl)
      alert('已複製名片連結')
    } catch (error) {
      console.error(error)
      alert('複製連結失敗')
    }
  }

  function downloadQRCode() {
    const canvas = document.getElementById('business-card-qr-code')

    if (!canvas) return

    const pngUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')

    link.href = pngUrl
    link.download = `${data.slug}-qrcode.png`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Wrapper>
      <main className="relative min-h-screen w-full overflow-hidden bg-[#EDE7D9] px-[22px] pb-[26px] pt-[22px] text-[#2E2822] sm:min-h-0 sm:rounded-[2px]">
        <CornerMark position="tl" />
        <CornerMark position="tr" />
        <CornerMark position="bl" />
        <CornerMark position="br" />

        <div className="relative z-10">
          {/* 上方導覽 */}
          <header className="relative mb-[22px] flex items-center justify-center">
            <Link
              to={`/card/${data.slug}`}
              aria-label="返回名片"
              className="absolute left-0 top-1/2 flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center border border-[#A9743A] text-[#A9743A] transition-colors hover:bg-[#A9743A]/10"
            >
              <ArrowLeft size={15} strokeWidth={1.5} />
            </Link>

            <h1 className="font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-[#A9743A]">
              分享名片
            </h1>
          </header>

          {/* 名片身份 */}
          <ShareCardIdentity data={data} />

          {/* QR Code */}
          <QrCodeSection
            cardUrl={cardUrl}
            onDownload={downloadQRCode}
            onCopy={copyLink}
          />
        </div>
      </main>
    </Wrapper>
  )
}

export default CardSharePage
