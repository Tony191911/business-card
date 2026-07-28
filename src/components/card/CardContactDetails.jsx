function CardContactDetails({ data }) {
  const detailFields = [
    {
      label: '手機',
      value: data.mobile,
      href: data.mobile ? `tel:${data.mobile}` : '',
      isChinese: false,
    },
    {
      label: '電話',
      value: data.officePhone,
      href: data.officePhone ? `tel:${data.officePhone}` : '',
      isChinese: false,
    },
    {
      label: '傳真',
      value: data.fax,
      href: '',
      isChinese: false,
    },
    {
      label: '信箱',
      value: data.email,
      href: data.email ? `mailto:${data.email}` : '',
      isChinese: false,
    },
    {
      label: '地址',
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

  if (detailFields.length === 0) return null

  return (
    <div>
      {detailFields.map((field) => {
        const valueClassName = field.isChinese
          ? 'font-sans text-[16px] leading-relaxed'
          : 'font-en text-[15px]'

        const openInNewTab =
          field.label === '地址' || field.label === 'WEB'

        return (
          <div
            key={field.label}
            className="flex items-baseline justify-between gap-3 border-b border-dashed border-[rgba(169,116,58,0.28)] py-[11px] last:border-b-0"
          >
            <span className="shrink-0 font-en text-[12px] uppercase tracking-[0.12em] text-[#8C7A63]">
              {field.label}
            </span>

            {field.href ? (
              <a
                href={field.href}
                target={openInNewTab ? '_blank' : undefined}
                rel={openInNewTab ? 'noreferrer' : undefined}
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
  )
}

export default CardContactDetails
