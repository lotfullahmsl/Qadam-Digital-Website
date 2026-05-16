import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import adminContentService from '../../services/adminContentService'
import { cmsText } from '../../utils/cmsText'

const CATEGORY_OPTIONS = ['Education', 'Technology', 'Marketing', 'Design']

/** English category label → i18n dict for API + categoryKey (derived from EN label on server). */
const CATEGORY_I18N = {
  Education: { en: 'Education', ps: 'زده‌کړه', fa: 'آموزش' },
  Technology: { en: 'Technology', ps: 'ټیکنالوژي', fa: 'فناوری' },
  Marketing: { en: 'Marketing', ps: 'مارکېټینګ', fa: 'بازاریابی' },
  Design: { en: 'Design', ps: 'ډیزاین', fa: 'طراحی' },
}

const EMPTY_FORM = {
  categorySelect: 'Technology',
  icon: 'star',
  titleEn: '',
  titlePs: '',
  titleFa: '',
  descEn: '',
  descPs: '',
  descFa: '',
  featuresEn: '',
  featuresPs: '',
  featuresFa: '',
  ctaLink: '',
  status: 'Active',
}

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white'

function toTriplet(val) {
  if (val == null) return { en: '', ps: '', fa: '' }
  if (typeof val === 'string') return { en: val, ps: '', fa: '' }
  if (typeof val === 'object') {
    return { en: (val.en || '').trim(), ps: (val.ps || '').trim(), fa: (val.fa || '').trim() }
  }
  return { en: String(val), ps: '', fa: '' }
}

function linesFromString(s) {
  return String(s || '')
    .split('\n')
    .map((l) => l.trim())
}

function zipFeatures(enBlock, psBlock, faBlock) {
  const en = linesFromString(enBlock)
  const ps = linesFromString(psBlock)
  const fa = linesFromString(faBlock)
  const n = Math.max(en.length, ps.length, fa.length)
  if (n === 0) return []
  const out = []
  for (let i = 0; i < n; i++) {
    const o = {}
    if (en[i]) o.en = en[i]
    if (ps[i]) o.ps = ps[i]
    if (fa[i]) o.fa = fa[i]
    if (Object.keys(o).length) out.push(o)
  }
  return out
}

function tripleFromFeatures(features) {
  if (!Array.isArray(features)) return { en: '', ps: '', fa: '' }
  const en = []
  const ps = []
  const fa = []
  for (const f of features) {
    if (typeof f === 'string') {
      en.push(f)
      ps.push('')
      fa.push('')
    } else if (f && typeof f === 'object') {
      en.push(f.en || '')
      ps.push(f.ps || '')
      fa.push(f.fa || '')
    }
  }
  return {
    en: en.join('\n'),
    ps: ps.join('\n'),
    fa: fa.join('\n'),
  }
}

function inferCategorySelect(category) {
  if (typeof category === 'object' && category?.en) {
    const found = CATEGORY_OPTIONS.find((opt) => CATEGORY_I18N[opt].en === category.en)
    if (found) return found
  }
  if (typeof category === 'string') {
    const found = CATEGORY_OPTIONS.find((opt) => CATEGORY_I18N[opt].en === category)
    if (found) return found
  }
  return 'Technology'
}

