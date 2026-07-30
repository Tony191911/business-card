import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'

function CardFormActions({ onFillSample, onSaveDraft, onPreview, onPublish, }) {
  return (
    <div className="fixed bottom-0 right-0 z-30 w-full border-t border-[#E0E4E8] bg-white p-6 shadow-[0px_-4px_12px_rgba(26,43,60,0.02)] lg:w-[calc(100%-16rem)]">
      <div className="mx-auto flex max-w-300 items-center justify-between gap-3">
        <Link
          to="/admin"
          className="rounded-lg border border-[#E0E4E8] px-6 py-3 text-sm font-semibold text-[#44474c] transition-colors hover:bg-[#f3f4f5]"
        >
          返回
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onFillSample}
            className="rounded-lg border border-[#E0E4E8] px-6 py-3 text-sm font-semibold text-[#677489] transition-colors hover:bg-[#f3f4f5]"
          >
            填入範例資料
          </button>

          <button
            type="button"
            onClick={onSaveDraft}
            className="rounded-lg border border-[#E0E4E8] px-6 py-3 text-sm font-semibold text-[#1A2B3C] transition-colors hover:bg-[#f3f4f5]"
          >
            儲存草稿
          </button>

          <button
            type="button"
            onClick={onPreview}
            className="flex items-center gap-2 rounded-lg border border-[#041627] px-6 py-3 text-sm font-semibold text-[#041627] transition-colors hover:bg-[#041627]/5"
          >
            <Eye size={18} />
            預覽名片
          </button>

          <button
            type="button"
            onClick={onPublish}
            className="rounded-lg bg-[#041627] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a2b3c]"
          >
            發布名片
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardFormActions