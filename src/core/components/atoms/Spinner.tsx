type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  'aria-label'?: string
}

export function Spinner({
  size = 'md',
  className = '',
  'aria-label': ariaLabel = 'Loading',
}: SpinnerProps) {
  return (
    <span
      className={`spinner spinner--${size} ${className}`.trim()}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    />
  )
}
