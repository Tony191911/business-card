import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  Contact,
  Copy,
  Edit,
  Eye,
  MoreVertical,
  Plus,
  QrCode,
  RotateCcw,
  Search,
  Settings,
  Trash2,
  UserCircle,
} from 'lucide-react'
import { mockCards } from '../config/mockCards'

function AdminPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const counts = useMemo(() => {
    return {
      all: mockCards.length,
      published: mockCards.filter((card) => card.status === 'published').length,
      draft: mockCards.filter((card) => card.status === 'draft').length,
      archived: mockCards.filter((card) => card.status === 'archived').length,
    }
  }, [])

  const filteredCards = useMemo(() => {
    return mockCards.filter((card) => {
      const matchStatus =
        statusFilter === 'all' ? true : card.status === statusFilter

      const keyword = searchTerm.trim().toLowerCase()

      const matchSearch =
        keyword === ''
          ? true
          : [card.name, card.company, card.slug, card.title]
              .filter(Boolean)
              .some((value) => value.toLowerCase().includes(keyword))

      return matchStatus && matchSearch
    })
  }, [statusFilter, searchTerm])

  async function copyCardLink(card) {
    const url = `${window.location.origin}/card/${card.slug}`
    await navigator.clipboard.writeText(url)
    alert('已複製名片連結')
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1A2B3C]">
      <div className="flex min-h-screen">
        {/* Side Nav */}
        <aside className="hidden w-64 shrink-0 border-r border-[#E0E4E8] bg-white px-4 py-6 md:block">
          <div className="mb-16 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#041627] text-xl font-bold text-white">
              D
            </div>

            <div>
              <h1 className="text-xl font-semibold text-[#041627]">
                DigiCard Admin
              </h1>
              <p className="mt-1 text-sm text-[#677489]">電子名片管理</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              to="/admin"
              className="flex items-center gap-3 rounded-r-full border-r-4 border-[#041627] bg-[#f3f4f5] px-4 py-3 text-sm font-semibold text-[#041627]"
            >
              <Contact size={20} />
              名片管理
            </Link>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-r-full border-r-4 border-transparent px-4 py-3 text-sm font-semibold text-[#677489] hover:bg-[#f3f4f5]"
            >
              <Settings size={20} />
              系統設定
            </button>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex min-h-screen flex-1 flex-col">
          {/* Top Bar */}
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E0E4E8] bg-white px-6 py-3">
            <div className="flex w-full max-w-[380px] items-center rounded-full border border-[#E0E4E8] bg-[#f3f4f5] px-4 py-2 focus-within:border-[#041627] focus-within:ring-2 focus-within:ring-[#041627]/10">
              <Search size={20} className="mr-2 text-[#677489]" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="搜尋姓名、公司或網址代稱..."
                className="w-full border-none bg-transparent p-0 text-sm text-[#1A2B3C] outline-none placeholder:text-[#677489] focus:ring-0"
              />
            </div>
          </header>

          {/* Page Content */}
          <section className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-10">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-semibold text-[#041627]">
                  電子名片管理
                </h2>
                <p className="mt-2 text-sm text-[#677489]">
                  管理已建立的電子名片，快速編輯、預覽與分享。
                </p>
              </div>

              <Link
                to="/admin/cards/new"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#041627] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1a2b3c] md:w-auto"
              >
                <Plus size={18} className="text-white" />
                <span className="text-white">新增名片</span>
              </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              <FilterButton
                active={statusFilter === 'all'}
                onClick={() => setStatusFilter('all')}
              >
                全部 ({counts.all})
              </FilterButton>

              <FilterButton
                active={statusFilter === 'published'}
                onClick={() => setStatusFilter('published')}
              >
                已發布 ({counts.published})
              </FilterButton>

              <FilterButton
                active={statusFilter === 'draft'}
                onClick={() => setStatusFilter('draft')}
              >
                草稿 ({counts.draft})
              </FilterButton>

              <FilterButton
                active={statusFilter === 'archived'}
                onClick={() => setStatusFilter('archived')}
              >
                封存 ({counts.archived})
              </FilterButton>
            </div>

            {/* Card List */}
            {filteredCards.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCards.map((card) => (
                  <AdminCard
                    key={card.id}
                    card={card}
                    onCopyLink={() => copyCardLink(card)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#E0E4E8] bg-white px-8 py-12 text-center">
                <p className="text-sm text-[#677489]">沒有符合條件的名片。</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
        active
          ? 'border-[#E0E4E8] bg-[#f3f4f5] text-[#1A2B3C]'
          : 'border-transparent bg-white text-[#677489] hover:bg-[#f3f4f5]'
      }`}
    >
      {children}
    </button>
  )
}

function AdminCard({ card, onCopyLink }) {
  const isPublished = card.status === 'published'
  const isDraft = card.status === 'draft'
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
          {card.name}
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
          className={`flex items-center gap-1 rounded border border-[#E0E4E8] bg-[#f3f4f5] px-2 py-1 text-sm text-[#677489] ${
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
              <IconLink
                to={`/admin/cards/${card.id}/edit`}
                title="編輯"
                active
              >
                <Edit size={20} />
              </IconLink>

              <IconLink
                to={`/admin/cards/${card.id}/preview`}
                title="預覽"
              >
                <Eye size={20} />
              </IconLink>

              <IconLink
                to={isPublished ? `/card/${card.slug}/share` : undefined}
                title={isPublished ? '分享 QR Code' : '需發布後才能分享'}
                disabled={!isPublished}
              >
                <QrCode size={20} />
              </IconLink>

              <IconButton
                title={isPublished ? '複製連結' : '需發布後才能複製'}
                onClick={onCopyLink}
                disabled={!isPublished}
              >
                <Copy size={20} />
              </IconButton>
            </div>

            <IconButton title="更多操作" onClick={() => alert('之後可加入封存功能')}>
              <MoreVertical size={20} />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton title="還原" onClick={() => alert('之後可加入還原功能')}>
              <RotateCcw size={20} />
            </IconButton>

            <IconButton
              title="刪除"
              onClick={() => alert('之後可加入刪除功能')}
              danger
            >
              <Trash2 size={20} />
            </IconButton>
          </>
        )}
      </div>
    </article>
  )
}

