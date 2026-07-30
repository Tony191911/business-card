import { Link } from 'react-router-dom'

function IconButton({
  to,
  title,
  children,
  onClick,
  disabled = false,
  active = false,
  danger = false,
}) {
  const className = `flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
    disabled
      ? 'cursor-not-allowed text-[#c4c6cd]'
      : danger
      ? 'text-red-500 hover:bg-red-50'
      : active
      ? 'text-[#041627] hover:bg-[#d2e4fb]'
      : 'text-[#677489] hover:bg-[#e7e8e9]'
  }`

  if (to && !disabled) {
    return (
      <Link to={to} title={title} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  )
}

export default IconButton