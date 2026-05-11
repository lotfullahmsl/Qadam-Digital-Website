import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants/routes'

export default function UserLogin() {
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
      // MOCK AUTH — replace with real API call when backend is ready
      await new Promise((r) => setTimeout(r, 600))
      if (!form.email || !form.password) throw new Error('Please fill in all fields.')
      login('mock-admin-token-' + Date.now(), {
        name: form.email.split('@')[0],
        email: form.email,
        role: 'admin',
      })
      navigate(ROUTES.ADMIN_DASHBOARD, { replace: true })
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background py-12 px-4">
      {/* Outer wrapper — fixed max width, centered */}
      <div className="max-w-5xl mx-auto">
        {/* Two-column grid — both columns same height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl border border-gray-100">

          {/* ── Left — Branding ── */}
          <div className="hero-bg p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Decorative blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl pointer-events-none" />

            {/* Top content */}
            <div className="relative z-10 space-y-6">
              <div className="space-y-3">
                <h2 className="font-heading font-bold text-white text-3xl leading-tight">
                  Your Gateway to<br />
                  <span className="text-primary">Global Opportunities</span>
                </h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  Join thousands of students who found their dream scholarships and digital services through QADAM Digital.
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  { icon: 'school', text: 'Apply for 500+ scholarships' },
                  { icon: 'notifications', text: 'Get notified about new opportunities' },
                  { icon: 'track_changes', text: 'Track your application status' },
                  { icon: 'description', text: 'Save and manage your documents' },
                ].map((f) => (
                  <li key={f.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 border border-white/20">
                      <span className="material-symbols-outlined text-primary text-base">{f.icon}</span>
                    </div>
                    <span className="text-white/80 text-sm">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom — Testimonial */}
            <div className="relative z-10 mt-8 bg-white/10 border border-white/20 rounded-xl p-5">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-white/90 text-sm italic leading-relaxed">
                "QADAM Digital helped me secure a fully funded scholarship to Germany. Their team was incredibly supportive throughout."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AK</div>
                <div>
                  <p className="text-white font-semibold text-sm">Ahmad Karimi</p>
                  <p className="text-white/50 text-xs">DAAD Scholar, Germany</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right — Form ── */}
          <div className="bg-white p-10 flex flex-col justify-center">
            <div className="w-full max-w-sm mx-auto space-y-6">
              {/* Header */}
              <div>
                <h1 className="font-heading font-bold text-navy text-2xl mb-1">Welcome back</h1>
                <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">email</span>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange}
                      required placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-semibold text-navy">Password</label>
                    <a href="#" className="text-xs text-primary hover:text-primary-dark font-medium transition-colors">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">lock</span>
                    <input
                      type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                      required placeholder="Enter your password"
                      className="w-full border border-gray-200 rounded-xl pl-11 pr-11 py-3 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                      autoComplete="current-password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="w-4 h-4 accent-primary rounded" />
                  <label htmlFor="remember" className="text-sm text-gray-500">Remember me for 30 days</label>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <span className="material-symbols-outlined text-base flex-shrink-0 mt-0.5">error</span>
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={loading}
                  className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                  style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.35)' }}>
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                    : <>Sign In <span className="material-symbols-outlined text-base">arrow_forward</span></>
                  }
                </button>
              </form>

              {/* Sign up link */}
              <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to={ROUTES.USER_SIGNUP} className="text-primary font-semibold hover:text-primary-dark transition-colors">
                  Create one free
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
