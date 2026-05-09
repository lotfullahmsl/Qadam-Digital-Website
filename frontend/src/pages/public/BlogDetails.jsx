import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'
import AdBanner from '../../components/common/AdBanner'

const MOCK_POSTS = {
  'top-scholarships-2026': {
    titleKey: 'blog.posts.p1_title',
    category: 'Scholarships',
    author: 'QADAM Team',
    createdAt: '2026-01-15',
    content: [
      { type: 'p', text: 'Finding the right scholarship can be life-changing. Here are the top 10 fully funded scholarships available for Afghan and Pakistani students in 2026.' },
      { type: 'h', text: '1. DAAD Scholarship (Germany)' },
      { type: 'p', text: 'The German Academic Exchange Service offers fully funded scholarships for graduate students. Covers tuition, living expenses, and travel.' },
      { type: 'h', text: '2. Chevening Scholarship (UK)' },
      { type: 'p', text: "The UK government's flagship scholarship program for outstanding emerging leaders. Fully funded for one-year master's programs." },
      { type: 'h', text: '3. Erasmus Mundus (Europe)' },
      { type: 'p', text: 'Joint master\'s programs across multiple European universities with full funding including tuition, travel, and living allowance.' },
      { type: 'h', text: '4. Turkish Government Scholarship' },
      { type: 'p', text: "Covers all levels from bachelor's to PhD with full tuition, accommodation, and monthly stipend." },
      { type: 'h', text: '5. Chinese Government Scholarship' },
      { type: 'p', text: "Full scholarships for undergraduate, master's, and doctoral programs at Chinese universities." },
    ],
  },
}

export default function BlogDetails() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const post = MOCK_POSTS[slug]

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-text-muted">
        <span className="material-symbols-outlined text-5xl text-primary-light">search_off</span>
        <p>{t('blog_details.not_found')}</p>
        <Link to={ROUTES.BLOG} className="text-primary hover:underline font-semibold">{t('blog_details.back_link')}</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <Link to={ROUTES.BLOG} className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-8 transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {t('blog_details.back')}
          </Link>
          <div className="max-w-3xl space-y-4">
            <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
              {post.category}
            </span>
            <h1 className="font-heading font-bold text-white text-4xl leading-tight">{t(post.titleKey)}</h1>
            <div className="flex items-center gap-4 text-sm text-white/70">
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
      <section className="py-12 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article */}
            <div className="lg:col-span-2">
              <AdBanner className="mb-8" />
              <div className="card p-8 space-y-4">
                {post.content.map((block, i) => (
                  block.type === 'h'
                    ? <h3 key={i} className="font-heading text-xl font-bold text-navy mt-4">{block.text}</h3>
                    : <p key={i} className="text-text-secondary leading-relaxed">{block.text}</p>
                ))}
              </div>
              <AdBanner className="mt-8" />
              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm text-text-muted">{t('blog_details.share')}:</span>
                {['facebook', 'link'].map((s) => (
                  <button key={s} className="w-9 h-9 rounded-full bg-primary-pale border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-base">{s}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AdBanner className="min-h-[200px]" />
              <div className="card p-6 space-y-4">
                <h3 className="font-heading font-bold text-navy text-lg">{t('blog_details.need_help')}</h3>
                <p className="text-sm text-text-muted">{t('blog_details.need_help_desc')}</p>
                <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-dark transition-all duration-200 text-sm shadow-btn">
                  <span className="material-symbols-outlined text-base">chat</span>
                  {t('blog_details.chat_whatsapp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
