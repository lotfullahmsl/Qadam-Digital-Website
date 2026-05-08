import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../hooks/useUserAuth'
import { userAuthService } from '../../services/userAuthService'
import { ROUTES } from '../../constants/routes'

const STEPS = ['Personal Info', 'Account Setup', 'Preferences']

const COUNTRIES = [
  'Afghanistan', 'Pakistan', 'Iran', 'Germany', 'United Kingdom',
  'USA', 'Canada', 'Australia', 'Turkey', 'China', 'Other',
]

const INTERESTS = [
  { id: 'scholarships', icon: 'school', label: 'Scholarships' },
  { id: 'web_dev', icon: 'web', label: 'Web Development' },
  { id: 'cv_writing', icon: 'description', label: 'CV Writing' },
  { id: 'ai_tools', icon: 'smart_toy', label: 'AI Tools' },
  { id: 'translation', icon: 'translate', label: 'Translation' },
  { id: 'social_media', icon: 'campaign', label: 'Social Media' },
]

export default function UserSignup() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', country: '',
    password: '', confirmPassword: '',
    interests: [],
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { loginUser } = useUserAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setError('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toggleInterest = (id) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }))
  }

  const validateStep = () => {
    if (step === 0) {
      if (!form.fullName.trim()) return 'Please enter your full name.'
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.'
      if (!form.country) return 'Please select your country.'
    }
    if (step === 1) {
      if (!form.password || form.password.length < 8) return 'Password must be at least 8 characters.'
      if (form.password !== form.confirmPassword) return 'Passwords do not match.'
    }
    return null
  }

  const nextStep = () => {
    const err = validateStep()
    if (err) { setError(err); return }
    setError('')
    setStep((s) => s + 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await userAuthService.signup({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        password: form.password,
        interests: form.interests,
      })
      loginUser(res.data.token, res.data.user)
      navigate(ROUTES.HOME)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = () => {
    const p = form.password
    if (!p) return null
    if (p.length < 6) return { label: 'Weak', color: 'bg-red-400', width: 'w-1/4' }
    if (p.length < 8) return { label: 'Fair', color: 'bg-yellow-400', width: 'w-2/4' }
    if (p.length < 12 || !/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Good', color: 'bg-primary-light', width: 'w-3/4' }
    return { label: 'Strong', color: 'bg-green-500', width: 'w-full' }
  }
  const strength = passwordStrength()

  return (
    <div className="py-16 px-4 bg-background min-h-[calc(100vh-140px)]">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-12 items-start justify-center">

        {/* ── Left — Branding Panel ── */}
        <div className="hidden lg:flex flex-col gap-6 w-full max-w-sm flex-shrink-0">
          <div className="hero-bg rounded-2xl p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <h2 className="font-heading font-bold text-white text-2xl leading-tight">
                Start Your Journey<br />
                <span className="text-primary">Today for Free</span>
              </h2>
              <p className="text-primary-light/80 text-sm leading-relaxed">
                Create your free account and unlock access to hundreds of scholarships, services, and opportunities.
              </p>
            </div>
            <ul className="relative z-10 space-y-3">
              {[
                'Free account — no credit card required',
                'Apply to scholarships with one click',
                'Track all your applications in one place',
                'Get personalized recommendations',
                'Receive announcements and new opportunities',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-lg flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-primary-light/90 text-sm">{b}</span>
                </li>
              ))}
            </ul>
            {/* Stats */}
            <div className="relative z-10 grid grid-cols-3 gap-3">
              {[
                { value: '5,000+', label: 'Students' },
                { value: '500+', label: 'Scholarships' },
                { value: '98%', label: 'Satisfaction' },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl p-3 text-center">
                  <div className="font-heading font-bold text-white text-lg">{s.value}</div>
                  <div className="text-primary-light/60 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Step summary */}
          <div className="card p-5 space-y-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-text-muted">Registration Steps</p>
            {STEPS.map((label, i) => (
              <div key={label} className={`flex items-center gap-3 ${i === step ? 'opacity-100' : i < step ? 'opacity-70' : 'opacity-40'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i < step ? 'bg-primary text-white' :
                  i === step ? 'bg-primary text-white ring-4 ring-primary/20' :
                  'bg-border text-text-muted'
                }`}>
                  {i < step ? <span className="material-symbols-outlined text-sm">check</span> : i + 1}
                </div>
                <span className={`text-sm font-medium ${i === step ? 'text-primary' : 'text-text-secondary'}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — Form ── */}
        <div className="w-full max-w-lg">
          <div className="card p-8 md:p-10">
            {/* Header */}
            <div className="mb-6">
              <h1 className="font-heading font-bold text-navy text-3xl mb-1">Create your account</h1>
              <p className="text-text-muted">Join thousands of students and professionals</p>
            </div>

            {/* Mobile Step Indicator */}
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              {STEPS.map((label, i) => (
                <React.Fragment key={label}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                    i < step ? 'bg-primary text-white' :
                    i === step ? 'bg-primary text-white ring-4 ring-primary/20' :
                    'bg-border text-text-muted'
                  }`}>
                    {i < step ? <span className="material-symbols-outlined text-sm">check</span> : i + 1}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${i < step ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step label */}
            <div className="mb-6 pb-5 border-b border-border">
              <span className="badge">Step {step + 1} of {STEPS.length}</span>
              <h2 className="font-heading font-semibold text-navy text-xl mt-2">{STEPS[step]}</h2>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
                <span className="material-symbols-outlined text-base flex-shrink-0 mt-0.5">error</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={step === STEPS.length - 1 ? handleSubmit : (e) => { e.preventDefault(); nextStep() }}>

              {/* ── Step 0: Personal Info ── */}
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Full Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl">person</span>
                      <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required
                        placeholder="Ahmad Karimi" className="input-field pl-11" autoComplete="name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Email Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl">email</span>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required
                        placeholder="you@example.com" className="input-field pl-11" autoComplete="email" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Phone / WhatsApp</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl">phone</span>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+93 700 000 000" className="input-field pl-11" autoComplete="tel" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Country <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl">location_on</span>
                      <select name="country" value={form.country} onChange={handleChange} required className="input-field pl-11 appearance-none">
                        <option value="">Select your country</option>
                        {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl pointer-events-none">expand_more</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 1: Account Setup ── */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl">lock</span>
                      <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} required
                        placeholder="Min. 8 characters" className="input-field pl-11 pr-11" autoComplete="new-password" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                    {strength && (
                      <div className="mt-2 space-y-1">
                        <div className="h-1.5 bg-border rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                        </div>
                        <p className={`text-xs font-medium ${
                          strength.label === 'Weak' ? 'text-red-500' :
                          strength.label === 'Fair' ? 'text-yellow-600' :
                          strength.label === 'Good' ? 'text-primary-dark' : 'text-green-600'
                        }`}>Password strength: {strength.label}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Confirm Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl">lock_reset</span>
                      <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required
                        placeholder="Re-enter your password"
                        className={`input-field pl-11 pr-11 ${
                          form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-400 focus:border-red-400 focus:ring-red-200' :
                          form.confirmPassword && form.password === form.confirmPassword ? 'border-green-400 focus:border-green-400 focus:ring-green-200' : ''
                        }`} autoComplete="new-password" />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-xl">{showConfirm ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                    {form.confirmPassword && form.password === form.confirmPassword && (
                      <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Passwords match
                      </p>
                    )}
                  </div>
                  <div className="bg-primary-pale border border-border rounded-xl p-4 space-y-2">
                    <p className="text-xs font-semibold text-navy">Password requirements:</p>
                    {[
                      { check: form.password.length >= 8, text: 'At least 8 characters' },
                      { check: /[A-Z]/.test(form.password), text: 'One uppercase letter' },
                      { check: /[0-9]/.test(form.password), text: 'One number' },
                    ].map((req) => (
                      <div key={req.text} className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-sm ${req.check ? 'text-green-500' : 'text-text-muted'}`}
                          style={{ fontVariationSettings: req.check ? "'FILL' 1" : "'FILL' 0" }}>
                          {req.check ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span className={`text-xs ${req.check ? 'text-green-700' : 'text-text-muted'}`}>{req.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 2: Preferences ── */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">What are you interested in?</label>
                    <p className="text-xs text-text-muted mb-4">Select all that apply — we'll personalize your experience.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {INTERESTS.map((interest) => {
                        const selected = form.interests.includes(interest.id)
                        return (
                          <button key={interest.id} type="button" onClick={() => toggleInterest(interest.id)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                              selected
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border bg-white text-text-secondary hover:border-primary/50 hover:bg-primary-pale'
                            }`}>
                            <span className={`material-symbols-outlined text-2xl ${selected ? 'text-primary' : 'text-text-muted'}`}
                              style={{ fontVariationSettings: selected ? "'FILL' 1" : "'FILL' 0" }}>
                              {interest.icon}
                            </span>
                            <span className="text-xs font-semibold">{interest.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-primary-pale border border-border rounded-xl p-4">
                    <input type="checkbox" id="terms" required className="w-4 h-4 accent-primary mt-0.5 flex-shrink-0" />
                    <label htmlFor="terms" className="text-sm text-text-secondary leading-relaxed">
                      I agree to the{' '}
                      <a href="#" className="text-primary font-semibold hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-primary font-semibold hover:underline">Privacy Policy</a>.
                      I consent to receiving scholarship updates and service announcements.
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {step > 0 && (
                  <button type="button" onClick={() => { setStep((s) => s - 1); setError('') }}
                    className="flex-1 border-2 border-border text-text-secondary font-semibold py-3.5 rounded-xl hover:border-primary hover:text-primary transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back
                  </button>
                )}
                <button type="submit" disabled={loading}
                  className="flex-1 bg-primary text-white font-semibold py-3.5 rounded-xl shadow-btn hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
                  ) : step === STEPS.length - 1 ? (
                    <><span className="material-symbols-outlined text-base">check_circle</span> Create Account</>
                  ) : (
                    <>Continue <span className="material-symbols-outlined text-base">arrow_forward</span></>
                  )}
                </button>
              </div>
            </form>

            {/* Sign in link */}
            <p className="text-center text-sm text-text-muted mt-6">
              Already have an account?{' '}
              <Link to={ROUTES.USER_LOGIN} className="text-primary font-semibold hover:text-primary-dark transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
