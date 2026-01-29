import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useCharacters } from './useCharacters'

const mockApiGet = vi.fn()
vi.mock('@/shared/api/client', () => ({
  apiGet: (...args: unknown[]) => mockApiGet(...args),
}))

describe('useCharacters', () => {
  beforeEach(() => {
    mockApiGet.mockReset()
  })

  it('fetches characters and returns data when params are empty', async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          name: 'Rick',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth', url: '' },
          location: { name: 'Earth', url: '' },
          image: '',
          episode: [],
          url: '',
          created: '',
        },
      ],
      info: { count: 1, pages: 1, next: null, prev: null },
    }
    mockApiGet.mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useCharacters({}))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).not.toBeNull()
    expect(result.current.data?.characters).toHaveLength(1)
    expect(result.current.data?.characters[0].name).toBe('Rick')
    expect(result.current.data?.info.pages).toBe(1)
    expect(result.current.error).toBeNull()
    expect(mockApiGet).toHaveBeenCalledWith('/character', expect.any(Object))
  })

  it('passes query params to apiGet when filters are set', async () => {
    mockApiGet.mockResolvedValue({
      results: [],
      info: { count: 0, pages: 0, next: null, prev: null },
    })

    const { result } = renderHook(() =>
      useCharacters({ page: 2, name: 'Rick', status: 'alive', species: 'Human' }),
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(mockApiGet).toHaveBeenCalledWith('/character', {
      page: 2,
      name: 'Rick',
      status: 'alive',
      species: 'Human',
    })
  })

  it('sets error when fetch fails', async () => {
    mockApiGet.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useCharacters({}))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toBeNull()
    expect(result.current.error).not.toBeNull()
    expect(result.current.error?.message).toBe('Network error')
  })
})
