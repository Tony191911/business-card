import { supabase } from '../lib/supabaseClient'
import { createId } from '../utils/createId'

const BUCKET_NAME = 'card-images'
const MAX_FILE_SIZE = 10 * 1024 * 1024

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

function validateImage(file) {
  if (!file) {
    throw new Error('請選擇圖片')
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('只支援 JPG、PNG 或 WebP 圖片')
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('圖片大小不可超過 10 MB')
  }
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(image)
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('圖片讀取失敗'))
    }

    image.src = objectUrl
  })
}

async function compressImageToWebp(
  file,
  {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.8,
  } = {}
) {
  const image = await loadImage(file)

  let width = image.naturalWidth
  let height = image.naturalHeight

  const scale = Math.min(
    maxWidth / width,
    maxHeight / height,
    1
  )

  width = Math.round(width * scale)
  height = Math.round(height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('瀏覽器無法處理圖片')
  }

  context.drawImage(image, 0, 0, width, height)

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/webp', quality)
  })

  if (!blob) {
    throw new Error('圖片壓縮失敗')
  }

  return new File(
    [blob],
    `${createId()}.webp`,
    {
      type: 'image/webp',
      lastModified: Date.now(),
    }
  )
}

export async function uploadCardImage({ file, folderId, imageType, }) {
  validateImage(file)

  if (!folderId) {
    throw new Error('缺少圖片資料夾識別碼')
  }

  if (!['avatar', 'logo'].includes(imageType)) {
    throw new Error('不支援的圖片類型')
  }

  const compressedFile = await compressImageToWebp(file, {
    maxWidth: imageType === 'avatar' ? 800 : 1600,
    maxHeight: imageType === 'avatar' ? 800 : 800,
    quality: 0.8,
  })

  const fileName = `${imageType}-${createId()}.webp`

  const filePath = `cards/${folderId}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, compressedFile, {
      cacheControl: '3600',
      contentType: 'image/webp',
      upsert: false,
    })

  if (uploadError) {
    throw uploadError
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)

  return {
    url: data.publicUrl,
    path: filePath,
    originalSize: file.size,
    compressedSize: compressedFile.size,
  }
}
