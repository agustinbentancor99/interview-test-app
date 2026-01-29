import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with default size and aria-label', () => {
    render(<Spinner />)
    const el = screen.getByRole('status', { name: 'Loading' })
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('spinner', 'spinner--md')
  })

  it('renders with size lg and custom aria-label', () => {
    render(<Spinner size="lg" aria-label="Loading character" />)
    const el = screen.getByRole('status', { name: 'Loading character' })
    expect(el).toHaveClass('spinner--lg')
  })

  it('applies custom className', () => {
    render(<Spinner className="my-spinner" />)
    const el = screen.getByRole('status')
    expect(el).toHaveClass('my-spinner')
  })
})
