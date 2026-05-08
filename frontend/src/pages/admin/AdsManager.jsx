import React, { useState } from 'react'

const MOCK_ADS = [
  { _id: '1', name: 'Home Page Banner', placement: 'Home', type: 'Internal', status: 'Active' },
  { _id: '2', name: 'Scholarship Sidebar', placement: 'Scholarships', type: 'Google AdSense', status: 'Active' },
  { _id: '3', name: 'Blog Top Banner', placement: 'Blog', type: 'Sponsored', status: 'Inactive' },
]

export default function AdsManager() {
  const [ads, setAds] = useState(MOCK_ADS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', placement: '', type: 'Internal', code: '', status: 'Active' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setAds([...ads, { ...form, _id: Date.now().toString() }])
    setForm({ name: '', placement: '', type: 'Internal', code: '', status: 'Active' })
    setShowForm(false)
  }
  const handleDelete = (id) => { if (window.confirm('Delete?')) setAds(ads.filter((a) => a._id !== id)) }
  const toggleStatus = (id) => setAds(ads.map((a) => a._id === id ? { ...a, status: a.status === 'Active' ? 'Inactive' : 'Active' } : a))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-on-surface">Ads Manager</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage advertisement placements</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg text-sm glow-button">
          <span className="material-symbols-outlined text-base">add</span>
          Add Ad
        </button>
      </div>

      {showForm && (
        <div className="glass-panel rounded-xl p-6">
          <h2 className="font-heading text-lg font-semibold text-on-surface mb-4">Add Advertisement</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'name', label: 'Ad Name', placeholder: 'e.g. Home Banner' },
              { name: 'placement', label: 'Page Placement', placeholder: 'e.g. Home, Blog, Scholarships' },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">{f.label}</label>
                <input type="text" name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">Ad Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors">
                <option>Internal</option>
                <option>Google AdSense</option>
                <option>Sponsored</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">Ad Code / Script</label>
              <textarea name="code" value={form.code} onChange={handleChange} rows={4} placeholder="Paste Google AdSense code or ad HTML here..." className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface font-mono focus:outline-none focus:border-primary transition-colors resize-none" />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-primary text-on-primary font-semibold px-6 py-2 rounded-lg text-sm">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="border border-outline-variant/30 text-on-surface-variant px-6 py-2 rounded-lg text-sm hover:border-primary hover:text-primary transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-outline-variant/30">
              {['Name', 'Placement', 'Type', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ads.map((a) => (
              <tr key={a._id} className="border-b border-outline-variant/20 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-on-surface font-medium">{a.name}</td>
                <td className="px-6 py-4 text-on-surface-variant">{a.placement}</td>
                <td className="px-6 py-4 text-on-surface-variant">{a.type}</td>
                <td className="px-6 py-4">
                  <button onClick={() => toggleStatus(a._id)} className={`text-xs font-semibold tracking-widest uppercase px-2 py-1 rounded-full transition-colors ${a.status === 'Active' ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : 'bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary'}`}>
                    {a.status}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">edit</span></button>
                    <button onClick={() => handleDelete(a._id)} className="text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-xl">delete</span></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
