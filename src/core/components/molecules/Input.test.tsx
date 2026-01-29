import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders input without label when label is not provided', () => {
    render(<Input name="search" placeholder="Search" />)
    const input = screen.getByPlaceholderText('Search')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('name', 'search')
    expect(input).toHaveAttribute('id', 'search')
  })

  it('renders label and associates with input via id', () => {
    render(<Input label="Name" name="name" />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    const input = screen.getByRole('textbox', { name: 'Name' })
    expect(input).toHaveAttribute('id', 'name')
  })

  it('uses custom id when provided', () => {
    render(<Input label="Email" id="email-field" name="email" />)
    const input = screen.getByRole('textbox', { name: 'Email' })
    expect(input).toHaveAttribute('id', 'email-field')
  })

  it('calls onChange when user types', () => {
    const onChange = vi.fn()
    render(<Input name="q" onChange={onChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'a' } })
    expect(onChange).toHaveBeenCalled()
  })
})
