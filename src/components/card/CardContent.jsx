import CornerMark from './CornerMark'
import CardIdentity from './CardIdentity'
import CardContactDetails from './CardContactDetails'
import CardServices from './CardServices'
import CardActions from './CardActions'

function CardContent({ data, onAddContact, onCopyLink, showActions = true }) {
  return (
    <article className="relative w-full overflow-hidden bg-[#EDE7D9] px-6 pb-4 pt-7 text-[#2E2822] sm:rounded-[2px]">
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

      <div className="relative z-10 flex flex-col">
        <CardIdentity data={data} />
        <CardContactDetails data={data} />
        <CardServices services={data.services} />

        {showActions && (
          <CardActions
            slug={data.slug}
            mobile={data.mobile}
            onAddContact={onAddContact}
            onCopyLink={onCopyLink}
          />
        )}
      </div>
    </article>
  )
}

export default CardContent