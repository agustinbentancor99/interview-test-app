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
        <div>{character.name}</div>
        <Badge status={character.status}>{character.status}</Badge>
        <div>
          {character.species} · {character.gender}
        </div>
      </Card>
    </Link>
  )
}