function StatusBadge({ status }) {
  const config = {
    published: {
      label: '已發布',
      className: 'bg-green-50 text-green-600 border-green-100',
      dot: 'bg-green-600',
    },
    draft: {
      label: '草稿',
      className: 'bg-orange-50 text-orange-500 border-orange-100',
      dot: 'bg-orange-500',
    },
    archived: {
      label: '封存',
      className: 'bg-gray-100 text-gray-500 border-gray-200',
      dot: 'bg-gray-500',
    },
  }

  const current = config[status] || config.draft

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold ${current.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
      {current.label}
    </span>
  )
}

function IconLink({ to, children, title, disabled = false, active = false }) {
  const className = `flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
    disabled
      ? 'cursor-not-allowed text-[#c4c6cd]'
      : active
      ? 'text-[#041627] hover:bg-[#d2e4fb]'
      : 'text-[#677489] hover:bg-[#e7e8e9]'
  }`

  if (disabled || !to) {
    return (
      <button type="button" title={title} disabled className={className}>
        {children}
      </button>
    )
  }

  return (
    <Link to={to} title={title} className={className}>
      {children}
    </Link>
  )
}

function IconButton({ children, title, onClick, disabled = false, danger = false }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
        disabled
          ? 'cursor-not-allowed text-[#c4c6cd]'
          : danger
          ? 'text-red-500 hover:bg-red-50'
          : 'text-[#677489] hover:bg-[#e7e8e9]'
      }`}
    >
      {children}
    </button>
  )
}

export default AdminPage