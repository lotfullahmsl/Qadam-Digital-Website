import React, { useState } from 'react'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  message: '',
}

export default function RequestForm({ title, description, submitLabel = 'Submit Request', extraFields = [], onSubmit }) {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await onSubmit(form)
      setSuccess(true)
      setForm(initialForm)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-8">
      <h2 className="font-heading font-bold text-navy text-2xl mb-2">{title}</h2>
      {description && <p className="text-text-muted text-sm mb-6">{description}</p>}

      {success ? (
        <div className="text-center py-8">
          <span className="material-symbols-outlined text-5xl text-primary mb-3 block">check_circle</span>
          <h3 className="font-heading font-bold text-navy text-lg">Request submitted</h3>
          <p className="text-text-muted text-sm mt-1">We received your request and will contact you soon.</p>
          <button onClick={() => setSuccess(false)} className="text-primary text-sm font-semibold mt-4 hover:underline">
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full name" className="input-field" />
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email address" className="input-field" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone / WhatsApp" className="input-field" />
            {extraFields.map((field) => (
              field.type === 'select' ? (
                <select key={field.name} name={field.name} value={form[field.name] || ''} onChange={handleChange} className="input-field" required={field.required}>
                  <option value="">{field.placeholder || field.label}</option>
                  {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input key={field.name} name={field.name} value={form[field.name] || ''} onChange={handleChange} placeholder={field.placeholder || field.label} className="input-field" required={field.required} />
              )
            ))}
          </div>
          <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Tell us what you need..." className="input-field resize-none" />
          {error && <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-3 rounded-lg shadow-btn hover:bg-primary-dark transition-all disabled:opacity-60">
            {loading ? 'Submitting...' : submitLabel}
          </button>
        </form>
      )}
    </div>
  )
}
