import { act, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { CharacterDetailScreen } from './CharacterDetail.screen'
import type { Character } from '@/core/models/character'

const mockUseCharacterById = vi.fn()
const mockUseEpisodeById = vi.fn()

vi.mock('@/shared/api/characters', () => ({
  useCharacterById: (id: number | null) => mockUseCharacterById(id),
}))

vi.mock('@/shared/api/episodes', () => ({
  useEpisodeById: (id: number | null) => mockUseEpisodeById(id),
}))

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: 'Genius',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://example.com/rick.jpg',
  episode: ['https://api.example.com/episode/1', 'https://api.example.com/episode/2'],
  url: '',
  created: '2017-11-04T18:48:46.250Z',
}

function renderDetail(initialEntry = '/characters/1') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/characters/:id" element={<CharacterDetailScreen />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('CharacterDetailScreen', () => {
  beforeEach(() => {
    mockUseCharacterById.mockReset()
    mockUseEpisodeById.mockReset()
    mockUseEpisodeById.mockReturnValue({
      episode: null,
      loading: false,
    })
  })

  it('shows invalid ID message when id is missing or invalid', () => {
    mockUseCharacterById.mockReturnValue({ character: null, loading: false, error: null })
    renderDetail('/characters/abc')
    expect(screen.getByText('Invalid character ID.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to list/i })).toHaveAttribute(
      'href',
      '/characters',
    )
  })

  it('shows spinner when loading character', () => {
    mockUseCharacterById.mockReturnValue({ character: null, loading: true, error: null })
    renderDetail()
    expect(screen.getByRole('status', { name: 'Loading character' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /back to list/i })).not.toBeInTheDocument()
  })

  it('shows error message when fetch fails', () => {
    mockUseCharacterById.mockReturnValue({
      character: null,
      loading: false,
      error: new Error('Network error'),
    })
    renderDetail()
    expect(screen.getByRole('alert')).toHaveTextContent('Error: Network error')
    expect(screen.getByRole('link', { name: /back to list/i })).toHaveAttribute(
      'href',
      '/characters',
    )
  })

  it('shows character not found when character is null after load', () => {
    mockUseCharacterById.mockReturnValue({ character: null, loading: false, error: null })
    renderDetail()
    expect(screen.getByText('Character not found.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to list/i })).toHaveAttribute(
      'href',
      '/characters',
    )
  })

  it('renders character name, image and info when loaded', () => {
    mockUseCharacterById.mockReturnValue({
      character: mockCharacter,
      loading: false,
      error: null,
    })
    renderDetail()
    expect(screen.getByRole('heading', { name: 'Rick Sanchez' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Rick Sanchez' })).toHaveAttribute(
      'src',
      mockCharacter.image,
    )
    expect(screen.getByText(/Alive · Human · Male/)).toBeInTheDocument()
    expect(screen.getByText(/Type: Genius/)).toBeInTheDocument()
    expect(screen.getByText(/Origin: Earth \(C-137\)/)).toBeInTheDocument()
    expect(screen.getByText(/Location: Citadel of Ricks/)).toBeInTheDocument()
    expect(screen.getByText(/Appears in 2 episodes/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to list/i })).toHaveAttribute(
      'href',
      '/characters',
    )
  })

  it('renders Episodes section with episode buttons when character has episodes', () => {
    mockUseCharacterById.mockReturnValue({
      character: mockCharacter,
      loading: false,
      error: null,
    })
    renderDetail()
    expect(screen.getByRole('heading', { name: 'Episodes' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Episode 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Episode 2' })).toBeInTheDocument()
  })

  it('shows episode details when episode button is clicked and episode loaded', () => {
    mockUseCharacterById.mockReturnValue({
      character: mockCharacter,
      loading: false,
      error: null,
    })
    mockUseEpisodeById.mockImplementation((id: number | null) =>
      id === 1
        ? {
            episode: {
              id: 1,
              name: 'Pilot',
              episode: 'S01E01',
              air_date: 'December 2, 2013',
              characters: [],
              url: '',
              created: '',
            },
            loading: false,
          }
        : { episode: null, loading: false },
    )
    renderDetail()
    const episode1Button = screen.getByRole('button', { name: 'Episode 1' })
    act(() => {
      episode1Button.click()
    })
    expect(screen.getByRole('region', { name: 'Episode details' })).toBeInTheDocument()
    expect(screen.getByText('Pilot')).toBeInTheDocument()
    expect(screen.getByText(/S01E01 · December 2, 2013/)).toBeInTheDocument()
  })
})
