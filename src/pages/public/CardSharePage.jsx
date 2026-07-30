import { useParams } from 'react-router-dom'
import Wrapper from '../../style/PublicPageWrapper'
import NotFound from '../../components/common/CardNotFound'
import CornerMark from '../../components/card/CornerMark'
import ShareCardIdentity from '../../components/card/cardShare/ShareCardIdentity'
import QrCodeSection from '../../components/card/cardShare/QrCodeSection'
import ShareHeader from '../../components/card/cardShare/ShareHeader'
import { usePublishedCard } from '../../hooks/usePublishedCard'

function CardSharePage() {
  const { slug } = useParams()
  const { data, isLoading, errorMessage, } = usePublishedCard(slug)

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
      <main className="relative w-full overflow-hidden bg-[#EDE7D9] px-[22px] pb-5 pt-[18px] text-[#2E2822] sm:rounded-[2px]">
        <CornerMark position="tl" />
        <CornerMark position="tr" />
        <CornerMark position="bl" />
        <CornerMark position="br" />

        <div className="relative z-10">
          {/* 上方導覽 */}
          <ShareHeader slug={data.slug} />

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
