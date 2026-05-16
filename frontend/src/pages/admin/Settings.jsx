import React, { useCallback, useEffect, useState } from 'react'
import { clearPublicSettingsCache, DEFAULT_CONTACT } from '../../hooks/usePublicSettings'
import { siteSettingsService } from '../../services/siteSettingsService'

const TABS = [
  { id: 'phone_whatsapp', label: 'Phone & WhatsApp', icon: 'smartphone' },
  { id: 'email_location', label: 'Email & location', icon: 'mail' },
  { id: 'social', label: 'Social media', icon: 'share' },
  { id: 'general', label: 'General', icon: 'settings' },
  { id: 'analytics', label: 'Analytics & Ads', icon: 'analytics' },
  { id: 'security', label: 'Security', icon: 'security' },
]

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white'

function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-navy text-white px-5 py-3.5 rounded-2xl shadow-2xl">
      <span className="material-symbols-outlined text-green-400 text-xl">check_circle</span>
      <span className="text-sm font-semibold">{message}</span>
      <button type="button" onClick={onClose} className="text-white/60 hover:text-white ml-2"><span className="material-symbols-outlined text-base">close</span></button>
    </div>
  )
}

function Toggle({ value, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-semibold text-navy">{label}</p>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
      <button type="button" onClick={() => onChange(!value)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${value ? 'bg-primary' : 'bg-gray-200'}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  )
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('phone_whatsapp')
  const [toast, setToast] = useState(null)
  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const [bootError, setBootError] = useState('')
  const [bootLoading, setBootLoading] = useState(true)

  /** Single source for public contact/social (stored in DB under `contact`). */
  const [contact, setContact] = useState({ ...DEFAULT_CONTACT })
  const [general, setGeneral] = useState({
    siteName: 'QADAM Digital',
    tagline: 'Your Gateway to Global Opportunities',
    maintenanceMode: false,
  })
  const [analytics, setAnalytics] = useState({
    googleAnalyticsId: '',
    adsensePublisherId: '',
    metaPixelId: '',
  })
  const [security, setSecurity] = useState({ currentPassword: '', newPassword: '', confirmPassword: '', sessionTimeout: '60' })
  const [passwordError, setPasswordError] = useState('')

  const loadSettings = useCallback(async () => {
    setBootError('')
    const { data } = await siteSettingsService.getAdmin()
    const c = { ...DEFAULT_CONTACT, ...(data.contact || {}) }
    setContact(c)
    setGeneral({
      siteName: data.general?.siteName ?? 'QADAM Digital',
      tagline: data.general?.tagline ?? '',
      maintenanceMode: !!data.general?.maintenanceMode,
    })
    setAnalytics({
      googleAnalyticsId: data.analytics?.googleAnalyticsId || '',
      adsensePublisherId: data.analytics?.adsensePublisherId || '',
      metaPixelId: data.analytics?.metaPixelId || '',
    })
    setSecurity((prev) => ({
      ...prev,
      sessionTimeout: String(data.security?.sessionTimeoutMinutes ?? 60),
    }))
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await loadSettings()
      } catch (err) {
        if (!cancelled) setBootError(err.response?.data?.message || 'Unable to load settings.')
      } finally {
        if (!cancelled) setBootLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [loadSettings])

  const saveContactSlice = async (partial, successMsg) => {
    await siteSettingsService.updateAdmin({ contact: partial })
    clearPublicSettingsCache()
    showToast(successMsg)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-navy">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configure your site settings and preferences</p>
        <p className="text-xs text-gray-400 mt-2 max-w-2xl">
          Contact details and URLs are stored in the database. You can save any tab with empty optional fields—nothing is required to submit.
        </p>
        {bootError && (
          <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-2">
            <span>{bootError}</span>
            <button type="button" onClick={() => { setBootLoading(true); loadSettings().catch(() => {}).finally(() => setBootLoading(false)) }} className="text-primary font-semibold hover:underline">
              Retry
            </button>
          </div>
        )}
      </div>

      {bootLoading ? (
        <div className="py-20 text-center text-gray-500 text-sm">Loading settings…</div>
      ) : (
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-navy'}`}>
                <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'phone_whatsapp' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-heading font-bold text-navy text-base">Phone & WhatsApp</h2>
                <p className="text-xs text-gray-400 mt-0.5">Stored in the database; WhatsApp chat links are generated from the number</p>
              </div>
              <form
                noValidate
                onSubmit={async (e) => {
                  e.preventDefault()
                  try {
                    await saveContactSlice(
                      { phone: contact.phone ?? '', whatsapp: contact.whatsapp ?? '' },
                      'Phone & WhatsApp saved.',
                    )
                  } catch (err) {
                    showToast(err.response?.data?.message || 'Save failed.')
                  }
                }}
                className="p-6 space-y-5"
              >
                <div className="bg-primary-pale border border-primary/20 rounded-xl p-4 flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl flex-shrink-0 mt-0.5">info</span>
                  <div>
                    <p className="text-sm font-semibold text-navy">Live preview</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      WhatsApp: <strong>{contact.whatsapp || '—'}</strong>
                      {' · '}
                      Phone: <strong>{contact.phone || '—'}</strong>
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-green-500">chat</span>
                      WhatsApp number
                    </label>
                    <input
                      className={inputClass}
                      placeholder="+92 303 939 3437"
                      value={contact.whatsapp ?? ''}
                      onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                    />
                    <p className="text-xs text-gray-400 mt-1">Include country code. Only place this number is edited.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-primary">phone</span>
                      Phone number
                    </label>
                    <input
                      className={inputClass}
                      placeholder="+92 777 241 173"
                      value={contact.phone ?? ''}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm"
                  style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}
                >
                  <span className="material-symbols-outlined text-base">save</span>
                  Save phone & WhatsApp
                </button>
              </form>
            </div>
          )}

          {activeTab === 'email_location' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-heading font-bold text-navy text-base">Email & office location</h2>
                <p className="text-xs text-gray-400 mt-0.5">Shown on Contact and in the footer</p>
              </div>
              <form
                noValidate
                onSubmit={async (e) => {
                  e.preventDefault()
                  try {
                    await saveContactSlice(
                      { email: contact.email ?? '', location: contact.location ?? '' },
                      'Email & location saved.',
                    )
                  } catch (err) {
                    showToast(err.response?.data?.message || 'Save failed.')
                  }
                }}
                className="p-6 space-y-5"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary">email</span>
                    Email
                  </label>
                  <input
                    className={inputClass}
                    placeholder="info@qadamdigital.com"
                    value={contact.email ?? ''}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary">location_on</span>
                    Office location
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Kabul, Afghanistan"
                    value={contact.location ?? ''}
                    onChange={(e) => setContact({ ...contact, location: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm"
                  style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}
                >
                  Save email & location
                </button>
              </form>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-heading font-bold text-navy text-base">Social media URLs</h2>
                <p className="text-xs text-gray-400 mt-0.5">Profile links only—no phone or WhatsApp here</p>
              </div>
              <form
                noValidate
                onSubmit={async (e) => {
                  e.preventDefault()
                  try {
                    await saveContactSlice(
                      {
                        facebook: contact.facebook ?? '',
                        instagram: contact.instagram ?? '',
                        linkedin: contact.linkedin ?? '',
                        youtube: contact.youtube ?? '',
                        tiktok: contact.tiktok ?? '',
                      },
                      'Social links saved.',
                    )
                  } catch (err) {
                    showToast(err.response?.data?.message || 'Save failed.')
                  }
                }}
                className="p-6 space-y-4"
              >
                {[
                  { key: 'facebook', label: 'Facebook', icon: 'facebook', placeholder: 'https://facebook.com/yourpage' },
                  { key: 'instagram', label: 'Instagram', icon: 'photo_camera', placeholder: 'https://instagram.com/yourhandle' },
                  { key: 'linkedin', label: 'LinkedIn', icon: 'work', placeholder: 'https://linkedin.com/company/yourcompany' },
                  { key: 'youtube', label: 'YouTube', icon: 'play_circle', placeholder: 'https://youtube.com/@yourchannel' },
                  { key: 'tiktok', label: 'TikTok', icon: 'music_note', placeholder: 'https://tiktok.com/@yourhandle' },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                      <span className="material-symbols-outlined text-base text-gray-400">{item.icon}</span>
                      {item.label}
                    </label>
                    <input
                      type="url"
                      className={inputClass}
                      placeholder={item.placeholder}
                      value={contact[item.key] ?? ''}
                      onChange={(e) => setContact({ ...contact, [item.key]: e.target.value })}
                    />
                  </div>
                ))}
                <button type="submit" className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>
                  Save social links
                </button>
              </form>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-heading font-bold text-navy text-base">General</h2>
                <p className="text-xs text-gray-400 mt-0.5">Site name, tagline, and maintenance mode—contact data is under the other tabs</p>
              </div>
              <form
                noValidate
                onSubmit={async (e) => {
                  e.preventDefault()
                  try {
                    await siteSettingsService.updateAdmin({ general })
                    clearPublicSettingsCache()
                    showToast('General settings saved.')
                  } catch (err) {
                    showToast(err.response?.data?.message || 'Save failed.')
                  }
                }}
                className="p-6 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Site name</label>
                    <input className={inputClass} value={general.siteName} onChange={(e) => setGeneral({ ...general, siteName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tagline</label>
                    <input className={inputClass} value={general.tagline} onChange={(e) => setGeneral({ ...general, tagline: e.target.value })} />
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <Toggle value={general.maintenanceMode} onChange={(v) => setGeneral({ ...general, maintenanceMode: v })} label="Maintenance mode" description="When enabled, visitors will see a maintenance page" />
                  {general.maintenanceMode && (
                    <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-2">
                      <span className="material-symbols-outlined text-orange-500 text-lg">warning</span>
                      <p className="text-xs text-orange-700 font-medium">Maintenance mode is on. Your site is not visible to visitors.</p>
                    </div>
                  )}
                </div>
                <button type="submit" className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>
                  Save general settings
                </button>
              </form>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-heading font-bold text-navy text-base">Analytics & Ads</h2><p className="text-xs text-gray-400 mt-0.5">Configure tracking and advertising IDs</p></div>
              <form
                noValidate
                onSubmit={async (e) => {
                  e.preventDefault()
                  try {
                    await siteSettingsService.updateAdmin({ analytics })
                    clearPublicSettingsCache()
                    showToast('Analytics settings saved.')
                  } catch (err) {
                    showToast(err.response?.data?.message || 'Save failed.')
                  }
                }}
                className="p-6 space-y-4"
              >
                {[
                  { key: 'googleAnalyticsId', label: 'Google Analytics ID', icon: 'analytics', placeholder: 'G-XXXXXXXXXX', hint: 'Found in your Google Analytics property settings' },
                  { key: 'adsensePublisherId', label: 'Google AdSense Publisher ID', icon: 'monetization_on', placeholder: 'ca-pub-XXXXXXXXXXXXXXXXXX', hint: 'Found in your AdSense account settings' },
                  { key: 'metaPixelId', label: 'Meta Pixel ID', icon: 'ads_click', placeholder: 'XXXXXXXXXXXXXXXXXX', hint: 'Found in your Meta Business Manager' },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5"><span className="material-symbols-outlined text-base text-gray-400">{item.icon}</span>{item.label}</label>
                    <input className={inputClass} placeholder={item.placeholder} value={analytics[item.key]} onChange={(e) => setAnalytics({ ...analytics, [item.key]: e.target.value })} />
                    <p className="text-xs text-gray-400 mt-1">{item.hint}</p>
                  </div>
                ))}
                <button type="submit" className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>Save analytics settings</button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-heading font-bold text-navy text-base">Change password</h2><p className="text-xs text-gray-400 mt-0.5">Update your admin account password</p></div>
                <form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault()
                    setPasswordError('')
                    if (security.newPassword && security.newPassword !== security.confirmPassword) {
                      setPasswordError('New passwords do not match.')
                      return
                    }
                    if (security.newPassword && security.newPassword.length < 8) {
                      setPasswordError('Password must be at least 8 characters.')
                      return
                    }
                    setSecurity({ ...security, currentPassword: '', newPassword: '', confirmPassword: '' })
                    showToast('Security settings saved successfully!')
                  }}
                  className="p-6 space-y-4"
                >
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Current password</label><input type="password" className={inputClass} placeholder="Enter current password" value={security.currentPassword} onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">New password</label><input type="password" className={inputClass} placeholder="Enter new password (min 8 characters)" value={security.newPassword} onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Confirm new password</label><input type="password" className={inputClass} placeholder="Confirm new password" value={security.confirmPassword} onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })} /></div>
                  {passwordError && <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2"><span className="material-symbols-outlined text-red-500 text-base">error</span><p className="text-xs text-red-600 font-medium">{passwordError}</p></div>}
                  <button type="submit" className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>Update password</button>
                </form>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-heading font-bold text-navy text-base">Session settings</h2></div>
                <div className="p-6">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Session timeout (minutes)</label>
                  <select className={inputClass + ' max-w-xs'} value={security.sessionTimeout} onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}>
                    <option value="30">30 minutes</option><option value="60">1 hour</option><option value="120">2 hours</option><option value="480">8 hours</option><option value="0">Never</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-1.5">Admin will be logged out after this period of inactivity</p>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const minutes = security.sessionTimeout === '0' ? 0 : Number(security.sessionTimeout) || 60
                        await siteSettingsService.updateAdmin({ security: { sessionTimeoutMinutes: minutes } })
                        clearPublicSettingsCache()
                        showToast('Session settings saved!')
                      } catch (err) {
                        showToast(err.response?.data?.message || 'Save failed.')
                      }
                    }}
                    className="mt-4 bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm"
                    style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}
                  >
                    Save session settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
