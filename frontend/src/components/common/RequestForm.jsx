import React, { useState } from 'react'
import { uploadService } from '../../services/uploadService'
import { useLanguage } from '../../hooks/useLanguage'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  message: '',
  _gotcha: '',
}

export default function RequestForm({
  title,
  description,
  submitLabel = 'Submit Request',
  extraFields = [],
  onSubmit,
  allowAttachment = false,
  attachmentAccept = '.pdf,.doc,.docx,image/jpeg,image/png,image/webp',
  attachmentHint = 'Optional: attach a PDF, Word document, or image (max 10 MB).',
  fieldTexts,
}) {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [attachmentName, setAttachmentName] = useState('')
  const [attachmentFile, setAttachmentFile] = useState(null)
  const [uploadPct, setUploadPct] = useState(null)
  const { dir } = useLanguage()

  const ph = {
    fullName: fieldTexts?.fullName ?? 'Full name',
    email: fieldTexts?.email ?? 'Email address',
    phone: fieldTexts?.phone ?? 'Phone / WhatsApp',
    message: fieldTexts?.message ?? 'Tell us what you need...',
    successTitle: fieldTexts?.successTitle ?? 'Request submitted',
    successBody: fieldTexts?.successBody ?? 'We received your request and will contact you soon.',
    submitAnother: fieldTexts?.submitAnother ?? 'Submit another request',
    submitting: fieldTexts?.submitting ?? 'Submitting...',
    errorGeneric: fieldTexts?.errorGeneric ?? 'Unable to submit request. Please try again.',
    selectPrompt: fieldTexts?.selectPrompt ?? 'Select…',
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      let payload = { ...form }
      if (allowAttachment && attachmentFile) {
        setUploadPct(0)
        const { data } = await uploadService.uploadPublic(attachmentFile, setUploadPct)
        setUploadPct(null)
        payload = {
          ...payload,
          attachmentFileId: data.fileId,
          attachmentUrl: data.url,
          attachmentOriginalName: data.originalFilename,
        }
      }
      await onSubmit(payload)
      setSuccess(true)
      setForm(initialForm)
      setAttachmentFile(null)
      setAttachmentName('')
    } catch (err) {
      setError(err.response?.data?.message || ph.errorGeneric)
    } finally {
      setLoading(false)
      setUploadPct(null)
    }
  }

  return (
    <div className="card p-8" dir={dir}>
      <h2 className="font-heading font-bold text-navy text-2xl mb-2">{title}</h2>
      {description && <p className="text-text-muted text-sm mb-6">{description}</p>}

      {success ? (
        <div className="text-center py-8">
          <span className="material-symbols-outlined text-5xl text-primary mb-3 block">check_circle</span>
          <h3 className="font-heading font-bold text-navy text-lg">{ph.successTitle}</h3>
          <p className="text-text-muted text-sm mt-1">{ph.successBody}</p>
          <button type="button" onClick={() => setSuccess(false)} className="text-primary text-sm font-semibold mt-4 hover:underline">
            {ph.submitAnother}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder={ph.fullName} className="input-field text-start" />
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder={ph.email} className="input-field text-start" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder={ph.phone} className="input-field text-start" />
            {extraFields.map((field) =>
              field.type === 'select' ? (
                <select key={field.name} name={field.name} value={form[field.name] || ''} onChange={handleChange} className="input-field text-start" required={field.required}>
                  <option value="">{field.placeholder || `${ph.selectPrompt} ${field.label || ''}`.trim()}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input key={field.name} name={field.name} value={form[field.name] || ''} onChange={handleChange} placeholder={field.placeholder || field.label} className="input-field text-start" required={field.required} />
              ),
            )}
          </div>
          <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder={ph.message} className="input-field resize-none text-start" />

          <input
            type="text"
            name="_gotcha"
            value={form._gotcha}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
          />

          {allowAttachment && (
            <div className="rounded-xl border border-border bg-background/50 px-4 py-3 space-y-2">
              <label className="block text-sm font-semibold text-navy">Attachment</label>
              <p className="text-xs text-text-muted">{attachmentHint}</p>
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold cursor-pointer hover:bg-primary-dark transition-colors">
                  <span className="material-symbols-outlined text-base">attach_file</span>
                  {uploadPct != null ? `Uploading ${uploadPct}%…` : 'Choose file'}
                  <input
                    type="file"
                    className="hidden"
                    accept={attachmentAccept}
                    disabled={loading}
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      setAttachmentFile(f || null)
                      setAttachmentName(f ? f.name : '')
                    }}
                  />
                </label>
                {attachmentName && <span className="text-sm text-text-muted truncate max-w-[200px]">{attachmentName}</span>}
                {attachmentFile && (
                  <button
                    type="button"
                    className="text-sm text-red-600 font-medium hover:underline"
                    onClick={() => {
                      setAttachmentFile(null)
                      setAttachmentName('')
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          )}

          {error && <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-3 rounded-lg shadow-btn hover:bg-primary-dark transition-all disabled:opacity-60">
            {loading ? ph.submitting : submitLabel}
          </button>
        </form>
      )}
    </div>
  )
}
