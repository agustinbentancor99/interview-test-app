import { Link } from 'react-router-dom'
import { Badge, Card } from '@/core/components'
import type { Character } from '@/core/models/character'
import { ROUTES } from '@/router/routes'

export function CharacterCard({ character }: { character: Character }) {
  return (
    <Link
      to={ROUTES.CHARACTER_DETAIL.replace(':id', String(character.id))}
      className="character-card-link"
    >
      <Card className="character-card">
        <img
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          loading="lazy"
        />
        <h3>{character.name}</h3>
        <Badge status={character.status}>{character.status}</Badge>
        <p>
          {character.species} · {character.gender}
        </p>
      </Card>
    </Link>
  )
}
