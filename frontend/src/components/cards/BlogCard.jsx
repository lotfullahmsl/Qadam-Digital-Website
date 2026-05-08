import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export default function BlogCard({ post }) {
  const { slug, title, excerpt, category, author, createdAt, image } = post

  return (
    <div className="card overflow-hidden flex flex-col group">
      {/* Image */}
      <div className="h-48 bg-primary-pale relative overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-pale to-primary-light">
            <span className="material-symbols-outlined text-5xl text-primary/30">article</span>
          </div>
        )}
        {category && (
          <span className="absolute top-3 left-3 text-xs font-semibold tracking-wide uppercase bg-primary text-white px-2.5 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <h3 className="font-heading font-semibold text-navy text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed line-clamp-3 flex-grow">{excerpt}</p>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="material-symbols-outlined text-sm">person</span>
            {author || 'QADAM Team'}
          </div>
          <span className="text-xs text-text-muted">
            {createdAt ? new Date(createdAt).toLocaleDateString() : ''}
          </span>
        </div>

        <Link
          to={ROUTES.BLOG_DETAILS.replace(':slug', slug)}
          className="text-primary text-xs font-semibold tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all duration-200"
        >
          Read More
          <span className="material-symbols-outlined text-base">arrow_right_alt</span>
        </Link>
      </div>
    </div>
  )
}
