import type { CharacterFilters as ApiFilters } from '@/shared/api/characters'
import { Button, Input } from '@/core/components'
import { useCharacterFilters } from '../hooks/useCharacterFilters'

export function CharacterFilters({
  onApply,
}: {
  onApply: (params: ApiFilters) => void
}) {
  const {
    filters,
    setSearch,
    setStatus,
    setSpecies,
    toApiParams,
  } = useCharacterFilters()

  return (
    <form
      className="filters"
      onSubmit={(e) => {
        e.preventDefault()
        onApply(toApiParams())
      }}
    >
      <Input
        label="Name"
        name="name"
        value={filters.name}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Filter by name"
      />
      <div className="input-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={filters.status}
          onChange={(e) => setStatus(e.target.value)}
          className="input"
        >
          <option value="">All statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <Input
        label="Species"
        name="species"
        value={filters.species}
        onChange={(e) => setSpecies(e.target.value)}
        placeholder="Filter by species"
      />
      <Button type="submit">Apply</Button>
    </form>
  )
}
