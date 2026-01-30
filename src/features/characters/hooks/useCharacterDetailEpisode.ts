import { useCallback, useState } from 'react'
import { apiGet } from '@/shared/api/client';

export function useCharacterDetailEpisode() {
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);
  const [episodeLoading, setEpisodeLoading] = useState(false);

  const setSelectedEpisodeById = useCallback(async (selectedEpisodeId: number | null) => {
    if (selectedEpisodeId == null) {
      setSelectedEpisode(null);
    return;
    }
      setSelectedEpisode(null);
      setEpisodeLoading(true);
      apiGet(`/episode/${selectedEpisodeId}`)
      .then((res) => setSelectedEpisode(res))
      .finally(() => setEpisodeLoading(false));
    }, [])

    return {
      selectedEpisode,
      episodeLoading,
      setSelectedEpisodeById,
  }
}
