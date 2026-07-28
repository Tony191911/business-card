import { Download, Link as LinkIcon } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import CornerMark from '../../card/CornerMark'

function QrCodeSection({ cardUrl, onDownload, onCopy, }) {
  return (
    <>
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

      <button
        type="button"
        onClick={onDownload}
        className="mt-[22px] flex w-full items-center justify-center gap-1.5 border border-[#A9743A] bg-transparent px-2 py-[13px] text-[13px] tracking-[0.03em] text-[#2E2822] transition-colors hover:bg-[#A9743A]/10"
      >
        <Download size={16} strokeWidth={1.5} />
        下載 QR Code
      </button>

      <button
        type="button"
        onClick={onCopy}
        className="mt-3.5 flex w-full items-center justify-between gap-2.5 border border-dashed border-[rgba(169,116,58,0.28)] px-3 py-[11px] text-left"
      >
        <span className="min-w-0 break-all font-en text-[10.5px] tracking-[0.02em] text-[#2E2822]">
          {cardUrl.replace(/^https?:\/\//, '')}
        </span>

        <LinkIcon
          size={15}
          strokeWidth={1.5}
          className="shrink-0 text-[#A9743A]"
        />
      </button>
    </>
  )
}

export default QrCodeSection
