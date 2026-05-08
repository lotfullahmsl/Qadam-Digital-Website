import React, { useState } from 'react'

const MOCK = [
  { _id: '1', title: 'Scholarship Guidance', icon: 'school', category: 'Education', status: 'Active' },
  { _id: '2', title: 'Web Development', icon: 'web', category: 'Technology', status: 'Active' },
  { _id: '3', title: 'AI Subscriptions', icon: 'smart_toy', category: 'Digital', status: 'Active' },
]

export default function ServiceManager() {
  const [services, setServices] = useState(MOCK)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', icon: '', category: '', description: '', status: 'Active' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setServices([...services, { ...form, _id: Date.now().toString() }])
    setForm({ title: '', icon: '', category: '', description: '', status: 'Active' })
    setShowForm(false)
  }
  const handleDelete = (id) => { if (window.confirm('Delete?')) setServices(services.filter((s) => s._id !== id)) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-on-surface">Service Manager</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage service listings</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg text-sm glow-button">
          <span className="material-symbols-outlined text-base">add</span>
          Add Service
        </button>
      </div>

      {showForm && (
        <div className="glass-panel rounded-xl p-6">
          <h2 className="font-heading text-lg font-semibold text-on-surface mb-4">Add Service</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'title', label: 'Title', placeholder: 'Service title' },
              { name: 'icon', label: 'Icon (Material Symbol)', placeholder: 'e.g. school' },
              { name: 'category', label: 'Category', placeholder: 'Education / Technology / Digital' },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">{f.label}</label>
                <input type="text" name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors" />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Service description..." className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors resize-none" />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-primary text-on-primary font-semibold px-6 py-2 rounded-lg text-sm">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="border border-outline-variant/30 text-on-surface-variant px-6 py-2 rounded-lg text-sm hover:border-primary hover:text-primary transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s._id} className="glass-panel rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 flex-shrink-0">
              <span className="material-symbols-outlined text-xl">{s.icon}</span>
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold text-on-surface text-sm">{s.title}</h3>
              <p className="text-xs text-on-surface-variant">{s.category}</p>
            </div>
            <div className="flex gap-1">
              <button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
              <button onClick={() => handleDelete(s._id)} className="text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
