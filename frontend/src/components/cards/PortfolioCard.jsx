import React, { useState } from 'react'

export default function PortfolioCard({ project }) {
  const { title, description, category, technologies, image } = project
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="glass-card rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="h-52 bg-surface-container-high relative overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container to-surface-container-high">
            <span className="material-symbols-outlined text-5xl text-primary/30">web</span>
          </div>
        )}
        {category && (
          <span className="absolute top-3 left-3 text-xs font-semibold tracking-widest uppercase bg-primary/90 text-on-primary px-2 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-heading font-semibold text-on-surface text-lg group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">{description}</p>

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {technologies.map((tech) => (
              <span key={tech} className="text-xs bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded border border-outline-variant/20">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
