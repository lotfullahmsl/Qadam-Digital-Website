import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants/routes'

// ─── MOCK AUTH ───────────────────────────────────────────────
// No backend yet — any email + any password (min 1 char) logs in.
// Replace this block with a real API call when backend is ready.
const mockAdminLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({
          token: 'mock-admin-token-' + Date.now(),
          admin: { email, name: 'Admin', role: 'admin' },
        })
      } else {
        reject(new Error('Please enter email and password.'))
      }
    }, 600)
  })
}
// ─────────────────────────────────────────────────────────────

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await mockAdminLogin(form.email, form.password)
      login(data.token, data.admin)
      navigate(ROUTES.ADMIN_DASHBOARD)
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #062030 0%, #0A5C7A 60%, #00AAFF 100%)' }}>

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/logo-light.jpeg" alt="QADAM Digital" className="h-14 w-auto object-contain" />
          </div>
          <div className="inline-flex items-center gap-1.5 mt-2 bg-white/15 border border-white/20 text-white/80 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-sm">shield</span>
            Admin Portal
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Card top accent */}
          <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-navy" />

          <div className="p-8 space-y-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-navy">Admin Sign In</h2>
              <p className="text-sm text-gray-500 mt-1">Access the QADAM Digital management panel</p>
            </div>

            {/* Dev notice */}
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <span className="material-symbols-outlined text-amber-500 text-base flex-shrink-0 mt-0.5">info</span>
              <p className="text-xs text-amber-700 leading-relaxed">
                <span className="font-semibold">Development mode:</span> Enter any email and password to access the admin panel. Backend authentication will be enabled when the API is connected.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">email</span>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    required placeholder="admin@qadamdigital.com"
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">lock</span>
                  <input
                    type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                    required placeholder="Enter any password"
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-11 py-3 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <span className="material-symbols-outlined text-base">error</span>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.4)' }}
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                ) : (
                  <><span className="material-symbols-outlined text-base">login</span> Sign In to Admin Panel</>
                )}
              </button>
            </form>

            {/* Back to site */}
            <div className="text-center pt-2 border-t border-gray-100">
              <a href="/" className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Back to main website
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
