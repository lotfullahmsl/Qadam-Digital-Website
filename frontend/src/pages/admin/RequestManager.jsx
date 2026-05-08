import React, { useState } from 'react'

const REQUEST_TYPES = ['Contact', 'Scholarship Application', 'Subscription', 'Website Project', 'Database Project', 'Social Media']
const STATUSES = ['New', 'In Review', 'Contacted', 'In Progress', 'Completed', 'Rejected']

const MOCK_REQUESTS = [
  { _id: '1', type: 'Contact', name: 'Ahmad Karimi', email: 'ahmad@email.com', service: 'Scholarship Guidance', date: '2026-05-01', status: 'New' },
  { _id: '2', type: 'Scholarship Application', name: 'Sara Mohammadi', email: 'sara@email.com', service: 'DAAD Germany', date: '2026-04-28', status: 'In Review' },
  { _id: '3', type: 'Subscription', name: 'Bilal Yousafzai', email: 'bilal@email.com', service: 'ChatGPT Plus', date: '2026-04-25', status: 'Completed' },
  { _id: '4', type: 'Website Project', name: 'Clinic Kabul', email: 'clinic@email.com', service: 'Business Website', date: '2026-04-20', status: 'In Progress' },
]

const STATUS_COLORS = {
  'New': 'bg-primary/10 text-primary',
  'In Review': 'bg-tertiary/10 text-tertiary',
  'Contacted': 'bg-secondary/10 text-secondary',
  'In Progress': 'bg-yellow-500/10 text-yellow-400',
  'Completed': 'bg-green-500/10 text-green-400',
  'Rejected': 'bg-error/10 text-error',
}

export default function RequestManager() {
  const [requests, setRequests] = useState(MOCK_REQUESTS)
  const [activeType, setActiveType] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = activeType === 'All' ? requests : requests.filter((r) => r.type === activeType)

  const updateStatus = (id, status) => {
    setRequests(requests.map((r) => r._id === id ? { ...r, status } : r))
    setSelected(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-on-surface">Request Manager</h1>
        <p className="text-sm text-on-surface-variant mt-1">Manage all incoming service requests</p>
      </div>

      {/* Type Filter */}
      <div className="flex flex-wrap gap-2">
        {['All', ...REQUEST_TYPES].map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all ${
              activeType === type ? 'bg-primary text-on-primary' : 'border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-outline-variant/30">
              {['Type', 'Name', 'Email', 'Service', 'Date', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r._id} className="border-b border-outline-variant/20 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-on-surface-variant text-xs">{r.type}</td>
                <td className="px-6 py-4 text-on-surface font-medium">{r.name}</td>
                <td className="px-6 py-4 text-on-surface-variant">{r.email}</td>
                <td className="px-6 py-4 text-on-surface-variant">{r.service}</td>
                <td className="px-6 py-4 text-on-surface-variant">{r.date}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold tracking-widest uppercase px-2 py-1 rounded-full ${STATUS_COLORS[r.status] || ''}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => setSelected(r)} className="text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Update Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-panel rounded-2xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-heading text-lg font-semibold text-on-surface">Update Status</h3>
            <p className="text-sm text-on-surface-variant">Request from: <span className="text-on-surface">{selected.name}</span></p>
            <div className="space-y-2">
              {STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(selected._id, status)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    selected.status === status ? 'bg-primary/10 text-primary border border-primary/30' : 'hover:bg-white/5 text-on-surface-variant'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <button onClick={() => setSelected(null)} className="w-full border border-outline-variant/30 text-on-surface-variant py-2 rounded-lg text-sm hover:border-primary hover:text-primary transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
