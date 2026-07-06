export function mapCardFromDb(row) {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    industry: row.industry,

    name: row.name,
    title: row.title || '',
    company: row.company || '',
    companyEn: row.company_en || '',

    mobile: row.mobile || '',
    officePhone: row.office_phone || '',
    fax: row.fax || '',
    email: row.email || '',
    address: row.address || '',
    taxId: row.tax_id || '',

    website: row.website || '',

    avatarUrl: row.avatar_url || '',
    logoUrl: row.logo_url || '',

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
  return {
    slug: card.slug,
    status: card.status,
    industry: card.industry,

    name: card.name,
    title: card.title || null,
    company: card.company || null,
    company_en: card.companyEn || null,

    mobile: card.mobile || null,
    office_phone: card.officePhone || null,
    fax: card.fax || null,
    email: card.email || null,
    address: card.address || null,
    tax_id: card.taxId || null,

    website: card.website || null,

    avatar_url: card.avatarUrl || null,
    logo_url: card.logoUrl || null,

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