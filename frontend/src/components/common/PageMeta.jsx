import { useEffect } from 'react'

function setMetaName(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content || '')
}

function setMetaProperty(prop, content) {
  let el = document.head.querySelector(`meta[property="${prop}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', prop)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content || '')
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  if (href) el.setAttribute('href', href)
}

/**
 * @param {{ title?: string, description?: string, canonicalUrl?: string, ogTitle?: string, ogDescription?: string, ogImage?: string, absoluteUrl?: string }} meta
 */
export default function PageMeta({ meta }) {
  useEffect(() => {
    if (!meta) return undefined
    const title = meta.title || 'QADAM Digital'
    document.title = title
    const desc = meta.description || ''
    setMetaName('description', desc)
    setMetaProperty('og:title', meta.ogTitle || title)
    setMetaProperty('og:description', meta.ogDescription || desc)
    setMetaProperty('og:image', meta.ogImage || '')
    const canon = meta.absoluteUrl || meta.canonicalUrl || ''
    if (canon) setCanonical(canon)
    return undefined
  }, [meta])

  return null
}
