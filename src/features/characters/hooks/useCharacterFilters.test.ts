import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useCharacterFilters } from './useCharacterFilters'

describe('useCharacterFilters', () => {
  it('returns initial filters with page 1 and empty strings', () => {
    const { result } = renderHook(() => useCharacterFilters())
    expect(result.current.filters).toEqual({
      page: 1,
      name: '',
      status: '',
      species: '',
    })
  })

  it('updates name and resets page to 1 when setSearch is called', () => {
    const { result } = renderHook(() => useCharacterFilters())
    act(() => {
      result.current.setSearch('Rick')
    })
    expect(result.current.filters.name).toBe('Rick')
    expect(result.current.filters.page).toBe(1)
  })

  it('updates status and resets page to 1 when setStatus is called', () => {
    const { result } = renderHook(() => useCharacterFilters())
    act(() => {
      result.current.setStatus('alive')
    })
    expect(result.current.filters.status).toBe('alive')
    expect(result.current.filters.page).toBe(1)
  })

  it('updates species and resets page to 1 when setSpecies is called', () => {
    const { result } = renderHook(() => useCharacterFilters())
    act(() => {
      result.current.setSpecies('Human')
    })
    expect(result.current.filters.species).toBe('Human')
    expect(result.current.filters.page).toBe(1)
  })

  it('updates page when setPage is called', () => {
    const { result } = renderHook(() => useCharacterFilters())
    act(() => {
      result.current.setSearch('Rick')
    })
    act(() => {
      result.current.setPage(2)
    })
    expect(result.current.filters.page).toBe(2)
    expect(result.current.filters.name).toBe('Rick')
  })

  it('toApiParams returns only page when no filters set', () => {
    const { result } = renderHook(() => useCharacterFilters())
    expect(result.current.toApiParams()).toEqual({ page: 1 })
  })

  it('toApiParams includes name, status, species when set', () => {
    const { result } = renderHook(() => useCharacterFilters())
    act(() => {
      result.current.setSearch('Rick')
      result.current.setStatus('alive')
      result.current.setSpecies('Human')
    })
    expect(result.current.toApiParams()).toEqual({
      page: 1,
      name: 'Rick',
      status: 'alive',
      species: 'Human',
    })
  })
})
