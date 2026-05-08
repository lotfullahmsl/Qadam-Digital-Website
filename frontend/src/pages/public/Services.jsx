import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'

const SERVICE_GROUPS = [
  {
    category: 'Education & Consulting',
    icon: 'school',
    color: 'bg-blue-50 text-blue-600',
    services: [
      {
        icon: 'school',
        title: 'Scholarship Guidance & Application',
        description: 'Comprehensive consultancy for securing prestigious international scholarships and academic placements.',
        to: ROUTES.SCHOLARSHIPS,
        features: ['Scholarship search & matching', 'Application support', 'Document preparation', 'Interview coaching'],
      },
      {
        icon: 'description',
        title: 'CV & Motivation Letter Writing',
        description: 'Professional, ATS-optimized CVs tailored to highlight your unique academic and professional trajectory.',
        to: ROUTES.CV_TRANSLATION,
        features: ['Professional CV writing', 'Motivation letter writing', 'Statement of purpose', 'LinkedIn optimization'],
      },
      {
        icon: 'translate',
        title: 'Document Translation Services',
        description: 'Certified multilingual translation of academic, legal, and professional documents.',
        to: ROUTES.CV_TRANSLATION,
        features: ['English, Pashto, Dari', 'Academic documents', 'Legal documents', 'Certified translations'],
      },
      {
        icon: 'psychology',
        title: 'Educational & Digital Consulting',
        description: 'Expert guidance for students and businesses navigating the digital landscape and educational opportunities.',
        to: ROUTES.CONTACT,
        features: ['Career counseling', 'Digital strategy', 'Technology consulting', 'Business planning'],
      },
    ],
  },
  {
    category: 'Technology & Development',
    icon: 'code',
    color: 'bg-purple-50 text-purple-600',
    services: [
      {
        icon: 'web',
        title: 'Website Development',
        description: 'Bespoke, high-performance web applications and platforms built with modern frameworks.',
        to: ROUTES.WEBSITE_DATABASE,
        features: ['Business websites', 'E-commerce platforms', 'Portfolio websites', 'Custom web apps'],
      },
      {
        icon: 'database',
        title: 'Database Development',
        description: 'Secure, scalable database architectures for clinics, schools, shops, and organizations.',
        to: ROUTES.WEBSITE_DATABASE,
        features: ['Clinic management systems', 'School management systems', 'Inventory databases', 'Custom solutions'],
      },
      {
        icon: 'smart_toy',
        title: 'Digital Subscription Guidance',
        description: 'Access to elite AI platforms and educational tools to accelerate research and productivity.',
        to: ROUTES.DIGITAL_TOOLS,
        features: ['ChatGPT Plus', 'Gemini Advanced', 'Coursera Plus', 'Canva Pro'],
      },
      {
        icon: 'campaign',
        title: 'Social Media Marketing',
        description: 'Strategic digital marketing to amplify your brand across global platforms and drive real results.',
        to: ROUTES.SOCIAL_MEDIA,
        features: ['Facebook & Instagram ads', 'Content creation', 'Audience targeting', 'Campaign management'],
      },
    ],
  },
  {
    category: 'Graphic Design',
    icon: 'palette',
    color: 'bg-pink-50 text-pink-600',
    services: [
      {
        icon: 'palette',
        title: 'Logo Design & Branding',
        description: 'Professional logo design and complete brand identity packages that make your business stand out.',
        to: ROUTES.CONTACT,
        features: ['Logo design', 'Brand identity kit', 'Color palette & typography', 'Brand guidelines'],
      },
      {
        icon: 'print',
        title: 'Print Advertisement Design',
        description: 'Eye-catching print materials designed for maximum impact — from flyers to billboards.',
        to: ROUTES.CONTACT,
        features: ['Flyers & brochures', 'Banners & billboards', 'Business cards', 'Posters & catalogs'],
      },
      {
        icon: 'inventory_2',
        title: 'Packaging Design',
        description: 'Creative and functional packaging designs that attract customers and reflect your brand values.',
        to: ROUTES.CONTACT,
        features: ['Product packaging', 'Label design', 'Box & bag design', 'Mockup presentations'],
      },
      {
        icon: 'photo_camera',
        title: 'Social Media Poster Design',
        description: 'Scroll-stopping social media visuals designed for Instagram, Facebook, LinkedIn, and more.',
        to: ROUTES.CONTACT,
        features: ['Post & story designs', 'Profile & cover photos', 'Ad creatives', 'Content templates'],
      },
      {
        icon: 'menu_book',
        title: 'Book Cover & Interior Design',
        description: 'Professional book cover design and interior layout for print and digital publications.',
        to: ROUTES.CONTACT,
        features: ['Book cover design', 'Interior layout & typesetting', 'E-book formatting', 'Print-ready files'],
      },
    ],
  },
  {
    category: 'Video Editing & Animation',
    icon: 'movie',
    color: 'bg-orange-50 text-orange-600',
    services: [
      {
        icon: 'movie',
        title: 'Short & Long Content Editing',
        description: 'Professional video editing for YouTube, social media, corporate videos, and promotional content.',
        to: ROUTES.CONTACT,
        features: ['YouTube & social media edits', 'Corporate & promo videos', 'Color grading', 'Sound design & mixing'],
      },
      {
        icon: 'animation',
        title: '2D & 3D Animation',
        description: 'High-quality 2D and 3D animations for explainer videos, ads, and creative storytelling.',
        to: ROUTES.CONTACT,
        features: ['2D character animation', '3D product visualization', 'Explainer videos', 'Motion infographics'],
      },
      {
        icon: 'auto_awesome',
        title: 'Logo Motion & Intro Design',
        description: 'Animated logo reveals and branded intros/outros that give your content a professional edge.',
        to: ROUTES.CONTACT,
        features: ['Logo animation', 'Intro & outro sequences', 'Lower thirds', 'Animated watermarks'],
      },
      {
        icon: 'view_in_ar',
        title: 'Product Animations',
        description: '3D product animations and visualizations that showcase your products in stunning detail.',
        to: ROUTES.CONTACT,
        features: ['3D product rendering', 'Turntable animations', 'Lifestyle product videos', 'E-commerce visuals'],
      },
    ],
  },
]

