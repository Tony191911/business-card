import { useParams } from 'react-router-dom'
import { getCardBySlug } from '../services/cardService'
import Wrapper from '../assets/wrappers/PublicPages'
import NotFound from '../components/NotFound'
import CardContent from '../components/CardContent'

function CardPage() {
  const { slug } = useParams()
  const data = getCardBySlug(slug)

  if (!data) {
    return <NotFound />
  }

  function handleAddContact() {
    const cardUrl = `${window.location.origin}/card/${data.slug}`

    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${data.name || ''}`,
      `ORG:${data.company || ''}`,
      `TITLE:${data.title || ''}`,
      data.mobile ? `TEL;TYPE=CELL:${data.mobile}` : '',
      data.email ? `EMAIL:${data.email}` : '',
      data.address ? `ADR;TYPE=WORK:;;${data.address};;;;` : '',
      data.avatarUrl ? `PHOTO;VALUE=URI:${data.avatarUrl}` : '',
      `NOTE:電子名片：${cardUrl}`,
      'END:VCARD',
    ].filter(Boolean)

    const vcard = lines.join('\r\n')
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${data.name || 'contact'}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  return (
    <Wrapper>
      <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white lg:min-h-190 lg:max-w-107.5 lg:rounded-2xl lg:shadow-2xl">
        <CardContent data={data} onAddContact={handleAddContact} />
      </main>
    </Wrapper>
  )
}

export default CardPage