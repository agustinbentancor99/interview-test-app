import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders children and default class', () => {
    render(<Card>Card content</Card>)
    const el = screen.getByText('Card content')
    expect(el).toBeInTheDocument()
    expect(el.tagName).toBe('ARTICLE')
    expect(el).toHaveClass('card')
  })

  it('applies custom className', () => {
    render(<Card className="character-card">Content</Card>)
    const el = screen.getByText('Content')
    expect(el).toHaveClass('card', 'character-card')
  })
})
