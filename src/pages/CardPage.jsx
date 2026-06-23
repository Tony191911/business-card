import { useParams } from 'react-router-dom'
import { UserCircle, Smartphone, Share2, UserPlus } from 'lucide-react'
import { mockCards } from '../config/mockCards'

function CardPage() {
  const { slug } = useParams()

  const data = mockCards.find(
    card => card.slug === slug && card.status === 'published'
  )

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        找不到這張電子名片
      </div>
    )
  }

  // 次要聯絡欄位：label + value，只顯示有值的
  const detailFields = [
    { label: '傳真號碼', value: data.fax },
    { label: '統一編號', value: data.taxId },
    { label: 'Email',    value: data.email },
    { label: '地址',     value: data.address },
    { label: '網站',     value: data.website },
    { label: 'GitHub',   value: data.github },
    { label: 'LinkedIn', value: data.linkedin },
  ].filter(f => f.value)

  function handleAddContact() {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${data.name || ''}`,
      `ORG:${data.company || ''}`,
      `TITLE:${data.title || ''}`,
      data.mobile ? `TEL;TYPE=CELL:${data.mobile}` : '',
      data.email ? `EMAIL:${data.email}` : '',
      data.address ? `ADR:;;${data.address};;;;` : '',
      'END:VCARD',
    ].filter(Boolean)
 
    const vcard = lines.join('\r\n')
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
 
    const link = document.createElement('a')
    link.href = url
    link.download = `${data.name || 'contact'}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex justify-center items-start min-h-screen">
      {/* 名片本體 390×852 */}
      <div
        className="relative flex flex-col overflow-hidden rounded-none sm:rounded-[20px] border border-gray-200 bg-white"
        style={{ width: '100%', maxWidth: 430, minHeight: 932 }}
      >

        {/* 上半：身份區 */}
        <div
          className="flex flex-col items-center justify-end shrink-0 border-b border-gray-200"
          style={{
            height: 420,
            backgroundColor: '#F5EFE6',
            padding: '0 32px 36px',
            gap: 10,
          }}
        >
          {/* 頭像預設 icon */}
          <div
            className="flex items-center justify-center rounded-full border border-dashed border-gray-300 mb-2"
            style={{ width: 100, height: 100 }}
          >
            <UserCircle size={64} strokeWidth={1} className="text-gray-400" />
          </div>

          <p className="text-[28px] font-medium text-gray-900 text-center leading-tight">
            {data.name}
          </p>
          {data.company && (
            <p className="text-[14px] text-gray-500 text-center">{data.company}</p>
          )}
          {data.brand && (
            <p className="text-[13px] text-gray-400 text-center">{data.brand}</p>
          )}
          {data.title && (
            <p className="text-[13px] text-gray-400 text-center">{data.title}</p>
          )}
        </div>

        {/* 下半：聯絡區 */}
        <div
          className="flex flex-col flex-1"
          style={{ padding: '28px 28px 24px' }}
        >

        {/* primary-contact：行動電話 + 服務項目 */}
        {(data.mobile || (data.services && data.services.length > 0)) && (
          <div className="flex justify-between" style={{ marginBottom: 0, gap: 16 }}>

            {/* 左欄：行動電話 */}
            <div className="flex flex-col items-center" style={{ width: '35%' }}>
              <div className="flex items-center justify-center" style={{ height: 20 }}>
                <Smartphone size={16} strokeWidth={1.5} className="text-gray-400" />
              </div>

              {data.mobile && (
                <div className="flex flex-1 items-center justify-center" style={{ marginTop: 12 }}>
                  <p className="text-[13px] text-gray-800">{data.mobile}</p>
                </div>
              )}
            </div>

            {/* 右欄：服務項目 */}
            {data.services && data.services.length > 0 && (
              <div className="flex flex-col" style={{ gap: 6, width: '55%' }}>
                <p
                  className="text-[13px] text-gray-400 text-center"
                  style={{ height: 20, lineHeight: '20px' }}
                >
                  服務項目
                </p>

                <div className="flex flex-col items-start" style={{ gap: 3 }}>
                  {data.services
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map(service => (
                      <p key={service.id} className="text-[13px] text-gray-800">
                        · {service.serviceName}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

          {/* 分隔線 */}
          {detailFields.length > 0 && (
            <div
              className="w-full bg-gray-200"
              style={{ height: '0.5px', marginTop: 4, marginBottom: 12 }}
            />
          )}

          {/* contact-details：其餘欄位 */}
          {detailFields.length > 0 && (
            <div className="flex flex-col">
              {detailFields.map((f, i) => (
                <div
                  key={i}
                  className="flex justify-between items-baseline"
                  style={{ paddingTop: 11, paddingBottom: 11 }}
                >
                  <span className="inline-block text-left text-[13px] text-gray-400 shrink-0" style={{ minWidth: 72 }}>
                    {f.label}
                  </span>
                  <span className="text-[13px] text-gray-800 text-right">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 底部按鈕 */}
          <div className="flex mt-auto gap-2.5" style={{ paddingTop: 20 }}>
            <button
              onClick={handleAddContact}
              className="flex flex-1 items-center justify-center gap-1.5 text-[13px] text-gray-500 border border-gray-200 rounded-[10px] bg-transparent cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ padding: '12px 0' }}
            >
              <UserPlus size={16} strokeWidth={1.5} />
              加入聯絡人
            </button>
            <button
              className="flex flex-1 items-center justify-center gap-1.5 text-[13px] text-gray-500 border border-gray-200 rounded-[10px] bg-transparent cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ padding: '12px 0' }}
            >
              <Share2 size={16} strokeWidth={1.5} />
              分享名片
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPage