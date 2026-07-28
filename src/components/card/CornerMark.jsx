function CornerMark({ position, inner = false }) {
  const outerPositionStyles = {
    tl: 'left-2.5 top-2.5 border-b-0 border-r-0',
    tr: 'right-2.5 top-2.5 border-b-0 border-l-0',
    bl: 'bottom-2.5 left-2.5 border-r-0 border-t-0',
    br: 'bottom-2.5 right-2.5 border-l-0 border-t-0',
  }

  const innerPositionStyles = {
    tl: 'left-1.5 top-1.5 border-b-0 border-r-0',
    tr: 'right-1.5 top-1.5 border-b-0 border-l-0',
    bl: 'bottom-1.5 left-1.5 border-r-0 border-t-0',
    br: 'bottom-1.5 right-1.5 border-l-0 border-t-0',
  }

  const positionClass = inner
    ? innerPositionStyles[position]
    : outerPositionStyles[position]

  const borderClass = inner
    ? 'border-[#C9A877]'
    : 'border-[#A9743A]'

  return (
    <span
      className={`pointer-events-none absolute z-10 h-4 w-4 border opacity-85 ${borderClass} ${positionClass}`}
    />
  )
}

export default CornerMark