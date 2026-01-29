import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useCharacterById } from './useCharacterById'

const mockApiGet = vi.fn()
vi.mock('@/shared/api/client', () => ({
  apiGet: (...args: unknown[]) => mockApiGet(...args),
}))

describe('useCharacterById', () => {
  beforeEach(() => {
    mockApiGet.mockReset()
  })

  it('returns null character and no loading when id is null', () => {
    const { result } = renderHook(() => useCharacterById(null))
    expect(result.current.character).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(mockApiGet).not.toHaveBeenCalled()
  })

  it('fetches character when id is provided', async () => {
    const mockCharacter = {
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
    }
    mockApiGet.mockResolvedValue(mockCharacter)

    const { result } = renderHook(() => useCharacterById(1))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.character).not.toBeNull()
    expect(result.current.character?.name).toBe('Rick')
    expect(result.current.character?.status).toBe('Alive')
    expect(result.current.error).toBeNull()
    expect(mockApiGet).toHaveBeenCalledWith('/character/1')
  })

  it('sets error when fetch fails', async () => {
    mockApiGet.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useCharacterById(1))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.character).toBeNull()
    expect(result.current.error).not.toBeNull()
    expect(result.current.error?.message).toBe('Network error')
  })
})
