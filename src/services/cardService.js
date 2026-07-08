// src/services/cardService.js
import { supabase } from '../lib/supabaseClient'
import { mapCardFromDb } from './cardMapper'

const cardSelect = `
  *,
  card_services (
    id,
    service_name,
    sort_order
  )
`

export async function getCards() {
  const { data, error } = await supabase
    .from('cards')
    .select(cardSelect)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data.map(mapCardFromDb)
}

export async function getCardById(id) {
  const { data, error } = await supabase
    .from('cards')
    .select(cardSelect)
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  return mapCardFromDb(data)
}

export async function getCardBySlug(slug) {
  const { data, error } = await supabase
    .from('cards')
    .select(cardSelect)
    .eq('slug', slug)
    .single()

  if (error) {
    throw error
  }

  return mapCardFromDb(data)
}