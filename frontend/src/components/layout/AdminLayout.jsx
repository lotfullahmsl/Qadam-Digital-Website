import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants/routes'

const NAV_SECTIONS = [
  {
    label: 'CONTENT',
    items: [
      { label: 'Dashboard', icon: 'dashboard', to: ROUTES.ADMIN_DASHBOARD },
      { label: 'Scholarships', icon: 'school', to: ROUTES.ADMIN_SCHOLARSHIPS },
      { label: 'Portfolio', icon: 'work', to: ROUTES.ADMIN_PORTFOLIO },
      { label: 'Services', icon: 'build', to: ROUTES.ADMIN_SERVICES },
    ],
  },
  {
    label: 'COMMERCE',
    items: [
      { label: 'Pricing', icon: 'sell', to: ROUTES.ADMIN_PRICING },
      { label: 'Ads', icon: 'campaign', to: ROUTES.ADMIN_ADS },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { label: 'Requests', icon: 'inbox', to: ROUTES.ADMIN_REQUESTS },
      { label: 'Settings', icon: 'settings', to: ROUTES.ADMIN_SETTINGS },
    ],
  },
]

const ALL_NAV_ITEMS = NAV_SECTIONS.flatMap((s) => s.items)

export default function AdminLayout({ children }) {
  const { admin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const NOTIFICATIONS = [
    { icon: 'inbox', color: 'bg-blue-100 text-blue-600', title: 'New contact request', desc: 'Ahmad Karimi sent a message', time: '2 min ago', unread: true },
    { icon: 'school', color: 'bg-green-100 text-green-600', title: 'New scholarship application', desc: 'Sara Mohammadi applied for Chevening', time: '15 min ago', unread: true },
    { icon: 'sell', color: 'bg-purple-100 text-purple-600', title: 'Subscription request', desc: 'Bilal Yousafzai requested ChatGPT Plus', time: '1 hour ago', unread: true },
    { icon: 'web', color: 'bg-orange-100 text-orange-600', title: 'Website project request', desc: 'New e-commerce project inquiry', time: '3 hours ago', unread: false },
    { icon: 'campaign', color: 'bg-pink-100 text-pink-600', title: 'Social media request', desc: 'Instagram management inquiry', time: 'Yesterday', unread: false },
  ]

  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length

  const currentPage = ALL_NAV_ITEMS.find((n) => n.to === location.pathname)

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-navy flex flex-col flex-shrink-0 relative z-20`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10 h-16">
          <img
            src="/logo-light.jpeg"
            alt="QADAM Digital"
            className={`object-contain transition-all duration-300 ${sidebarOpen ? 'h-8 w-auto' : 'h-7 w-7'}`}
          />
          {sidebarOpen && (
            <span className="font-heading font-bold text-white text-base whitespace-nowrap">QADAM Admin</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-grow py-4 overflow-y-auto overflow-x-hidden">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="mb-4">
              {sidebarOpen && (
                <p className="text-xs font-semibold text-white/30 px-4 mb-1 tracking-widest">{section.label}</p>
              )}
              {section.items.map((item) => {
                const active = location.pathname === item.to
                return (
                  <div key={item.to} className="relative group">
                    <Link
                      to={item.to}
                      className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl transition-all duration-200 ${
                        active
                          ? 'bg-primary text-white shadow-lg'
                          : 'text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl flex-shrink-0">{item.icon}</span>
                      {sidebarOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                    </Link>
                    {!sidebarOpen && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-navy text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl border border-white/10">
                        {item.label}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4 space-y-3">
          {sidebarOpen && (
            <>
              <p className="text-xs text-white/40 truncate">{admin?.email || 'admin@qadam.com'}</p>
              <Link to="/" target="_blank" className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-xs">
                <span className="material-symbols-outlined text-base">open_in_new</span>
                View Site
              </Link>
            </>
          )}
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors text-sm w-full">
            <span className="material-symbols-outlined text-xl flex-shrink-0">logout</span>
            {sidebarOpen && <span className="text-xs">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 h-16 flex items-center gap-4 shadow-sm z-10">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-primary transition-colors p-1 rounded-lg hover:bg-gray-100">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Admin</span>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-navy">{currentPage?.label || 'Dashboard'}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 text-gray-500 hover:text-primary transition-colors rounded-lg hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-navy text-sm">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
                      )}
                    </div>
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="text-gray-400 hover:text-navy transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  {/* Notification List */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                    {NOTIFICATIONS.map((notif, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${notif.unread ? 'bg-blue-50/40' : ''}`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                          <span className="material-symbols-outlined text-base">{notif.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm font-semibold text-navy leading-snug ${notif.unread ? '' : 'font-medium'}`}>
                              {notif.title}
                            </p>
                            {notif.unread && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5"></span>}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">{notif.desc}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                    <button
                      onClick={() => { navigate(ROUTES.ADMIN_REQUESTS); setNotifOpen(false) }}
                      className="w-full text-center text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                      View all requests →
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-sm font-bold">{(admin?.email || 'A')[0].toUpperCase()}</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-navy leading-none">{admin?.name || 'Admin'}</p>
                <p className="text-xs text-gray-400 mt-0.5">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
