// vCard 3.0（RFC 2426）格式工具：文字跳脫、75 bytes 折行、UTF-8 大小計算。
// contactVCard.js 與 config/fields.js 共用。

const MAX_LINE_BYTES = 75

/** 文字型值的跳脫：\ ; , 與換行（URL、PHOTO 不要套用） */
export function escapeText(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n')
}

/** 單一字元的 UTF-8 位元組數 */
function utf8Length(char) {
  const code = char.codePointAt(0)

  if (code < 0x80) {
    return 1
  }

  if (code < 0x800) {
    return 2
  }

  if (code < 0x10000) {
    return 3
  }

  return 4
}

/**
 * 依 RFC 2426 折行：每行不超過 75 bytes，續行以一個空白開頭。
 * 以「字元」為單位切，不會把中文的 UTF-8 位元組切斷。
 */
export function foldLine(line) {
  const chunks = []
  let current = ''
  let currentBytes = 0
  let limit = MAX_LINE_BYTES

  for (const char of line) {
    const bytes = utf8Length(char)

    if (currentBytes + bytes > limit) {
      chunks.push(current)
      current = ''
      currentBytes = 0
      limit = MAX_LINE_BYTES - 1 // 續行開頭的空白也算 1 byte
    }

    current += char
    currentBytes += bytes
  }

  chunks.push(current)

  return chunks.join('\r\n ')
}

/** 整份 vCard 實際下載時的大小（UTF-8 bytes） */
export function getByteLength(text) {
  return new TextEncoder().encode(text).length
}