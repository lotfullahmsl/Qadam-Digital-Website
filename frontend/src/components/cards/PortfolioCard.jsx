import React from 'react'

export default function PortfolioCard({ project }) {
  const { title, description, category, technologies, image } = project

  return (
    <div className="card overflow-hidden group cursor-pointer">
      {/* Image */}
      <div className="h-52 bg-primary-pale relative overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-pale to-primary-light">
            <span className="material-symbols-outlined text-5xl text-primary/40">web</span>
          </div>
        )}
        {category && (
          <span className="absolute top-3 left-3 text-xs font-semibold tracking-wide uppercase bg-primary text-white px-2.5 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-heading font-semibold text-navy text-base group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed line-clamp-2">{description}</p>

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {technologies.map((tech) => (
              <span key={tech} className="text-xs bg-primary-pale text-primary-dark px-2.5 py-1 rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
