function IndustryOption({ checked, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
        checked
          ? 'border-[#041627] bg-[#041627]/5'
          : 'border-[#E0E4E8] hover:border-[#041627]/50 hover:bg-[#f3f4f5]'
      }`}
    >
      <span
        className={`mt-1 h-4 w-4 rounded-full border ${
          checked ? 'border-[#041627] bg-[#041627]' : 'border-[#E0E4E8]'
        }`}
      />

      <span className="flex flex-col">
        <span className="text-sm font-semibold text-[#041627]">{title}</span>
        <span className="mt-1 text-sm leading-relaxed text-[#44474c]">
          {description}
        </span>
      </span>
    </button>
  )
}

export default IndustryOption