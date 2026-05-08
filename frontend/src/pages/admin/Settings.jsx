import React, { useState } from 'react'

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'QADAM Digital',
    tagline: 'Education & Digital Services',
    whatsappNumber: '+93700000000',
    email: 'info@qadamdigital.com',
    facebookUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    googleAnalyticsId: '',
    googleAdsenseId: '',
    maintenanceMode: false,
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setSettings({ ...settings, [e.target.name]: val })
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-on-surface">Settings</h1>
        <p className="text-sm text-on-surface-variant mt-1">Manage website configuration</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General */}
        <div className="glass-panel rounded-xl p-6 space-y-4">
          <h2 className="font-heading text-lg font-semibold text-on-surface">General Settings</h2>
          {[
            { name: 'siteName', label: 'Site Name' },
            { name: 'tagline', label: 'Tagline' },
            { name: 'whatsappNumber', label: 'WhatsApp Number' },
            { name: 'email', label: 'Contact Email' },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">{f.label}</label>
              <input type="text" name={f.name} value={settings[f.name]} onChange={handleChange} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors" />
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="glass-panel rounded-xl p-6 space-y-4">
          <h2 className="font-heading text-lg font-semibold text-on-surface">Social Media Links</h2>
          {[
            { name: 'facebookUrl', label: 'Facebook URL' },
            { name: 'instagramUrl', label: 'Instagram URL' },
            { name: 'linkedinUrl', label: 'LinkedIn URL' },
            { name: 'youtubeUrl', label: 'YouTube URL' },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">{f.label}</label>
              <input type="url" name={f.name} value={settings[f.name]} onChange={handleChange} placeholder="https://" className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors" />
            </div>
          ))}
        </div>

        {/* Analytics & Ads */}
        <div className="glass-panel rounded-xl p-6 space-y-4">
          <h2 className="font-heading text-lg font-semibold text-on-surface">Analytics & Ads</h2>
          {[
            { name: 'googleAnalyticsId', label: 'Google Analytics ID', placeholder: 'G-XXXXXXXXXX' },
            { name: 'googleAdsenseId', label: 'Google AdSense Publisher ID', placeholder: 'ca-pub-XXXXXXXXXX' },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">{f.label}</label>
              <input type="text" name={f.name} value={settings[f.name]} onChange={handleChange} placeholder={f.placeholder} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors" />
            </div>
          ))}
        </div>

        {/* Maintenance */}
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-on-surface">Maintenance Mode</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Show a maintenance page to visitors</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 bg-primary text-on-primary font-semibold px-8 py-3 rounded-lg glow-button transition-all duration-300">
          <span className="material-symbols-outlined">{saved ? 'check_circle' : 'save'}</span>
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