export default function ServiceManager() {
  const { t } = useTranslation()
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const categoryDotClass = {
    Education: 'bg-blue-100 text-blue-700',
    Technology: 'bg-purple-100 text-purple-700',
    Marketing: 'bg-orange-100 text-orange-700',
    Design: 'bg-pink-100 text-pink-700',
  }

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
    if (!item) {
      setForm(EMPTY_FORM)
      setShowModal(true)
      return
    }
    const tit = toTriplet(item.title)
    const desc = toTriplet(item.description)
    const ft = tripleFromFeatures(item.features)
    setForm({
      categorySelect: inferCategorySelect(item.category),
      icon: item.icon || 'star',
      titleEn: tit.en,
      titlePs: tit.ps,
      titleFa: tit.fa,
      descEn: desc.en,
      descPs: desc.ps,
      descFa: desc.fa,
      featuresEn: ft.en,
      featuresPs: ft.ps,
      featuresFa: ft.fa,
      ctaLink: item.ctaLink || item.to || '',
      status: item.status || 'Active',
    })
    setShowModal(true)
  }

  const buildPayload = () => {
    const category = CATEGORY_I18N[form.categorySelect] || CATEGORY_I18N.Technology
    return {
      title: { en: form.titleEn.trim(), ps: form.titlePs.trim(), fa: form.titleFa.trim() },
      description: { en: form.descEn.trim(), ps: form.descPs.trim(), fa: form.descFa.trim() },
      category,
      features: zipFeatures(form.featuresEn, form.featuresPs, form.featuresFa),
      icon: form.icon,
      ctaLink: form.ctaLink,
      to: form.ctaLink,
      status: form.status,
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.titleEn.trim() || !form.descEn.trim()) {
      alert(t('admin.save_require_en'))
      return
    }
    const save = async () => {
      try {
        const payload = buildPayload()
        if (editItem) await adminContentService.update('services', editItem._id, payload)
        else await adminContentService.create('services', payload)
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

  const categoryBadgeClass = (item) => {
    const sel = inferCategorySelect(item.category)
    return categoryDotClass[sel] || 'bg-gray-100 text-gray-600'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">{t('admin.service_manager_title')}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{t('admin.service_manager_subtitle')}</p>
        </div>
        <button type="button" onClick={() => openModal()} className="flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-all z-10 relative" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>
          <span className="material-symbols-outlined text-base">add</span> {t('admin.add_service')}
        </button>
      </div>

      <p className="text-xs text-gray-500 mb-4 max-w-3xl">{t('admin.locale_hint')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading && <div className="col-span-full py-12 text-center text-gray-400">{t('admin.loading_services')}</div>}
        {error && <div className="col-span-full py-12 text-center text-red-500">{error}</div>}
        {!loading && !error && items.map((item) => (
          <div key={item._id} className={`bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition-shadow group relative ${item.status === 'Inactive' ? 'border-gray-100 opacity-60' : 'border-gray-100'}`}>
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button type="button" onClick={() => toggleStatus(item)} className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors"><span className="material-symbols-outlined text-sm">{item.status === 'Active' ? 'visibility_off' : 'visibility'}</span></button>
              <button type="button" onClick={() => openModal(item)} className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
              <button type="button" onClick={() => setDeleteId(item._id)} className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
            </div>
            <h3 className="font-heading font-bold text-navy text-sm leading-snug mb-1">{cmsText(item.title)}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${categoryBadgeClass(item)}`}>{cmsText(item.category)}</span>
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">{cmsText(item.description)}</p>
            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
              <span className={`text-xs font-semibold ${item.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>● {item.status === 'Active' ? t('admin.active') : t('admin.inactive')}</span>
              <span className="text-xs text-primary">{item.ctaLink || item.to}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-heading font-bold text-navy text-lg">{editItem ? t('admin.edit_service') : t('admin.new_service')}</h2>
              <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 hover:text-navy"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <p className="text-xs text-gray-500">{t('admin.locale_hint')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.title_en')}</label><input required className={inputClass} value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.title_ps')}</label><input className={inputClass} value={form.titlePs} onChange={(e) => setForm({ ...form, titlePs: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.title_fa')}</label><input className={inputClass} value={form.titleFa} onChange={(e) => setForm({ ...form, titleFa: e.target.value })} /></div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.icon_label')}</label>
                  <div className="flex gap-2">
                    <input className={inputClass} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-primary text-xl">{form.icon || 'star'}</span></div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.category_label')}</label>
                  <select className={inputClass} value={form.categorySelect} onChange={(e) => setForm({ ...form, categorySelect: e.target.value })}>
                    {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.cta_label')}</label><input className={inputClass} value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.description_en')}</label><textarea required rows={3} className={inputClass} value={form.descEn} onChange={(e) => setForm({ ...form, descEn: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.description_ps')}</label><textarea rows={3} className={inputClass} value={form.descPs} onChange={(e) => setForm({ ...form, descPs: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.description_fa')}</label><textarea rows={3} className={inputClass} value={form.descFa} onChange={(e) => setForm({ ...form, descFa: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.features_en')}</label><textarea rows={4} className={inputClass} value={form.featuresEn} onChange={(e) => setForm({ ...form, featuresEn: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.features_ps')}</label><textarea rows={4} className={inputClass} value={form.featuresPs} onChange={(e) => setForm({ ...form, featuresPs: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.features_fa')}</label><textarea rows={4} className={inputClass} value={form.featuresFa} onChange={(e) => setForm({ ...form, featuresFa: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('admin.status_label')}</label><select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="Active">{t('admin.active')}</option><option value="Inactive">{t('admin.inactive')}</option></select></div>
              </div>
              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:border-primary hover:text-primary transition-all text-sm">{t('admin.cancel')}</button>
                <button type="submit" className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>{t('admin.save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="material-symbols-outlined text-red-500 text-2xl">delete</span></div>
            <h3 className="font-heading font-bold text-navy text-center text-lg mb-2">{t('admin.delete_service_title')}</h3>
            <p className="text-gray-500 text-sm text-center mb-6">{t('admin.delete_service_body')}</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm">{t('admin.cancel')}</button>
              <button type="button" onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 text-white font-semibold py-2.5 rounded-xl hover:bg-red-600 text-sm">{t('common.delete')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
