import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Copy,
  Edit,
  Eye,
  Info,
  Save,
  Upload,
} from 'lucide-react'
import { mockCards } from '../config/mockCards'
import CardContent from '../components/CardContent'
import NotFound from '../components/NotFound'

function PreviewPage() {
  const { id } = useParams()

  const data = mockCards.find((card) => card.id === id)

  if (!data) {
    return <NotFound />
  }

  const cardUrl = `${window.location.origin}/card/${data.slug}`

  async function copyLink() {
    await navigator.clipboard.writeText(cardUrl)
    alert('已複製公開連結')
  }

  function handlePublish() {
    alert('之後接資料庫時，這裡會把狀態改成 published')
  }

  function handleSaveDraft() {
    alert('之後接資料庫時，這裡會儲存草稿')
  }

  function handlePreviewAddContact() {
    alert('這是預覽畫面，正式加入聯絡人請到公開頁操作')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] text-[#1A2B3C]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E0E4E8] bg-white px-6 py-3">
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#44474c] transition-colors hover:bg-[#f3f4f5]"
            aria-label="返回管理頁"
          >
            <ArrowLeft size={22} />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-[#041627]">
                預覽名片
              </h1>

              <span
                className={`rounded px-2 py-1 text-[10px] font-semibold tracking-wider ${
                  data.status === 'published'
                    ? 'bg-green-50 text-green-600'
                    : data.status === 'archived'
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-orange-50 text-orange-500'
                }`}
              >
                {data.status === 'published'
                  ? '已發布'
                  : data.status === 'archived'
                  ? '封存'
                  : '草稿'}
              </span>
            </div>

            <p className="mt-1 text-sm text-[#677489]">
              /card/{data.slug}
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 flex-col items-center gap-10 overflow-y-auto px-6 py-10 lg:flex-row lg:items-start lg:justify-center">
        {/* Phone Preview */}
        <section className="w-full max-w-[400px] shrink-0">
          <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[2.5rem] border-[8px] border-[#e1e3e4] bg-white shadow-[0px_24px_48px_-12px_rgba(26,43,60,0.15)]">
            {/* notch */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-7 justify-center">
              <div className="h-6 w-32 rounded-b-xl bg-[#e1e3e4] opacity-50" />
            </div>

            {/* preview content */}
            <div className="hide-scrollbar flex-1 overflow-y-auto bg-white">
            <CardContent
                data={data}
                onAddContact={handlePreviewAddContact}
            />
            </div>
          </div>
        </section>

        {/* Action Panel */}
        <aside className="flex w-full max-w-[400px] flex-col gap-6 lg:sticky lg:top-24">
          {/* Primary Actions */}
          <section className="rounded-2xl border border-[#E0E4E8] bg-white p-6 shadow-[0px_4px_12px_rgba(26,43,60,0.05)]">
            <h2 className="mb-5 text-xl font-semibold text-[#041627]">
              名片操作
            </h2>

            <button
              type="button"
              onClick={handlePublish}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#041627] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a2b3c]"
            >
              <Upload size={18} />
              發布名片
            </button>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#E0E4E8] bg-[#f8f9fa] px-4 py-3 text-sm font-semibold text-[#041627] transition-colors hover:bg-[#f3f4f5]"
              >
                <Save size={17} />
                儲存草稿
              </button>

              <Link
                to={`/admin/cards/${data.id}/edit`}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#E0E4E8] bg-[#f8f9fa] px-4 py-3 text-sm font-semibold text-[#041627] transition-colors hover:bg-[#f3f4f5]"
              >
                <Edit size={17} />
                返回編輯
              </Link>
            </div>
          </section>

          {/* URL / Info */}
          <section className="rounded-2xl border border-[#E0E4E8] bg-white p-6 shadow-[0px_4px_12px_rgba(26,43,60,0.05)]">
            <div className="mb-5 flex items-start gap-2 rounded-lg border border-[#E0E4E8] bg-[#f8f9fa] p-3">
              <Info size={18} className="mt-0.5 shrink-0 text-[#041627]" />
              <p className="text-sm leading-relaxed text-[#677489]">
                發布後，客戶即可透過 QR Code 或連結查看這張電子名片。
              </p>
            </div>

            <label className="mb-2 ml-1 block text-xs font-semibold tracking-wider text-[#677489]">
              公開網址
            </label>

            <div className="flex items-center gap-2">
              <div className="flex-1 truncate rounded-lg border border-[#E0E4E8] bg-[#f3f4f5] px-3 py-2 text-sm text-[#1A2B3C]">
                {cardUrl.replace(/^https?:\/\//, '')}
              </div>

              <button
                type="button"
                onClick={copyLink}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E0E4E8] bg-[#f8f9fa] text-[#041627] transition-colors hover:bg-[#f3f4f5]"
                title="複製連結"
              >
                <Copy size={18} />
              </button>
            </div>

            <div className="mt-5 border-t border-[#E0E4E8] pt-4">
              <Link
                to={`/card/${data.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[#041627] transition-colors hover:bg-[#f3f4f5]"
              >
                <Eye size={18} />
                查看公開頁
              </Link>
            </div>
          </section>
        </aside>
      </main>
    </div>
  )
}

export default PreviewPage