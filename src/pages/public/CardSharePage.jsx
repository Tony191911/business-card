import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Link as LinkIcon, UserCircle } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import { getPublishedCardBySlug } from '../../services/cardService'
import Wrapper from '../../style/PublicPageWrapper'
import NotFound from '../../components/common/CardNotFound'

function CornerMark({ position, inner = false }) {
  const outerPositionStyles = {
    tl: 'left-2.5 top-2.5 border-b-0 border-r-0',
    tr: 'right-2.5 top-2.5 border-b-0 border-l-0',
    bl: 'bottom-2.5 left-2.5 border-r-0 border-t-0',
    br: 'bottom-2.5 right-2.5 border-l-0 border-t-0',
  }

  const innerPositionStyles = {
    tl: 'left-1.5 top-1.5 border-b-0 border-r-0',
    tr: 'right-1.5 top-1.5 border-b-0 border-l-0',
    bl: 'bottom-1.5 left-1.5 border-r-0 border-t-0',
    br: 'bottom-1.5 right-1.5 border-l-0 border-t-0',
  }

  return (
    <span
      className={`pointer-events-none absolute z-10 h-4 w-4 border ${
        inner ? 'border-[#C9A877]' : 'border-[#A9743A]'
      } opacity-85 ${
        inner
          ? innerPositionStyles[position]
          : outerPositionStyles[position]
      }`}
    />
  )
}

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
          <section>
            <div className="relative mx-auto mb-3.5 h-[76px] w-[76px]">
              <div className="absolute -inset-[5px] rounded-full border border-[#A9743A]" />

              {data.avatarUrl ? (
                <img
                  src={data.avatarUrl}
                  alt={data.name || '名片頭像'}
                  className="relative h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#E3D9C3] to-[#D3C4A4] text-[#8C7A63]">
                  <UserCircle size={42} strokeWidth={1.1} />
                </div>
              )}
            </div>

            <p className="text-center font-serif text-[19px] font-bold tracking-[0.05em] text-[#2E2822]">
              {data.name}
            </p>

            {data.company && (
              <p className="mt-1 text-center text-[12.5px] tracking-[0.06em] text-[#8C7A63]">
                {data.company}
              </p>
            )}
          </section>

          {/* 分隔線 */}
          <div className="mb-5 mt-[22px] flex items-center gap-2.5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A877] to-[#C9A877]" />

            <span className="h-[5px] w-[5px] rotate-45 border border-[#A9743A]" />

            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C9A877] to-[#C9A877]" />
          </div>

          {/* QR Code */}
          <section className="relative mb-5 bg-[#F7F3EA] p-5">
            <CornerMark position="tl" inner />
            <CornerMark position="tr" inner />
            <CornerMark position="bl" inner />
            <CornerMark position="br" inner />

            <div className="flex aspect-square w-full items-center justify-center">
              <QRCodeCanvas
                id="business-card-qr-code"
                value={cardUrl}
                size={1024}
                bgColor="#F7F3EA"
                fgColor="#2E2822"
                level="H"
                includeMargin={false}
                style={{
                  width: '100%',
                  height: '100%',
                  maxWidth: '240px',
                  maxHeight: '240px',
                }}
              />
            </div>
          </section>

          {/* 下載按鈕 */}
          <button
            type="button"
            onClick={downloadQRCode}
            className="mt-[22px] flex w-full items-center justify-center gap-1.5 border border-[#A9743A] bg-transparent px-2 py-[13px] text-[13px] tracking-[0.03em] text-[#2E2822] transition-colors hover:bg-[#A9743A]/10"
          >
            <Download size={16} strokeWidth={1.5} />
            下載 QR Code
          </button>

          {/* 複製網址 */}
          <button
            type="button"
            onClick={copyLink}
            className="mt-3.5 flex w-full items-center justify-between gap-2.5 border border-dashed border-[rgba(169,116,58,0.28)] px-3 py-[11px] text-left"
          >
            <span className="min-w-0 break-all font-mono text-[10.5px] tracking-[0.02em] text-[#2E2822]">
              {cardUrl.replace(/^https?:\/\//, '')}
            </span>

            <LinkIcon
              size={15}
              strokeWidth={1.5}
              className="shrink-0 text-[#A9743A]"
            />
          </button>
        </div>
      </main>
    </Wrapper>
  )
}

export default CardSharePage
