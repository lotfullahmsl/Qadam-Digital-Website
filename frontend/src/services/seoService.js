import apiClient from '../utils/apiClient'

function encodeSeoRef(pageRef) {
  return String(pageRef || '')
    .split('/')
    .filter(Boolean)
    .map(encodeURIComponent)
    .join('/')
}

export const seoService = {
  /**
   * @param {string} pageRef e.g. 'home', 'blog/my-slug', 'scholarship/:id'
   * @param {{ lang?: string }} [opts]
   */
  getPage(pageRef, opts = {}) {
    const path = encodeSeoRef(pageRef)
    return apiClient.get(`/seo/page/${path}`, { params: opts.lang ? { lang: opts.lang } : {} })
  },
}
