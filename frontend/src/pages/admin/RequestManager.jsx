import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { serviceRequestService } from '../../services/serviceRequestService'
import { uploadService } from '../../services/uploadService'

const TABS = [
  { key: 'All', label: 'All' },
  { key: 'contact', label: 'Contact' },
  { key: 'scholarship-applications', label: 'Scholarship App' },
  { key: 'subscription', label: 'Subscription' },
  { key: 'student-registrations', label: 'Student Registration' },
  { key: 'website-projects', label: 'Website Project' },
  { key: 'database-projects', label: 'Database Project' },
  { key: 'social-media', label: 'Social Media' },
]
const STATUS_OPTIONS = ['New', 'In Review', 'Contacted', 'In Progress', 'Completed', 'Rejected']

const statusColors = {
  New: 'bg-blue-100 text-blue-700',
  'In Review': 'bg-yellow-100 text-yellow-700',
  Contacted: 'bg-purple-100 text-purple-700',
  'In Progress': 'bg-orange-100 text-orange-700',
  Completed: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
}

const typeColors = {
  Contact: 'bg-gray-100 text-gray-700',
  'Scholarship App': 'bg-blue-100 text-blue-700',
  Subscription: 'bg-purple-100 text-purple-700',
  'Student Registration': 'bg-teal-100 text-teal-700',
  'Website Project': 'bg-cyan-100 text-cyan-700',
  'Database Project': 'bg-indigo-100 text-indigo-700',
  'Social Media': 'bg-pink-100 text-pink-700',
}

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>
)

