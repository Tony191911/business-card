import { Link } from 'react-router-dom'

function CardNotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f0f0f0] px-6">
      <div className="rounded-2xl bg-white px-8 py-10 text-center shadow-sm">
        <h1 className="text-lg font-semibold text-[#1A2B3C]">
          找不到這張電子名片
        </h1>

        <p className="mt-3 text-sm text-[#677489]">
          這張名片可能尚未發布、已封存，或網址輸入錯誤。
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl border border-gray-200 px-5 py-3 text-sm text-[#475569] transition-colors hover:bg-gray-50"
        >
          返回首頁
        </Link>
      </div>
    </div>
  )
}

export default CardNotFound