import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants/routes'
import { dashboardService } from '../../services/dashboardService'

const QUICK_ACTIONS = [
  { label: 'Add Scholarship', icon: 'school', to: ROUTES.ADMIN_SCHOLARSHIPS, color: 'bg-primary' },
  { label: 'View Requests', icon: 'inbox', to: ROUTES.ADMIN_REQUESTS, color: 'bg-orange-500' },
  { label: 'Manage Portfolio', icon: 'work', to: ROUTES.ADMIN_PORTFOLIO, color: 'bg-green-600' },
  { label: 'Site Settings', icon: 'settings', to: ROUTES.ADMIN_SETTINGS, color: 'bg-gray-700' },
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
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>
)

function buildStatCards(stats) {
  const s = stats || {}
  const reqToday = s.requestsToday ?? 0
  const reqYest = s.requestsYesterday ?? 0
  const reqTrendUp = reqToday > reqYest ? true : reqToday < reqYest ? false : null

  return [
    {
      label: 'Scholarships',
      value: s.scholarships ?? 0,
      icon: 'school',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trend: 'Live data',
      trendUp: null,
      link: ROUTES.ADMIN_SCHOLARSHIPS,
    },
    {
      label: 'New Requests',
      value: s.requestsNew ?? 0,
      icon: 'inbox',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      trend: `${reqToday} submitted today`,
      trendUp: reqTrendUp,
      link: ROUTES.ADMIN_REQUESTS,
    },
    {
      label: 'Portfolio Items',
      value: s.portfolio ?? 0,
      icon: 'work',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      trend: 'Live data',
      trendUp: null,
      link: ROUTES.ADMIN_PORTFOLIO,
    },
    {
      label: 'Pricing Plans',
      value: s.pricing ?? 0,
      icon: 'sell',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      trend: 'Live data',
      trendUp: null,
      link: ROUTES.ADMIN_PRICING,
    },
    {
      label: 'Services',
      value: s.services ?? 0,
      icon: 'build',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      trend: 'Live data',
      trendUp: null,
      link: ROUTES.ADMIN_SERVICES,
    },
    {
      label: 'Registered Users',
      value: s.users ?? 0,
      icon: 'group',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      trend: `${s.blogs ?? 0} blog posts`,
      trendUp: null,
      link: ROUTES.ADMIN_BLOGS,
    },
  ]
}

export default function Dashboard() {
  const { admin } = useAuth()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const [stats, setStats] = useState(null)
  const [activity, setActivity] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadAll = useCallback(async () => {
    setError('')
    try {
      const [st, act, pst] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentActivity({ limit: 12 }),
        dashboardService.getRecentPosts({ limit: 6 }),
      ])
      setStats(st.data)
      setActivity(act.data.items || [])
      setPosts(pst.data.items || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load dashboard.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const statCards = buildStatCards(stats)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="bg-gradient-to-r from-navy to-primary-dark rounded-2xl p-6 text-white flex items-center justify-between flex-1">
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
        <button
          type="button"
          onClick={() => {
            setLoading(true)
            loadAll()
          }}
          disabled={loading}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-sm font-semibold hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
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
                <span className="text-xs text-gray-400 text-right max-w-[8rem] leading-tight">{card.trend}</span>
              )}
            </div>
            <p className="text-3xl font-bold text-navy mb-1">{loading && stats == null ? '—' : card.value}</p>
            <p className="text-sm text-gray-500">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-heading font-bold text-navy text-base mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.label} to={action.to} className={`${action.color} text-white flex flex-col items-center gap-2 py-4 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity`}>
              <span className="material-symbols-outlined text-2xl">{action.icon}</span>
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-navy text-base">Recent Activity</h2>
            <Link to={ROUTES.ADMIN_REQUESTS} className="text-xs text-primary font-semibold hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['Type', 'Name', 'Subject', 'Date', 'Status', ''].map((h) => (
                    <th
                      key={h}
                      className={`text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide ${h === 'Subject' || h === 'Date' ? 'hidden md:table-cell' : ''}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-400">
                      Loading…
                    </td>
                  </tr>
                )}
                {!loading && activity.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-400">
                      No request activity yet.
                    </td>
                  </tr>
                )}
                {!loading &&
                  activity.map((row) => (
                    <tr key={`${row.requestTypeKey}-${row._id}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg font-medium whitespace-nowrap">{row.type}</span>
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-medium text-navy text-sm">{row.name}</p>
                        <p className="text-xs text-gray-400">{row.email}</p>
                      </td>
                      <td className="px-5 py-3 text-gray-600 hidden md:table-cell">{row.subject}</td>
                      <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{row.date}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-5 py-3">
                        <Link to={`${ROUTES.ADMIN_REQUESTS}?tab=${encodeURIComponent(row.requestTypeKey)}`} className="text-primary hover:text-primary-dark text-xs font-semibold">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-navy text-base">Recent Posts</h2>
            <Link to={ROUTES.ADMIN_BLOGS} className="text-xs text-primary font-semibold hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {loading && (
              <div className="px-5 py-10 text-center text-gray-400 text-sm">Loading…</div>
            )}
            {!loading && posts.length === 0 && (
              <div className="px-5 py-10 text-center text-gray-400 text-sm">No blog posts yet.</div>
            )}
            {!loading &&
              posts.map((post) => (
                <div key={post._id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                  <p className="font-medium text-navy text-sm leading-snug mb-2">{post.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {post.category} · {post.date}
                    </span>
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
