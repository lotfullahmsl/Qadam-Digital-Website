import React, { useState } from 'react'

const INITIAL_DATA = [
  { id: 1, type: 'Contact', name: 'Ahmad Karimi', email: 'ahmad.karimi@gmail.com', phone: '+93 700 123 456', subject: 'General Inquiry about Scholarships', message: 'I would like to know more about scholarship opportunities for Afghan students in Europe.', date: '2026-05-08', status: 'New' },
  { id: 2, type: 'Scholarship App', name: 'Sara Mohammadi', email: 'sara.m@yahoo.com', phone: '+98 912 345 678', subject: 'Chevening Scholarship 2026', message: 'I am applying for the Chevening Scholarship and need guidance on the personal statement.', university: 'University of Oxford', degree: 'MS', country: 'UK', ielts: '7.5', date: '2026-05-07', status: 'In Review' },
  { id: 3, type: 'Subscription', name: 'Reza Ahmadi', email: 'reza.ahmadi@outlook.com', phone: '+98 935 678 901', subject: 'AI Pro Plan', plan: 'AI Pro', billingPeriod: 'Monthly', paymentMethod: 'Credit Card', message: 'I want to subscribe to the AI Pro plan for my research work.', date: '2026-05-07', status: 'Contacted' },
  { id: 4, type: 'Website Project', name: 'Maryam Hosseini', email: 'maryam.h@gmail.com', phone: '+98 901 234 567', subject: 'E-commerce Website', projectType: 'E-commerce', budget: '$1000-$2000', timeline: '2 months', message: 'I need a full e-commerce website for my clothing business with payment integration.', date: '2026-05-06', status: 'In Progress' },
  { id: 5, type: 'Contact', name: 'Ali Moradi', email: 'ali.moradi@gmail.com', phone: '+93 799 876 543', subject: 'CV Translation Service', message: 'I need my CV translated from Dari to English for a job application in Germany.', date: '2026-05-05', status: 'Completed' },
  { id: 6, type: 'Database Project', name: 'Fatima Rahimi', email: 'fatima.r@gmail.com', phone: '+93 700 555 444', subject: 'Inventory Management System', dbType: 'PostgreSQL', projectSize: 'Medium', timeline: '3 months', message: 'We need a complete inventory management system for our warehouse with barcode scanning.', date: '2026-05-04', status: 'New' },
  { id: 7, type: 'Social Media', name: 'Hassan Nazari', email: 'hassan.n@gmail.com', phone: '+98 912 111 222', subject: 'Instagram & Facebook Management', platforms: 'Instagram, Facebook', postsPerMonth: '20', budget: '$300/mo', message: 'I want to grow my restaurant business on social media. Need content creation and management.', date: '2026-05-03', status: 'In Review' },
  { id: 8, type: 'Scholarship App', name: 'Zahra Ahmadi', email: 'zahra.a@gmail.com', phone: '+98 935 999 888', subject: 'DAAD Scholarship Germany', university: 'TU Munich', degree: 'PhD', country: 'Germany', ielts: '6.5', message: 'I need help with my DAAD scholarship application. My research area is Computer Science.', date: '2026-05-02', status: 'Contacted' },
  { id: 9, type: 'Website Project', name: 'Omid Karimi', email: 'omid.k@outlook.com', phone: '+93 700 777 666', subject: 'Portfolio Website', projectType: 'Portfolio', budget: '$300-$500', timeline: '3 weeks', message: 'I am a photographer and need a beautiful portfolio website to showcase my work.', date: '2026-05-01', status: 'Completed' },
  { id: 10, type: 'Subscription', name: 'Neda Hosseini', email: 'neda.h@gmail.com', phone: '+98 901 444 333', subject: 'AI Starter Plan', plan: 'AI Starter', billingPeriod: 'Monthly', paymentMethod: 'Bank Transfer', message: 'I want to try the AI Starter plan for my translation work.', date: '2026-04-30', status: 'Rejected' },
]

const TABS = ['All', 'Contact', 'Scholarship App', 'Subscription', 'Website Project', 'Database Project', 'Social Media']
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
  'Website Project': 'bg-cyan-100 text-cyan-700',
  'Database Project': 'bg-indigo-100 text-indigo-700',
  'Social Media': 'bg-pink-100 text-pink-700',
}

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>
)

export default function RequestManager() {
  const [items, setItems] = useState(INITIAL_DATA)
  const [activeTab, setActiveTab] = useState('All')
  const [selectedRequest, setSelectedRequest] = useState(null)

  const filtered = activeTab === 'All' ? items : items.filter((i) => i.type === activeTab)
  const getCount = (tab) => tab === 'All' ? items.length : items.filter((i) => i.type === tab).length

  const updateStatus = (id, status) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status } : i)))
    if (selectedRequest?.id === id) setSelectedRequest({ ...selectedRequest, status })
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
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === tab ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'}`}>
            {tab}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === tab ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{getCount(tab)}</span>
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
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedRequest(item)}>
                  <td className="px-5 py-3.5"><span className={`text-xs px-2 py-1 rounded-lg font-semibold ${typeColors[item.type] || 'bg-gray-100 text-gray-600'}`}>{item.type}</span></td>
                  <td className="px-5 py-3.5"><p className="font-medium text-navy">{item.name}</p><p className="text-xs text-gray-400">{item.email}</p></td>
                  <td className="px-5 py-3.5 text-gray-600 max-w-xs truncate">{item.subject}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{item.date}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={item.status} /></td>
                  <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setSelectedRequest(item)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-base">open_in_new</span></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400"><span className="material-symbols-outlined text-4xl block mb-2">inbox</span>No requests found</td></tr>}
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
                  <select value={selectedRequest.status} onChange={(e) => updateStatus(selectedRequest.id, e.target.value)}
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
                    { label: 'Date Submitted', value: selectedRequest.date },
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
                    { label: 'Platforms', value: selectedRequest.platforms },
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
              </div>

              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <a href={`mailto:${selectedRequest.email}`} className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:border-primary hover:text-primary transition-all text-sm">
                  <span className="material-symbols-outlined text-base">mail</span> Reply via Email
                </a>
                <button onClick={() => setSelectedRequest(null)} className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm" style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.3)' }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
