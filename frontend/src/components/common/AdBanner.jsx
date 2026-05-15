import React, { useEffect, useState } from 'react'
import { adsService } from '../../services/adsService'

function AdSlot({ ad }) {
  if (ad.contentMode === 'image' && ad.imageUrl) {
    const img = <img src={ad.imageUrl} alt={ad.imageAlt || ad.name || ''} className="w-full h-auto max-h-[280px] object-contain rounded-lg mx-auto" loading="lazy" />
    return (
      <div className="w-full flex justify-center">
        {ad.href ? (
          <a href={ad.href} target="_blank" rel="noopener noreferrer" className="block">
            {img}
          </a>
        ) : (
          img
        )}
      </div>
    )
  }

  if (ad.contentMode === 'html' && ad.htmlContent) {
    const doc = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;overflow:hidden">${ad.htmlContent}</body></html>`
    return (
      <iframe
        title={ad.name || 'Advertisement'}
        srcDoc={doc}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        className="w-full min-h-[90px] border-0 rounded-xl bg-transparent"
      />
    )
  }

  return null
}

export default function AdBanner({ className = '', placement = 'Home' }) {
  const [items, setItems] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    adsService
      .getByPlacement(placement)
      .then((res) => {
        if (!cancelled) setItems(res.data.items || [])
      })
      .catch(() => {
        if (!cancelled) setItems([])
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [placement])

  if (!ready) {
    return (
      <div className={`w-full bg-primary-pale/50 border border-border border-dashed rounded-xl flex items-center justify-center min-h-[72px] animate-pulse ${className}`}>
        <span className="text-xs font-medium text-text-muted">Loading…</span>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className={`w-full bg-primary-pale border border-border rounded-xl flex items-center justify-center min-h-[72px] ${className}`}>
        <span className="text-xs font-semibold tracking-widest uppercase text-text-muted">Advertisement</span>
      </div>
    )
  }

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {items.map((ad) => (
        <div key={ad._id} className="rounded-xl overflow-hidden border border-border bg-white/60">
          <AdSlot ad={ad} />
        </div>
      ))}
    </div>
  )
}
