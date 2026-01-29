import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { CharacterListScreen } from './CharacterList.screen'
import type { Character } from '@/core/models/character'

const mockUseCharacters = vi.fn()

vi.mock('@/shared/api/characters', () => ({
  useCharacters: (params: unknown) => mockUseCharacters(params),
}))

const mockCharacters: Character[] = [
  {
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
  },
]

const mockInfo = {
  count: 1,
  pages: 2,
  next: 'https://api.example.com?page=2',
  prev: null,
}

function wrapper({ children }: { children: React.ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>
}

describe('CharacterListScreen', () => {
  beforeEach(() => {
    mockUseCharacters.mockReset()
  })

  it('renders Characters heading and filters', () => {
    mockUseCharacters.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    })
    render(<CharacterListScreen />, { wrapper })
    expect(screen.getByRole('heading', { name: 'Characters' })).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument()
  })

  it('shows loading state when useCharacters is loading', () => {
    mockUseCharacters.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    })
    render(<CharacterListScreen />, { wrapper })
    expect(screen.getByText('Loading characters…')).toBeInTheDocument()
  })

  it('shows error when useCharacters returns error', () => {
    mockUseCharacters.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Network error'),
    })
    render(<CharacterListScreen />, { wrapper })
    expect(screen.getByRole('alert')).toHaveTextContent('Error: Network error')
  })

  it('shows empty state when no characters', () => {
    mockUseCharacters.mockReturnValue({
      data: { characters: [], info: { count: 0, pages: 0, next: null, prev: null } },
      loading: false,
      error: null,
    })
    render(<CharacterListScreen />, { wrapper })
    expect(screen.getByText('No characters found.')).toBeInTheDocument()
  })

  it('renders character list and pagination when data is loaded', () => {
    mockUseCharacters.mockReturnValue({
      data: {
        characters: mockCharacters,
        info: mockInfo,
      },
      loading: false,
      error: null,
    })
    render(<CharacterListScreen />, { wrapper })
    expect(screen.getByRole('heading', { name: 'Rick Sanchez' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Rick Sanchez/i })).toHaveAttribute(
      'href',
      '/characters/1',
    )
    expect(screen.getByRole('navigation', { name: 'Characters pagination' })).toBeInTheDocument()
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Prev' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled()
  })

  it('calls useCharacters with initial params', () => {
    mockUseCharacters.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    })
    render(<CharacterListScreen />, { wrapper })
    expect(mockUseCharacters).toHaveBeenCalledWith({ page: 1 })
  })

  it('updates params when Apply is clicked with filters', () => {
    mockUseCharacters
      .mockReturnValueOnce({
        data: null,
        loading: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: {
          characters: mockCharacters,
          info: mockInfo,
        },
        loading: false,
        error: null,
      })
    render(<CharacterListScreen />, { wrapper })
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Rick' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Apply' }).closest('form')!)
    expect(mockUseCharacters).toHaveBeenLastCalledWith(
      expect.objectContaining({ name: 'Rick', page: 1 }),
    )
  })

  it('enables Prev when there is prev page and disables Next on last page', () => {
    mockUseCharacters.mockReturnValue({
      data: {
        characters: mockCharacters,
        info: { ...mockInfo, next: null, prev: 'https://api.example.com?page=1', pages: 2 },
      },
      loading: false,
      error: null,
    })
    render(<CharacterListScreen />, { wrapper })
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Prev' })).not.toBeDisabled()
  })
})
