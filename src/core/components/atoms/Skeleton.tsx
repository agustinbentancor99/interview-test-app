type SkeletonProps = {
  width?: string | number
  height?: string | number
  className?: string
}

export function Skeleton({
  width,
  height = '1em',
  className = '',
}: SkeletonProps) {
  const style: React.CSSProperties = {}
  if (width != null) style.width = typeof width === 'number' ? `${width}px` : width
  if (height != null) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <span
      className={`skeleton ${className}`.trim()}
      style={Object.keys(style).length > 0 ? style : undefined}
      aria-hidden
    />
  )
}
