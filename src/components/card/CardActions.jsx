import { Copy, Phone, QrCode, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'

function CardActions({ slug, mobile, onAddContact, onCopyLink }) {
  const actionClassName =
    'flex min-w-0 flex-col items-center justify-start gap-1.5 px-1 py-2 text-[#2E2822] transition-opacity hover:opacity-70'

  const iconClassName =
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#A9743A]/55 bg-[#A9743A]/8'

  const labelClassName =
    'font-ch block w-full text-center text-[14px] font-normal leading-[1.3]'

  return (
    <div className="mt-4 grid grid-cols-4 gap-1 border-t border-[#A9743A]/35 pt-2">
      <button
        type="button"
        onClick={onAddContact}
        className={actionClassName}
      >
        <span className={iconClassName}>
          <UserPlus size={21} strokeWidth={1.5} />
        </span>
        <span className={labelClassName}>加入聯絡人</span>
      </button>

      <a
        href={`tel:${mobile}`}
        className={actionClassName}
      >
        <span className={iconClassName}>
          <Phone size={21} strokeWidth={1.5} />
        </span>
        <span className={labelClassName}>電話聯絡</span>
      </a>

      <Link
        to={`/card/${slug}/share`}
        className={actionClassName}
      >
        <span className={iconClassName}>
          <QrCode size={21} strokeWidth={1.5} />
        </span>
        <span className={labelClassName}>QR Code</span>
      </Link>

      <button
        type="button"
        onClick={onCopyLink}
        className={actionClassName}
      >
        <span className={iconClassName}>
          <Copy size={21} strokeWidth={1.5} />
        </span>
        <span className={labelClassName}>複製連結</span>
      </button>
    </div>
  )
}

export default CardActions