// src/services/cardService.js
import { supabase } from '../lib/supabaseClient'
import { mapCardFromDb, mapCardToDb, mapServiceToDb } from './cardMapper'

const cardSelect = `
  *,
  card_services (
    id,
    service_name,
    sort_order
  )
`

export async function getCards() {
  const { data, error } =
    await supabase.from('cards').select(cardSelect).order('created_at', { ascending: false })
  if (error) {
    throw error
  }
  return data.map(mapCardFromDb)
}

export async function getCardById(id) {
  const { data, error } = 
      await supabase.from('cards').select(cardSelect).eq('id', id).single()
  if (error) {
    throw error
  }
  return mapCardFromDb(data)
}

export async function getCardBySlug(slug) {
  const { data, error } = 
      await supabase.from('cards').select(cardSelect).eq('slug', slug).single()
  if (error) {
    throw error
  }
  return mapCardFromDb(data)
}

export async function getPublishedCardBySlug(slug) {
  const { data, error } = 
      await supabase.from('cards').select(cardSelect).eq('slug', slug)
      .eq('status', 'published').maybeSingle()
  if (error) {
    throw error
  }
  if (!data) {
    return null
  }
  return mapCardFromDb(data)
}

export async function saveCard(card) {
  const cardPayload = mapCardToDb(card)
  let savedCard

  if (card.id) {
    const { data, error } = 
        await supabase.from('cards').update(cardPayload).eq('id', card.id)
        .select(cardSelect).single()
    if (error) {
      throw error
    }
    savedCard = data
  } else {
    const { data, error } = 
        await supabase.from('cards').insert(cardPayload).select(cardSelect).single()
    if (error) {
      throw error
    }
    savedCard = data
  }

  const cardId = savedCard.id
  const { error: deleteServicesError } = 
      await supabase.from('card_services').delete().eq('card_id', cardId)
  if (deleteServicesError) {
    throw deleteServicesError
  }

  const servicesPayload = (card.services || []).filter((service) => service.serviceName.trim())
    .map((service, index) =>
      mapServiceToDb(
        {
          ...service,
          sortOrder: service.sortOrder || index + 1,
        },
        cardId
      )
    )

  if (servicesPayload.length > 0) {
    const { error: insertServicesError } = 
        await supabase.from('card_services').insert(servicesPayload)
    if (insertServicesError) {
      throw insertServicesError
    }
  }

  return getCardById(cardId)
}

export async function updateCardStatus(id, status) {
  const payload = {
    status,
    updated_at: new Date().toISOString(),
    published_at: status === 'published' ? new Date().toISOString() : null,
  }
  const { data, error } = await supabase
    .from('cards')
    .update(payload)
    .eq('id', id)
    .select(cardSelect)
    .single()
  if (error) {
    throw error
  }
  return mapCardFromDb(data)
}

export async function deleteCard(id) {
  const { error } = await supabase
    .from('cards')
    .delete()
    .eq('id', id)
  if (error) {
    throw error
  }
}