import React, { useState } from 'react'

const INITIAL_DATA = [
  { id: 1, name: 'Google AdSense - Home Banner', placement: 'Home', type: 'Google AdSense', adCode: '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>', status: 'Active' },
  { id: 2, name: 'Scholarship Page Sidebar Ad', placement: 'Scholarships', type: 'Internal Banner', adCode: '<div class="ad-banner">...</div>', status: 'Active' },
  { id: 3, name: 'Blog Sponsored Post Banner', placement: 'Blog', type: 'Sponsored', adCode: '<div class="sponsored-banner">...</div>', status: 'Inactive' },
  { id: 4, name: 'Services Page Google Ad', placement: 'Services', type: 'Google AdSense', adCode: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXX"></ins>', status: 'Active' },
  { id: 5, name: 'Global Footer Banner', placement: 'All Pages', type: 'Internal Banner', adCode: '<div class="footer-ad">...</div>', status: 'Inactive' },
]

const PLACEMENTS = ['Home', 'Scholarships', 'Blog', 'Services', 'All Pages']
const AD_TYPES = ['Google AdSense', 'Internal Banner', 'Sponsored']
const EMPTY_FORM = { name: '', placement: 'Home', type: 'Google AdSense', adCode: '', status: 'Active' }
const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white'

const typeColors = {
  'Google AdSense': 'bg-blue-100 text-blue-700',
  'Internal Banner': 'bg-purple-100 text-purple-700',
  'Sponsored': 'bg-orange-100 text-orange-700',
}

export default function AdsManager() {
  const [items, setItems] = useState(INITIAL_DATA)
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState(null)

  const openModal = (item = null) => { setEditItem(item); setForm(item ? { ...item } : EMPTY_FORM); setShowModal(true) }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (editItem) setItems(items.map((i) => (i.id === editItem.id ? { ...form, id: editItem.id } : i)))
    else setItems([...items, { ...form, id: Date.now() }])
    setShowModal(false)
  }
  const handleDelete = (id) => { setItems(items.filter((i) => i.id !== id)); setDeleteId(null) }
  const toggleStatus = (id) => setItems(items.map((i) => i.id === id ? { ...i, status: i.status === 'Active' ? 'Inactive' : 'Active' } : i))
  const activeCount = items.filter((i) => i.status === 'Active').length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Advertisements</h1>
          <p className="text-sm text-gray-500 mt-0.5">{activeCount} active ads · {items.length} total</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-all" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>
          <span className="material-symbols-outlined text-base">add</span> Add Ad
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{ label: 'Total Ads', value: items.length, color: 'text-navy' }, { label: 'Active', value: activeCount, color: 'text-green-600' }, { label: 'Inactive', value: items.length - activeCount, color: 'text-gray-400' }].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Name', 'Placement', 'Type', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5"><p className="font-medium text-navy">{item.name}</p><p className="text-xs text-gray-400 mt-0.5 font-mono truncate max-w-xs">{item.adCode.substring(0, 50)}...</p></td>
                  <td className="px-5 py-3.5"><span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg font-medium">{item.placement}</span></td>
                  <td className="px-5 py-3.5"><span className={`text-xs px-2 py-1 rounded-lg font-semibold ${typeColors[item.type] || 'bg-gray-100 text-gray-600'}`}>{item.type}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleStatus(item.id)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${item.status === 'Active' ? 'bg-primary' : 'bg-gray-200'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${item.status === 'Active' ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                      <span className={`text-xs font-semibold ${item.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>{item.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openModal(item)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">edit</span></button>
                      <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-400"><span className="material-symbols-outlined text-4xl block mb-2">campaign</span>No ads configured</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-heading font-bold text-navy text-lg">{editItem ? 'Edit Ad' : 'Add Ad'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-navy"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Ad Name *</label><input required className={inputClass} placeholder="e.g. Home Page Banner" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Placement</label><select className={inputClass} value={form.placement} onChange={(e) => setForm({ ...form, placement: e.target.value })}>{PLACEMENTS.map((p) => <option key={p}>{p}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Ad Type</label><select className={inputClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>{AD_TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Ad Code / Script</label><textarea rows={6} className={`${inputClass} font-mono text-xs`} placeholder="Paste your ad code or script here..." value={form.adCode} onChange={(e) => setForm({ ...form, adCode: e.target.value })} /></div>
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
            <h3 className="font-heading font-bold text-navy text-center text-lg mb-2">Delete Ad?</h3>
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
