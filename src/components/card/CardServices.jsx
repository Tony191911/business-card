function CardServices({ services = [] }) {
  const sortedServices = [...services].sort(
    (a, b) => a.sortOrder - b.sortOrder
  )

  if (sortedServices.length === 0) return null

  return (
    <section>
      <h2 className="mb-2.5 mt-[18px] font-en text-[12px] font-normal uppercase tracking-[0.12em] text-[#8C7A63]">
        服務項目
      </h2>

      <div className="grid grid-cols-2 gap-x-3.5">
        {sortedServices.map((service) => (
          <div
            key={service.id}
            className="flex items-center gap-2 border-b border-dashed border-[rgba(169,116,58,0.28)] py-[9px] text-[15px] leading-relaxed text-[#2E2822] [&:nth-last-child(-n+2)]:border-b-0"
          >
            <span className="h-[5px] w-[5px] shrink-0 rotate-45 border border-[#A9743A]" />
            <span>{service.serviceName}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CardServices
