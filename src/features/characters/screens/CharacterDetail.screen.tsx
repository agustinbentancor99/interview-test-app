import { Link, useParams } from 'react-router-dom'
import { useCharacterById } from '@/shared/api/characters'
import { ROUTES } from '@/router/routes'

export function CharacterDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const numId = id != null && id !== '' ? parseInt(id, 10) : null
  const validId = numId != null && !Number.isNaN(numId) ? numId : null
  const { character, loading, error } = useCharacterById(validId)

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
      <div className="character-detail-screen" aria-busy="true">
        <p>Loading…</p>
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
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
        </div>
      </article>
    </div>
  )
}
