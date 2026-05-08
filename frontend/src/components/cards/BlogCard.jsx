import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export default function BlogCard({ post }) {
  const { slug, title, excerpt, category, author, createdAt, image } = post

  return (
    <div className="glass-card rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 group">
      {/* Image */}
      <div className="h-48 bg-surface-container-high relative overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/30">article</span>
          </div>
        )}
        {category && (
          <span className="absolute top-3 left-3 text-xs font-semibold tracking-widest uppercase bg-primary text-on-primary px-2 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <h3 className="font-heading font-semibold text-on-surface text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3 flex-grow">{excerpt}</p>

        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">person</span>
            {author || 'QADAM Team'}
          </div>
          <span className="text-xs text-on-surface-variant">
            {createdAt ? new Date(createdAt).toLocaleDateString() : ''}
          </span>
        </div>

        <Link
          to={ROUTES.BLOG_DETAILS.replace(':slug', slug)}
          className="text-primary text-xs font-semibold tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all"
        >
          Read More
          <span className="material-symbols-outlined text-base">arrow_right_alt</span>
        </Link>
      </div>
    </div>
  )
}
