function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  full = false,
  textarea = false,
}) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="mb-2 block text-xs font-semibold tracking-wider text-[#44474c]">
        {label}
      </label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows="2"
          className="w-full resize-none rounded-lg border border-[#E0E4E8] bg-white px-3 py-2 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-[#041627] focus:ring-2 focus:ring-[#041627]/10"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border border-[#E0E4E8] bg-white px-3 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-[#041627] focus:ring-2 focus:ring-[#041627]/10"
        />
      )}
    </div>
  )
}

export default FormField