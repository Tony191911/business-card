import { Link as LinkIcon } from 'lucide-react'

function UrlSettingSection({ slug, baseUrl, onChange }) {
  return (
    <section className="rounded-xl border border-[#E0E4E8] bg-white p-6 shadow-sm">
      <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-[#041627]">
        <LinkIcon size={20} />
        網址設定
      </h3>

      <p className="mb-5 text-sm leading-relaxed text-[#44474c]">
        設定此名片的專屬公開網址。
      </p>

      <label className="mb-2 block text-xs font-semibold tracking-wider text-[#44474c]">
        網址代稱 Slug
      </label>

      <div className="mb-3 flex">
        <span className="flex h-11 items-center rounded-l-lg border border-r-0 border-[#E0E4E8] bg-[#f3f4f5] px-3 text-sm text-[#677489]">
          {baseUrl}
        </span>

        <input
          type="text"
          value={slug}
          onChange={(event) => onChange(event.target.value)}
          placeholder="your-slug"
          className="h-11 min-w-0 flex-1 rounded-r-lg border border-[#E0E4E8] bg-white px-3 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-[#041627] focus:ring-2 focus:ring-[#041627]/10"
        />
      </div>

      <div className="rounded-lg border border-dashed border-[#E0E4E8] bg-[#f8f9fa] p-3">
        <span className="mb-1 block text-xs font-semibold tracking-wider text-[#44474c]">
          公開網址預覽：
        </span>

        <p className="break-all text-sm text-[#041627]">
          {baseUrl}
          {slug || 'your-slug'}
        </p>
      </div>
    </section>
  )
}

export default UrlSettingSection
