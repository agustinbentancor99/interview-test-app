import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { CharacterCard } from './CharacterCard'
import type { Character } from '@/core/models/character'

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
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
}

function wrapper({ children }: { children: React.ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>
}

describe('CharacterCard', () => {
  it('renders character name, image and badge', () => {
    render(<CharacterCard character={mockCharacter} />, { wrapper })
    expect(screen.getByRole('heading', { name: 'Rick Sanchez' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Rick Sanchez' })).toHaveAttribute(
      'src',
      mockCharacter.image,
    )
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText(/Human · Male/)).toBeInTheDocument()
  })

  it('links to character detail page', () => {
    render(<CharacterCard character={mockCharacter} />, { wrapper })
    const link = screen.getByRole('link', { name: /Rick Sanchez/i })
    expect(link).toHaveAttribute('href', '/characters/1')
  })
})
