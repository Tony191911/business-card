export const mockCards = [
  {
    id: '1',
    slug: 'cheng-li-design',
    status: 'published',
    industry: 'construction',

    name: '覃慧芬',
    title: '室內設計師',
    company: '承麗實業有限公司',
    companyEn: 'Cheng Li Co., Ltd.',

    mobile: '0937-721470',
    officePhone: '',
    fax: '04-2381-1649',
    email: 'fen19192005@yahoo.com.tw',
    address: '408台中市南屯區楓和路676號',
    taxId: '80433113',

    website: '',

    avatarUrl: '/avatar.jpg',
    logoUrl: '',

    services: [
      {
        id: '1',
        serviceName: '住宅裝修設計施工',
        sortOrder: 1,
      },
      {
        id: '2',
        serviceName: '系統櫥櫃設計施工',
        sortOrder: 2,
      },
      {
        id: '3',
        serviceName: '辦公室設備銷售及規劃施工',
        sortOrder: 3,
      },
    ],
  },
  {
    id: '2',
    slug: 'sample-general',
    status: 'draft',
    industry: 'general',

    name: '王小明',
    title: '業務經理',
    company: '範例股份有限公司',
    companyEn: '',

    mobile: '0912-345-678',
    officePhone: '02-1234-5678',
    fax: '',
    email: 'sample@example.com',
    address: '台北市信義區範例路 100 號',
    taxId: '',

    website: 'https://example.com',

    avatarUrl: '',
    logoUrl: '',

    services: [],
  },
  {
    id: '3',
    slug: 'archived-card',
    status: 'archived',
    industry: 'general',

    name: '陳大華',
    title: '前業務代表',
    company: '舊資料有限公司',
    companyEn: '',

    mobile: '0988-888-888',
    officePhone: '',
    fax: '',
    email: 'old@example.com',
    address: '',
    taxId: '',

    website: '',

    avatarUrl: '',
    logoUrl: '',

    services: [],
  },
]