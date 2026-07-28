import { Link } from 'react-router-dom'
import { Share2, UserPlus } from 'lucide-react'

function CardActions({ slug, onAddContact }) {
  return (
    <div className="mt-auto grid grid-cols-2 gap-2.5 pt-10">
      <button
        type="button"
        onClick={onAddContact}
        className="..."
      >
        <UserPlus size={17} strokeWidth={1.4} />
        加入聯絡人
      </button>

      <Link
        to={`/card/${slug}/share`}
        className="..."
      >
        <Share2 size={17} strokeWidth={1.4} />
        分享名片
      </Link>
    </div>
  )
}

export default CardActions