import { useCallback, useEffect, useState } from 'react'
import { apiGet } from '@/shared/api/client'
import type { EpisodeApi } from '../types'

export function useEpisodeById(id: number | null) {
  const [episode, setEpisode] = useState<EpisodeApi | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchEpisode = useCallback(async () => {
    if (id == null) return
    setEpisode(null)
    setError(null)
    setLoading(true)
    try {
      const res = await apiGet<EpisodeApi>(`/episode/${id}`)
      setEpisode(res)
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error'))
      setEpisode(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id == null) return
    fetchEpisode()
  }, [id, fetchEpisode])

  return {
    episode: id === null ? null : episode,
    loading,
    error,
    refetch: fetchEpisode,
  }
}
