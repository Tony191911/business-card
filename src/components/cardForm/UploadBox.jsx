import { useRef } from 'react'

function UploadBox({ label, icon, description, square = false, 
                     imageUrl = '', uploading = false, onFileSelect, }) {

  const inputRef = useRef(null)

  function handleButtonClick() {
    if (uploading) return
    inputRef.current?.click()
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    onFileSelect?.(file)

    // 清空 input，讓使用者可以再次選擇同一個檔案
    event.target.value = ''
  }

  return (
    <div className={square ? 'w-full md:w-32 md:shrink-0' : 'flex-1'}>
      <label className="mb-3 block text-xs font-semibold tracking-wider text-[#44474c]">
        {label}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleButtonClick}
        disabled={uploading}
        className={`relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#E0E4E8] bg-white p-3 text-[#74777d] transition-colors hover:border-[#041627] hover:bg-[#f3f4f5] disabled:cursor-not-allowed disabled:opacity-70 ${
          square ? 'aspect-square md:h-32 md:w-32' : 'h-32'
        }`}
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={label}
              className={`absolute inset-0 h-full w-full ${
                square ? 'object-cover' : 'object-contain p-3'
              }`}
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/40">
              <span className="rounded-md bg-black/60 px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-opacity hover:opacity-100">
                重新選擇
              </span>
            </div>
          </>
        ) : (
          <>
            {icon}
            <span className="mt-2 text-center text-xs leading-relaxed">
              {uploading ? '圖片上傳中...' : description}
            </span>
          </>
        )}

        {uploading && imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <span className="text-xs font-semibold text-[#041627]">
              圖片上傳中...
            </span>
          </div>
        )}
      </button>
    </div>
  )
}

export default UploadBox