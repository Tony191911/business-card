// 名片欄位的單一資料來源（single source of truth）。
// 一個欄位的「中文名 / 型別 / 顯示區塊 / 資料庫欄位 / vCard 對應」全部登記在這裡，
// 表單、公開頁、vCard、mapper 四邊都回來查這份清單，不再各自寫死。
//
// 不含系統欄位（id / slug / status / industry / 時間戳）——
// 那些不是名片內容，由 cardMapper 自行處理。

// === 1. 顯示區塊：決定欄位落在公開頁的哪一區 =============================
export const GROUPS = {
  identity:     { key: 'identity',     label: null,       order: 1 }, // 照片、姓名、公司
  contact:      { key: 'contact',      label: null,       order: 2 }, // 可執行的聯絡管道
  registration: { key: 'registration', label: null,       order: 3 }, // 營業登記資訊
  services:     { key: 'services',     label: '服務項目', order: 4 }, // 數量不定的項目清單
}

// === 2. 欄位型別：決定互動行為與顯示方式 =================================
export const FIELD_TYPES = {
  text:    { inputType: 'text',  script: 'zh', href: null, display: (v) => v },
  tel:     { inputType: 'tel',   script: 'en', href: (v) => `tel:${String(v).replace(/[^\d+]/g, '')}`, display: (v) => v },
  email:   { inputType: 'email', script: 'en', href: (v) => `mailto:${v}`, display: (v) => v },
  address: {
    inputType: 'text', script: 'zh',
    href: (v) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`,
    display: (v) => v,
  },
  url: {
    inputType: 'url', script: 'en',
    // 使用者常只打 www.abc.com；不補 https:// 會被當成站內相對路徑
    href: (v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`),
    // 只顯示網域，長網址不會撐爆版面
    display: (v) => String(v).replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/+$/, ''),
  },
  readonly: { inputType: 'text', script: 'en', href: null, display: (v) => v },
  image:    { inputType: 'file', script: null, href: null, display: (v) => v },
  itemList: {
    inputType: 'list', script: 'zh', href: null,
    display: (v) => [...(v ?? [])].sort((a, b) => a.sortOrder - b.sortOrder),
  },
}

