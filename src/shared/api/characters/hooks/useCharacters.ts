import { useCallback, useEffect, useState } from 'react'
import type { Character } from '@/core/models/character'
import { apiGet } from '@/shared/api/client'
import type { CharactersResponse } from '../types'

export interface CharacterFilters {
  page?: number
  name?: string
  status?: string
  species?: string
}

function mapToCharacter(
  api: CharactersResponse['results'][number],
): Character {
  return {
    ...api,
    status: api.status as Character['status'],
  }
}

export function useCharacters(params: CharacterFilters = {}) {
  const [data, setData] = useState<{
    characters: Character[]
    info: CharactersResponse['info']
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchCharacters = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const query: Record<string, string | number> = {}
      if (params.page != null) query.page = params.page
      if (params.name != null && params.name !== '')
        query.name = params.name
      if (params.status != null && params.status !== '')
        query.status = params.status
      if (params.species != null && params.species !== '')
        query.species = params.species
      const res = await apiGet<CharactersResponse>('/character', query)
      setData({
        characters: res.results.map(mapToCharacter),
        info: res.info,
      })
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, [
    params.page,
    params.name,
    params.status,
    params.species,
  ])

  useEffect(() => {
    fetchCharacters()
  }, [fetchCharacters])

  return { data, loading, error, refetch: fetchCharacters }
}
