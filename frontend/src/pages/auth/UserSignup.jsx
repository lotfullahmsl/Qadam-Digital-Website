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

  const handleChange = (e) => { setError(''); setForm({ ...form, [e.target.name]: e.target.value }) }

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
      const payload = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        country: form.country,
        interests: form.interests,
      }
      const { data } = await userAuthService.signup(payload)
      loginUser(data.token, data.user)
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
    if (p.length < 12 || !/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Good', color: 'bg-blue-400', width: 'w-3/4' }
    return { label: 'Strong', color: 'bg-green-500', width: 'w-full' }
  }
  const strength = passwordStrength()

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
  const inputWithIconClass = `${inputClass} pl-11`

  return (
    <div className="bg-background py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Two-column grid — both columns same height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl border border-gray-100">

          {/* ── Left — Branding ── */}
          <div className="hero-bg p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl pointer-events-none" />

            {/* Top */}
            <div className="relative z-10 space-y-6">
              <div className="space-y-3">
                <h2 className="font-heading font-bold text-white text-3xl leading-tight">
                  Start Your Journey<br />
                  <span className="text-primary">Today for Free</span>
                </h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  Create your free account and unlock access to hundreds of scholarships, services, and opportunities.
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  'Free account — no credit card required',
                  'Apply to scholarships with one click',
                  'Track all your applications in one place',
                  'Get personalized recommendations',
                  'Receive announcements and new opportunities',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-lg flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="text-white/80 text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom — Step tracker */}
            <div className="relative z-10 mt-8 bg-white/10 border border-white/20 rounded-xl p-5 space-y-3">
              <p className="text-white/60 text-xs font-semibold tracking-widest uppercase">Registration Steps</p>
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                    i < step ? 'bg-primary text-white' :
                    i === step ? 'bg-white text-primary ring-2 ring-primary/40' :
                    'bg-white/20 text-white/50'
                  }`}>
                    {i < step
                      ? <span className="material-symbols-outlined text-sm">check</span>
                      : i + 1
                    }
                  </div>
                  <span className={`text-sm font-medium ${i === step ? 'text-white' : i < step ? 'text-white/70' : 'text-white/40'}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Form ── */}
          <div className="bg-white p-10 flex flex-col justify-center">
            <div className="w-full max-w-sm mx-auto space-y-5">

              {/* Header */}
              <div>
                <h1 className="font-heading font-bold text-navy text-2xl mb-1">Create your account</h1>
                <p className="text-gray-500 text-sm">Join thousands of students and professionals</p>
              </div>

              {/* Step indicator — mobile */}
              <div className="flex items-center gap-2 lg:hidden">
                {STEPS.map((_, i) => (
                  <React.Fragment key={i}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      i < step ? 'bg-primary text-white' :
                      i === step ? 'bg-primary text-white ring-4 ring-primary/20' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {i < step ? <span className="material-symbols-outlined text-sm">check</span> : i + 1}
                    </div>
                    {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 rounded-full ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />}
                  </React.Fragment>
                ))}
              </div>

              {/* Step label */}
              <div className="pb-4 border-b border-gray-100">
                <span className="text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Step {step + 1} of {STEPS.length}
                </span>
                <h2 className="font-heading font-semibold text-navy text-lg mt-2">{STEPS[step]}</h2>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <span className="material-symbols-outlined text-base flex-shrink-0 mt-0.5">error</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={step === STEPS.length - 1 ? handleSubmit : (e) => { e.preventDefault(); nextStep() }} className="space-y-4">

                {/* ── Step 0 ── */}
                {step === 0 && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Full Name <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">person</span>
                        <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Ahmad Karimi" className={inputWithIconClass} autoComplete="name" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Email Address <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">email</span>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className={inputWithIconClass} autoComplete="email" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Phone / WhatsApp</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">phone</span>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+92 303 939 3437" className={inputWithIconClass} autoComplete="tel" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Country <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">location_on</span>
                        <select name="country" value={form.country} onChange={handleChange} required className={`${inputWithIconClass} appearance-none pr-10`}>
                          <option value="">Select your country</option>
                          {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none">expand_more</span>
                      </div>
                    </div>
                  </>
                )}

                {/* ── Step 1 ── */}
                {step === 1 && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Password <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">lock</span>
                        <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} required placeholder="Min. 8 characters" className={`${inputWithIconClass} pr-11`} autoComplete="new-password" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                        </button>
                      </div>
                      {strength && (
                        <div className="mt-2 space-y-1">
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                          </div>
                          <p className={`text-xs font-medium ${
                            strength.label === 'Weak' ? 'text-red-500' :
                            strength.label === 'Fair' ? 'text-yellow-600' :
                            strength.label === 'Good' ? 'text-blue-500' : 'text-green-600'
                          }`}>Strength: {strength.label}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Confirm Password <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">lock_reset</span>
                        <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="Re-enter your password"
                          className={`${inputWithIconClass} pr-11 ${
                            form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-300 focus:border-red-400 focus:ring-red-100' :
                            form.confirmPassword && form.password === form.confirmPassword ? 'border-green-300 focus:border-green-400 focus:ring-green-100' : ''
                          }`} autoComplete="new-password" />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-xl">{showConfirm ? 'visibility_off' : 'visibility'}</span>
                        </button>
                      </div>
                      {form.confirmPassword && form.password === form.confirmPassword && (
                        <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">check_circle</span> Passwords match
                        </p>
                      )}
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2">
                      <p className="text-xs font-semibold text-navy">Requirements:</p>
                      {[
                        { check: form.password.length >= 8, text: 'At least 8 characters' },
                        { check: /[A-Z]/.test(form.password), text: 'One uppercase letter' },
                        { check: /[0-9]/.test(form.password), text: 'One number' },
                      ].map((req) => (
                        <div key={req.text} className="flex items-center gap-2">
                          <span className={`material-symbols-outlined text-sm ${req.check ? 'text-green-500' : 'text-gray-300'}`} style={{ fontVariationSettings: req.check ? "'FILL' 1" : "'FILL' 0" }}>
                            {req.check ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span className={`text-xs ${req.check ? 'text-green-700' : 'text-gray-400'}`}>{req.text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* ── Step 2 ── */}
                {step === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">What are you interested in?</label>
                      <p className="text-xs text-gray-400 mb-3">Select all that apply</p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {INTERESTS.map((interest) => {
                          const selected = form.interests.includes(interest.id)
                          return (
                            <button key={interest.id} type="button" onClick={() => toggleInterest(interest.id)}
                              className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                                selected ? 'border-primary bg-primary/8 text-primary' : 'border-gray-200 bg-white text-gray-500 hover:border-primary/40 hover:bg-primary/5'
                              }`}
                              style={selected ? { backgroundColor: 'rgba(0,170,255,0.08)' } : {}}>
                              <span className={`material-symbols-outlined text-xl flex-shrink-0 ${selected ? 'text-primary' : 'text-gray-400'}`}
                                style={{ fontVariationSettings: selected ? "'FILL' 1" : "'FILL' 0" }}>
                                {interest.icon}
                              </span>
                              <span className="text-xs font-semibold">{interest.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <input type="checkbox" id="terms" required className="w-4 h-4 accent-primary mt-0.5 flex-shrink-0" />
                      <label htmlFor="terms" className="text-sm text-gray-500 leading-relaxed">
                        I agree to the{' '}
                        <a href="#" className="text-primary font-semibold hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-primary font-semibold hover:underline">Privacy Policy</a>.
                      </label>
                    </div>
                  </>
                )}

                {/* Navigation */}
                <div className="flex gap-3 pt-2">
                  {step > 0 && (
                    <button type="button" onClick={() => { setStep((s) => s - 1); setError('') }}
                      className="flex-1 border-2 border-gray-200 text-gray-500 font-semibold py-3 rounded-xl hover:border-primary hover:text-primary transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-base">arrow_back</span> Back
                    </button>
                  )}
                  <button type="submit" disabled={loading}
                    className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                    style={{ boxShadow: '0 4px 14px rgba(0,170,255,0.35)' }}>
                    {loading
                      ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating...</>
                      : step === STEPS.length - 1
                        ? <><span className="material-symbols-outlined text-base">check_circle</span> Create Account</>
                        : <>Continue <span className="material-symbols-outlined text-base">arrow_forward</span></>
                    }
                  </button>
                </div>
              </form>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to={ROUTES.USER_LOGIN} className="text-primary font-semibold hover:text-primary-dark transition-colors">Sign in</Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
