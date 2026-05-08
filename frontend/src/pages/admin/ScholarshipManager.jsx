import React, { useState } from 'react'

const MOCK = [
  { _id: '1', title: 'DAAD Scholarship Germany', country: 'Germany', degree: 'MS/PhD', deadline: 'Oct 2026', status: 'Published' },
  { _id: '2', title: 'Chevening Scholarship UK', country: 'UK', degree: 'MS', deadline: 'Nov 2026', status: 'Published' },
  { _id: '3', title: 'Erasmus Mundus', country: 'Europe', degree: 'MS', deadline: 'Jan 2027', status: 'Draft' },
]

export default function ScholarshipManager() {
  const [scholarships, setScholarships] = useState(MOCK)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', country: '', degree: '', deadline: '', fundingType: '', status: 'Draft' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setScholarships([...scholarships, { ...form, _id: Date.now().toString() }])
    setForm({ title: '', country: '', degree: '', deadline: '', fundingType: '', status: 'Draft' })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this scholarship?')) {
      setScholarships(scholarships.filter((s) => s._id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-on-surface">Scholarships</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage scholarship listings</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg text-sm glow-button transition-all"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add Scholarship
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="glass-panel rounded-xl p-6">
          <h2 className="font-heading text-lg font-semibold text-on-surface mb-4">Add New Scholarship</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'title', label: 'Title', type: 'text', placeholder: 'Scholarship title' },
              { name: 'country', label: 'Country', type: 'text', placeholder: 'Country' },
              { name: 'degree', label: 'Degree', type: 'text', placeholder: 'BS/MS/PhD' },
              { name: 'deadline', label: 'Deadline', type: 'text', placeholder: 'e.g. Oct 2026' },
              { name: 'fundingType', label: 'Funding Type', type: 'text', placeholder: 'Fully Funded / Partial' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors">
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-primary text-on-primary font-semibold px-6 py-2 rounded-lg text-sm">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="border border-outline-variant/30 text-on-surface-variant px-6 py-2 rounded-lg text-sm hover:border-primary hover:text-primary transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-outline-variant/30">
              {['Title', 'Country', 'Degree', 'Deadline', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scholarships.map((s) => (
              <tr key={s._id} className="border-b border-outline-variant/20 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-on-surface font-medium">{s.title}</td>
                <td className="px-6 py-4 text-on-surface-variant">{s.country}</td>
                <td className="px-6 py-4 text-on-surface-variant">{s.degree}</td>
                <td className="px-6 py-4 text-on-surface-variant">{s.deadline}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold tracking-widest uppercase px-2 py-1 rounded-full ${s.status === 'Published' ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button onClick={() => handleDelete(s._id)} className="text-on-surface-variant hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
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
