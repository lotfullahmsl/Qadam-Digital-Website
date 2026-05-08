import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { authService } from '../../services/authService'
import { ROUTES } from '../../constants/routes'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
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
      const res = await authService.login(form)
      login(res.data.token, res.data.admin)
      navigate(ROUTES.ADMIN_DASHBOARD)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-primary">QADAM Digital</h1>
          <p className="text-sm text-on-surface-variant mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="glass-panel rounded-2xl p-8 space-y-6">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-on-surface">Welcome back</h2>
            <p className="text-sm text-on-surface-variant mt-1">Sign in to your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="admin@qadamdigital.com"
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-error text-sm bg-error/10 border border-error/20 rounded-lg px-4 py-3">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-semibold py-3 rounded-lg glow-button transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <><span className="material-symbols-outlined animate-spin text-xl">progress_activity</span> Signing in...</>
              ) : (
                <><span className="material-symbols-outlined">login</span> Sign In</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
