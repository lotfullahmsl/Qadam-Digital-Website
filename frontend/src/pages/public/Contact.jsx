import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { serviceRequestService } from '../../services/serviceRequestService'
import { useContactInfo } from '../../hooks/usePublicSettings'

export default function Contact() {
  const { t } = useTranslation()
  const { contact } = useContactInfo()
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', country: '', service: '', message: '', _gotcha: '' })
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
      setForm({ fullName: '', email: '', phone: '', country: '', service: '', message: '', _gotcha: '' })
    } catch {
      setError(t('contact.error_msg'))
    } finally {
      setLoading(false)
    }
  }

  const SERVICE_OPTIONS = [
    { value: 'scholarship', label: t('contact.services.scholarship') },
    { value: 'cv', label: t('contact.services.cv') },
    { value: 'translation', label: t('contact.services.translation') },
    { value: 'web', label: t('contact.services.web') },
    { value: 'database', label: t('contact.services.database') },
    { value: 'ai', label: t('contact.services.ai') },
    { value: 'smm', label: t('contact.services.smm') },
    { value: 'general', label: t('contact.services.general') },
  ]

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
              <h2 className="font-heading font-bold text-navy text-xl">{t('contact.contact_info')}</h2>
              {[
                { icon: 'chat', label: t('common.whatsapp'), value: contact.whatsapp, href: contact.whatsappLink },
                { icon: 'email', label: t('common.email'), value: contact.email, href: `mailto:${contact.email}` },
                { icon: 'phone', label: t('common.phone'), value: contact.phone, href: `tel:${contact.phone.replace(/\s/g,'')}` },
                { icon: 'location_on', label: t('contact.office'), value: contact.location, href: null },
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
                  {
                    label: 'Facebook', href: contact.facebook,
                    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  },
                  {
                    label: 'Instagram', href: contact.instagram,
                    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  },
                  {
                    label: 'LinkedIn', href: contact.linkedin,
                    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  },
                  {
                    label: 'YouTube', href: contact.youtube,
                    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                  },
                ].map((s) => (
                  <a key={s.label} href={s.href || '#'} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-10 h-10 rounded-xl bg-primary-pale flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 border border-border">
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t('contact.whatsapp_btn')}
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="font-heading font-bold text-navy text-2xl mb-6">{t('contact.send_message')}</h2>
              {success ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary">check_circle</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-xl">{t('contact.msg_sent_title')}</h3>
                  <p className="text-text-muted">{t('contact.msg_sent_desc')}</p>
                  <button onClick={() => setSuccess(false)} className="text-primary hover:underline text-sm font-medium">{t('contact.send_another')}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-text-muted mb-2">{t('contact.name')} *</label>
                      <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder={t('contact.your_name')} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-text-muted mb-2">{t('contact.email')} *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={t('contact.your_email')} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-text-muted mb-2">{t('contact.phone')}</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={t('contact.your_phone')} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-text-muted mb-2">{t('contact.country')}</label>
                      <input type="text" name="country" value={form.country} onChange={handleChange} placeholder={t('contact.your_country')} className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-text-muted mb-2">{t('contact.service')}</label>
                    <select name="service" value={form.service} onChange={handleChange} className="input-field">
                      <option value="">{t('contact.select_service')}</option>
                      {SERVICE_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-text-muted mb-2">{t('contact.message')} *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={t('contact.your_message')} className="input-field resize-none" />
                  </div>
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
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      <span className="material-symbols-outlined text-base">error</span>
                      {error}
                    </div>
                  )}
                  <button type="submit" disabled={loading}
                    className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg shadow-btn hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading
                      ? <><span className="material-symbols-outlined animate-spin text-xl">progress_activity</span> {t('contact.sending')}</>
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
