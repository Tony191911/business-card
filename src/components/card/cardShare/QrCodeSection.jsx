import { Download } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import CornerMark from '../../card/CornerMark'

function QrCodeSection({ cardUrl, onDownload }) {
  return (
    <>
      <section className="relative mx-auto mb-4 w-fit bg-[#F7F3EA] p-4">
        <CornerMark position="tl" inner />
        <CornerMark position="tr" inner />
        <CornerMark position="bl" inner />
        <CornerMark position="br" inner />

        <div className="flex items-center justify-center">
          <QRCodeCanvas
            id="business-card-qr-code"
            value={cardUrl}
            size={1024}
            bgColor="#F7F3EA"
            fgColor="#2E2822"
            level="H"
            includeMargin={false}
            style={{
              width: '210px',
              height: '210px',
              maxWidth: '100%',
            }}
          />
        </div>
      </section>

      <button
        type="button"
        onClick={onDownload}
        className="mt-4 flex w-full items-center justify-center gap-1.5 border border-[#A9743A] bg-transparent px-2 py-[13px] text-[13px] tracking-[0.03em] text-[#2E2822] transition-colors hover:bg-[#A9743A]/10"
      >
        <Download size={16} strokeWidth={1.5} />
        下載 QR Code
      </button>
    </>
  )
}

export default QrCodeSection