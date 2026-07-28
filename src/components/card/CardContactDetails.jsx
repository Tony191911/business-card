function CardContactDetails({ data }) {
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

  if (detailFields.length === 0) return null

  return (
    <div>
      {detailFields.map((field) => {
        const valueClassName = field.isChinese
          ? 'font-sans text-[13px] leading-relaxed'
          : 'font-mono text-[14px]'

        const openInNewTab =
          field.label === 'ADDR' || field.label === 'WEB'

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