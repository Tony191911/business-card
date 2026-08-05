import { useEffect, useState } from 'react'
import { getPublishedCardBySlug } from '../services/cardService'

export function usePublishedCard(slug) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadCard() {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const card = await getPublishedCardBySlug(slug)
        if (!card) {
          setErrorMessage('找不到名片')
          return
        }
        setData(card)
      } catch (error) {
        console.error(error)
        setErrorMessage('讀取名片失敗')
      } finally {
        setIsLoading(false)
      }
    }
    loadCard()
  }, [slug])

  return {
    data,
    isLoading,
    errorMessage,
  }
}