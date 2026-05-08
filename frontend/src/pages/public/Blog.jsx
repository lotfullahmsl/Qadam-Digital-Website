import React, { useState } from 'react'
import BlogCard from '../../components/cards/BlogCard'
import AdBanner from '../../components/common/AdBanner'

const CATEGORIES = ['All', 'Scholarships', 'Technology', 'Education', 'Digital Tools', 'Career']
const MOCK_POSTS = [
  { _id: '1', slug: 'top-scholarships-2026', title: 'Top 10 Fully Funded Scholarships for 2026', excerpt: 'Discover the best fully funded scholarship opportunities available for Afghan and Pakistani students in 2026.', category: 'Scholarships', author: 'QADAM Team', createdAt: '2026-01-15' },
  { _id: '2', slug: 'how-to-write-motivation-letter', title: 'How to Write a Winning Motivation Letter', excerpt: 'A step-by-step guide to writing a compelling motivation letter that gets you accepted to your dream university.', category: 'Education', author: 'QADAM Team', createdAt: '2026-02-10' },
  { _id: '3', slug: 'chatgpt-for-students', title: 'How Students Can Use ChatGPT for Academic Success', excerpt: 'Practical tips on using AI tools like ChatGPT to enhance your research, writing, and study efficiency.', category: 'Digital Tools', author: 'QADAM Team', createdAt: '2026-03-05' },
  { _id: '4', slug: 'daad-scholarship-guide', title: 'Complete Guide to DAAD Scholarship Application', excerpt: 'Everything you need to know about applying for the prestigious DAAD scholarship from Germany.', category: 'Scholarships', author: 'QADAM Team', createdAt: '2026-03-20' },
  { _id: '5', slug: 'web-development-career', title: 'Starting a Web Development Career in 2026', excerpt: 'A comprehensive roadmap for beginners looking to start a successful career in web development.', category: 'Technology', author: 'QADAM Team', createdAt: '2026-04-01' },
  { _id: '6', slug: 'cv-tips-international', title: '7 CV Tips for International Job Applications', excerpt: 'Essential tips to make your CV stand out when applying for international positions and scholarships.', category: 'Career', author: 'QADAM Team', createdAt: '2026-04-15' },
]

export default function Blog() {
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
            Blog
          </span>
          <h1 className="font-heading font-bold text-white text-5xl">Insights &amp; <span className="text-primary">Articles</span></h1>
          <p className="text-primary-light/90 text-lg">Expert articles on scholarships, digital tools, education, and career development.</p>
        </div>
      </section>

      <section className="px-6 py-6 bg-white border-b border-border shadow-sm sticky top-16 z-40">
        <div className="max-w-screen-xl mx-auto space-y-4">
          <div className="relative max-w-md mx-auto">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xl">search</span>
            <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                  activeCategory === cat ? 'bg-primary text-white shadow-btn' : 'border border-border text-text-secondary hover:border-primary hover:text-primary bg-white'
                }`}>
                {cat}
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
            <p>No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => <BlogCard key={post._id} post={post} />)}
          </div>
        )}
      </section>
    </div>
  )
}
