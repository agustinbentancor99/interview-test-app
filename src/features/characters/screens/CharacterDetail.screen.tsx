import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Spinner, Skeleton } from '@/core/components'
import { useCharacterById } from '@/shared/api/characters'
import { useEpisodeById } from '@/shared/api/episodes'
import { ROUTES } from '@/router/routes'

function getEpisodeIdFromUrl(url: string): number | null {
  const segment = url.split('/').filter(Boolean).pop()
  if (segment == null) return null
  const n = parseInt(segment, 10)
  return Number.isNaN(n) ? null : n
}

export function CharacterDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const numId = id != null && id !== '' ? parseInt(id, 10) : null
  const validId = numId != null && !Number.isNaN(numId) ? numId : null
  const { character, loading, error } = useCharacterById(validId)
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(null)
  const { episode: selectedEpisode, loading: episodeLoading } =
    useEpisodeById(selectedEpisodeId)

  useEffect(() => {
    if (character?.name != null) {
      document.title = `${character.name} | Rick and Morty`
      return () => {
        document.title = 'Rick and Morty'
      }
    }
  }, [character?.name])

  if (validId == null) {
    return (
      <div className="character-detail-screen">
        <p>Invalid character ID.</p>
        <Link to={ROUTES.CHARACTERS}>← Back to list</Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div
        className="character-detail-screen character-detail-screen--loading"
        aria-busy="true"
      >
        <Spinner size="lg" aria-label="Loading character" />
      </div>
    )
  }

  if (error != null) {
    return (
      <div className="character-detail-screen" role="alert">
        <p>Error: {error.message}</p>
        <Link to={ROUTES.CHARACTERS}>← Back to list</Link>
      </div>
    )
  }

  if (character == null) {
    return (
      <div className="character-detail-screen">
        <p>Character not found.</p>
        <Link to={ROUTES.CHARACTERS}>← Back to list</Link>
      </div>
    )
  }

  const episodeCount = character.episode?.length ?? 0
  const episodeIds = (character.episode ?? [])
    .map(getEpisodeIdFromUrl)
    .filter((id): id is number => id != null)
  const createdDate =
    character.created != null
      ? new Date(character.created).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null

  return (
    <div className="character-detail-screen">
      <Link to={ROUTES.CHARACTERS} className="back-link">
        ← Back to list
      </Link>
      <article className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
        />
        <div className="character-detail-info">
          <h1>{character.name}</h1>
          <p>
            {character.status} · {character.species} · {character.gender}
          </p>
          {character.type != null && character.type !== '' && (
            <p>Type: {character.type}</p>
          )}
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
          <p>
            Appears in {episodeCount} episode{episodeCount !== 1 ? 's' : ''}
          </p>
          {createdDate != null && <p>Created: {createdDate}</p>}
          {episodeIds.length > 0 && (
            <div className="character-episodes">
              <h2>Episodes</h2>
              <ul className="episode-list">
                {episodeIds.map((epId) => (
                  <li key={epId}>
                    <button
                      type="button"
                      className="episode-trigger"
                      onClick={() =>
                        setSelectedEpisodeId((prev) =>
                          prev === epId ? null : epId,
                        )
                      }
                      aria-expanded={selectedEpisodeId === epId}
                    >
                      Episode {epId}
                    </button>
                    {selectedEpisodeId === epId && (
                      <div
                        className="episode-detail"
                        role="region"
                        aria-label="Episode details"
                      >
                        {episodeLoading ? (
                          <div className="episode-skeleton" role="status" aria-label="Loading episode">
                            <Skeleton width="80%" height="1.25rem" className="episode-skeleton__line" />
                            <Skeleton width="60%" height="0.875rem" className="episode-skeleton__line" />
                          </div>
                        ) : selectedEpisode != null &&
                          selectedEpisode.id === epId ? (
                          <div className="episode-info">
                            <p>
                              <strong>{selectedEpisode.name}</strong>
                            </p>
                            <p>
                              {selectedEpisode.episode} ·{' '}
                              {selectedEpisode.air_date}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
