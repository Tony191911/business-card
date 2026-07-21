import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Copy, Edit, Eye, Info, Save, Upload, } from 'lucide-react'
import { getCardById, saveCard } from '../../services/cardService'
import CardContent from '../components/CardContent'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminLayout from '../../components/admin/AdminLayout'

function CardPreviewPage() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadCard() {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const card = await getCardById(id)
        setData(card)
      } catch (error) {
        console.error(error)
        setErrorMessage('讀取名片失敗')
      } finally {
        setIsLoading(false)
      }
    }

    loadCard()
  }, [id])

  if (isLoading) {
    return (
      <AdminLayout>
        <AdminHeader title="預覽名片" backTo="/admin" />
        <div className="mx-auto w-full max-w-300 px-6 py-10">
          <div className="rounded-2xl border border-[#E0E4E8] bg-white px-8 py-12 text-center">
            <p className="text-sm text-[#677489]">名片讀取中...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (errorMessage || !data) {
    return (
      <AdminLayout>
        <AdminHeader title="預覽名片" backTo="/admin" />
        <div className="mx-auto w-full max-w-300 px-6 py-10">
          <div className="rounded-2xl border border-red-100 bg-red-50 px-8 py-12 text-center">
            <p className="text-sm text-red-600">
              {errorMessage || '找不到名片'}
            </p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  const cardUrl = `${window.location.origin}/card/${data.slug}`

  async function copyLink() {
    await navigator.clipboard.writeText(cardUrl)
    alert('已複製公開連結')
  }

  async function handlePublish() {
    try {
      const nextCard = {
        ...data,
        status: 'published',
      }
      const savedCard = await saveCard(nextCard)
      setData(savedCard)
      alert('已發布名片')
    } catch (error) {
      console.error(error)
      alert(error.message || '發布名片失敗')
    }
  }

  async function handleSaveDraft() {
    try {
      const nextCard = {
        ...data,
        status: 'draft',
      }
      const savedCard = await saveCard(nextCard)
      setData(savedCard)
      alert('已儲存草稿')
    } catch (error) {
      console.error(error)
      alert(error.message || '儲存草稿失敗')
    }
  }

  function handlePreviewAddContact() {
    alert('這是預覽畫面，正式加入聯絡人請到公開頁操作')
  }

  return (
    <AdminLayout>
      <AdminHeader
        title="預覽名片"
        backTo="/admin"
        status={data.status}
        subtitle={`/card/${data.slug}`}
      />

      <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[390px_540px] lg:justify-center lg:items-start">
        {/* Phone Preview */}
        <section className="mx-auto w-[390px] shrink-0 lg:mx-0">
          <div className="relative flex h-[740px] w-[390px] flex-col overflow-hidden rounded-[2.5rem] border-8 border-[#e1e3e4] bg-white shadow-[0px_24px_48px_-12px_rgba(26,43,60,0.15)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-7 justify-center">
              <div className="h-6 w-32 rounded-b-xl bg-[#e1e3e4] opacity-50" />
            </div>

            <div className="hide-scrollbar flex-1 overflow-y-auto bg-white">
              <CardContent
                data={data}
                onAddContact={handlePreviewAddContact}
              />
            </div>
          </div>
        </section>

        {/* Action Panel */}
        <aside className="flex w-full max-w-[540px] flex-col gap-6 lg:sticky lg:top-24">
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
      </div>
    </AdminLayout>
  )
}

export default CardPreviewPage