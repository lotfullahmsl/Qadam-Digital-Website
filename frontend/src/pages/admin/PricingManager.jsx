import React, { useState } from 'react'

const MOCK = [
  { _id: '1', name: 'ChatGPT Plus', category: 'AI Subscriptions', price: '10', popular: true, status: 'Active' },
  { _id: '2', name: 'Scholarship Standard', category: 'Scholarship Services', price: '120', popular: true, status: 'Active' },
  { _id: '3', name: 'CV + Motivation', category: 'CV & Translation', price: '45', popular: false, status: 'Active' },
]

export default function PricingManager() {
  const [plans, setPlans] = useState(MOCK)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', category: '', price: '', features: '', popular: false, status: 'Active' })

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: val })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setPlans([...plans, { ...form, _id: Date.now().toString() }])
    setForm({ name: '', category: '', price: '', features: '', popular: false, status: 'Active' })
    setShowForm(false)
  }
  const handleDelete = (id) => { if (window.confirm('Delete?')) setPlans(plans.filter((p) => p._id !== id)) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-on-surface">Pricing Manager</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage pricing packages</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg text-sm glow-button">
          <span className="material-symbols-outlined text-base">add</span>
          Add Package
        </button>
      </div>

      {showForm && (
        <div className="glass-panel rounded-xl p-6">
          <h2 className="font-heading text-lg font-semibold text-on-surface mb-4">Add Package</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'name', label: 'Package Name', placeholder: 'e.g. Standard' },
              { name: 'category', label: 'Category', placeholder: 'e.g. AI Subscriptions' },
              { name: 'price', label: 'Price ($)', placeholder: '0' },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">{f.label}</label>
                <input type="text" name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors" />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">Features (comma separated)</label>
              <input type="text" name="features" value={form.features} onChange={handleChange} placeholder="Feature 1, Feature 2, Feature 3" className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="popular" checked={form.popular} onChange={handleChange} id="popular" className="accent-primary" />
              <label htmlFor="popular" className="text-sm text-on-surface-variant">Mark as Most Popular</label>
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
              {['Name', 'Category', 'Price', 'Popular', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p._id} className="border-b border-outline-variant/20 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-on-surface font-medium">{p.name}</td>
                <td className="px-6 py-4 text-on-surface-variant">{p.category}</td>
                <td className="px-6 py-4 text-primary font-semibold">${p.price}</td>
                <td className="px-6 py-4">{p.popular ? <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Yes</span> : <span className="text-on-surface-variant text-xs">No</span>}</td>
                <td className="px-6 py-4"><span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">{p.status}</span></td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">edit</span></button>
                    <button onClick={() => handleDelete(p._id)} className="text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-xl">delete</span></button>
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
