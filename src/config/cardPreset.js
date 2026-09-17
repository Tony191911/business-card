// 一張名片要有哪些欄位、哪些必填、以什麼順序出現。
// 欄位本身的定義（中文名、型別、DB 欄位、vCard 對應）在 config/fields.js。
//
// 目前只服務工程／室內設計一種版型，所以這裡只有一份 preset。
// 未來要分產業時，把這裡改成 { construction: {...}, tech: {...} } 即可，
// 資料庫的 industry 欄位已預留。
export const cardPreset = {
  key: 'construction',
  label: '工程／室內設計版',

  fields: [
    'avatarUrl',
    'name', 'title', 'company', 'companyEn',
    'mobile', 'officePhone', 'fax', 'email', 'address', 'website',
    'taxId',
    'services',
  ],

  required: ['name', 'company', 'mobile'],
}