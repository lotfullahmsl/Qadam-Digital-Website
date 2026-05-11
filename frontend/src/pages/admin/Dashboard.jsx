import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants/routes'

const STAT_CARDS = [
  { label: 'Scholarships', value: 24, icon: 'school', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', trend: '+12%', trendUp: true, link: ROUTES.ADMIN_SCHOLARSHIPS },
  { label: 'New Requests', value: 8, icon: 'inbox', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', trend: '+5 today', trendUp: true, link: ROUTES.ADMIN_REQUESTS },
  { label: 'Portfolio Items', value: 6, icon: 'work', iconBg: 'bg-green-100', iconColor: 'text-green-600', trend: '+2%', trendUp: true, link: ROUTES.ADMIN_PORTFOLIO },
  { label: 'Pricing Plans', value: 10, icon: 'sell', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600', trend: 'No change', trendUp: null, link: ROUTES.ADMIN_PRICING },
  { label: 'Services', value: 8, icon: 'build', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', trend: '+1%', trendUp: true, link: ROUTES.ADMIN_SERVICES },
  { label: 'Total Users', value: 142, icon: 'group', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', trend: '+18%', trendUp: true, link: ROUTES.ADMIN_REQUESTS },
]

const QUICK_ACTIONS = [
  { label: 'Add Scholarship', icon: 'school', to: ROUTES.ADMIN_SCHOLARSHIPS, color: 'bg-primary' },
  { label: 'View Requests', icon: 'inbox', to: ROUTES.ADMIN_REQUESTS, color: 'bg-orange-500' },
  { label: 'Manage Portfolio', icon: 'work', to: ROUTES.ADMIN_PORTFOLIO, color: 'bg-green-600' },
  { label: 'Site Settings', icon: 'settings', to: ROUTES.ADMIN_SETTINGS, color: 'bg-gray-700' },
]

const RECENT_ACTIVITY = [
  { type: 'Contact', name: 'Ahmad Karimi', email: 'ahmad@example.com', subject: 'General Inquiry', date: '2026-05-08', status: 'New' },
  { type: 'Scholarship App', name: 'Sara Mohammadi', email: 'sara@example.com', subject: 'Chevening 2026', date: '2026-05-07', status: 'In Review' },
  { type: 'Subscription', name: 'Reza Ahmadi', email: 'reza@example.com', subject: 'AI Pro Plan', date: '2026-05-07', status: 'Contacted' },
  { type: 'Website Project', name: 'Maryam Hosseini', email: 'maryam@example.com', subject: 'E-commerce Site', date: '2026-05-06', status: 'In Progress' },
  { type: 'Contact', name: 'Ali Moradi', email: 'ali@example.com', subject: 'CV Translation', date: '2026-05-05', status: 'Completed' },
  { type: 'Database Project', name: 'Fatima Rahimi', email: 'fatima@example.com', subject: 'Inventory System', date: '2026-05-04', status: 'New' },
]

const RECENT_POSTS = [
  { title: 'Top 10 Scholarships for Afghan Students 2026', category: 'Scholarships', date: '2026-05-01', status: 'Published' },
  { title: 'How to Write a Winning Personal Statement', category: 'Tips & Guides', date: '2026-04-28', status: 'Published' },
  { title: 'IELTS Preparation: Complete Guide', category: 'Language Tests', date: '2026-04-25', status: 'Draft' },
]

const statusColors = {
  New: 'bg-blue-100 text-blue-700',
  'In Review': 'bg-yellow-100 text-yellow-700',
  Contacted: 'bg-purple-100 text-purple-700',
  'In Progress': 'bg-orange-100 text-orange-700',
  Completed: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
  Published: 'bg-green-100 text-green-700',
  Draft: 'bg-gray-100 text-gray-600',
}

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>
    {status}
  </span>
)

export default function Dashboard() {
  const { admin } = useAuth()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy to-primary-dark rounded-2xl p-6 text-white flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold mb-1 text-white">Welcome back, {admin?.name || 'Admin'} 👋</h1>
          <p className="text-white/70 text-sm">{today}</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-white/80">admin_panel_settings</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STAT_CARDS.map((card) => (
          <Link key={card.label} to={card.link} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-xl ${card.iconColor}`}>{card.icon}</span>
              </div>
              {card.trendUp !== null ? (
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${card.trendUp ? 'text-green-600' : 'text-red-500'}`}>
                  <span className="material-symbols-outlined text-sm">{card.trendUp ? 'trending_up' : 'trending_down'}</span>
                  {card.trend}
                </span>
              ) : (
                <span className="text-xs text-gray-400">{card.trend}</span>
              )}
            </div>
            <p className="text-3xl font-bold text-navy mb-1">{card.value}</p>
            <p className="text-sm text-gray-500">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-heading font-bold text-navy text-base mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.label} to={action.to}
              className={`${action.color} text-white flex flex-col items-center gap-2 py-4 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity`}>
              <span className="material-symbols-outlined text-2xl">{action.icon}</span>
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-navy text-base">Recent Activity</h2>
            <Link to={ROUTES.ADMIN_REQUESTS} className="text-xs text-primary font-semibold hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['Type', 'Name', 'Subject', 'Date', 'Status', ''].map((h) => (
                    <th key={h} className={`text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide ${h === 'Subject' || h === 'Date' ? 'hidden md:table-cell' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RECENT_ACTIVITY.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg font-medium whitespace-nowrap">{row.type}</span>
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-navy text-sm">{row.name}</p>
                      <p className="text-xs text-gray-400">{row.email}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-600 hidden md:table-cell">{row.subject}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{row.date}</td>
                    <td className="px-5 py-3"><StatusBadge status={row.status} /></td>
                    <td className="px-5 py-3">
                      <Link to={ROUTES.ADMIN_REQUESTS} className="text-primary hover:text-primary-dark text-xs font-semibold">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-navy text-base">Recent Posts</h2>
            <Link to={ROUTES.ADMIN_BLOGS} className="text-xs text-primary font-semibold hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {RECENT_POSTS.map((post, i) => (
              <div key={i} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                <p className="font-medium text-navy text-sm leading-snug mb-2">{post.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{post.category} · {post.date}</span>
                  <StatusBadge status={post.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
