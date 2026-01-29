import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useEpisodeById } from './useEpisodeById'

const mockApiGet = vi.fn()
vi.mock('@/shared/api/client', () => ({
  apiGet: (...args: unknown[]) => mockApiGet(...args),
}))

describe('useEpisodeById', () => {
  beforeEach(() => {
    mockApiGet.mockReset()
  })

  it('returns null episode and no loading when id is null', () => {
    const { result } = renderHook(() => useEpisodeById(null))
    expect(result.current.episode).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(mockApiGet).not.toHaveBeenCalled()
  })

  it('fetches episode when id is provided', async () => {
    const mockEpisode = {
      id: 1,
      name: 'Pilot',
      air_date: 'December 2, 2013',
      episode: 'S01E01',
      characters: [],
      url: '',
      created: '',
    }
    mockApiGet.mockResolvedValue(mockEpisode)

    const { result } = renderHook(() => useEpisodeById(1))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.episode).not.toBeNull()
    expect(result.current.episode?.name).toBe('Pilot')
    expect(result.current.episode?.episode).toBe('S01E01')
    expect(result.current.error).toBeNull()
    expect(mockApiGet).toHaveBeenCalledWith('/episode/1')
  })

  it('returns null episode when id is null (consumer sees null)', () => {
    const { result } = renderHook(() => useEpisodeById(null))
    expect(result.current.episode).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('sets error when fetch fails', async () => {
    mockApiGet.mockRejectedValue(new Error('Not found'))

    const { result } = renderHook(() => useEpisodeById(1))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.episode).toBeNull()
    expect(result.current.error).not.toBeNull()
    expect(result.current.error?.message).toBe('Not found')
  })
})
