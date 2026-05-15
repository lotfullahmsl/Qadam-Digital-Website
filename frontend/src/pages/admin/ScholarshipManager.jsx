import React, { useEffect, useState } from 'react'
import { uploadService } from '../../services/uploadService'
import adminContentService from '../../services/adminContentService'
import { cmsText, cmsTextLower } from '../../utils/cmsText'

const EMPTY_FORM = { title: '', country: '', university: '', degree: 'MS', deadline: '', fundingType: 'Fully Funded', description: '', eligibility: '', benefits: '', status: 'Draft', image: '', seoTitle: '', seoDescription: '', ogImage: '' }
const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white'

const StatusBadge = ({ status }) => {
  const colors = { Published: 'bg-green-100 text-green-700', Draft: 'bg-gray-100 text-gray-600' }
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>
}

export default function ScholarshipManager() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [countryFilter, setCountryFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imageUploadPct, setImageUploadPct] = useState(null)

  const loadItems = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await adminContentService.getAll('scholarships', { limit: 100 })
      setItems(data.items || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load scholarships.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const countries = ['All', ...new Set(items.map((i) => cmsText(i.country)).filter(Boolean))]
  const filtered = items.filter((item) => {
    const q = search.toLowerCase()
    const matchSearch =
      cmsTextLower(item.title).includes(q) ||
      cmsTextLower(item.university).includes(q)
    const matchStatus = statusFilter === 'All' || item.status === statusFilter
    const matchCountry = countryFilter === 'All' || cmsText(item.country) === countryFilter
    return matchSearch && matchStatus && matchCountry
  })

  const openModal = (item = null) => { setEditItem(item); setForm(item ? { ...item } : EMPTY_FORM); setShowModal(true) }
  const handleSubmit = (e) => {
    e.preventDefault()
    const save = async () => {
      try {
        if (editItem) await adminContentService.update('scholarships', editItem._id, form)
        else await adminContentService.create('scholarships', form)
        setShowModal(false)
        await loadItems()
      } catch (err) {
        alert(err.response?.data?.message || 'Unable to save scholarship.')
      }
    }
    save()
  }
  const handleDelete = async (id) => {
    await adminContentService.delete('scholarships', id)
    setDeleteId(null)
    await loadItems()
  }
  const toggleStatus = async (item) => {
    await adminContentService.updateStatus('scholarships', item._id, item.status === 'Published' ? 'Draft' : 'Published')
    await loadItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Scholarships</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage scholarship listings and applications</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-all" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>
          <span className="material-symbols-outlined text-base">add</span> Add Scholarship
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 flex flex-wrap gap-3">
        <div className="flex-1 min-w-48 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
          <input type="text" placeholder="Search scholarships..." value={search} onChange={(e) => setSearch(e.target.value)} className={`${inputClass} pl-9`} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={inputClass + ' w-auto'}>
          <option>All</option><option>Published</option><option>Draft</option>
        </select>
        <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className={inputClass + ' w-auto'}>
          {countries.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Title', 'Country', 'Degree', 'Deadline', 'Funding', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading && <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-400">Loading scholarships...</td></tr>}
              {error && <tr><td colSpan={7} className="px-5 py-12 text-center text-red-500">{error}</td></tr>}
              {!loading && !error && filtered.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {/* Thumbnail */}
                      <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-primary-pale border border-border">
                        {item.image ? (
                          <img src={item.image} alt={cmsText(item.title)} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary/30 text-xl">image</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-navy">{cmsText(item.title)}</p>
                        <p className="text-xs text-gray-400">{cmsText(item.university)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{cmsText(item.country)}</td>
                  <td className="px-5 py-3.5 text-gray-600">{item.degree}</td>
                  <td className="px-5 py-3.5 text-gray-600">{item.deadline}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${item.fundingType === 'Fully Funded' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>{item.fundingType}</span>
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={item.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleStatus(item)} title="Toggle" className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">{item.status === 'Published' ? 'visibility_off' : 'visibility'}</span></button>
                      <button onClick={() => openModal(item)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">edit</span></button>
                      <button onClick={() => setDeleteId(item._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && !error && filtered.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-400"><span className="material-symbols-outlined text-4xl block mb-2">search_off</span>No scholarships found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-heading font-bold text-navy text-lg">{editItem ? 'Edit Scholarship' : 'Add Scholarship'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-navy"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Title *</label><input required className={inputClass} placeholder="Scholarship title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>

                {/* Image Upload */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    University / Scholarship Image
                  </label>

                  <div className="flex gap-4 items-start">
                    {/* Preview box */}
                    <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center relative group">
                      {form.image ? (
                        <>
                          <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setForm({ ...form, image: '' })}
                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </>
                      ) : (
                        <div className="text-center">
                          <span className="material-symbols-outlined text-gray-300 text-3xl block">image</span>
                          <span className="text-xs text-gray-300 mt-1">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Upload controls */}
                    <div className="flex-1 space-y-3">
                      {/* File picker button */}
                      <label className={`flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-xl text-sm cursor-pointer hover:bg-primary-dark transition-all w-fit ${imageUploadPct != null ? 'opacity-80 pointer-events-none' : ''}`}
                        style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>
                        <span className="material-symbols-outlined text-base">upload</span>
                        {imageUploadPct != null ? `Uploading ${imageUploadPct}%…` : 'Upload from Device'}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            e.target.value = ''
                            if (!file) return
                            if (file.size > 10 * 1024 * 1024) {
                              alert('Image must be under 10MB')
                              return
                            }
                            setImageUploadPct(0)
                            try {
                              const { data } = await uploadService.upload(file, setImageUploadPct)
                              if (data?.url) setForm((f) => ({ ...f, image: data.url }))
                            } catch (err) {
                              alert(err.response?.data?.message || 'Upload failed.')
                            } finally {
                              setImageUploadPct(null)
                            }
                          }}
                        />
                      </label>

                      <p className="text-xs text-gray-400">Saves to server · JPG, PNG, WEBP · Max 10MB</p>

                      {/* OR paste URL */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400">or paste URL</span>
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>
                      <input
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white"
                        placeholder="https://example.com/university.jpg"
                        value={form.image && form.image.startsWith('data:') ? '' : form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Country *</label><input required className={inputClass} placeholder="e.g. UK" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">University *</label><input required className={inputClass} placeholder="University name" value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Degree</label><select className={inputClass} value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })}><option>BS</option><option>MS</option><option>PhD</option></select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Deadline</label><input type="date" className={inputClass} value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Funding Type</label><select className={inputClass} value={form.fundingType} onChange={(e) => setForm({ ...form, fundingType: e.target.value })}><option>Fully Funded</option><option>Partial</option><option>Tuition Only</option></select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label><select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Draft</option><option>Published</option></select></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label><textarea rows={3} className={inputClass} placeholder="Scholarship description..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">SEO title</label><input className={inputClass} placeholder="Meta title" value={form.seoTitle || ''} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">SEO image URL</label><input className={inputClass} placeholder="https://..." value={form.ogImage || ''} onChange={(e) => setForm({ ...form, ogImage: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">SEO description</label><textarea rows={2} className={inputClass} placeholder="Meta description" value={form.seoDescription || ''} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} /></div>
                </div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Eligibility</label><textarea rows={3} className={inputClass} placeholder="Eligibility criteria..." value={form.eligibility} onChange={(e) => setForm({ ...form, eligibility: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Benefits</label><textarea rows={3} className={inputClass} placeholder="What's covered..." value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} /></div>
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
            <h3 className="font-heading font-bold text-navy text-center text-lg mb-2">Delete Scholarship?</h3>
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
