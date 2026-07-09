import { Link } from 'react-router-dom'

function PublicActionBtn({
  children,
  icon,
  onClick,
  to,
  variant = 'outline',
  size = 'md',
  className = '',
  ...props
}) {
  const sizeClass = size === 'lg' ? 'py-4 text-[15px]' : 'py-3 text-[13px]'

  const baseClass =
    'flex items-center justify-center gap-2 rounded-xl tracking-wider transition-colors'

  const variantClass =
    variant === 'primary'
      ? 'bg-[#1A2B3C] text-white hover:bg-[#24384d]'
      : 'border border-gray-200 text-[#475569] hover:bg-gray-50'

  const finalClass = `${baseClass} ${sizeClass} ${variantClass} ${className}`

  if (to) {
    return (
      <Link to={to} className={finalClass} {...props}>
        {icon && <span className="flex shrink-0 items-center">{icon}</span>}
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={finalClass} {...props}>
      {icon && <span className="flex shrink-0 items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}

export default PublicActionBtn