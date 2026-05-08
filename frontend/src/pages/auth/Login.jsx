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
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-dark/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-btn">
            <span className="material-symbols-outlined text-white text-2xl">admin_panel_settings</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-navy">QADAM Digital</h1>
          <p className="text-sm text-text-muted mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="card p-8 space-y-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-navy">Welcome back</h2>
            <p className="text-sm text-text-muted mt-1">Sign in to your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-text-muted mb-2">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="admin@qadamdigital.com" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-text-muted mb-2">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="••••••••" className="input-field" />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg shadow-btn hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60">
              {loading
                ? <><span className="material-symbols-outlined animate-spin text-xl">progress_activity</span> Signing in...</>
                : <><span className="material-symbols-outlined">login</span> Sign In</>
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
