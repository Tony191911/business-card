import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getPublishedCardBySlug } from '../../../services/cardService'

const mocks = vi.hoisted(() => ({
  from: vi.fn(),
  select: vi.fn(),
  firstEq: vi.fn(),
  secondEq: vi.fn(),
  maybeSingle: vi.fn(),
}))

vi.mock('../../../lib/supabaseClient', () => ({
  supabase: {
    from: mocks.from,
  },
}))

describe('getPublishedCardBySlug', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mocks.from.mockReturnValue({
      select: mocks.select,
    })

    mocks.select.mockReturnValue({
      eq: mocks.firstEq,
    })

    mocks.firstEq.mockReturnValue({
      eq: mocks.secondEq,
    })

    mocks.secondEq.mockReturnValue({
      maybeSingle: mocks.maybeSingle,
    })
  })

  describe('成功流程', () => {
    it('使用 slug 查詢已發布名片並回傳前端格式資料', async () => {
      const dbCard = {
        id: 'card-1',
        slug: 'cheng-li-design',
        status: 'published',
        name: '測試使用者',
        company_en: 'Test Company',
        office_phone: null,
        card_services: [
          {
            id: 'service-1',
            service_name: '住宅設計',
            sort_order: 1,
          },
        ],
      }

      mocks.maybeSingle.mockResolvedValue({
        data: dbCard,
        error: null,
      })

      const result = await getPublishedCardBySlug('cheng-li-design')

      expect(mocks.from).toHaveBeenCalledWith('cards')

      expect(mocks.firstEq).toHaveBeenCalledWith(
        'slug',
        'cheng-li-design'
      )

      expect(mocks.secondEq).toHaveBeenCalledWith(
        'status',
        'published'
      )

      expect(result).toMatchObject({
        id: 'card-1',
        slug: 'cheng-li-design',
        status: 'published',
        name: '測試使用者',
        companyEn: 'Test Company',
        officePhone: '',
        services: [
          {
            id: 'service-1',
            serviceName: '住宅設計',
            sortOrder: 1,
          },
        ],
      })
    })
  })

  describe('業務失敗', () => {
    it('查不到名片時回傳 null', async () => {
      mocks.maybeSingle.mockResolvedValue({
        data: null,
        error: null,
      })

      const result = await getPublishedCardBySlug('not-exist')
      expect(result).toBeNull()
    })
  })

  describe('系統失敗', () => {
    it('Supabase 查詢失敗時拋出錯誤', async () => {
      const error = new Error('Supabase connection failed')

      mocks.maybeSingle.mockResolvedValue({
        data: null,
        error,
      })

      await expect(
        getPublishedCardBySlug('cheng-li-design')
      ).rejects.toThrow('Supabase connection failed')
    })
  })
})