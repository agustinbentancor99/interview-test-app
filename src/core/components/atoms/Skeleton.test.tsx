import { render } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders with default class and aria-hidden', () => {
    const { container } = render(<Skeleton />)
    const el = container.querySelector('.skeleton')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('skeleton')
    expect(el).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies width and height as inline style', () => {
    const { container } = render(<Skeleton width="80%" height="1rem" />)
    const el = container.querySelector('.skeleton')
    expect(el).toHaveStyle({ width: '80%', height: '1rem' })
  })

  it('converts numeric width/height to px', () => {
    const { container } = render(<Skeleton width={200} height={24} />)
    const el = container.querySelector('.skeleton')
    expect(el).toHaveStyle({ width: '200px', height: '24px' })
  })

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="episode-skeleton__line" />)
    const el = container.querySelector('.skeleton')
    expect(el).toHaveClass('episode-skeleton__line')
  })
})
