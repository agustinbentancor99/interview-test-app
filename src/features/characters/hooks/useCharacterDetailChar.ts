import { useCallback, useState } from 'react'
import type { Character } from '@/core/models/character';
import { apiGet } from '@/shared/api/client';
import type { CharacterApi } from '@/shared/api/characters';

export function useCharacterDetailChar() {
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const setCharacterById = useCallback((validId: number | null) => {
      if (validId == null) return;
      setLoading(true);
      setError(null);
      apiGet<CharacterApi>(`/character/${validId}`)
        .then((res) => {
          setCharacter({
            ...res,
            status: res.status,
          } as Character);
        })
        .catch((e) => {
          setError(e instanceof Error ? e : new Error("Unknown error"));
        })
        .finally(() => {
          setLoading(false);
        });
    }, [])

  return {
    character,
    loading,
    error,
    setCharacterById,
  }
}
