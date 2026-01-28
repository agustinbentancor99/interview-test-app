import { useCallback, useState } from 'react'

export interface CharacterFiltersState {
  page: number
  name: string
  status: string
  species: string
}

const initial: CharacterFiltersState = {
  page: 1,
  name: '',
  status: '',
  species: '',
}

export function useCharacterFilters() {
  const [filters, setFilters] = useState<CharacterFiltersState>(initial)

  const setPage = useCallback((page: number) => {
    setFilters((f) => ({ ...f, page }))
  }, [])

  const setSearch = useCallback((name: string) => {
    setFilters((f) => ({ ...f, name, page: 1 }))
  }, [])

  const setStatus = useCallback((status: string) => {
    setFilters((f) => ({ ...f, status, page: 1 }))
  }, [])

  const setSpecies = useCallback((species: string) => {
    setFilters((f) => ({ ...f, species, page: 1 }))
  }, [])

  const toApiParams = useCallback(() => {
    return {
      page: filters.page,
      ...(filters.name !== '' && { name: filters.name }),
      ...(filters.status !== '' && { status: filters.status }),
      ...(filters.species !== '' && { species: filters.species }),
    }
  }, [filters.page, filters.name, filters.status, filters.species])

  return {
    filters,
    setPage,
    setSearch,
    setStatus,
    setSpecies,
    toApiParams,
  }
}
