import { useParams } from 'react-router-dom'
import Wrapper from '../../style/PublicPageWrapper'
import NotFound from '../../components/common/CardNotFound'
import CardContent from '../../components/card/CardContent'
import { usePublishedCard } from '../../hooks/usePublishedCard'
import { downloadCardContact } from '../../utils/contactVCard'

function PublicCardPage() {
  const { slug } = useParams()
  const {
    data,
    isLoading,
    errorMessage,
  } = usePublishedCard(slug)

  if (isLoading) {
    return (
      <Wrapper>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-gray-500">名片讀取中...</p>
        </div>
      </Wrapper>
    )
  }

  if (errorMessage || !data) {
    return <NotFound />
  }

  async function handleAddContact() {
    try {
      await downloadCardContact(data)
    } catch (error) {
      console.error(error)
      alert(error.message || '建立聯絡人檔案失敗')
    }
  }

  return (
    <Wrapper>
      <main className="relative w-full">
        <CardContent data={data} onAddContact={handleAddContact} />
      </main>
    </Wrapper>
  )
}

export default PublicCardPage
