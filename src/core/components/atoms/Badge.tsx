type BadgeProps = {
  status?: 'Alive' | 'Dead' | 'unknown'
  children?: React.ReactNode
}

export function Badge({ status, children }: BadgeProps) {
  const value = children ?? status ?? ''
  const statusClass =
    status != null ? status.toLowerCase() : 'default'
  return (
    <span className={`badge badge--${statusClass}`}>
      {value}
    </span>
  )
}
