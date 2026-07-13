import { Share2, UserCircle, UserPlus } from 'lucide-react'
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
            className="h-25 w-25 rounded-full border border-gray-200 bg-white object-cover p-1 shadow-sm"
          />
        ) : (
          <div className="flex h-25 w-25 items-center justify-center rounded-full border border-gray-200 bg-white p-1 shadow-sm">
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
        {/* 行動電話 + 服務項目 */}
        {(data.mobile || sortedServices.length > 0) && (
          <div className="flex w-full flex-col">
            {/* 上方：手機號碼 */}
            {data.mobile && (
              <div className="border-b border-[#E8EBEF] py-5">
                <p className="mb-2 text-xs tracking-wider text-[#8B9AB2]">
                  手機號碼
                </p>

                <a
                  href={`tel:${data.mobile}`}
                  className="text-base font-medium text-[#17345B]"
                >
                  {data.mobile}
                </a>
              </div>
            )}

            {/* 下方：服務項目 */}
            {sortedServices.length > 0 && (
              <div className="border-b border-[#E8EBEF] py-5">
                <p className="mb-4 text-xs tracking-wider text-[#8B9AB2]">
                  服務項目
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {sortedServices.map((service) => (
                    <div
                      key={service.id}
                      className="rounded-md border border-[#D9E2EC] bg-[#F1F5F9] px-2 py-1 text-center text-[12px] font-medium leading-snug text-[#334155]"
                    >
                      {service.serviceName}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {detailFields.length > 0 && (
          <div className="mt-6 flex w-full flex-col gap-6">
            {detailFields.map((field) => (
              <div
                key={field.label}
                className="flex items-start justify-between gap-4"
              >
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