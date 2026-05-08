import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-navy text-text-on-dark">
      {/* Main Footer */}
      <div className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Link to={ROUTES.HOME}>
            <img
              src="/logo-light.jpeg"
              alt="QADAM Digital"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-primary-light/80 leading-relaxed max-w-xs">
            Empowering students and businesses through world-class education consultancy and digital services.
          </p>
          {/* Social Links */}
          <div className="flex gap-2 mt-1">
            {[
              { icon: 'facebook', href: '#', label: 'Facebook' },
              { icon: 'photo_camera', href: '#', label: 'Instagram' },
              { icon: 'work', href: '#', label: 'LinkedIn' },
              { icon: 'smart_display', href: '#', label: 'YouTube' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-primary-light hover:bg-primary hover:text-white transition-all duration-200 border border-white/10"
              >
                <span className="material-symbols-outlined text-base">{s.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">Services</h4>
          <ul className="space-y-3 text-sm text-primary-light/80">
            <li><Link to={ROUTES.SCHOLARSHIPS} className="hover:text-white transition-colors">Scholarship Consulting</Link></li>
            <li><Link to={ROUTES.CV_TRANSLATION} className="hover:text-white transition-colors">CV & Motivation Letters</Link></li>
            <li><Link to={ROUTES.WEBSITE_DATABASE} className="hover:text-white transition-colors">Web Development</Link></li>
            <li><Link to={ROUTES.DIGITAL_TOOLS} className="hover:text-white transition-colors">AI Tool Subscriptions</Link></li>
            <li><Link to={ROUTES.SOCIAL_MEDIA} className="hover:text-white transition-colors">Social Media Marketing</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">Company</h4>
          <ul className="space-y-3 text-sm text-primary-light/80">
            <li><Link to={ROUTES.ABOUT} className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to={ROUTES.PORTFOLIO} className="hover:text-white transition-colors">Portfolio</Link></li>
            <li><Link to={ROUTES.BLOG} className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to={ROUTES.PRICING} className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link to={ROUTES.CONTACT} className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-light/80">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">chat</span>
              <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+93 700 000 000</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">email</span>
              <a href="mailto:info@qadamdigital.com" className="hover:text-white transition-colors">info@qadamdigital.com</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">location_on</span>
              <span>Kabul, Afghanistan</span>
            </li>
          </ul>
          <a
            href="https://wa.me/93700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold tracking-wide uppercase px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-all duration-200"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-light/60">© 2024 QADAM Digital. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-primary-light/60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
