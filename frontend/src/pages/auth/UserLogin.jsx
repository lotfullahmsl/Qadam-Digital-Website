import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUserAuth } from '../../hooks/useUserAuth'
import { userAuthService } from '../../services/userAuthService'
import { ROUTES } from '../../constants/routes'

const FEATURES = [
  { icon: 'school', text: 'Apply for 500+ scholarships' },
  { icon: 'notifications', text: 'Get notified about new opportunities' },
  { icon: 'track_changes', text: 'Track your application status' },
  { icon: 'description', text: 'Save and manage your documents' },
]

export default function UserLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { loginUser } = useUserAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || ROUTES.HOME

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await userAuthService.login(form)
      loginUser(res.data.token, res.data.user)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel — Branding ── */}
      <div className="hidden lg:flex lg:w-1/2 hero-bg flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-dark/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-btn">
            <span className="material-symbols-outlined text-white text-xl">school</span>
          </div>
          <span className="font-heading text-2xl font-bold text-white">
            QADAM <span className="text-primary">Digital</span>
          </span>
        </div>

        {/* Main content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-white text-4xl leading-tight">
              Your Gateway to<br />
              <span className="text-primary">Global Opportunities</span>
            </h2>
            <p className="text-primary-light/80 text-lg leading-relaxed max-w-md">
              Join thousands of students who found their dream scholarships and digital services through QADAM Digital.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-4">
            {FEATURES.map((f) => (
              <li key={f.text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 border border-white/20">
                  <span className="material-symbols-outlined text-primary text-lg">{f.icon}</span>
                </div>
                <span className="text-primary-light/90 text-sm">{f.text}</span>
              </li>
            ))}
          </ul>

          {/* Testimonial */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <p className="text-white/90 text-sm italic leading-relaxed">
              "QADAM Digital helped me secure a fully funded scholarship to Germany. The process was smooth and their team was incredibly supportive."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">AK</div>
              <div>
                <p className="text-white font-semibold text-sm">Ahmad Karimi</p>
                <p className="text-primary-light/60 text-xs">DAAD Scholar, Germany</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <p className="relative z-10 text-primary-light/40 text-xs">© 2024 QADAM Digital. All rights reserved.</p>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">school</span>
            </div>
            <span className="font-heading text-xl font-bold text-navy">QADAM <span className="text-primary">Digital</span></span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-navy text-3xl mb-2">Welcome back</h1>
            <p className="text-text-muted">Sign in to your account to continue</p>
          </div>

          {/* Social login hint */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-muted font-medium">Sign in with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl">email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="input-field pl-11"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-navy">Password</label>
                <a href="#" className="text-xs text-primary hover:text-primary-dark font-medium transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="input-field pl-11 pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 accent-primary rounded" />
              <label htmlFor="remember" className="text-sm text-text-secondary">Remember me for 30 days</label>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-base flex-shrink-0 mt-0.5">error</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl shadow-btn hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-text-muted mt-6">
            Don't have an account?{' '}
            <Link to={ROUTES.USER_SIGNUP} className="text-primary font-semibold hover:text-primary-dark transition-colors">
              Create one free
            </Link>
          </p>

          {/* Admin link */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-xs text-text-muted">
              Are you an admin?{' '}
              <Link to={ROUTES.LOGIN} className="text-primary-dark font-semibold hover:text-primary transition-colors">
                Admin Login →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
