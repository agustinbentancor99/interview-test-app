import { useState } from 'react'
import type { CharacterFilters } from '@/shared/api/characters'
import { useCharacters } from '@/shared/api/characters'
import { Button } from '@/core/components'
import { CharacterFilters as CharacterFiltersForm } from '../components/CharacterFilters'
import { CharacterList } from '../components/CharacterList'

export function CharacterListScreen() {
  const [apiParams, setApiParams] = useState<CharacterFilters>({ page: 1 })
  const { data, loading, error } = useCharacters(apiParams)

  const handleApply = (params: CharacterFilters) => {
    setApiParams({ ...params, page: params.page ?? 1 })
  }

  const goPrev = () => {
    setApiParams((prev) => ({
      ...prev,
      page: Math.max(1, (prev.page ?? 1) - 1),
    }))
  }

  const goNext = () => {
    const nextPage = (apiParams.page ?? 1) + 1
    const maxPage = data?.info.pages ?? 1
    setApiParams((prev) => ({
      ...prev,
      page: Math.min(maxPage, nextPage),
    }))
  }

  const hasPrev = data?.info.prev != null && data.info.prev !== ''
  const hasNext = data?.info.next != null && data.info.next !== ''
  const currentPage = apiParams.page ?? 1
  const totalPages = data?.info.pages ?? 0

  return (
    <div className="character-list-screen">
      <h1>Characters</h1>
      <CharacterFiltersForm onApply={handleApply} />
      <CharacterList
        characters={data?.characters ?? []}
        loading={loading}
        error={error}
      />
      {data?.info != null && totalPages > 0 && (
        <nav className="pagination" aria-label="Characters pagination">
          <Button
            type="button"
            variant="secondary"
            disabled={!hasPrev}
            onClick={goPrev}
          >
            Prev
          </Button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            type="button"
            variant="secondary"
            disabled={!hasNext}
            onClick={goNext}
          >
            Next
          </Button>
        </nav>
      )}
    </div>
  )
}
