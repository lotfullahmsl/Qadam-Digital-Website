import React, { useState } from 'react'
import { getContactInfo, saveContactInfo } from '../../utils/contactStore'

const TABS = [
  { id: 'contact', label: 'Contact Info', icon: 'contact_phone' },
  { id: 'general', label: 'General', icon: 'settings' },
  { id: 'social', label: 'Social Media', icon: 'share' },
  { id: 'analytics', label: 'Analytics & Ads', icon: 'analytics' },
  { id: 'security', label: 'Security', icon: 'security' },
]

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white'

function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-navy text-white px-5 py-3.5 rounded-2xl shadow-2xl">
      <span className="material-symbols-outlined text-green-400 text-xl">check_circle</span>
      <span className="text-sm font-semibold">{message}</span>
      <button onClick={onClose} className="text-white/60 hover:text-white ml-2"><span className="material-symbols-outlined text-base">close</span></button>
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
  const [activeTab, setActiveTab] = useState('contact')
  const [toast, setToast] = useState(null)
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  // Contact Info — loaded from localStorage, saved back on submit
  const [contactInfo, setContactInfo] = useState(getContactInfo())

  const handleSaveContact = (e) => {
    e.preventDefault()
    // Auto-build WhatsApp link from number
    const cleaned = contactInfo.whatsapp.replace(/\D/g, '')
    const updated = { ...contactInfo, whatsappLink: `https://wa.me/${cleaned}` }
    setContactInfo(updated)
    saveContactInfo(updated)
    showToast('Contact info saved! Changes are now live on the Contact page.')
  }

  const [general, setGeneral] = useState({ siteName: 'QADAM Digital', tagline: 'Your Gateway to Global Opportunities', whatsapp: '+92 303 939 3438', contactEmail: 'info@qadam.digital', officeLocation: 'Kabul, Afghanistan', maintenanceMode: false })
  const [social, setSocial] = useState({ facebook: 'https://facebook.com/qadamdigital', instagram: 'https://instagram.com/qadamdigital', linkedin: 'https://linkedin.com/company/qadamdigital', youtube: 'https://youtube.com/@qadamdigital', tiktok: '' })
  const [analytics, setAnalytics] = useState({ googleAnalyticsId: 'G-XXXXXXXXXX', adsensePublisherId: 'ca-pub-XXXXXXXXXX', metaPixelId: '' })
  const [security, setSecurity] = useState({ currentPassword: '', newPassword: '', confirmPassword: '', sessionTimeout: '60' })
  const [passwordError, setPasswordError] = useState('')

  const handleSaveSecurity = (e) => {
    e.preventDefault()
    setPasswordError('')
    if (security.newPassword && security.newPassword !== security.confirmPassword) { setPasswordError('New passwords do not match.'); return }
    if (security.newPassword && security.newPassword.length < 8) { setPasswordError('Password must be at least 8 characters.'); return }
    setSecurity({ ...security, currentPassword: '', newPassword: '', confirmPassword: '' })
    showToast('Security settings saved successfully!')
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-navy">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configure your site settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab Sidebar */}
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

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'contact' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-heading font-bold text-navy text-base">Contact Information</h2>
                <p className="text-xs text-gray-400 mt-0.5">Changes save instantly and appear live on the public Contact page</p>
              </div>
              <form onSubmit={handleSaveContact} className="p-6 space-y-5">

                {/* Live preview banner */}
                <div className="bg-primary-pale border border-primary/20 rounded-xl p-4 flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl flex-shrink-0 mt-0.5">info</span>
                  <div>
                    <p className="text-sm font-semibold text-navy">Live Preview</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      WhatsApp: <strong>{contactInfo.whatsapp}</strong> &nbsp;|&nbsp;
                      Phone: <strong>{contactInfo.phone}</strong> &nbsp;|&nbsp;
                      Email: <strong>{contactInfo.email}</strong>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-green-500">chat</span>
                      WhatsApp Number
                    </label>
                    <input
                      className={inputClass}
                      placeholder="+92 303 939 3438"
                      value={contactInfo.whatsapp}
                      onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                    />
                    <p className="text-xs text-gray-400 mt-1">Include country code. Link is auto-generated.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-primary">phone</span>
                      Phone Number
                    </label>
                    <input
                      className={inputClass}
                      placeholder="+92 777 241 173"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-primary">email</span>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="info@qadamdigital.com"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-primary">location_on</span>
                      Office Location
                    </label>
                    <input
                      className={inputClass}
                      placeholder="Kabul, Afghanistan"
                      value={contactInfo.location}
                      onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                    />
                  </div>
                </div>

                {/* Social links */}
                <div className="border-t border-gray-100 pt-5">
                  <p className="text-xs font-semibold text-gray-600 mb-4 uppercase tracking-widest">Social Media Links</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: 'facebook', label: 'Facebook', icon: 'facebook' },
                      { key: 'instagram', label: 'Instagram', icon: 'photo_camera' },
                      { key: 'linkedin', label: 'LinkedIn', icon: 'work' },
                      { key: 'youtube', label: 'YouTube', icon: 'smart_display' },
                    ].map((s) => (
                      <div key={s.key}>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base text-gray-400">{s.icon}</span>
                          {s.label}
                        </label>
                        <input
                          type="url"
                          className={inputClass}
                          placeholder={`https://${s.key}.com/qadamdigital`}
                          value={contactInfo[s.key] || ''}
                          onChange={(e) => setContactInfo({ ...contactInfo, [s.key]: e.target.value })}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm"
                  style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}
                >
                  <span className="material-symbols-outlined text-base">save</span>
                  Save & Publish Contact Info
                </button>
              </form>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-heading font-bold text-navy text-base">General Settings</h2><p className="text-xs text-gray-400 mt-0.5">Basic site configuration</p></div>
              <form onSubmit={(e) => { e.preventDefault(); showToast('General settings saved successfully!') }} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Site Name</label><input className={inputClass} value={general.siteName} onChange={(e) => setGeneral({ ...general, siteName: e.target.value })} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Tagline</label><input className={inputClass} value={general.tagline} onChange={(e) => setGeneral({ ...general, tagline: e.target.value })} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">WhatsApp Number</label><input className={inputClass} placeholder="+92 303 939 3438" value={general.whatsapp} onChange={(e) => setGeneral({ ...general, whatsapp: e.target.value })} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Contact Email</label><input type="email" className={inputClass} value={general.contactEmail} onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Office Location</label><input className={inputClass} value={general.officeLocation} onChange={(e) => setGeneral({ ...general, officeLocation: e.target.value })} /></div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <Toggle value={general.maintenanceMode} onChange={(v) => setGeneral({ ...general, maintenanceMode: v })} label="Maintenance Mode" description="When enabled, visitors will see a maintenance page" />
                  {general.maintenanceMode && (
                    <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-2">
                      <span className="material-symbols-outlined text-orange-500 text-lg">warning</span>
                      <p className="text-xs text-orange-700 font-medium">Maintenance mode is ON. Your site is not visible to visitors.</p>
                    </div>
                  )}
                </div>
                <button type="submit" className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>Save General Settings</button>
              </form>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-heading font-bold text-navy text-base">Social Media Links</h2><p className="text-xs text-gray-400 mt-0.5">Update your social media profile URLs</p></div>
              <form onSubmit={(e) => { e.preventDefault(); showToast('Social media links saved successfully!') }} className="p-6 space-y-4">
                {[
                  { key: 'facebook', label: 'Facebook', icon: 'facebook', placeholder: 'https://facebook.com/yourpage' },
                  { key: 'instagram', label: 'Instagram', icon: 'photo_camera', placeholder: 'https://instagram.com/yourhandle' },
                  { key: 'linkedin', label: 'LinkedIn', icon: 'work', placeholder: 'https://linkedin.com/company/yourcompany' },
                  { key: 'youtube', label: 'YouTube', icon: 'play_circle', placeholder: 'https://youtube.com/@yourchannel' },
                  { key: 'tiktok', label: 'TikTok', icon: 'music_note', placeholder: 'https://tiktok.com/@yourhandle' },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5"><span className="material-symbols-outlined text-base text-gray-400">{item.icon}</span>{item.label}</label>
                    <input type="url" className={inputClass} placeholder={item.placeholder} value={social[item.key]} onChange={(e) => setSocial({ ...social, [item.key]: e.target.value })} />
                  </div>
                ))}
                <button type="submit" className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>Save Social Links</button>
              </form>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-heading font-bold text-navy text-base">Analytics & Ads</h2><p className="text-xs text-gray-400 mt-0.5">Configure tracking and advertising IDs</p></div>
              <form onSubmit={(e) => { e.preventDefault(); showToast('Analytics settings saved successfully!') }} className="p-6 space-y-4">
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
                <button type="submit" className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>Save Analytics Settings</button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-heading font-bold text-navy text-base">Change Password</h2><p className="text-xs text-gray-400 mt-0.5">Update your admin account password</p></div>
                <form onSubmit={handleSaveSecurity} className="p-6 space-y-4">
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Current Password</label><input type="password" className={inputClass} placeholder="Enter current password" value={security.currentPassword} onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">New Password</label><input type="password" className={inputClass} placeholder="Enter new password (min 8 characters)" value={security.newPassword} onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Confirm New Password</label><input type="password" className={inputClass} placeholder="Confirm new password" value={security.confirmPassword} onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })} /></div>
                  {passwordError && <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2"><span className="material-symbols-outlined text-red-500 text-base">error</span><p className="text-xs text-red-600 font-medium">{passwordError}</p></div>}
                  <button type="submit" className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>Update Password</button>
                </form>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-heading font-bold text-navy text-base">Session Settings</h2></div>
                <div className="p-6">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Session Timeout (minutes)</label>
                  <select className={inputClass + ' max-w-xs'} value={security.sessionTimeout} onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}>
                    <option value="30">30 minutes</option><option value="60">1 hour</option><option value="120">2 hours</option><option value="480">8 hours</option><option value="0">Never</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-1.5">Admin will be logged out after this period of inactivity</p>
                  <button onClick={() => showToast('Session settings saved!')} className="mt-4 bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>Save Session Settings</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
