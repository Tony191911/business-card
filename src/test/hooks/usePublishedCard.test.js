import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { usePublishedCard } from '../../hooks/usePublishedCard'
import { getPublishedCardBySlug } from '../../services/cardService'

vi.mock('../../services/cardService', () => ({
  getPublishedCardBySlug: vi.fn(),
}))

describe('usePublishedCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('成功取得已發布的名片', async () => {
    const mockCard = {
      id: 'card-1',
      slug: 'cheng-li-design',
      name: '測試使用者',
      company: '測試公司',
    }

    getPublishedCardBySlug.mockResolvedValue(mockCard)

    const { result } = renderHook(() =>
      usePublishedCard('cheng-li-design')
    )

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeNull()
    expect(result.current.errorMessage).toBe('')

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(getPublishedCardBySlug).toHaveBeenCalledTimes(1)
    expect(getPublishedCardBySlug).toHaveBeenCalledWith(
      'cheng-li-design'
    )

    expect(result.current.data).toEqual(mockCard)
    expect(result.current.errorMessage).toBe('')
  })

  it('找不到名片時設定錯誤訊息', async () => {
    getPublishedCardBySlug.mockResolvedValue(null)

    const { result } = renderHook(() =>
      usePublishedCard('not-exist')
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(getPublishedCardBySlug).toHaveBeenCalledWith(
      'not-exist'
    )

    expect(result.current.data).toBeNull()
    expect(result.current.errorMessage).toBe('找不到名片')
  })

  it('讀取失敗時設定錯誤訊息', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    getPublishedCardBySlug.mockRejectedValue(
      new Error('Supabase connection failed')
    )

    const { result } = renderHook(() =>
      usePublishedCard('cheng-li-design')
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toBeNull()
    expect(result.current.errorMessage).toBe('讀取名片失敗')
    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })

  it('slug 改變時重新讀取名片', async () => {
    const firstCard = {
      id: 'card-1',
      slug: 'first-card',
    }

    const secondCard = {
      id: 'card-2',
      slug: 'second-card',
    }

    getPublishedCardBySlug
      .mockResolvedValueOnce(firstCard)
      .mockResolvedValueOnce(secondCard)

    const { result, rerender } = renderHook(
      ({ slug }) => usePublishedCard(slug),
      {
        initialProps: {
          slug: 'first-card',
        },
      }
    )

    await waitFor(() => {
      expect(result.current.data).toEqual(firstCard)
    })

    rerender({
      slug: 'second-card',
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(secondCard)
    })

    expect(getPublishedCardBySlug).toHaveBeenCalledTimes(2)
    expect(getPublishedCardBySlug).toHaveBeenNthCalledWith(
      1,
      'first-card'
    )
    expect(getPublishedCardBySlug).toHaveBeenNthCalledWith(
      2,
      'second-card'
    )
  })
})