export default function RequestManager() {
  const [searchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [activeTab, setActiveTab] = useState('All')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [notes, setNotes] = useState([])
  const [noteDraft, setNoteDraft] = useState('')
  const [notesLoading, setNotesLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && TABS.some((t) => t.key === tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const loadItems = async () => {
    setLoading(true)
    setError('')
    try {
      if (activeTab === 'All') {
        const types = TABS.filter((tab) => tab.key !== 'All')
        const responses = await Promise.all(types.map((tab) => serviceRequestService.getAllRequests(tab.key, { limit: 100 })))
        setItems(responses.flatMap((response) => response.data.items || []))
      } else {
        const { data } = await serviceRequestService.getAllRequests(activeTab, { limit: 100 })
        setItems(data.items || [])
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load requests.')
    } finally {
      setLoading(false)
    }
  }

  const requestTypeForItem = (item) => TABS.find((tab) => tab.label === item.type)?.key || activeTab

  useEffect(() => {
    loadItems()
  }, [activeTab])

  useEffect(() => {
    if (!selectedRequest) {
      setNotes([])
      setNoteDraft('')
      return
    }
    const rt = requestTypeForItem(selectedRequest)
    setNotesLoading(true)
    serviceRequestService
      .getRequestNotes(rt, selectedRequest._id)
      .then((res) => setNotes(res.data.items || []))
      .catch(() => setNotes([]))
      .finally(() => setNotesLoading(false))
  }, [selectedRequest])

  const submitNote = async () => {
    const text = noteDraft.trim()
    if (!text || !selectedRequest) return
    const rt = requestTypeForItem(selectedRequest)
    try {
      const { data } = await serviceRequestService.addRequestNote(rt, selectedRequest._id, text)
      setNotes((prev) => [...prev, data.note])
      setNoteDraft('')
    } catch (err) {
      window.alert(err.response?.data?.message || 'Could not save note.')
    }
  }

  const filtered = items
  const getCount = (tab) => tab.key === activeTab || activeTab === 'All' ? items.filter((i) => tab.key === 'All' || i.type === tab.label).length : ''

  const updateStatus = async (item, status) => {
    const requestType = requestTypeForItem(item)
    const { data } = await serviceRequestService.updateRequestStatus(requestType, item._id, status)
    setItems(items.map((i) => (i._id === item._id ? data.request : i)))
    if (selectedRequest?._id === item._id) setSelectedRequest(data.request)
  }

  const deleteSelected = async () => {
    const requestType = requestTypeForItem(selectedRequest)
    await serviceRequestService.deleteRequest(requestType, selectedRequest._id)
    setSelectedRequest(null)
    await loadItems()
  }

  const openAttachment = async () => {
    const id = selectedRequest.attachmentFileId
    const url = selectedRequest.attachmentUrl
    if (!id && !url) return
    try {
      if (id) {
        const blob = await uploadService.fetchAdminFileBlob(id)
        const blobUrl = URL.createObjectURL(blob)
        window.open(blobUrl, '_blank', 'noopener')
      } else {
        window.open(url, '_blank', 'noopener')
      }
    } catch (err) {
      window.alert(err.response?.data?.message || 'Could not open attachment.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold text-navy">Requests</h1>
            <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">{items.filter((i) => i.status === 'New').length} new</span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Manage all incoming client requests and inquiries</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {TABS.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.key ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'}`}>
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{getCount(tab)}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Type', 'Name', 'Subject', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400">Loading requests...</td></tr>}
              {error && <tr><td colSpan={6} className="px-5 py-12 text-center text-red-500">{error}</td></tr>}
              {!loading && !error && filtered.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedRequest(item)}>
                  <td className="px-5 py-3.5"><span className={`text-xs px-2 py-1 rounded-lg font-semibold ${typeColors[item.type] || 'bg-gray-100 text-gray-600'}`}>{item.type}</span></td>
                  <td className="px-5 py-3.5"><p className="font-medium text-navy">{item.name}</p><p className="text-xs text-gray-400">{item.email}</p></td>
                  <td className="px-5 py-3.5 text-gray-600 max-w-xs truncate">{item.subject}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{item.date || item.createdAt?.slice(0, 10)}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={item.status} /></td>
                  <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setSelectedRequest(item)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">open_in_new</span></button>
                  </td>
                </tr>
              ))}
              {!loading && !error && filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400"><span className="material-symbols-outlined text-4xl block mb-2">inbox</span>No requests found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${typeColors[selectedRequest.type] || 'bg-gray-100 text-gray-600'}`}>{selectedRequest.type}</span>
                <h2 className="font-heading font-bold text-navy text-lg">Request Details</h2>
              </div>
              <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-navy"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between gap-4">
                <div><p className="text-xs font-semibold text-gray-500 mb-1">Current Status</p><StatusBadge status={selectedRequest.status} /></div>
                <div className="flex-1 max-w-xs">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Update Status</p>
                  <select value={selectedRequest.status} onChange={(e) => updateStatus(selectedRequest, e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-navy focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white">
                    {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Contact Information</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Full Name', value: selectedRequest.name },
                    { label: 'Email', value: selectedRequest.email },
                    { label: 'Phone', value: selectedRequest.phone },
                    { label: 'Date Submitted', value: selectedRequest.date || selectedRequest.createdAt?.slice(0, 10) },
                  ].filter((f) => f.value).map((f) => (
                    <div key={f.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-0.5">{f.label}</p>
                      <p className="font-semibold text-navy text-sm">{f.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Request Details</h3>
                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <p className="text-xs text-gray-400 mb-0.5">Subject</p>
                  <p className="font-semibold text-navy text-sm">{selectedRequest.subject}</p>
                </div>
                {/* Type-specific fields */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {[
                    { label: 'University', value: selectedRequest.university },
                    { label: 'Country', value: selectedRequest.country },
                    { label: 'Degree', value: selectedRequest.degree },
                    { label: 'IELTS Score', value: selectedRequest.ielts },
                    { label: 'Plan', value: selectedRequest.plan },
                    { label: 'Billing Period', value: selectedRequest.billingPeriod },
                    { label: 'Project Type', value: selectedRequest.projectType },
                    { label: 'Budget', value: selectedRequest.budget },
                    { label: 'Timeline', value: selectedRequest.timeline },
                    { label: 'Database Type', value: selectedRequest.dbType },
                    { label: 'Platforms', value: Array.isArray(selectedRequest.platforms) ? selectedRequest.platforms.join(', ') : selectedRequest.platforms },
                    { label: 'Service', value: selectedRequest.service },
                  ].filter((f) => f.value).map((f) => (
                    <div key={f.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-0.5">{f.label}</p>
                      <p className="font-semibold text-navy text-sm">{f.value}</p>
                    </div>
                  ))}
                </div>
                {selectedRequest.message && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Message</p>
                    <p className="text-sm text-navy leading-relaxed">{selectedRequest.message}</p>
                  </div>
                )}
                {(selectedRequest.attachmentFileId || selectedRequest.attachmentUrl) && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Attachment</p>
                      <p className="text-sm text-navy">{selectedRequest.attachmentOriginalName || 'Uploaded file'}</p>
                    </div>
                    <button type="button" onClick={openAttachment} className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-xl text-sm hover:bg-primary-dark transition-colors">
                      <span className="material-symbols-outlined text-base">open_in_new</span>
                      Open file
                    </button>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Admin notes</h3>
                {notesLoading ? (
                  <p className="text-sm text-gray-400">Loading notes…</p>
                ) : (
                  <ul className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                    {notes.length === 0 && <li className="text-sm text-gray-400">No notes yet.</li>}
                    {notes.map((n) => (
                      <li key={n._id} className="text-sm bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <p className="text-navy whitespace-pre-wrap">{n.body}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.createdAt?.replace('T', ' ').slice(0, 19)} · {n.createdBy || 'admin'}</p>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-2">
                  <textarea
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    rows={2}
                    placeholder="Add an internal note…"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-navy focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                  <button type="button" onClick={submitNote} className="self-end px-4 py-2 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy/90">
                    Save
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <a href={`mailto:${selectedRequest.email}`} className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:border-primary hover:text-primary transition-all text-sm">
                  <span className="material-symbols-outlined text-base">mail</span> Reply via Email
                </a>
                <button onClick={deleteSelected} className="flex-1 border border-red-200 text-red-500 font-semibold py-2.5 rounded-xl hover:bg-red-50 transition-all text-sm">Delete</button>
                <button onClick={() => setSelectedRequest(null)} className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
