export const industries = {
  general: {
    label: '通用版',
    fields: ['name', 'title', 'company', 'mobile', 'email', 'address', 'website'],
    required: ['name', 'mobile'],
  },
  construction: {
    label: '工程／室內設計版',
    fields: ['name', 'title', 'company', 'companyEn', 'brand', 'mobile', 'officePhone', 'fax', 'email', 'address', 'taxId', 'services'],
    required: ['name', 'mobile', 'company'],
  },
  tech: {
    label: '科技業版',
    fields: ['name', 'title', 'company', 'mobile', 'email', 'website', 'github', 'linkedin'],
    required: ['name', 'email'],
  },
}