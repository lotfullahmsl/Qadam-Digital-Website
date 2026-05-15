import React, { useEffect, useState } from 'react'
import adminContentService from '../../services/adminContentService'
import { cmsText } from '../../utils/cmsText'

const CATEGORIES = ['Education', 'Technology', 'Marketing', 'Design']
const EMPTY_FORM = { title: '', icon: 'star', category: 'Technology', description: '', features: '', ctaLink: '', status: 'Active' }
const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white'

const categoryColors = {
  Education: 'bg-blue-100 text-blue-700',
  Technology: 'bg-purple-100 text-purple-700',
  Marketing: 'bg-orange-100 text-orange-700',
  Design: 'bg-pink-100 text-pink-700',
}

export default function ServiceManager() {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadItems = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await adminContentService.getAll('services', { limit: 100 })
      setItems(data.items || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load services.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const openModal = (item = null) => {
    setEditItem(item)
    setForm(item ? { ...item, ctaLink: item.ctaLink || item.to || '', features: Array.isArray(item.features) ? item.features.join('\n') : item.features || '' } : EMPTY_FORM)
    setShowModal(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const save = async () => {
      try {
        if (editItem) await adminContentService.update('services', editItem._id, form)
        else await adminContentService.create('services', form)
        setShowModal(false)
        await loadItems()
      } catch (err) {
        alert(err.response?.data?.message || 'Unable to save service.')
      }
    }
    save()
  }
  const handleDelete = async (id) => {
    await adminContentService.delete('services', id)
    setDeleteId(null)
    await loadItems()
  }
  const toggleStatus = async (item) => {
    await adminContentService.updateStatus('services', item._id, item.status === 'Active' ? 'Inactive' : 'Active')
    await loadItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Services</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage the services you offer to clients</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-all" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>
          <span className="material-symbols-outlined text-base">add</span> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading && <div className="col-span-full py-12 text-center text-gray-400">Loading services...</div>}
        {error && <div className="col-span-full py-12 text-center text-red-500">{error}</div>}
        {!loading && !error && items.map((item) => (
          <div key={item._id} className={`bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition-shadow group relative ${item.status === 'Inactive' ? 'border-gray-100 opacity-60' : 'border-gray-100'}`}>
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => toggleStatus(item)} className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors"><span className="material-symbols-outlined text-sm">{item.status === 'Active' ? 'visibility_off' : 'visibility'}</span></button>
              <button onClick={() => openModal(item)} className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
              <button onClick={() => setDeleteId(item._id)} className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
            </div>
            <h3 className="font-heading font-bold text-navy text-sm leading-snug mb-1">{cmsText(item.title)}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${categoryColors[cmsText(item.category)] || 'bg-gray-100 text-gray-600'}`}>{cmsText(item.category)}</span>
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">{cmsText(item.description)}</p>
            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
              <span className={`text-xs font-semibold ${item.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>● {item.status}</span>
              <span className="text-xs text-primary">{item.ctaLink || item.to}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-heading font-bold text-navy text-lg">{editItem ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-navy"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Title *</label><input required className={inputClass} placeholder="Service title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Icon (Material Symbol name)</label>
                  <div className="flex gap-2">
                    <input className={inputClass} placeholder="e.g. school, web, storage" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-primary text-xl">{form.icon || 'star'}</span></div>
                  </div>
                </div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label><select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">CTA Link</label><input className={inputClass} placeholder="/services" value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label><textarea rows={3} className={inputClass} placeholder="Service description..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Features (one per line)</label><textarea rows={4} className={inputClass} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label><select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>Inactive</option></select></div>
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
            <h3 className="font-heading font-bold text-navy text-center text-lg mb-2">Delete Service?</h3>
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