// === 3. 欄位登記表 ========================================================
// label     → 公開頁顯示的標籤
// formLabel → 後台表單顯示的標籤（省略時沿用 label）
// column    → Supabase 欄位名；null 代表資料存在別的地方
// vcard     → vCard 3.0 的 key；null 代表刻意不匯出（原因寫在註解）
// enabled   → false 代表資料層保留、呈現層關閉
export const FIELDS = {
  // --- identity ---
  avatarUrl: {
    label: '大頭照', formLabel: '大頭照上傳 (Avatar)',
    type: 'image', group: 'identity',
    column: 'avatar_url',
    vcard: null, // 另行轉成 PHOTO;BASE64，不走一般欄位流程
  },
  logoUrl: {
    label: '公司商標', formLabel: '公司商標 (Logo)',
    type: 'image', group: 'identity',
    column: 'logo_url',
    vcard: null,
    enabled: false, // 資料欄位已預留，但公開頁呈現方式尚未決定，暫不開放上傳
  },
  name: {
    label: '姓名', formLabel: '姓名 (Name)',
    type: 'text', group: 'identity', placeholder: '請輸入姓名',
    column: 'name', vcard: 'FN', emphasis: 'primary',
  },
  title: {
    label: '職稱', formLabel: '職稱 (Title)',
    type: 'text', group: 'identity', placeholder: '例如：室內設計師',
    column: 'title', vcard: 'TITLE',
  },
  company: {
    label: '公司名稱', formLabel: '公司名稱 (Company)',
    type: 'text', group: 'identity', placeholder: '請輸入公司名稱',
    column: 'company', vcard: 'ORG',
  },
  companyEn: {
    label: '公司英文名', formLabel: '公司英文名 (Company English Name)',
    type: 'text', group: 'identity', placeholder: '請輸入公司英文名',
    column: 'company_en',
    vcard: null, // 刻意不匯出：vCard 的 ORG 已被中文公司名佔用
    emphasis: 'muted',
  },

  // --- contact ---
  mobile: {
    label: '手機', formLabel: '手機號碼 (Mobile)',
    type: 'tel', group: 'contact', placeholder: '0900-000-000',
    column: 'mobile', vcard: 'TEL;TYPE=CELL',
  },
  officePhone: {
    label: '電話', formLabel: '公司電話 (Phone)',
    type: 'tel', group: 'contact', placeholder: '02-1234-5678',
    column: 'office_phone', vcard: 'TEL;TYPE=WORK',
  },
  fax: {
    label: '傳真', formLabel: '傳真 (Fax)',
    type: 'readonly', group: 'contact', placeholder: '02-1234-5679',
    column: 'fax',
    vcard: null, // 刻意不匯出：傳真號碼存進手機通訊錄沒有意義
  },
  email: {
    label: '信箱', formLabel: '電子信箱 (Email)',
    type: 'email', group: 'contact', placeholder: 'example@company.com',
    column: 'email', vcard: 'EMAIL',
  },
  address: {
    label: '地址', formLabel: '公司地址 (Address)',
    type: 'address', group: 'contact', placeholder: '請輸入完整地址',
    column: 'address', vcard: 'ADR;TYPE=WORK',
  },
  website: {
    label: '網站', formLabel: '官方網站 (Website)',
    type: 'url', group: 'contact', placeholder: 'www.company.com',
    column: 'website', vcard: 'URL',
  },

  // --- registration ---
  taxId: {
    label: '統編', formLabel: '統一編號',
    type: 'readonly', group: 'registration', placeholder: '請輸入統一編號',
    column: 'tax_id',
    vcard: null, // 刻意不匯出：手機通訊錄沒有對應欄位
  },

  // --- services ---
  services: {
    label: '服務項目', formLabel: '服務項目',
    type: 'itemList', group: 'services',
    column: null, // 存在 card_services 關聯表，由 mapper 另外處理
    vcard: null,  // 刻意不匯出：屬於業務介紹，非聯絡資訊
  },
}

// === 4. 取用工具 ==========================================================

function expand(key, requiredSet) {
  const def = FIELDS[key]
  if (!def) {
    console.warn(`[fields] 未定義的欄位：${key}`)
    return null
  }
  return {
    key,
    ...def,
    formLabel: def.formLabel ?? def.label,
    required: requiredSet.has(key),
    behavior: FIELD_TYPES[def.type],
  }
}

/** 取得 preset 要使用、且已啟用的欄位（表單用） */
export function getFields(preset) {
  const required = new Set(preset?.required ?? [])
  return (preset?.fields ?? [])
    .map((key) => expand(key, required))
    .filter((f) => f && f.enabled !== false)
}

/** 依區塊整理欄位，並濾掉沒有值的（公開頁用） */
export function getGroupedFields(preset, data = {}) {
  const hasValue = (f) => {
    const v = data[f.key]
    return Array.isArray(v) ? v.length > 0 : v != null && String(v).trim() !== ''
  }
  const fields = getFields(preset).filter(hasValue)

  return Object.values(GROUPS)
    .sort((a, b) => a.order - b.order)
    .map((group) => ({ ...group, fields: fields.filter((f) => f.group === group.key) }))
    .filter((g) => g.fields.length > 0)
}

/** 所有有對應資料庫欄位的 [前端 key, DB 欄位名] 配對（mapper 用） */
export const COLUMN_PAIRS = Object.entries(FIELDS)
  .filter(([, def]) => def.column)
  .map(([key, def]) => [key, def.column])

/** 依登記表產生 vCard 內容行；新增欄位不需再改 vCard 程式 */
export function buildVCardLines(card = {}) {
  return Object.entries(FIELDS)
    .filter(([, def]) => def.vcard)
    .map(([key, def]) => {
      const value = card[key]
      if (value == null || String(value).trim() === '') return ''
      // ADR 有固定的七段結構，地址要放在第三段
      if (def.vcard.startsWith('ADR')) return `${def.vcard}:;;${value};;;;`
      return `${def.vcard}:${value}`
    })
    .filter(Boolean)
}