import { UserCircle } from 'lucide-react'

function ShareCardIdentity({ data }) {
  return (
    <>
      <section>
        <div className="relative mx-auto mb-3.5 h-[76px] w-[76px]">
          <div className="absolute -inset-[5px] rounded-full border border-[#A9743A]" />

          {data.avatarUrl ? (
            <img
              src={data.avatarUrl}
              alt={data.name || '名片頭像'}
              className="relative h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#E3D9C3] to-[#D3C4A4] text-[#8C7A63]">
              <UserCircle size={42} strokeWidth={1.1} />
            </div>
          )}
        </div>

        <p className="text-center font-ch text-[19px] font-bold tracking-[0.05em] text-[#2E2822]">
          {data.name}
        </p>

        {data.company && (
          <p className="mt-1 text-center text-[12.5px] tracking-[0.06em] text-[#8C7A63]">
            {data.company}
          </p>
        )}
      </section>

      <div className="mb-5 mt-[22px] flex items-center gap-2.5">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A877] to-[#C9A877]" />

        <span className="h-[5px] w-[5px] rotate-45 border border-[#A9743A]" />

        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C9A877] to-[#C9A877]" />
      </div>
    </>
  )
}

export default ShareCardIdentity
