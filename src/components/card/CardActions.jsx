import { Link } from 'react-router-dom'
import { Share2, UserPlus } from 'lucide-react'

function CardActions({ slug, onAddContact }) {
  const actionClassName =
    'font-ch flex min-h-[62px] items-center justify-center gap-2 border border-[#A9743A] bg-transparent px-3 py-3 text-[18px] font-medium leading-none tracking-[0.02em] text-[#2E2822] transition-colors hover:bg-[#A9743A]/10'

  return (
    <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
      <button
        type="button"
        onClick={onAddContact}
        className={actionClassName}
      >
        <UserPlus
          size={21}
          strokeWidth={1.6}
          className="shrink-0"
        />
        <span>加入聯絡人</span>
      </button>

      <Link
        to={`/card/${slug}/share`}
        className={actionClassName}
      >
        <Share2
          size={21}
          strokeWidth={1.6}
          className="shrink-0"
        />
        <span>分享名片</span>
      </Link>
    </div>
  )
}

export default CardActions