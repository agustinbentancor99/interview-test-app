import type { Character } from '@/core/models/character'
import { CharacterCard } from './CharacterCard'

export function CharacterList({
  characters,
  loading,
  error,
}: {
  characters: Character[]
  loading: boolean
  error: Error | null
}) {
  if (loading) {
    return (
      <div className="loading" aria-busy="true" aria-live="polite">
        Loading characters…
      </div>
    )
  }
  if (error != null) {
    return (
      <div className="error" role="alert">
        Error: {error.message}
      </div>
    )
  }
  if (characters.length === 0) {
    return (
      <div className="empty">
        <p>No characters found.</p>
      </div>
    )
  }
  return (
    <ul className="character-list">
      {characters.map((c) => (
        <li key={c.id}>
          <CharacterCard character={c} />
        </li>
      ))}
    </ul>
  )
}
