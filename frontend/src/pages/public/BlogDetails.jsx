import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import AdBanner from '../../components/common/AdBanner'

const MOCK_POSTS = {
  'top-scholarships-2026': {
    title: 'Top 10 Fully Funded Scholarships for 2026',
    category: 'Scholarships',
    author: 'QADAM Team',
    createdAt: '2026-01-15',
    content: `
      Finding the right scholarship can be life-changing. Here are the top 10 fully funded scholarships available for Afghan and Pakistani students in 2026.

      **1. DAAD Scholarship (Germany)**
      The German Academic Exchange Service offers fully funded scholarships for graduate students. Covers tuition, living expenses, and travel.

      **2. Chevening Scholarship (UK)**
      The UK government's flagship scholarship program for outstanding emerging leaders. Fully funded for one-year master's programs.

      **3. Erasmus Mundus (Europe)**
      Joint master's programs across multiple European universities with full funding including tuition, travel, and living allowance.

      **4. Turkish Government Scholarship**
      Covers all levels from bachelor's to PhD with full tuition, accommodation, and monthly stipend.

      **5. Chinese Government Scholarship**
      Full scholarships for undergraduate, master's, and doctoral programs at Chinese universities.

      Apply with QADAM Digital for expert guidance through any of these scholarship applications.
    `,
  },
}

export default function BlogDetails() {
  const { slug } = useParams()
  const post = MOCK_POSTS[slug]

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-on-surface-variant">
        <span className="material-symbols-outlined text-5xl">search_off</span>
        <p>Article not found.</p>
        <Link to={ROUTES.BLOG} className="text-primary hover:underline">Back to Blog</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-section pb-xl px-lg hero-bg">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <Link to={ROUTES.BLOG} className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary text-sm mb-6 transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Blog
          </Link>
          <div className="max-w-3xl space-y-4">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20">
              {post.category}
            </span>
            <h1 className="font-heading text-h1 text-on-surface">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">person</span>
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Article */}
          <div className="lg:col-span-2">
            <AdBanner className="mb-8" />
            <div className="glass-panel rounded-xl p-8 prose prose-invert max-w-none">
              {post.content.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h3 key={i} className="font-heading text-xl font-semibold text-on-surface mt-6 mb-2">{line.replace(/\*\*/g, '')}</h3>
                }
                if (line.trim()) {
                  return <p key={i} className="text-on-surface-variant leading-relaxed mb-4">{line}</p>
                }
                return null
              })}
            </div>
            <AdBanner className="mt-8" />

            {/* Share */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm text-on-surface-variant">Share:</span>
              {['facebook', 'link'].map((s) => (
                <button key={s} className="w-9 h-9 rounded-full bg-surface-container border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-base">{s}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AdBanner className="min-h-[250px]" />
            <div className="glass-panel rounded-xl p-6 space-y-4">
              <h3 className="font-heading font-semibold text-on-surface">Need Scholarship Help?</h3>
              <p className="text-sm text-on-surface-variant">Our experts can guide you through the entire application process.</p>
              <a
                href="https://wa.me/93700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold py-2.5 rounded-lg glow-button transition-all duration-300 text-sm"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
