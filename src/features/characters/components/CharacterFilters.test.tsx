import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CharacterFilters } from './CharacterFilters'

describe('CharacterFilters', () => {
  it('renders name, status and species inputs and submit button', () => {
    const onApply = vi.fn()
    render(<CharacterFilters onApply={onApply} />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Filter by name')).toBeInTheDocument()
    expect(screen.getByLabelText('Status')).toBeInTheDocument()
    expect(screen.getByLabelText('Species')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Filter by species')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument()
  })

  it('calls onApply with api params when form is submitted', () => {
    const onApply = vi.fn()
    render(<CharacterFilters onApply={onApply} />)
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Rick' },
    })
    fireEvent.change(screen.getByLabelText('Status'), {
      target: { value: 'alive' },
    })
    fireEvent.submit(screen.getByRole('button', { name: 'Apply' }).closest('form')!)
    expect(onApply).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Rick', status: 'alive' }),
    )
  })

  it('calls onApply with only page when no filters set', () => {
    const onApply = vi.fn()
    render(<CharacterFilters onApply={onApply} />)
    fireEvent.submit(screen.getByRole('button', { name: 'Apply' }).closest('form')!)
    expect(onApply).toHaveBeenCalledWith({ page: 1 })
  })
})
