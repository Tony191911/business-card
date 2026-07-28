import { UserCircle } from 'lucide-react'

function CardIdentity({ data }) {
  return (
    <>
      <div className="mb-[22px] flex items-center justify-center gap-2">
        <span className="h-px w-5 bg-[#C9A877]" />
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A9743A]">
          數位名片
        </p>
        <span className="h-px w-5 bg-[#C9A877]" />
      </div>

      <div className="relative mx-auto mb-[18px] h-[104px] w-[104px]">
        <div className="absolute -inset-1.5 rounded-full border border-[#A9743A]" />

        {data.avatarUrl ? (
          <img
            src={data.avatarUrl}
            alt={data.name || '名片頭像'}
            className="relative h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#E3D9C3] to-[#D3C4A4] text-[#8C7A63]">
            <UserCircle size={58} strokeWidth={1.1} />
          </div>
        )}
      </div>

      <h1 className="m-0 text-center font-serif text-[26px] font-bold leading-tight tracking-[0.06em] text-[#2E2822]">
        {data.name}
      </h1>

      {data.title && (
        <p className="mt-1.5 text-center text-[12px] tracking-[0.08em] text-[#8C7A63]">
          {data.title}
        </p>
      )}

      {data.company && (
        <p className="mt-2 text-center text-[14px] tracking-[0.1em] text-[#2E2822]">
          {data.company}
        </p>
      )}

      {data.companyEn && (
        <p className="mt-0.5 text-center font-mono text-[11px] italic tracking-[0.08em] text-[#8C7A63]">
          {data.companyEn}
        </p>
      )}

      <div className="mb-[22px] mt-6 flex items-center gap-2.5">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A877] to-[#C9A877]" />
        <span className="h-[5px] w-[5px] rotate-45 border border-[#A9743A]" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C9A877] to-[#C9A877]" />
      </div>
    </>
  )
}

export default CardIdentity