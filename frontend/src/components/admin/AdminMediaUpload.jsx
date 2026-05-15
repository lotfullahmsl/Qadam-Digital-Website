import React, { useState } from 'react'
import { uploadService } from '../../services/uploadService'

const btnClass =
  'inline-flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-xl text-sm cursor-pointer hover:bg-primary-dark transition-all w-fit'
const btnBusy = 'opacity-70 pointer-events-none'

/**
 * Uploads to POST /api/upload (uses admin_token when on admin pages).
 * Sets onChange to the absolute file URL returned by the API.
 */
export default function AdminMediaUpload({
  label = 'Upload file',
  value = '',
  onChange,
  accept = 'image/*',
  helpText = 'Images: JPG, PNG, WEBP. Admin uploads are public URLs for the website.',
}) {
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState(null)

  const pickFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    setProgress(0)
    try {
      const { data } = await uploadService.upload(file, setProgress)
      if (data?.url) onChange(data.url)
    } catch (err) {
      window.alert(err.response?.data?.message || 'Upload failed.')
    } finally {
      setBusy(false)
      setProgress(null)
    }
  }

  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-semibold text-gray-600">{label}</p>}
      <label className={`${btnClass} ${busy ? btnBusy : ''}`} style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.25)' }}>
        <span className="material-symbols-outlined text-base">cloud_upload</span>
        {busy ? `Uploading${progress != null ? ` ${progress}%` : ''}…` : 'Upload from device'}
        <input type="file" accept={accept} className="hidden" disabled={busy} onChange={pickFile} />
      </label>
      {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
      {value && (
        <p className="text-xs text-gray-500 break-all">
          Current:{' '}
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
            preview
          </a>
        </p>
      )}
    </div>
  )
}
