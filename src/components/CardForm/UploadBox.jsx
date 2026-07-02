function UploadBox({ label, icon, description, square = false }) {
  return (
    <div className={square ? 'w-full md:w-32 md:shrink-0' : 'flex-1'}>
      <label className="mb-3 block text-xs font-semibold tracking-wider text-[#44474c]">
        {label}
      </label>

      <button
        type="button"
        className={`flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E0E4E8] bg-white p-3 text-[#74777d] transition-colors hover:border-[#041627] hover:bg-[#f3f4f5] ${
          square ? 'aspect-square md:h-32 md:w-32' : 'h-32'
        }`}
      >
        {icon}
        <span className="mt-2 text-center text-xs leading-relaxed">
          {description}
        </span>
      </button>
    </div>
  )
}

export default UploadBox