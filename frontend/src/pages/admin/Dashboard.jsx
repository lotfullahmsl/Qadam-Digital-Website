import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const STATS = [
  { icon: 'school', label: 'Scholarships', value: '24', color: 'bg-primary/10 text-primary', to: ROUTES.ADMIN_SCHOLARSHIPS },
  { icon: 'article', label: 'Blog Posts', value: '12', color: 'bg-primary-dark/10 text-primary-dark', to: ROUTES.ADMIN_BLOGS },
  { icon: 'inbox', label: 'New Requests', value: '8', color: 'bg-red-100 text-red-600', to: ROUTES.ADMIN_REQUESTS },
  { icon: 'work', label: 'Portfolio Items', value: '6', color: 'bg-primary-pale text-primary-dark', to: ROUTES.ADMIN_PORTFOLIO },
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
        <h1 className="font-heading text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-sm text-text-muted mt-1">Welcome back to QADAM Digital Admin Panel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Link key={stat.label} to={stat.to} className="card p-6 flex items-center gap-4 hover:-translate-y-0.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-navy">{stat.value}</p>
              <p className="text-xs text-text-muted">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-heading text-lg font-semibold text-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.label} to={action.to} className="card p-5 flex flex-col gap-3 items-center text-center group">
              <span className="material-symbols-outlined text-3xl text-primary group-hover:scale-110 transition-transform">{action.icon}</span>
              <span className="text-sm text-text-secondary font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="font-heading text-lg font-semibold text-navy mb-4">Recent Submissions</h2>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-primary-pale">
                {['Type', 'Name', 'Date', 'Status'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-text-secondary">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'Contact', name: 'Ahmad Karimi', date: 'Today', status: 'New', statusColor: 'bg-primary/10 text-primary' },
                { type: 'Scholarship App', name: 'Sara Mohammadi', date: 'Yesterday', status: 'In Review', statusColor: 'bg-primary-dark/10 text-primary-dark' },
                { type: 'Subscription', name: 'Bilal Yousafzai', date: '2 days ago', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-border hover:bg-primary-pale/50 transition-colors">
                  <td className="px-6 py-4 text-text-muted">{row.type}</td>
                  <td className="px-6 py-4 text-navy font-medium">{row.name}</td>
                  <td className="px-6 py-4 text-text-muted">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full ${row.statusColor}`}>{row.status}</span>
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
