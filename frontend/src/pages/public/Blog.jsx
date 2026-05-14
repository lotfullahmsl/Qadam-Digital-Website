import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import BlogCard from '../../components/cards/BlogCard'
import AdBanner from '../../components/common/AdBanner'
import { blogService } from '../../services/blogService'

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

  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadPosts() {
      setLoading(true)
      setError('')
      try {
        const { data } = await blogService.getAll({
          search,
          category: activeCategory === 'All' ? '' : activeCategory,
          limit: 50,
        })
        if (!ignore) setPosts(data.items || [])
      } catch (err) {
        if (!ignore) setError(err.response?.data?.message || 'Unable to load blog posts.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadPosts()
    return () => { ignore = true }
  }, [activeCategory, search])

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
        {loading ? (
          <div className="text-center py-20 text-text-muted">Loading blog posts...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            <span className="material-symbols-outlined text-5xl mb-4 block text-primary-light">search_off</span>
            <p>{t('blog.no_results')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
