import React, { useState } from 'react'

const MOCK = [
  { _id: '1', title: 'Top 10 Fully Funded Scholarships for 2026', category: 'Scholarships', author: 'QADAM Team', createdAt: '2026-01-15', status: 'Published' },
  { _id: '2', title: 'How to Write a Winning Motivation Letter', category: 'Education', author: 'QADAM Team', createdAt: '2026-02-10', status: 'Published' },
  { _id: '3', title: 'ChatGPT for Students', category: 'Digital Tools', author: 'QADAM Team', createdAt: '2026-03-05', status: 'Draft' },
]

export default function BlogManager() {
  const [posts, setPosts] = useState(MOCK)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', category: '', excerpt: '', status: 'Draft' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setPosts([...posts, { ...form, _id: Date.now().toString(), author: 'Admin', createdAt: new Date().toISOString().split('T')[0] }])
    setForm({ title: '', category: '', excerpt: '', status: 'Draft' })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this post?')) setPosts(posts.filter((p) => p._id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-on-surface">Blog Manager</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage blog articles and content</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg text-sm glow-button">
          <span className="material-symbols-outlined text-base">add</span>
          New Post
        </button>
      </div>

      {showForm && (
        <div className="glass-panel rounded-xl p-6">
          <h2 className="font-heading text-lg font-semibold text-on-surface mb-4">New Blog Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">Title</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Post title" className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">Category</label>
                <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">Excerpt</label>
              <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={3} placeholder="Short description..." className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors resize-none" />
            </div>
            <div className="flex gap-3">
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
              {['Title', 'Category', 'Author', 'Date', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p._id} className="border-b border-outline-variant/20 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-on-surface font-medium max-w-xs truncate">{p.title}</td>
                <td className="px-6 py-4 text-on-surface-variant">{p.category}</td>
                <td className="px-6 py-4 text-on-surface-variant">{p.author}</td>
                <td className="px-6 py-4 text-on-surface-variant">{p.createdAt}</td>
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
