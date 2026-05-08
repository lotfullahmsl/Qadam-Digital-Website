import React, { useState } from 'react'

const MOCK = [
  { _id: '1', title: 'Clinic Management System', category: 'Database', technologies: 'React, Flask, MongoDB', status: 'Published' },
  { _id: '2', title: 'E-Commerce Website', category: 'Website', technologies: 'React, Tailwind, Stripe', status: 'Published' },
  { _id: '3', title: 'Social Media Campaign', category: 'Marketing', technologies: 'Facebook Ads, Analytics', status: 'Draft' },
]

export default function PortfolioManager() {
  const [projects, setProjects] = useState(MOCK)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', category: '', description: '', technologies: '', status: 'Draft' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setProjects([...projects, { ...form, _id: Date.now().toString() }])
    setForm({ title: '', category: '', description: '', technologies: '', status: 'Draft' })
    setShowForm(false)
  }
  const handleDelete = (id) => { if (window.confirm('Delete?')) setProjects(projects.filter((p) => p._id !== id)) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-on-surface">Portfolio Manager</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage portfolio projects</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg text-sm glow-button">
          <span className="material-symbols-outlined text-base">add</span>
          Add Project
        </button>
      </div>

      {showForm && (
        <div className="glass-panel rounded-xl p-6">
          <h2 className="font-heading text-lg font-semibold text-on-surface mb-4">Add Project</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'title', label: 'Title', placeholder: 'Project title' },
              { name: 'category', label: 'Category', placeholder: 'Website / Database / Marketing' },
              { name: 'technologies', label: 'Technologies', placeholder: 'React, Flask, MongoDB' },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">{f.label}</label>
                <input type="text" name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors" />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Project description..." className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors resize-none" />
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
              {['Title', 'Category', 'Technologies', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-b border-outline-variant/20 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-on-surface font-medium">{p.title}</td>
                <td className="px-6 py-4 text-on-surface-variant">{p.category}</td>
                <td className="px-6 py-4 text-on-surface-variant text-xs">{p.technologies}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold tracking-widest uppercase px-2 py-1 rounded-full ${p.status === 'Published' ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>{p.status}</span>
                </td>
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
