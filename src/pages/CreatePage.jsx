import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { industries } from '../config/industries'
import { fields } from '../config/fields'

function CreatePage() {
  const navigate = useNavigate()
  const [selectedIndustry, setSelectedIndustry] = useState('general')
  const [formData, setFormData] = useState({})
  const [serviceInput, setServiceInput] = useState('')

  const config = industries[selectedIndustry]

  function handleChange(fieldKey, value) {
    setFormData(prev => ({ ...prev, [fieldKey]: value }))
  }

  function addService() {
    const trimmed = serviceInput.trim()
    if (!trimmed) return
    const current = formData.services || []
    setFormData(prev => ({ ...prev, services: [...current, trimmed] }))
    setServiceInput('')
  }

  function removeService(index) {
    const current = formData.services || []
    setFormData(prev => ({
      ...prev,
      services: current.filter((_, i) => i !== index)
    }))
  }

  function handleSubmit() {
    // 檢查必填
    for (const key of config.required) {
      if (!formData[key]?.trim()) {
        alert(`「${fields[key].label}」為必填欄位`)
        return
      }
    }

    // encode 資料進 URL
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(formData))))
    navigate(`/card#${encoded}`)
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: '1.5rem' }}>建立電子名片</h1>
      {/* 產業版本選擇 */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>選擇版本</label>
        <select
          value={selectedIndustry}
          onChange={e => {
            setSelectedIndustry(e.target.value)
            setFormData({})
          }}
          style={{ width: '100%' }}
        >
          {Object.entries(industries).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </div>

      {/* 動態表單 */}
      {config.fields.map(fieldKey => {
        const field = fields[fieldKey]
        const isRequired = config.required.includes(fieldKey)

        if (field.type === 'list') {
          return (
            <div key={fieldKey} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>
                {field.label}
              </label>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <input
                  type="text"
                  value={serviceInput}
                  placeholder={field.placeholder}
                  onChange={e => setServiceInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addService()}
                  style={{ flex: 1 }}
                />
                <button onClick={addService}>新增</button>
              </div>
              {(formData.services || []).map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, fontSize: 13 }}>
                  <span>• {s}</span>
                  <button onClick={() => removeService(i)} style={{ fontSize: 12 }}>✕</button>
                </div>
              ))}
            </div>
          )
        }

        return (
          <div key={fieldKey} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>
              {field.label}{isRequired && <span style={{ color: 'red' }}> *</span>}
            </label>
            <input
              type="text"
              value={formData[fieldKey] || ''}
              placeholder={field.placeholder}
              onChange={e => handleChange(fieldKey, e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
        )
      })}

      <button
        onClick={handleSubmit}
        style={{ width: '100%', padding: '10px 0', marginTop: '1rem', cursor: 'pointer' }}
      >
        產生名片
      </button>
    </div>
  )
}

export default CreatePage