import { Link } from 'react-router-dom'
import { Share2, UserCircle, UserPlus } from 'lucide-react'

function CornerMark({ position }) {
  const positionStyles = {
    tl: 'left-2.5 top-2.5 border-b-0 border-r-0',
    tr: 'right-2.5 top-2.5 border-b-0 border-l-0',
    bl: 'bottom-2.5 left-2.5 border-r-0 border-t-0',
    br: 'bottom-2.5 right-2.5 border-l-0 border-t-0',
  }

  return (
    <span
      className={`pointer-events-none absolute z-10 h-4 w-4 border border-[#A9743A] opacity-85 ${positionStyles[position]}`}
    />
  )
}

function CardContent({ data, onAddContact, showActions = true }) {
  const sortedServices = [...(data.services || [])].sort(
    (a, b) => a.sortOrder - b.sortOrder
  )

  const detailFields = [
    {
      label: 'TEL',
      value: data.mobile,
      href: data.mobile ? `tel:${data.mobile}` : '',
      isChinese: false,
    },
    {
      label: 'OFFICE',
      value: data.officePhone,
      href: data.officePhone ? `tel:${data.officePhone}` : '',
      isChinese: false,
    },
    {
      label: 'FAX',
      value: data.fax,
      href: '',
      isChinese: false,
    },
    {
      label: 'EMAIL',
      value: data.email,
      href: data.email ? `mailto:${data.email}` : '',
      isChinese: false,
    },
    {
      label: 'ADDR',
      value: data.address,
      href: data.address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            data.address
          )}`
        : '',
      isChinese: true,
    },
    {
      label: '統編',
      value: data.taxId,
      href: '',
      isChinese: false,
    },
    {
      label: 'WEB',
      value: data.website,
      href: data.website,
      isChinese: false,
    },
  ].filter((field) => field.value)

  return (
    <article className="relative min-h-screen w-full overflow-hidden bg-[#EDE7D9] px-6 pb-6 pt-7 text-[#2E2822] sm:min-h-0 sm:rounded-[2px]">
      {/* 工程圖格線背景 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,110,70,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,110,70,0.09) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      <CornerMark position="tl" />
      <CornerMark position="tr" />
      <CornerMark position="bl" />
      <CornerMark position="br" />

      <div className="relative z-10 flex min-h-[calc(100vh-52px)] flex-col sm:min-h-0">
        {/* 數位名片標題 */}
        <div className="mb-[22px] flex items-center justify-center gap-2">
          <span className="h-px w-5 bg-[#C9A877]" />

          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A9743A]">
            數位名片
          </p>

          <span className="h-px w-5 bg-[#C9A877]" />
        </div>

        {/* 頭像 */}
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

        {/* 姓名與公司 */}
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

        {/* 中央分隔線 */}
        <div className="mb-[22px] mt-6 flex items-center gap-2.5">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A877] to-[#C9A877]" />

          <span className="h-[5px] w-[5px] rotate-45 border border-[#A9743A]" />

          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C9A877] to-[#C9A877]" />
        </div>

        {/* 聯絡資訊 */}
        {detailFields.length > 0 && (
          <div>
            {detailFields.map((field) => {
              const valueClassName = field.isChinese
                ? 'font-sans text-[13px] leading-relaxed'
                : 'font-mono text-[14px]'

              return (
                <div
                  key={field.label}
                  className="flex items-baseline justify-between gap-3 border-b border-dashed border-[rgba(169,116,58,0.28)] py-[11px] last:border-b-0"
                >
                  <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#8C7A63]">
                    {field.label}
                  </span>

                  {field.href ? (
                    <a
                      href={field.href}
                      target={
                        field.label === 'ADDR' || field.label === 'WEB'
                          ? '_blank'
                          : undefined
                      }
                      rel={
                        field.label === 'ADDR' || field.label === 'WEB'
                          ? 'noreferrer'
                          : undefined
                      }
                      className={`min-w-0 break-all text-right text-[#2E2822] ${valueClassName}`}
                    >
                      {field.value}
                    </a>
                  ) : (
                    <span
                      className={`min-w-0 break-all text-right text-[#2E2822] ${valueClassName}`}
                    >
                      {field.value}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* 服務項目 */}
        {sortedServices.length > 0 && (
          <section>
            <h2 className="mb-2.5 mt-[26px] font-mono text-[10.5px] font-normal uppercase tracking-[0.14em] text-[#8C7A63]">
              服務項目
            </h2>

            <div className="grid grid-cols-2 gap-x-3.5">
              {sortedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center gap-2 border-b border-dashed border-[rgba(169,116,58,0.28)] py-[9px] text-[12.5px] leading-relaxed text-[#2E2822] [&:nth-last-child(-n+2)]:border-b-0"
                >
                  <span className="h-[5px] w-[5px] shrink-0 rotate-45 border border-[#A9743A]" />

                  <span>{service.serviceName}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 操作按鈕 */}
        {showActions && (
          <div className="mt-auto grid grid-cols-2 gap-2.5 pt-10">
            <button
              type="button"
              onClick={onAddContact}
              className="flex min-h-[47px] items-center justify-center gap-1.5 border border-[#A9743A] bg-transparent px-2 py-3 text-[13px] tracking-[0.03em] text-[#2E2822] transition-colors hover:bg-[#A9743A]/10"
            >
              <UserPlus size={17} strokeWidth={1.4} />
              加入聯絡人
            </button>

            <Link
              to={`/card/${data.slug}/share`}
              className="flex min-h-[47px] items-center justify-center gap-1.5 border border-[#A9743A] bg-[#A9743A] px-2 py-3 text-[13px] font-medium tracking-[0.03em] text-[#FDF9F1] transition-colors hover:bg-[#95642F]"
            >
              <Share2 size={17} strokeWidth={1.4} />
              分享名片
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}

export default CardContent