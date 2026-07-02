import { mockCards } from '../config/mockCards'

const STORAGE_KEY = 'business-card-data'

export function getCards() {
  const savedCards = localStorage.getItem(STORAGE_KEY)

  if (!savedCards) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCards))
    return mockCards
  }

  return JSON.parse(savedCards)
}

export function getCardById(id) {
  return getCards().find((card) => card.id === id)
}

export function getCardBySlug(slug) {
  return getCards().find((card) => card.slug === slug)
}

export function saveCard(card) {
  const cards = getCards()
  const exists = cards.some((item) => item.id === card.id)

  const nextCards = exists
    ? cards.map((item) => (item.id === card.id ? card : item))
    : [...cards, card]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCards))

  return card
}

export function updateCardStatus(id, status) {
  const cards = getCards()

  const nextCards = cards.map((card) =>
    card.id === id
      ? {
          ...card,
          status,
        }
      : card
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCards))
}

export function deleteCard(id) {
  const cards = getCards()
  const nextCards = cards.filter((card) => card.id !== id)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCards))
}