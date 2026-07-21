import { useEffect ,useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Search, LogOut } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { getCards, updateCardStatus, deleteCard, } from '../../services/cardService'
import AdminLayout from '../../components/admin/AdminLayout'
import CardItem from '../../components/admin/CardItem'

function AdminDashboardPage() {
  const [cards, setCards] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function loadCards() {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const cardsFromDb = await getCards()
        setCards(cardsFromDb)
      } catch (error) {
        console.error(error)
        setErrorMessage('讀取名片失敗')
      } finally {
        setIsLoading(false)
      }
    }

    loadCards()
  }, [])

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
      alert(error.message || '登出失敗')
      return
    }
    navigate('/login', { replace: true })
  }

  const counts = useMemo(() => {
    return {
      all: cards.length,
      published: cards.filter((card) => card.status === 'published').length,
      draft: cards.filter((card) => card.status === 'draft').length,
      archived: cards.filter((card) => card.status === 'archived').length,
    }
  }, [cards])

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchStatus = statusFilter === 'all' ? true : card.status === statusFilter
      const keyword = searchTerm.trim().toLowerCase()
      const matchSearch = keyword === '' ? true
          : [card.name, card.company, card.slug, card.title]
              .filter(Boolean)
              .some((value) => value.toLowerCase().includes(keyword))

      return matchStatus && matchSearch
    })
  }, [cards, statusFilter, searchTerm])

  async function copyCardLink(card) {
    try {
      const url = `${window.location.origin}/card/${card.slug}`
      await navigator.clipboard.writeText(url)
      alert('已複製名片連結')
    } catch (error) {
      console.error(error)
      alert('複製失敗，請手動複製連結')
    }
  }

  async function refreshCards() {
    const cardsFromDb = await getCards()
    setCards(cardsFromDb)
  }

  async function handleArchiveCard(cardId) {
    try {
      await updateCardStatus(cardId, 'archived')
      await refreshCards()
    } catch (error) {
      console.error(error)
      alert(error.message || '封存失敗')
    }
  }

  async function handleRestoreCard(cardId) {
    try {
      await updateCardStatus(cardId, 'draft')
      await refreshCards()
    } catch (error) {
      console.error(error)
      alert(error.message || '還原失敗')
    }
  }

  async function handleDeleteCard(cardId) {
    const confirmed = window.confirm('確定要刪除這張名片嗎？')
    if (!confirmed) return
    try {
      await deleteCard(cardId)
      await refreshCards()
    } catch (error) {
      console.error(error)
      alert(error.message || '刪除失敗')
    }
  }

  return (
    <AdminLayout>
      {/* Top Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E0E4E8] bg-white px-6 py-3">
        <div className="flex w-full max-w-95 items-center rounded-full border border-[#E0E4E8] bg-[#f3f4f5] px-4 py-2 focus-within:border-[#041627] focus-within:ring-2 focus-within:ring-[#041627]/10">
          <Search size={20} className="mr-2 text-[#677489]" />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="搜尋姓名、公司或網址代稱..."
            className="w-full border-none bg-transparent p-0 text-sm text-[#1A2B3C] outline-none placeholder:text-[#677489] focus:ring-0"
          />
        </div>
        
        <button
          type="button"
          onClick={handleLogout}
          className="flex shrink-0 items-center gap-2 rounded-lg border border-[#E0E4E8] px-3 py-2 text-sm font-semibold text-[#677489] transition-colors hover:bg-[#f3f4f5]"
        >
          <LogOut size={17} />
          <span className="hidden sm:inline">登出</span>
        </button>
      </header>

      {/* Page Content */}
      <section className="mx-auto w-full max-w-300 flex-1 px-6 py-10">
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
        {isLoading ? (
          <div className="rounded-2xl border border-[#E0E4E8] bg-white px-8 py-12 text-center">
            <p className="text-sm text-[#677489]">名片讀取中...</p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-8 py-12 text-center">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        ) : filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                onCopyLink={() => copyCardLink(card)}
                onArchive={() => handleArchiveCard(card.id)}
                onRestore={() => handleRestoreCard(card.id)}
                onDelete={() => handleDeleteCard(card.id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E0E4E8] bg-white px-8 py-12 text-center">
            <p className="text-sm text-[#677489]">沒有符合條件的名片。</p>
          </div>
        )}
      </section>
    </AdminLayout>
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

export default AdminDashboardPage