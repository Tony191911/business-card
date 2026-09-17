import { getGroupedFields } from '../../config/fields'
import { cardPreset } from '../../config/cardPreset'

function CardContactDetails({ data }) {
  const groups = getGroupedFields(cardPreset, data).filter(
    (group) => group.key === 'contact' || group.key === 'registration'
  )

  if (groups.length === 0) return null

  return (
    <div> 
      {groups.map((group) =>
        group.fields.map((field) => {
          const { behavior } = field
          const rawValue = data[field.key]
          const text = behavior.display(rawValue)
          const href = behavior.href ? behavior.href(rawValue) : ''
          const openInNewTab = field.type === 'address' || field.type === 'url'

          const valueClassName =
            behavior.script === 'zh'
              ? 'font-sans text-[16px] leading-relaxed'
              : 'font-en text-[15px]'

          const valueColor =
            group.key === 'registration' ? 'text-[#6B6053]' : 'text-[#2E2822]'

          return (
            <div
              key={field.key}
              className="flex items-baseline justify-between gap-3 border-b border-dashed border-[rgba(169,116,58,0.28)] py-[11px] last:border-b-0"
            >
              <span className="shrink-0 font-en text-[12px] uppercase tracking-[0.12em] text-[#8C7A63]">
                {field.label}
              </span>

              {href ? (
                <a
                  href={href}
                  target={openInNewTab ? '_blank' : undefined}
                  rel={openInNewTab ? 'noreferrer' : undefined}
                  className={`min-w-0 break-all text-right ${valueColor} ${valueClassName}`}
                >
                  {text}
                </a>
              ) : (
                <span className={`min-w-0 break-all text-right ${valueColor} ${valueClassName}`}>
                  {text}
                </span>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}

export default CardContactDetails