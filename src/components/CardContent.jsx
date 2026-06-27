import { Share2, Smartphone, UserCircle, UserPlus } from 'lucide-react'
import PublicActionBtn from './PublicActionBtn'

function CardContent({ data, onAddContact, showActions = true }) {
  const sortedServices = [...(data.services || [])].sort(
    (a, b) => a.sortOrder - b.sortOrder
  )

  const detailFields = [
    { label: '公司電話', value: data.officePhone },
    { label: '傳真號碼', value: data.fax },
    { label: '統一編號', value: data.taxId },
    { label: 'Email', value: data.email },
    { label: '地址', value: data.address },
    { label: '網站', value: data.website },
  ].filter((field) => field.value)

  return (
    <>
      {/* 上半部：身份資訊 */}
      <section className="flex w-full flex-col items-center bg-[#F5F3EE] px-6 pb-12 pt-20 text-center">
        {data.avatarUrl ? (
          <img
            src={data.avatarUrl}
            alt={data.name}
            className="h-[100px] w-[100px] rounded-full border border-gray-200 bg-white object-cover p-1 shadow-sm"
          />
        ) : (
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full border border-gray-200 bg-white p-1 shadow-sm">
            <UserCircle size={62} strokeWidth={1.2} className="text-gray-300" />
          </div>
        )}

        <h1 className="mt-6 text-[28px] font-semibold leading-tight tracking-wide text-[#1E293B]">
          {data.name}
        </h1>

        {data.company && (
          <p className="mt-3 text-[14px] font-medium tracking-wider text-[#475569]">
            {data.company}
          </p>
        )}

        {data.companyEn && (
          <p className="mt-1 text-[12px] tracking-wide text-[#94A3B8]">
            {data.companyEn}
          </p>
        )}

        {data.title && (
          <p className="mt-2 text-[13px] text-[#94A3B8]">
            {data.title}
          </p>
        )}
      </section>

      {/* 下半部：名片資訊 */}
      <section className="flex flex-1 flex-col bg-white px-8 pb-8 pt-10">
        {/* primary-contact：行動電話 + 服務項目 */}
        {(data.mobile || sortedServices.length > 0) && (
          <div className="flex justify-between" style={{ marginBottom: 0, gap: 16 }}>
            {/* 左欄：行動電話 */}
            <div
              className="flex flex-col items-center"
              style={{ transform: 'translateX(40px)' }}
            >
              <div className="flex items-center justify-center" style={{ height: 20 }}>
                <Smartphone size={20} strokeWidth={1.5} className="text-gray-400" />
              </div>

              {data.mobile && (
                <div
                  className="flex flex-1 items-center justify-center"
                  style={{ marginTop: 12 }}
                >
                  <p className="text-[13px] text-gray-800">{data.mobile}</p>
                </div>
              )}
            </div>

            {/* 右欄：服務項目 */}
            {sortedServices.length > 0 && (
              <div className="flex flex-col" style={{ gap: 6, width: '55%' }}>
                <p
                  className="text-center text-[13px] text-gray-400"
                  style={{ height: 20, lineHeight: '20px' }}
                >
                  服務項目
                </p>

                <div
                  className="flex flex-col items-start"
                  style={{ gap: 3, paddingLeft: 16 }}
                >
                  {sortedServices.map((service) => (
                    <p key={service.id} className="text-[13px] text-gray-800">
                      · {service.serviceName}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {detailFields.length > 0 && (
          <hr className="my-8 w-full border-gray-100" />
        )}

        {detailFields.length > 0 && (
          <div className="flex w-full flex-col gap-6">
            {detailFields.map((field) => (
              <div key={field.label} className="flex items-start justify-between gap-4">
                <span className="w-20 shrink-0 text-[12px] text-[#94A3B8]">
                  {field.label}
                </span>

                <span className="break-all text-right text-[13px] leading-relaxed text-[#475569]">
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex-1" />
        
        {showActions && (
        <div className="mb-4 mt-12 flex w-full gap-4">
          <PublicActionBtn
            onClick={onAddContact}
            icon={<UserPlus size={18} strokeWidth={1.5} />}
            className="flex-1"
          >
            加入聯絡人
          </PublicActionBtn>

          <PublicActionBtn
            to={`/card/${data.slug}/share`}
            icon={<Share2 size={18} strokeWidth={1.5} />}
            className="flex-1"
          >
            分享名片
          </PublicActionBtn>
        </div>
        )}
      </section>
    </>
  )
}

export default CardContent