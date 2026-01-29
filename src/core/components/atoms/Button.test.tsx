import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with default primary variant', () => {
    render(<Button>Click</Button>)
    const el = screen.getByRole('button', { name: 'Click' })
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('btn', 'btn--primary')
    expect(el).toHaveAttribute('type', 'button')
  })

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Cancel</Button>)
    const el = screen.getByRole('button', { name: 'Cancel' })
    expect(el).toHaveClass('btn--secondary')
  })

  it('allows type submit', () => {
    render(<Button type="submit">Submit</Button>)
    const el = screen.getByRole('button', { name: 'Submit' })
    expect(el).toHaveAttribute('type', 'submit')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Click' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
