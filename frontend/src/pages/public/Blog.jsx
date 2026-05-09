import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BlogCard from '../../components/cards/BlogCard'
import AdBanner from '../../components/common/AdBanner'

export default function Blog() {
  const { t } = useTranslation()

  const CATEGORIES = [
    { key: 'All', label: t('blog.all_categories') },
    { key: 'Scholarships', label: t('blog.categories.scholarships') },
    { key: 'Technology', label: t('blog.categories.technology') },
    { key: 'Education', label: t('blog.categories.education') },
    { key: 'Digital Tools', label: t('blog.categories.digital_tools') },
    { key: 'Career', label: t('blog.categories.career') },
  ]

  const MOCK_POSTS = [
    { _id: '1', slug: 'top-scholarships-2026', title: t('blog.posts.p1_title'), excerpt: t('blog.posts.p1_excerpt'), category: 'Scholarships', categoryLabel: t('blog.categories.scholarships'), author: 'QADAM Team', createdAt: '2026-01-15' },
    { _id: '2', slug: 'how-to-write-motivation-letter', title: t('blog.posts.p2_title'), excerpt: t('blog.posts.p2_excerpt'), category: 'Education', categoryLabel: t('blog.categories.education'), author: 'QADAM Team', createdAt: '2026-02-10' },
    { _id: '3', slug: 'chatgpt-for-students', title: t('blog.posts.p3_title'), excerpt: t('blog.posts.p3_excerpt'), category: 'Digital Tools', categoryLabel: t('blog.categories.digital_tools'), author: 'QADAM Team', createdAt: '2026-03-05' },
    { _id: '4', slug: 'daad-scholarship-guide', title: t('blog.posts.p4_title'), excerpt: t('blog.posts.p4_excerpt'), category: 'Scholarships', categoryLabel: t('blog.categories.scholarships'), author: 'QADAM Team', createdAt: '2026-03-20' },
    { _id: '5', slug: 'web-development-career', title: t('blog.posts.p5_title'), excerpt: t('blog.posts.p5_excerpt'), category: 'Technology', categoryLabel: t('blog.categories.technology'), author: 'QADAM Team', createdAt: '2026-04-01' },
    { _id: '6', slug: 'cv-tips-international', title: t('blog.posts.p6_title'), excerpt: t('blog.posts.p6_excerpt'), category: 'Career', categoryLabel: t('blog.categories.career'), author: 'QADAM Team', createdAt: '2026-04-15' },
  ]

  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = MOCK_POSTS.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="flex flex-col">
      <section className="hero-bg py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20">
            <span className="material-symbols-outlined text-sm">article</span>
            {t('nav.blog')}
          </span>
          <h1 className="font-heading font-bold text-white text-5xl">{t('blog.title')}</h1>
          <p className="text-primary-light/90 text-lg">{t('blog.subtitle')}</p>
        </div>
      </section>

      <section className="px-6 py-6 bg-white border-b border-border shadow-sm sticky top-16 z-40">
        <div className="max-w-screen-xl mx-auto space-y-4">
          <div className="relative max-w-md mx-auto">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xl">search</span>
            <input type="text" placeholder={t('blog.search_placeholder')} value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                  activeCategory === cat.key ? 'bg-primary text-white shadow-btn' : 'border border-border text-text-secondary hover:border-primary hover:text-primary bg-white'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6 pt-8 max-w-screen-xl mx-auto w-full">
        <AdBanner />
      </div>

      <section className="py-8 px-6 max-w-screen-xl mx-auto w-full">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            <span className="material-symbols-outlined text-5xl mb-4 block text-primary-light">search_off</span>
            <p>{t('blog.no_results')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post._id} post={{ ...post, category: post.categoryLabel }} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
