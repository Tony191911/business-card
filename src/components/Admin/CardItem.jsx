import { Building2, Copy, Edit, Eye, MoreVertical, QrCode,
         RotateCcw, Trash2, UserCircle, } from 'lucide-react'
import StatusBadge from './StatusBadge'
import IconButton from './IconButton'

function CardItem({ card, onCopyLink, onArchive, onRestore, onDelete, }) {
  const isPublished = card.status === 'published'
  const isArchived = card.status === 'archived'

  return (
    <article
      className={`flex flex-col rounded-xl border border-[#E0E4E8] bg-white p-6 shadow-[0px_4px_12px_rgba(26,43,60,0.03)] transition-all hover:border-[#b7c8de] hover:shadow-[0px_8px_24px_rgba(26,43,60,0.08)] ${
        isArchived ? 'opacity-70' : ''
      }`}
    >
      <div className="mb-6 flex items-start justify-between">
        {card.avatarUrl ? (
          <img
            src={card.avatarUrl}
            alt={card.name}
            className={`h-16 w-16 rounded-xl border-2 border-[#e7e8e9] object-cover shadow-sm ${
              isArchived ? 'grayscale' : ''
            }`}
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-[#E0E4E8] bg-[#e7e8e9]">
            <UserCircle size={36} className="text-[#677489]" />
          </div>
        )}

        <StatusBadge status={card.status} />
      </div>

      <div className="mb-6 flex-1">
        <h3 className="text-xl font-semibold text-[#1A2B3C]">
          {card.name || '未命名名片'}
        </h3>

        <p className="mt-2 text-sm text-[#677489]">
          {card.title || '未填寫職稱'}
        </p>

        {card.company && (
          <p className="mt-2 flex items-center gap-1 text-sm text-[#44474c]">
            <Building2 size={16} className="text-[#677489]" />
            {card.company}
          </p>
        )}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <span className="rounded border border-[#E0E4E8] bg-[#f3f4f5] px-2 py-1 text-sm text-[#677489]">
          {card.industry === 'construction'
            ? '工程／室內設計版'
            : '通用版'}
        </span>

        <span
          className={`rounded border border-[#E0E4E8] bg-[#f3f4f5] px-2 py-1 text-sm text-[#677489] ${
            isArchived ? 'line-through' : ''
          }`}
        >
          /{card.slug}
        </span>
      </div>

      <hr className="mb-3 border-[#E0E4E8]" />

      <div className="flex items-center justify-between">
        {!isArchived ? (
          <>
            <div className="flex gap-1">
              <IconButton
                to={`/admin/cards/${card.id}/edit`}
                title="編輯"
                active
              >
                <Edit size={20} />
              </IconButton>

              <IconButton
                to={`/admin/cards/${card.id}/preview`}
                title="預覽"
              >
                <Eye size={20} />
              </IconButton>

              <IconButton
                to={isPublished ? `/card/${card.slug}/share` : undefined}
                title={isPublished ? '分享 QR Code' : '需發布後才能分享'}
                disabled={!isPublished}
              >
                <QrCode size={20} />
              </IconButton>

              <IconButton
                title={isPublished ? '複製連結' : '需發布後才能複製'}
                onClick={onCopyLink}
                disabled={!isPublished}
              >
                <Copy size={20} />
              </IconButton>
            </div>

            <IconButton title="封存" onClick={onArchive}>
              <MoreVertical size={20} />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton title="還原" onClick={onRestore}>
              <RotateCcw size={20} />
            </IconButton>

            <IconButton title="刪除" onClick={onDelete} danger>
              <Trash2 size={20} />
            </IconButton>
          </>
        )}
      </div>
    </article>
  )
}

export default CardItem