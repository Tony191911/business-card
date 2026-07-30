function StatusBadge({ status }) {
  const config = {
    published: {
      label: '已發布',
      className: 'bg-green-50 text-green-600 border-green-100',
      dot: 'bg-green-600',
    },
    draft: {
      label: '草稿',
      className: 'bg-orange-50 text-orange-500 border-orange-100',
      dot: 'bg-orange-500',
    },
    archived: {
      label: '封存',
      className: 'bg-gray-100 text-gray-500 border-gray-200',
      dot: 'bg-gray-500',
    },
  }

  const current = config[status] || config.draft

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold ${current.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
      {current.label}
    </span>
  )
}

export default StatusBadge