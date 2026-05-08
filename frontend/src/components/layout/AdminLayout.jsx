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
    <div className="min-h-screen flex bg-background text-on-background">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-outline-variant/30">
          <span className="material-symbols-outlined text-primary text-2xl">admin_panel_settings</span>
          {sidebarOpen && <span className="font-heading font-bold text-primary text-lg">QADAM Admin</span>}
        </div>

        {/* Nav */}
        <nav className="flex-grow py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 ${
                  active
                    ? 'bg-primary/10 text-primary border-r-2 border-primary'
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-outline-variant/30 p-4">
          {sidebarOpen && (
            <p className="text-xs text-on-surface-variant mb-2 truncate">{admin?.email || 'Admin'}</p>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-on-surface-variant hover:text-error transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-surface-container border-b border-outline-variant/30 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-heading font-semibold text-on-surface text-lg">
            {NAV_ITEMS.find((n) => n.to === location.pathname)?.label || 'Admin Panel'}
          </h1>
        </header>

        {/* Content */}
        <main className="flex-grow overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
