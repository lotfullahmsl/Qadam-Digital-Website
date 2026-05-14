import React, { useEffect, useState } from 'react'
import adminContentService from '../../services/adminContentService'

const INITIAL_DATA = [
  { id: 1, title: 'Top 10 Scholarships for Afghan Students 2026', slug: 'top-10-scholarships-afghan-students-2026', category: 'Scholarships', author: 'Admin', date: '2026-01-15', status: 'Published', excerpt: 'Discover the best scholarship opportunities available for Afghan students in 2026.', content: '', featuredImage: '', seoTitle: 'Top 10 Scholarships for Afghan Students 2026', seoDescription: 'Best scholarships for Afghan students' },
  { id: 2, title: 'How to Write a Winning Personal Statement', slug: 'how-to-write-winning-personal-statement', category: 'Tips & Guides', author: 'Admin', date: '2026-01-12', status: 'Published', excerpt: 'A step-by-step guide to crafting a compelling personal statement for scholarship applications.', content: '', featuredImage: '', seoTitle: 'How to Write a Winning Personal Statement', seoDescription: 'Guide to personal statements' },
  { id: 3, title: 'IELTS Preparation: Complete Guide for 2026', slug: 'ielts-preparation-complete-guide-2026', category: 'Language Tests', author: 'Admin', date: '2026-01-10', status: 'Draft', excerpt: 'Everything you need to know to prepare for the IELTS exam and achieve a high score.', content: '', featuredImage: '', seoTitle: 'IELTS Preparation Guide 2026', seoDescription: 'Complete IELTS preparation guide' },
  { id: 4, title: 'Best Universities in Germany for International Students', slug: 'best-universities-germany-international-students', category: 'Universities', author: 'Admin', date: '2026-01-08', status: 'Published', excerpt: 'Explore top German universities that welcome international students.', content: '', featuredImage: '', seoTitle: 'Best German Universities for International Students', seoDescription: 'Top universities in Germany' },
  { id: 5, title: 'Digital Marketing Trends to Watch in 2026', slug: 'digital-marketing-trends-2026', category: 'Digital Marketing', author: 'Admin', date: '2026-01-05', status: 'Published', excerpt: 'Stay ahead of the curve with these emerging digital marketing trends for 2026.', content: '', featuredImage: '', seoTitle: 'Digital Marketing Trends 2026', seoDescription: 'Top digital marketing trends' },
]

const CATEGORIES = ['Scholarships', 'Tips & Guides', 'Language Tests', 'Universities', 'Digital Marketing', 'Technology', 'Career']
const EMPTY_FORM = { title: '', slug: '', category: 'Scholarships', author: 'Admin', date: '', excerpt: '', content: '', featuredImage: '', seoTitle: '', seoDescription: '', status: 'Draft' }
const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white'
const toSlug = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const StatusBadge = ({ status }) => {
  const colors = { Published: 'bg-green-100 text-green-700', Draft: 'bg-gray-100 text-gray-600' }
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>
}

export default function BlogManager() {
  const [items, setItems] = useState(INITIAL_DATA)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
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
      const { data } = await adminContentService.getAll('blogs', { limit: 100 })
      setItems(data.items || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load blog posts.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const filtered = items.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.author.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === 'All' || item.category === categoryFilter
    const matchStatus = statusFilter === 'All' || item.status === statusFilter
    return matchSearch && matchCat && matchStatus
  })

  const openModal = (item = null) => { setEditItem(item); setForm(item ? { ...item, date: item.date || item.createdAt, featuredImage: item.featuredImage || item.image || '' } : EMPTY_FORM); setShowModal(true) }
  const handleTitleChange = (val) => setForm((f) => ({ ...f, title: val, slug: toSlug(val), seoTitle: val }))
  const handleSubmit = (e) => {
    e.preventDefault()
    const save = async () => {
      const payload = { ...form, image: form.featuredImage, createdAt: form.date || form.createdAt || new Date().toISOString().split('T')[0] }
      try {
        if (editItem) await adminContentService.update('blogs', editItem._id, payload)
        else await adminContentService.create('blogs', payload)
        setShowModal(false)
        await loadItems()
      } catch (err) {
        alert(err.response?.data?.message || 'Unable to save blog post.')
      }
    }
    save()
  }
  const handleDelete = async (id) => {
    await adminContentService.delete('blogs', id)
    setDeleteId(null)
    await loadItems()
  }
  const toggleStatus = async (item) => {
    await adminContentService.updateStatus('blogs', item._id, item.status === 'Published' ? 'Draft' : 'Published')
    await loadItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-0.5">Create and manage blog content</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-all" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>
          <span className="material-symbols-outlined text-base">add</span> New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 flex flex-wrap gap-3">
        <div className="flex-1 min-w-48 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
          <input type="text" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className={`${inputClass} pl-9`} />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={inputClass + ' w-auto'}><option>All</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={inputClass + ' w-auto'}><option>All</option><option>Published</option><option>Draft</option></select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Title', 'Category', 'Author', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400">Loading posts...</td></tr>}
              {error && <tr><td colSpan={6} className="px-5 py-12 text-center text-red-500">{error}</td></tr>}
              {!loading && !error && filtered.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5"><p className="font-medium text-navy">{item.title}</p><p className="text-xs text-gray-400 mt-0.5">/{item.slug}</p></td>
                  <td className="px-5 py-3.5"><span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg font-medium">{item.category}</span></td>
                  <td className="px-5 py-3.5 text-gray-600">{item.author}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{item.date || item.createdAt}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={item.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleStatus(item)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">{item.status === 'Published' ? 'visibility_off' : 'visibility'}</span></button>
                      <button onClick={() => openModal(item)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">edit</span></button>
                      <button onClick={() => setDeleteId(item._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && !error && filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400"><span className="material-symbols-outlined text-4xl block mb-2">article</span>No posts found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-heading font-bold text-navy text-lg">{editItem ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-navy"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Title *</label><input required className={inputClass} placeholder="Post title" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Slug</label><input className={inputClass} placeholder="post-slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label><select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Author</label><input className={inputClass} placeholder="Author name" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Excerpt</label><textarea rows={2} className={inputClass} placeholder="Short description..." value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Content</label><textarea rows={8} className={inputClass} placeholder="Full article content..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Featured Image URL</label><input className={inputClass} placeholder="https://..." value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">SEO Title</label><input className={inputClass} placeholder="SEO title" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label><select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Draft</option><option>Published</option></select></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">SEO Description</label><textarea rows={2} className={inputClass} placeholder="Meta description..." value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} /></div>
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
            <h3 className="font-heading font-bold text-navy text-center text-lg mb-2">Delete Post?</h3>
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
