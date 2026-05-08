import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants/routes'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'dashboard', to: ROUTES.ADMIN_DASHBOARD },
  { label: 'Scholarships', icon: 'school', to: ROUTES.ADMIN_SCHOLARSHIPS },
  { label: 'Blogs', icon: 'article', to: ROUTES.ADMIN_BLOGS },
  { label: 'Portfolio', icon: 'work', to: ROUTES.ADMIN_PORTFOLIO },
  { label: 'Pricing', icon: 'sell', to: ROUTES.ADMIN_PRICING },
  { label: 'Services', icon: 'build', to: ROUTES.ADMIN_SERVICES },
  { label: 'Requests', icon: 'inbox', to: ROUTES.ADMIN_REQUESTS },
  { label: 'Ads', icon: 'campaign', to: ROUTES.ADMIN_ADS },
  { label: 'Settings', icon: 'settings', to: ROUTES.ADMIN_SETTINGS },
]

export default function AdminLayout({ children }) {
  const { admin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-navy flex flex-col flex-shrink-0`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white text-lg">admin_panel_settings</span>
          </div>
          {sidebarOpen && <span className="font-heading font-bold text-white text-base">QADAM Admin</span>}
        </div>

        {/* Nav */}
        <nav className="flex-grow py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                  active
                    ? 'bg-primary text-white'
                    : 'text-primary-light/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-xl flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-white/10 p-4">
          {sidebarOpen && (
            <p className="text-xs text-primary-light/50 mb-3 truncate">{admin?.email || 'Admin'}</p>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-primary-light/70 hover:text-red-400 transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-border px-6 py-4 flex items-center gap-4 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-text-secondary hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-heading font-semibold text-navy text-lg">
            {NAV_ITEMS.find((n) => n.to === location.pathname)?.label || 'Admin Panel'}
          </h1>
        </header>

        {/* Content */}
        <main className="flex-grow overflow-y-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
