import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { CharacterList } from './CharacterList'
import type { Character } from '@/core/models/character'

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'https://example.com/rick.jpg',
    episode: [],
    url: '',
    created: '',
  },
]

function wrapper({ children }: { children: React.ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>
}

describe('CharacterList', () => {
  it('shows loading state', () => {
    render(
      <CharacterList characters={[]} loading={true} error={null} />,
      { wrapper },
    )
    const loadingEl = screen.getByText('Loading characters…')
    expect(loadingEl).toBeInTheDocument()
    expect(loadingEl.closest('[aria-busy="true"]')).toBeInTheDocument()
  })

  it('shows error message when error is set', () => {
    render(
      <CharacterList
        characters={[]}
        loading={false}
        error={new Error('Network error')}
      />,
      { wrapper },
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Error: Network error')
  })

  it('shows empty state when no characters', () => {
    render(
      <CharacterList characters={[]} loading={false} error={null} />,
      { wrapper },
    )
    expect(screen.getByText('No characters found.')).toBeInTheDocument()
  })

  it('renders list of character cards when characters provided', () => {
    render(
      <CharacterList
        characters={mockCharacters}
        loading={false}
        error={null}
      />,
      { wrapper },
    )
    const list = screen.getByRole('list', { name: '' })
    expect(list).toHaveClass('character-list')
    expect(screen.getByRole('heading', { name: 'Rick' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Rick/i })).toHaveAttribute(
      'href',
      '/characters/1',
    )
  })
})
