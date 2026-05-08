import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { serviceRequestService } from '../../services/serviceRequestService'

const SERVICES = ['Scholarship Guidance', 'CV & Motivation Letter', 'Translation Services', 'Web Development', 'Database Development', 'AI Subscriptions', 'Social Media Marketing', 'General Inquiry']

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', country: '', service: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await serviceRequestService.submitContact(form)
      setSuccess(true)
      setForm({ fullName: '', email: '', phone: '', country: '', service: '', message: '' })
    } catch {
      setError('Failed to send message. Please try WhatsApp instead.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20">
            <span className="material-symbols-outlined text-sm">contact_mail</span>
            {t('nav.contact')}
          </span>
          <h1 className="font-heading font-bold text-white text-5xl">{t('contact.title')}</h1>
          <p className="text-primary-light/90 text-lg">{t('contact.subtitle')}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-5">
            <div className="card p-6 space-y-5">
              <h2 className="font-heading font-bold text-navy text-xl">Contact Information</h2>
              {[
                { icon: 'chat', label: 'WhatsApp', value: '+93 700 000 000', href: 'https://wa.me/93700000000' },
                { icon: 'email', label: 'Email', value: 'info@qadamdigital.com', href: 'mailto:info@qadamdigital.com' },
                { icon: 'location_on', label: 'Location', value: 'Kabul, Afghanistan', href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-text-muted">{item.label}</p>
                    {item.href
                      ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-navy hover:text-primary transition-colors">{item.value}</a>
                      : <p className="text-sm text-navy">{item.value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="card p-6 space-y-4">
              <h3 className="font-heading font-semibold text-navy">{t('contact.follow_us')}</h3>
              <div className="flex gap-2">
                {[
                  { icon: 'facebook', label: 'Facebook' },
                  { icon: 'photo_camera', label: 'Instagram' },
                  { icon: 'work', label: 'LinkedIn' },
                  { icon: 'smart_display', label: 'YouTube' },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="w-10 h-10 rounded-xl bg-primary-pale flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 border border-border">
                    <span className="material-symbols-outlined text-xl">{s.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t('contact.whatsapp_btn')}
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="font-heading font-bold text-navy text-2xl mb-6">Send Us a Message</h2>
              {success ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary">check_circle</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-xl">Message Sent!</h3>
                  <p className="text-text-muted">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSuccess(false)} className="text-primary hover:underline text-sm font-medium">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { name: 'fullName', label: `${t('contact.name')} *`, type: 'text', placeholder: 'Your full name', required: true },
                      { name: 'email', label: `${t('contact.email')} *`, type: 'email', placeholder: 'your@email.com', required: true },
                      { name: 'phone', label: t('contact.phone'), type: 'tel', placeholder: '+93 700 000 000', required: false },
                      { name: 'country', label: t('contact.country'), type: 'text', placeholder: 'Your country', required: false },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-text-muted mb-2">{f.label}</label>
                        <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} required={f.required} placeholder={f.placeholder} className="input-field" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-text-muted mb-2">{t('contact.service')}</label>
                    <select name="service" value={form.service} onChange={handleChange} className="input-field">
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-text-muted mb-2">{t('contact.message')} *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us how we can help you..." className="input-field resize-none" />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      <span className="material-symbols-outlined text-base">error</span>
                      {error}
                    </div>
                  )}
                  <button type="submit" disabled={loading}
                    className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg shadow-btn hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading
                      ? <><span className="material-symbols-outlined animate-spin text-xl">progress_activity</span> Sending...</>
                      : <><span className="material-symbols-outlined">send</span> {t('contact.submit')}</>
                    }
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
