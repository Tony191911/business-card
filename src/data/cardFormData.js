import { createId } from '../utils/createId'

export const emptyCard = {
  id: '',
  slug: '',
  status: 'draft',
  industry: 'general',

  name: '',
  title: '',
  company: '',
  companyEn: '',

  mobile: '',
  officePhone: '',
  fax: '',
  email: '',
  address: '',
  taxId: '',

  website: '',

  avatarUrl: '',
  logoUrl: '',

  services: [],
}

export function createSampleCard() {
  return {
    ...emptyCard,
    slug: 'cheng-li-design',
    status: 'draft',
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
    avatarUrl: '',
    logoUrl: '',

    services: [
      {
        id: createId(),
        serviceName: '住宅裝修設計施工',
        sortOrder: 1,
      },
      {
        id: createId(),
        serviceName: '系統櫥櫃設計施工',
        sortOrder: 2,
      },
      {
        id: createId(),
        serviceName: '辦公室設備銷售',
        sortOrder: 3,
      },
      {
        id: createId(),
        serviceName: '辦公室規劃施工',
        sortOrder: 4,
      },
    ],
  }
}