type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  id?: string
}

export function Input({ label, id, ...props }: InputProps) {
  const inputId = id ?? props.name
  return (
    <div className="input-group">
      {label != null && (
        <label htmlFor={inputId}>{label}</label>
      )}
      <input id={inputId} className="input" {...props} />
    </div>
  )
}
