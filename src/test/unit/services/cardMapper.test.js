import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mapCardFromDb, mapCardToDb, mapServiceToDb, } from '../../../services/cardMapper'

describe('cardMapper', () => {
  describe('mapCardFromDb', () => {
    describe('成功流程', () => {
      it('將完整的 DB row 轉換為前端格式（snake_case -> camelCase）', () => {
        const row = {
          id: 'card-1',
          slug: 'cheng-li-design',
          status: 'published',
          industry: 'construction',

          name: '覃慧芬',
          title: '室內設計師',
          company: '承麗實業有限公司',
          company_en: 'Cheng Li Co., Ltd.',

          mobile: '0937-721470',
          office_phone: '04-1234-5678',
          fax: '04-2381-1649',
          email: 'fen19192005@yahoo.com.tw',
          address: '408台中市南屯區楓和路676號',
          tax_id: '80433113',

          website: 'https://example.com',

          avatar_url: 'https://example.com/avatar.webp',
          logo_url: 'https://example.com/logo.webp',

          created_at: '2026-01-01T00:00:00.000Z',
          updated_at: '2026-01-02T00:00:00.000Z',
          published_at: '2026-01-03T00:00:00.000Z',

          card_services: [
            { id: 'service-1', service_name: '住宅裝修設計施工', sort_order: 1 },
          ],
        }

        const result = mapCardFromDb(row)

        expect(result).toEqual({
          id: 'card-1',
          slug: 'cheng-li-design',
          status: 'published',
          industry: 'construction',

          name: '覃慧芬',
          title: '室內設計師',
          company: '承麗實業有限公司',
          companyEn: 'Cheng Li Co., Ltd.',

          mobile: '0937-721470',
          officePhone: '04-1234-5678',
          fax: '04-2381-1649',
          email: 'fen19192005@yahoo.com.tw',
          address: '408台中市南屯區楓和路676號',
          taxId: '80433113',

          website: 'https://example.com',

          avatarUrl: 'https://example.com/avatar.webp',
          logoUrl: 'https://example.com/logo.webp',

          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-02T00:00:00.000Z',
          publishedAt: '2026-01-03T00:00:00.000Z',

          services: [
            { id: 'service-1', serviceName: '住宅裝修設計施工', sortOrder: 1 },
          ],
        })
      })

      it('services 依 sortOrder 由小到大排序，即使 DB 回傳順序是亂的', () => {
        const row = {
          id: 'card-1',
          card_services: [
            { id: 'service-3', service_name: '辦公室規劃施工', sort_order: 3 },
            { id: 'service-1', service_name: '住宅裝修設計施工', sort_order: 1 },
            { id: 'service-2', service_name: '系統櫥櫃設計施工', sort_order: 2 },
          ],
        }

        const result = mapCardFromDb(row)

        expect(result.services.map((service) => service.sortOrder)).toEqual([
          1, 2, 3,
        ])
      })
    })

    describe('邊界情況', () => {
      it('可選欄位為 null/undefined 時，fallback 為空字串', () => {
        const row = {
          id: 'card-2',
          slug: 'minimal-card',
          status: 'draft',
          industry: 'general',
          name: '測試使用者',
          title: null,
          company: undefined,
          company_en: null,
          mobile: null,
          office_phone: null,
          fax: null,
          email: null,
          address: null,
          tax_id: null,
          website: null,
          avatar_url: null,
          logo_url: null,
          created_at: '2026-01-01T00:00:00.000Z',
          updated_at: '2026-01-01T00:00:00.000Z',
          published_at: null,
        }

        const result = mapCardFromDb(row)

        expect(result.title).toBe('')
        expect(result.company).toBe('')
        expect(result.companyEn).toBe('')
        expect(result.mobile).toBe('')
        expect(result.officePhone).toBe('')
        expect(result.fax).toBe('')
        expect(result.email).toBe('')
        expect(result.address).toBe('')
        expect(result.taxId).toBe('')
        expect(result.website).toBe('')
        expect(result.avatarUrl).toBe('')
        expect(result.logoUrl).toBe('')
      })

      it('沒有 card_services 時，services 為空陣列', () => {
        const row = { id: 'card-3' }

        const result = mapCardFromDb(row)

        expect(result.services).toEqual([])
      })
    })
  })

  describe('mapCardToDb', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-08-07T10:00:00.000Z'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    describe('成功流程', () => {
      it('status 為 published 且尚未有 publishedAt 時，寫入目前時間', () => {
        const card = {
          slug: 'cheng-li-design',
          status: 'published',
          industry: 'construction',
          name: '覃慧芬',
          publishedAt: null,
        }

        const result = mapCardToDb(card)

        expect(result.published_at).toBe('2026-08-07T10:00:00.000Z')
      })

      it('status 為 published 且已有 publishedAt 時，保留原本的發布時間', () => {
        const card = {
          slug: 'cheng-li-design',
          status: 'published',
          industry: 'construction',
          name: '覃慧芬',
          publishedAt: '2026-01-03T00:00:00.000Z',
        }

        const result = mapCardToDb(card)

        expect(result.published_at).toBe('2026-01-03T00:00:00.000Z')
      })

      it('status 不是 published 且尚未發布過時，published_at 為 null', () => {
        const card = {
          slug: 'draft-card',
          status: 'draft',
          industry: 'general',
          name: '測試使用者',
          publishedAt: null,
        }

        const result = mapCardToDb(card)

        expect(result.published_at).toBeNull()
      })

      it('封存已發布過的名片時，保留原本的 publishedAt，不會被清空', () => {
        // 這是容易被忽略的業務邏輯：archived 不等於「從未發布過」，
        // 封存前的發布時間應該被保留下來。
        const card = {
          slug: 'archived-card',
          status: 'archived',
          industry: 'general',
          name: '測試使用者',
          publishedAt: '2026-01-03T00:00:00.000Z',
        }

        const result = mapCardToDb(card)

        expect(result.published_at).toBe('2026-01-03T00:00:00.000Z')
      })

      it('updated_at 一律寫入目前時間，與 status 無關', () => {
        const card = {
          slug: 'draft-card',
          status: 'draft',
          industry: 'general',
          name: '測試使用者',
        }

        const result = mapCardToDb(card)

        expect(result.updated_at).toBe('2026-08-07T10:00:00.000Z')
      })
    })

    describe('邊界情況', () => {
      it('可選欄位為空字串時，轉換為 null（與 mapCardFromDb 方向相反）', () => {
        const card = {
          slug: 'minimal-card',
          status: 'draft',
          industry: 'general',
          name: '測試使用者',
          title: '',
          company: '',
          companyEn: '',
          mobile: '',
          officePhone: '',
          fax: '',
          email: '',
          address: '',
          taxId: '',
          website: '',
          avatarUrl: '',
          logoUrl: '',
        }

        const result = mapCardToDb(card)

        expect(result.title).toBeNull()
        expect(result.company).toBeNull()
        expect(result.company_en).toBeNull()
        expect(result.mobile).toBeNull()
        expect(result.office_phone).toBeNull()
        expect(result.fax).toBeNull()
        expect(result.email).toBeNull()
        expect(result.address).toBeNull()
        expect(result.tax_id).toBeNull()
        expect(result.website).toBeNull()
        expect(result.avatar_url).toBeNull()
        expect(result.logo_url).toBeNull()
      })
    })
  })

  describe('mapServiceToDb', () => {
    describe('成功流程', () => {
      it('將前端 service 物件與 cardId 轉換為 DB 格式', () => {
        const service = {
          id: 'service-1',
          serviceName: '住宅裝修設計施工',
          sortOrder: 1,
        }

        const result = mapServiceToDb(service, 'card-1')

        expect(result).toEqual({
          card_id: 'card-1',
          service_name: '住宅裝修設計施工',
          sort_order: 1,
        })
      })
    })
  })
})