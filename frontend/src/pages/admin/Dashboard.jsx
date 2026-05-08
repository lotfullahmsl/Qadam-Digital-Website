import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const STATS = [
  { icon: 'school', label: 'Scholarships', value: '24', color: 'text-primary', to: ROUTES.ADMIN_SCHOLARSHIPS },
  { icon: 'article', label: 'Blog Posts', value: '12', color: 'text-tertiary', to: ROUTES.ADMIN_BLOGS },
  { icon: 'inbox', label: 'New Requests', value: '8', color: 'text-error', to: ROUTES.ADMIN_REQUESTS },
  { icon: 'work', label: 'Portfolio Items', value: '6', color: 'text-secondary', to: ROUTES.ADMIN_PORTFOLIO },
]

const QUICK_ACTIONS = [
  { icon: 'add_circle', label: 'Add Scholarship', to: ROUTES.ADMIN_SCHOLARSHIPS },
  { icon: 'edit_note', label: 'New Blog Post', to: ROUTES.ADMIN_BLOGS },
  { icon: 'inbox', label: 'View Requests', to: ROUTES.ADMIN_REQUESTS },
  { icon: 'settings', label: 'Settings', to: ROUTES.ADMIN_SETTINGS },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-on-surface">Dashboard</h1>
        <p className="text-sm text-on-surface-variant mt-1">Welcome back to QADAM Digital Admin Panel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Link
            key={stat.label}
            to={stat.to}
            className="glass-panel rounded-xl p-6 flex items-center gap-4 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
              <span className={`material-symbols-outlined text-2xl ${stat.color}`}>{stat.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-on-surface">{stat.value}</p>
              <p className="text-xs text-on-surface-variant">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-heading text-lg font-semibold text-on-surface mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="glass-panel rounded-xl p-5 flex flex-col gap-3 items-center text-center hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <span className="material-symbols-outlined text-3xl text-primary group-hover:scale-110 transition-transform">{action.icon}</span>
              <span className="text-sm text-on-surface-variant">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div>
        <h2 className="font-heading text-lg font-semibold text-on-surface mb-4">Recent Submissions</h2>
        <div className="glass-panel rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/30">
                <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Type</th>
                <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'Contact', name: 'Ahmad Karimi', date: 'Today', status: 'New' },
                { type: 'Scholarship App', name: 'Sara Mohammadi', date: 'Yesterday', status: 'In Review' },
                { type: 'Subscription', name: 'Bilal Yousafzai', date: '2 days ago', status: 'Completed' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-outline-variant/20 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-on-surface-variant">{row.type}</td>
                  <td className="px-6 py-4 text-on-surface">{row.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold tracking-widest uppercase px-2 py-1 rounded-full ${
                      row.status === 'New' ? 'bg-primary/10 text-primary' :
                      row.status === 'In Review' ? 'bg-tertiary/10 text-tertiary' :
                      'bg-green-500/10 text-green-400'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
