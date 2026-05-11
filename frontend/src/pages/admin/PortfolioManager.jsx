import React, { useState } from 'react'

const INITIAL_DATA = [
  { id: 1, title: 'E-Commerce Platform', category: 'Website', description: 'Full-featured online store with payment integration, inventory management, and admin dashboard.', technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'], clientType: 'Retail Business', imageUrl: '', status: 'Published' },
  { id: 2, title: 'University Database System', category: 'Database', description: 'Comprehensive student management system with enrollment, grades, and reporting modules.', technologies: ['PostgreSQL', 'Python', 'Django', 'Redis'], clientType: 'Educational Institution', imageUrl: '', status: 'Published' },
  { id: 3, title: 'Social Media Marketing Campaign', category: 'Marketing', description: 'Multi-platform social media campaign that increased brand awareness by 300%.', technologies: ['Facebook Ads', 'Instagram', 'Canva', 'Analytics'], clientType: 'Startup', imageUrl: '', status: 'Published' },
  { id: 4, title: 'Corporate Brand Identity', category: 'Design', description: 'Complete brand identity package including logo, color palette, typography, and brand guidelines.', technologies: ['Figma', 'Illustrator', 'Photoshop'], clientType: 'Corporate', imageUrl: '', status: 'Published' },
  { id: 5, title: 'Restaurant Booking System', category: 'Website', description: 'Online reservation system with table management, SMS notifications, and customer portal.', technologies: ['Vue.js', 'Laravel', 'MySQL', 'Twilio'], clientType: 'Restaurant', imageUrl: '', status: 'Published' },
  { id: 6, title: 'Inventory Management App', category: 'Database', description: 'Real-time inventory tracking with barcode scanning, alerts, and supplier management.', technologies: ['React Native', 'Firebase', 'Node.js'], clientType: 'Warehouse', imageUrl: '', status: 'Draft' },
]

const CATEGORIES = ['All', 'Website', 'Database', 'Marketing', 'Design']
const EMPTY_FORM = { title: '', category: 'Website', description: '', technologies: '', clientType: '', imageUrl: '', status: 'Published' }
const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white'

const categoryColors = {
  Website: 'bg-blue-100 text-blue-700',
  Database: 'bg-purple-100 text-purple-700',
  Marketing: 'bg-orange-100 text-orange-700',
  Design: 'bg-pink-100 text-pink-700',
}

export default function PortfolioManager() {
  const [items, setItems] = useState(INITIAL_DATA)
  const [activeCategory, setActiveCategory] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState(null)

  const filtered = activeCategory === 'All' ? items : items.filter((i) => i.category === activeCategory)

  const openModal = (item = null) => {
    setEditItem(item)
    setForm(item ? { ...item, technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies } : EMPTY_FORM)
    setShowModal(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const techArray = form.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    const data = { ...form, technologies: techArray }
    if (editItem) setItems(items.map((i) => (i.id === editItem.id ? { ...data, id: editItem.id } : i)))
    else setItems([...items, { ...data, id: Date.now() }])
    setShowModal(false)
  }
  const handleDelete = (id) => { setItems(items.filter((i) => i.id !== id)); setDeleteId(null) }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Portfolio</h1>
          <p className="text-sm text-gray-500 mt-0.5">Showcase your best work and projects</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-all" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>
          <span className="material-symbols-outlined text-base">add</span> Add Project
        </button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'}`}>
            {cat} <span className="ml-1 text-xs opacity-70">({cat === 'All' ? items.length : items.filter((i) => i.category === cat).length})</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            <div className="h-44 bg-gradient-to-br from-primary-pale to-primary-light flex items-center justify-center relative">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-5xl text-primary/40">image</span>
              )}
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openModal(item)} className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center text-gray-600 hover:text-primary transition-colors"><span className="material-symbols-outlined text-base">edit</span></button>
                <button onClick={() => setDeleteId(item.id)} className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-base">delete</span></button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-heading font-bold text-navy text-sm leading-snug">{item.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap flex-shrink-0 ${categoryColors[item.category] || 'bg-gray-100 text-gray-600'}`}>{item.category}</span>
              </div>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">{tech}</span>
                ))}
                {item.technologies.length > 4 && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg">+{item.technologies.length - 4}</span>}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="col-span-3 py-16 text-center text-gray-400"><span className="material-symbols-outlined text-5xl block mb-2">work_off</span>No projects in this category</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-heading font-bold text-navy text-lg">{editItem ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-navy"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Title *</label><input required className={inputClass} placeholder="Project title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label><select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{CATEGORIES.filter((c) => c !== 'All').map((c) => <option key={c}>{c}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Client Type</label><input className={inputClass} placeholder="e.g. Startup, Corporate" value={form.clientType} onChange={(e) => setForm({ ...form, clientType: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label><textarea rows={3} className={inputClass} placeholder="Project description..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Technologies (comma-separated)</label><input className={inputClass} placeholder="React, Node.js, MongoDB" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Image URL</label><input className={inputClass} placeholder="https://..." value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label><select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Published</option><option>Draft</option></select></div>
              </div>
              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:border-primary hover:text-primary transition-all text-sm">Cancel</button>
                <button type="submit" className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="material-symbols-outlined text-red-500 text-2xl">delete</span></div>
            <h3 className="font-heading font-bold text-navy text-center text-lg mb-2">Delete Project?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 text-white font-semibold py-2.5 rounded-xl hover:bg-red-600 text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
