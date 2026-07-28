function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.crossOrigin = 'anonymous'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('頭像讀取失敗'))
    image.src = url
  })
}

async function imageUrlToJpegBase64(url) {
  const image = await loadImage(url)

  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight

  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('無法處理頭像')
  }

  context.drawImage(image, 0, 0)

  const dataUrl = canvas.toDataURL('image/jpeg', 0.85)

  return dataUrl.split(',')[1]
}

function createVCardLines(card, cardUrl, photoLine) {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${card.name || ''}`,
    `ORG:${card.company || ''}`,
    `TITLE:${card.title || ''}`,
    card.mobile ? `TEL;TYPE=CELL:${card.mobile}` : '',
    card.officePhone
      ? `TEL;TYPE=WORK:${card.officePhone}`
      : '',
    card.email ? `EMAIL:${card.email}` : '',
    card.address
      ? `ADR;TYPE=WORK:;;${card.address};;;;`
      : '',
    card.website ? `URL:${card.website}` : '',
    photoLine,
    `NOTE:電子名片：${cardUrl}`,
    'END:VCARD',
  ].filter(Boolean)
}

function downloadVCardFile(vcard, fileName) {
  const blob = new Blob([vcard], {
    type: 'text/vcard;charset=utf-8',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = `${fileName || 'contact'}.vcf`

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

export async function downloadCardContact(card) {
  const cardUrl =
    `${window.location.origin}/card/${card.slug}`

  let photoLine = ''

  if (card.avatarUrl) {
    const photoBase64 =
      await imageUrlToJpegBase64(card.avatarUrl)

    photoLine =
      `PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`
  }

  const lines = createVCardLines(
    card,
    cardUrl,
    photoLine
  )

  const vcard = lines.join('\r\n')

  downloadVCardFile(vcard, card.name)
}