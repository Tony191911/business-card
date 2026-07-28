import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function ShareHeader({ slug }) {
  return (
    <header className="relative mb-[22px] flex items-center justify-center">
      <Link
        to={`/card/${slug}`}
        aria-label="返回名片"
        className="absolute left-0 top-1/2 flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center border border-[#A9743A] text-[#A9743A] transition-colors hover:bg-[#A9743A]/10"
      >
        <ArrowLeft size={15} strokeWidth={1.5} />
      </Link>

      <h1 className="font-en text-[11px] font-normal uppercase tracking-[0.18em] text-[#A9743A]">
        分享名片
      </h1>
    </header>
  )
}

export default ShareHeader
