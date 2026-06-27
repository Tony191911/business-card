import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Link as LinkIcon, UserCircle } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import { mockCards } from '../config/mockCards'
import Wrapper from '../assets/wrappers/PublicPages'
import PublicActionBtn from '../components/PublicActionBtn'
import NotFound from '../components/NotFound'

function SharePage() {
  const { slug } = useParams()

  const data = mockCards.find(
    (card) => card.slug === slug && card.status === 'published'
  )

  if (!data) {
    return <NotFound />
  }

  const baseUrl =
  window.location.hostname === 'localhost'? 'http://192.168.68.53:5173' : window.location.origin
  const cardUrl = `${baseUrl}/card/${data.slug}`

  // const cardUrl = `${window.location.origin}/card/${data.slug}`

  async function copyLink() {
    await navigator.clipboard.writeText(cardUrl)
    alert('已複製名片連結')
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
      <main className="relative flex min-h-screen w-full flex-col bg-[#f5f3f0] px-5 pb-16 lg:min-h-[720px] lg:max-w-[430px] lg:rounded-3xl lg:shadow-xl">
        {/* top bar */}
        <header className="flex w-full items-center pb-4 pt-8">
          <Link
            to={`/card/${data.slug}`}
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            aria-label="返回名片"
          >
            <ArrowLeft size={22} strokeWidth={1.8} />
          </Link>

          <h1 className="mb-4 flex-1 pr-10 text-center text-[20px] font-semibold tracking-tight">
            分享名片
          </h1>
        </header>

        <div className="flex flex-1 flex-col">
          {/* card identity */}
          <div className="mb-5 flex flex-col items-center">
            {data.avatarUrl ? (
              <img
                src={data.avatarUrl}
                alt={data.name}
                className="mb-3 h-16 w-16 rounded-full border border-gray-200 bg-white object-cover shadow-sm"
              />
            ) : (
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
                <UserCircle size={38} strokeWidth={1.2} className="text-gray-300" />
              </div>
            )}

            <p className="text-[16px] font-semibold">{data.name}</p>

            {data.company && (
              <p className="mt-1 text-[13px] text-[#677489]">{data.company}</p>
            )}
          </div>

          {/* QR code card */}
          <section className="mb-4 flex flex-col items-center rounded-[24px] border border-[#E0E4E8] bg-white p-6 text-center shadow-[0px_4px_16px_rgba(26,43,60,0.03)]">
            <div className="mb-6 flex h-48 w-48 items-center justify-center rounded-xl bg-[#f3f4f5]">
              <QRCodeCanvas
                id="business-card-qr-code"
                value={cardUrl}
                size={150}
                bgColor="#f3f4f5"
                fgColor="#1A2B3C"
                level="H"
                includeMargin={false}
              />
            </div>

            <h2 className="mb-2 text-[20px] font-semibold">
              請讓對方掃描此 QR Code
            </h2>

            <p className="text-[14px] text-[#677489]">
              掃描後即可查看我的電子名片
            </p>
          </section>

          {/* download */}
          <PublicActionBtn
            type="button"
            onClick={downloadQRCode}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#E0E4E8] bg-transparent py-4 text-[15px] font-semibold transition-colors hover:bg-gray-50"
          >
            <Download size={18} strokeWidth={1.8} />
            下載 QR Code
          </PublicActionBtn>

          {/* url */}
          <button
            type="button"
            onClick={copyLink}
            className="mb-4 flex w-full items-center justify-between rounded-full border border-[#E0E4E8] bg-[#f3f4f5] px-6 py-3 text-left"
          >
            <span className="mr-4 truncate text-[14px] text-[#677489]">
              {cardUrl.replace(/^https?:\/\//, '')}
            </span>

            <LinkIcon size={16} strokeWidth={1.8} className="shrink-0 text-[#677489]" />
          </button>

          <p className="mt-auto px-4 text-center text-[12px] leading-relaxed text-[#94A3B8]">
            可將此 QR Code 存到手機相簿、備忘錄或列印在實體文宣上。
          </p>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharePage