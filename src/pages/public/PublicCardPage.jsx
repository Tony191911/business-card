import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Wrapper from '../../style/PublicPageWrapper'
import NotFound from '../../components/common/CardNotFound'
import CardContent from '../../components/card/CardContent'
import { usePublishedCard } from '../../hooks/usePublishedCard'
import { downloadCardContact } from '../../utils/contactVCard'

function isLineBrowser() {
  return /Line/i.test(navigator.userAgent)
}

function openExternalBrowserForContact() {
  const externalUrl = new URL(window.location.href)
  externalUrl.searchParams.set('openExternalBrowser', '1')
  externalUrl.searchParams.set('addContact', '1')
  window.location.href = externalUrl.toString()
}

function PublicCardPage() {
  const { slug } = useParams()
  const { data, isLoading, errorMessage, } = usePublishedCard(slug)
  const hasAutoDownloaded = useRef(false)

  useEffect(() => {
    if (!data || hasAutoDownloaded.current) return
    const params = new URLSearchParams(window.location.search)
    const shouldAddContact = params.get('addContact') === '1'

    if (!shouldAddContact || isLineBrowser()) return

    hasAutoDownloaded.current = true
    async function autoDownloadContact() {
      try {
        await downloadCardContact(data)

        const cleanUrl = new URL(window.location.href)
        cleanUrl.searchParams.delete('addContact')
        cleanUrl.searchParams.delete('openExternalBrowser')

        window.history.replaceState(
          {},
          '',
          `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`
        )
      } catch (error) {
        console.error(error)
        alert('無法自動開啟聯絡人，請再按一次「加入聯絡人」')
      }
    }
    autoDownloadContact()
  }, [data])

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
    if (isLineBrowser()) {
      openExternalBrowserForContact()
      return
    }
    try {
      await downloadCardContact(data)
    } catch (error) {
      console.error(error)
      alert(error.message || '建立聯絡人檔案失敗')
    }
  }

  async function handleCopyLink() {
    try {
      const cardUrl = `${window.location.origin}/card/${data.slug}`
      await navigator.clipboard.writeText(cardUrl)
      alert('已複製名片連結')
    } catch (error) {
      console.error(error)
      alert('複製連結失敗')
    }
  }

  return (
    <Wrapper>
      <main className="relative w-full">
        <CardContent
          data={data}
          onAddContact={handleAddContact}
          onCopyLink={handleCopyLink}
        />
      </main>
    </Wrapper>
  )
}

export default PublicCardPage
