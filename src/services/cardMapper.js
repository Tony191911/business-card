import { COLUMN_PAIRS } from '../config/fields'

// 名片內容欄位由 config/fields.js 的登記表驅動；
// 系統欄位（id / slug / status / industry / 時間戳）不屬於名片內容，維持明寫。

export function mapCardFromDb(row) {
  const content = {}
  COLUMN_PAIRS.forEach(([key, column]) => {
    content[key] = key === 'name' ? row[column] : row[column] || ''
  })

  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    industry: row.industry,

    ...content,

    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,

    services: (row.card_services || [])
      .map((service) => ({
        id: service.id,
        serviceName: service.service_name,
        sortOrder: service.sort_order,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder),
  }
}

export function mapCardToDb(card) {
  const content = {}
  COLUMN_PAIRS.forEach(([key, column]) => {
    content[column] = key === 'name' ? card[key] : card[key] || null
  })

  return {
    slug: card.slug,
    status: card.status,
    industry: card.industry,

    ...content,

    updated_at: new Date().toISOString(),
    published_at:
      card.status === 'published'
        ? card.publishedAt || new Date().toISOString()
        : card.publishedAt || null,
  }
}

export function mapServiceToDb(service, cardId) {
  return {
    card_id: cardId,
    service_name: service.serviceName,
    sort_order: service.sortOrder,
  }
}