import React, { useEffect, useState } from 'react'
import adminContentService from '../../services/adminContentService'

/** Must match public /pricing and /pricing-packages?category= values */
const PRICING_CATEGORY_OPTIONS = [
  { slug: 'ai', label: 'AI Subscriptions' },
  { slug: 'scholarship', label: 'Scholarship Services' },
  { slug: 'cv', label: 'CV & Translation' },
  { slug: 'web', label: 'Web Development' },
  { slug: 'database', label: 'Database Systems' },
  { slug: 'smm', label: 'Social Media Marketing' },
]

function pricingCategoryLabel(slug) {
  if (!slug) return ''
  const found = PRICING_CATEGORY_OPTIONS.find((o) => o.slug === slug)
  return found ? found.label : String(slug)
}

function normalizePricingCategory(value) {
  if (!value) return 'ai'
  if (PRICING_CATEGORY_OPTIONS.some((o) => o.slug === value)) return value
  const byLabel = PRICING_CATEGORY_OPTIONS.find((o) => o.label === value)
  return byLabel ? byLabel.slug : value
}

const EMPTY_FORM = { name: '', category: 'ai', price: '', period: '/mo', features: '', popular: false, badge: '', status: 'Active' }
const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white'

const StatusBadge = ({ status }) => {
  const colors = { Active: 'bg-green-100 text-green-700', Inactive: 'bg-gray-100 text-gray-500' }
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>
}

export default function PricingManager() {
  const [items, setItems] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
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
      const { data } = await adminContentService.getAll('pricing-packages', { limit: 100 })
      setItems(data.items || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load pricing packages.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const normalizedKeys = items.map((i) => normalizePricingCategory(i.category))
  const filtered = activeCategory === 'All' ? items : items.filter((i) => normalizePricingCategory(i.category) === activeCategory)
  const categories = ['All', ...new Set([...PRICING_CATEGORY_OPTIONS.map((o) => o.slug), ...normalizedKeys].filter(Boolean))]
  const openModal = (item = null) => {
    setEditItem(item)
    setForm(
      item
        ? {
            ...item,
            category: normalizePricingCategory(item.category),
            features: Array.isArray(item.features) ? item.features.join('\n') : item.features || '',
          }
        : EMPTY_FORM,
    )
    setShowModal(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const save = async () => {
      try {
        if (editItem) await adminContentService.update('pricing-packages', editItem._id, form)
        else await adminContentService.create('pricing-packages', form)
        setShowModal(false)
        await loadItems()
      } catch (err) {
        alert(err.response?.data?.message || 'Unable to save package.')
      }
    }
    save()
  }
  const handleDelete = async (id) => {
    await adminContentService.delete('pricing-packages', id)
    setDeleteId(null)
    await loadItems()
  }
  const toggleStatus = async (item) => {
    await adminContentService.updateStatus('pricing-packages', item._id, item.status === 'Active' ? 'Inactive' : 'Active')
    await loadItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Pricing & Packages</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage service packages and pricing plans</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-all" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>
          <span className="material-symbols-outlined text-base">add</span> Add Package
        </button>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'}`}>
            {cat === 'All' ? 'All' : pricingCategoryLabel(cat)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Name', 'Category', 'Price', 'Popular', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400">Loading packages...</td></tr>}
              {error && <tr><td colSpan={6} className="px-5 py-12 text-center text-red-500">{error}</td></tr>}
              {!loading && !error && filtered.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-navy">{item.name}</p>
                      {item.popular && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">{item.badge || 'Popular'}</span>}
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg font-medium">{pricingCategoryLabel(item.category)}</span></td>
                  <td className="px-5 py-3.5"><span className="font-bold text-navy">${item.price}</span><span className="text-gray-400 text-xs">{item.period}</span></td>
                  <td className="px-5 py-3.5">{item.popular ? <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> : <span className="material-symbols-outlined text-gray-300 text-lg">remove_circle</span>}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={item.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleStatus(item)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">{item.status === 'Active' ? 'toggle_on' : 'toggle_off'}</span></button>
                      <button onClick={() => openModal(item)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">edit</span></button>
                      <button onClick={() => setDeleteId(item._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && !error && filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400"><span className="material-symbols-outlined text-4xl block mb-2">sell</span>No packages in this category</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-heading font-bold text-navy text-lg">{editItem ? 'Edit Package' : 'Add Package'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-navy"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Package Name *</label><input required className={inputClass} placeholder="e.g. AI Pro" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label><select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{PRICING_CATEGORY_OPTIONS.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Price ($)</label><input className={inputClass} placeholder="99" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Period</label><select className={inputClass} value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })}><option value="/mo">/mo</option><option value="/yr">/yr</option><option value="">One-time</option></select></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Features (one per line)</label><textarea rows={5} className={inputClass} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Badge Text</label><input className={inputClass} placeholder="e.g. Most Popular" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label><select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>Inactive</option></select></div>
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div onClick={() => setForm({ ...form, popular: !form.popular })} className={`w-11 h-6 rounded-full transition-colors relative ${form.popular ? 'bg-primary' : 'bg-gray-200'}`}>
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.popular ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                    <span className="text-sm font-medium text-navy">Mark as Popular</span>
                  </label>
                </div>
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
            <h3 className="font-heading font-bold text-navy text-center text-lg mb-2">Delete Package?</h3>
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
