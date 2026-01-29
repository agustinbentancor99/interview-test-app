import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders with status class and children', () => {
    render(<Badge status="Alive">Alive</Badge>)
    const el = screen.getByText('Alive')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('badge', 'badge--alive')
  })

  it('renders default class when status is not provided', () => {
    render(<Badge>Custom</Badge>)
    const el = screen.getByText('Custom')
    expect(el).toHaveClass('badge', 'badge--default')
  })

  it('uses status as fallback when children is not provided', () => {
    render(<Badge status="Dead" />)
    const el = screen.getByText('Dead')
    expect(el).toHaveClass('badge--dead')
  })
})
