import { useCallback, useEffect, useState } from 'react'
import type { Character } from '@/core/models/character'
import { apiGet } from '@/shared/api/client'
import type { CharacterApi } from '../types'

function mapToCharacter(api: CharacterApi): Character {
  return {
    ...api,
    status: api.status as Character['status'],
  }
}

export function useCharacterById(id: number | null) {
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchCharacter = useCallback(async () => {
    if (id == null) return
    setLoading(true)
    setError(null)
    try {
      const res = await apiGet<CharacterApi>(`/character/${id}`)
      setCharacter(mapToCharacter(res))
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchCharacter()
  }, [fetchCharacter])

  return { character, loading, error, refetch: fetchCharacter }
}