// Flat list for the hero count
const TOTAL_SERVICES = SERVICE_GROUPS.reduce((acc, g) => acc + g.services.length, 0)

export default function Services() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="hero-bg py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20 mb-5">
            <span className="material-symbols-outlined text-sm">build</span>
            {t('nav.services')}
          </span>
          <h1 className="font-heading font-bold text-white text-5xl mb-4 max-w-2xl">
            Next-Gen <span className="text-primary">Digital Solutions</span>
          </h1>
          <div className="h-1 w-24 bg-primary rounded-full mb-6" />
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            {t('services.subtitle')}
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {SERVICE_GROUPS.map((group) => (
              <span key={group.category}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 px-4 py-2 rounded-full text-sm font-medium">
                <span className="material-symbols-outlined text-primary text-base">{group.icon}</span>
                {group.category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Groups ── */}
      {SERVICE_GROUPS.map((group, gi) => (
        <section
          key={group.category}
          className={`py-16 px-6 ${gi % 2 === 0 ? 'bg-background' : 'bg-primary-pale'}`}
        >
          <div className="max-w-screen-xl mx-auto">
            {/* Group header */}
            <div className="flex items-center gap-4 mb-10">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${group.color}`}>
                <span className="material-symbols-outlined text-2xl">{group.icon}</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-navy text-2xl">{group.category}</h2>
                <p className="text-text-muted text-sm mt-0.5">{group.services.length} services available</p>
              </div>
              <div className="ml-auto hidden sm:block h-px flex-1 bg-border max-w-xs" />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {group.services.map((service) => (
                <div key={service.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${group.color}`}>
                    <span className="material-symbols-outlined text-xl">{service.icon}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-navy text-base leading-snug">{service.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed flex-grow">{service.description}</p>
                  <ul className="space-y-1.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className="material-symbols-outlined text-primary text-base flex-shrink-0">check_circle</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={service.to}
                    className="text-primary text-xs font-semibold tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all duration-200 mt-1"
                  >
                    {t('services.get_started')}
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="py-16 px-6 bg-primary">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-white text-3xl">Not Sure Which Service You Need?</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Contact us on WhatsApp and our team will guide you to the perfect solution for your needs.
          </p>
          <a
            href="https://wa.me/93700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-pale transition-all duration-200 shadow-lg"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            {t('contact.whatsapp_btn')}
          </a>
        </div>
      </section>

    </div>
  )
}
