import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import AdBanner from '../../components/common/AdBanner'

const MOCK = {
  '1': {
    title: 'DAAD Scholarship Germany',
    country: 'Germany',
    university: 'Various German Universities',
    degree: 'MS/PhD',
    deadline: 'October 2026',
    fundingType: 'Fully Funded',
    eligibility: ['Bachelor\'s degree with good GPA', 'English or German language proficiency', 'Under 32 years of age for most programs', 'Strong academic background'],
    documents: ['Academic transcripts', 'Motivation letter', 'CV/Resume', 'Language certificate', 'Recommendation letters (2)', 'Passport copy'],
    benefits: ['Full tuition coverage', 'Monthly stipend (~€934)', 'Health insurance', 'Travel allowance', 'Study & research allowance'],
    steps: ['Choose your program on DAAD portal', 'Prepare all required documents', 'Submit online application', 'Wait for university nomination', 'DAAD final selection'],
    officialLink: 'https://www.daad.de',
  },
}

export default function ScholarshipDetails() {
  const { id } = useParams()
  const scholarship = MOCK[id]

  if (!scholarship) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-on-surface-variant">
        <span className="material-symbols-outlined text-5xl">search_off</span>
        <p>Scholarship not found.</p>
        <Link to={ROUTES.SCHOLARSHIPS} className="text-primary hover:underline">Back to Scholarships</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-section pb-xl px-lg hero-bg">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <Link to={ROUTES.SCHOLARSHIPS} className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary text-sm mb-6 transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Scholarships
          </Link>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-grow space-y-4">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20">
                {scholarship.fundingType}
              </span>
              <h1 className="font-heading text-h1 text-on-surface">{scholarship.title}</h1>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: 'location_on', text: scholarship.country },
                  { icon: 'account_balance', text: scholarship.university },
                  { icon: 'grade', text: scholarship.degree },
                  { icon: 'calendar_today', text: `Deadline: ${scholarship.deadline}` },
                ].map((tag) => (
                  <span key={tag.text} className="flex items-center gap-1.5 text-sm text-on-surface-variant bg-surface-container-high px-3 py-1.5 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-base">{tag.icon}</span>
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
            {/* CTA Card */}
            <div className="glass-panel rounded-xl p-6 space-y-4 w-full lg:w-80 flex-shrink-0">
              <h3 className="font-heading font-semibold text-on-surface text-lg">Apply with QADAM Digital</h3>
              <p className="text-sm text-on-surface-variant">Get expert guidance through the entire application process.</p>
              <a
                href="https://wa.me/93700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold py-3 rounded-lg glow-button transition-all duration-300"
              >
                <span className="material-symbols-outlined">chat</span>
                Apply Now on WhatsApp
              </a>
              {scholarship.officialLink && (
                <a
                  href={scholarship.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-primary text-primary font-semibold py-3 rounded-lg hover:bg-primary hover:text-on-primary transition-all duration-300"
                >
                  <span className="material-symbols-outlined">open_in_new</span>
                  Official Website
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          <div className="lg:col-span-2 space-y-8">
            {/* Benefits */}
            <div className="glass-panel rounded-xl p-6 space-y-4">
              <h2 className="font-heading text-xl font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">star</span>
                Benefits
              </h2>
              <ul className="space-y-2">
                {scholarship.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility */}
            <div className="glass-panel rounded-xl p-6 space-y-4">
              <h2 className="font-heading text-xl font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                Eligibility Criteria
              </h2>
              <ul className="space-y-2">
                {scholarship.eligibility.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-base mt-0.5">arrow_right</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents */}
            <div className="glass-panel rounded-xl p-6 space-y-4">
              <h2 className="font-heading text-xl font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">folder</span>
                Required Documents
              </h2>
              <ul className="space-y-2">
                {scholarship.documents.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-base mt-0.5">description</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Steps */}
            <div className="glass-panel rounded-xl p-6 space-y-4">
              <h2 className="font-heading text-xl font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">format_list_numbered</span>
                Application Steps
              </h2>
              <ol className="space-y-3">
                {scholarship.steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AdBanner className="min-h-[250px]" />
            <div className="glass-panel rounded-xl p-6 space-y-4">
              <h3 className="font-heading font-semibold text-on-surface">Need Help?</h3>
              <p className="text-sm text-on-surface-variant">Our experts are available 24/7 to assist you with your application.</p>
              <a
                href="https://wa.me/93700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold py-2.5 rounded-lg glow-button transition-all duration-300 text-sm"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
