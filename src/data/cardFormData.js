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
    slug: 'demo-design-studio',
    status: 'draft',
    industry: 'construction',

    name: '王小明',
    title: '室內設計師',
    company: '示範室內設計有限公司',
    companyEn: 'Demo Design Studio Co., Ltd.',

    mobile: '0912-345-678',
    officePhone: '',
    fax: '04-1234-5678',
    email: 'demo@example.com',
    address: '400台中市中區示範路1號',
    taxId: '12345678',

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