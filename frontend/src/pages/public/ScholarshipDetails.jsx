import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'
import AdBanner from '../../components/common/AdBanner'

// Scholarship data — titles/names stay in English as they are proper nouns
// but all UI labels, section headings, and buttons are translated
const MOCK = {
  '1': {
    title: 'DAAD Scholarship Germany',
    country: 'Germany',
    university: 'Various German Universities',
    degree: 'MS/PhD',
    deadline: 'October 2026',
    fundingType: 'Fully Funded',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
    eligibility: {
      en: ["Bachelor's degree with good GPA", 'English or German language proficiency', 'Under 32 years of age for most programs', 'Strong academic background'],
      ps: ['د لیسانس سند د ښه نمرو سره', 'د انګلیسي یا آلماني ژبې مهارت', 'د ډیرو برنامو لپاره د ۳۲ کلونو لاندې عمر', 'قوي علمي شالید'],
      fa: ['مدرک کارشناسی با معدل خوب', 'مهارت زبان انگلیسی یا آلمانی', 'سن زیر ۳۲ سال برای اکثر برنامه‌ها', 'سابقه تحصیلی قوی'],
    },
    documents: {
      en: ['Academic transcripts', 'Motivation letter', 'CV/Resume', 'Language certificate', 'Recommendation letters (2)', 'Passport copy'],
      ps: ['د زده کړې نمرې', 'د هڅونې لیک', 'CV/رزومه', 'د ژبې سند', 'د سپارښتنې لیکونه (۲)', 'د پاسپورټ کاپي'],
      fa: ['ریزنمرات تحصیلی', 'نامه انگیزشی', 'رزومه/CV', 'گواهی زبان', 'نامه‌های توصیه (۲)', 'کپی پاسپورت'],
    },
    benefits: {
      en: ['Full tuition coverage', 'Monthly stipend (~€934)', 'Health insurance', 'Travel allowance', 'Study & research allowance'],
      ps: ['د ټولو لوستلو لګښتونو پوښښ', 'میاشتنۍ لګښت (~€۹۳۴)', 'روغتیایي بیمه', 'د سفر لګښت', 'د زده کړې او څیړنې لګښت'],
      fa: ['پوشش کامل شهریه', 'کمک هزینه ماهانه (~€۹۳۴)', 'بیمه درمانی', 'هزینه سفر', 'هزینه تحصیل و پژوهش'],
    },
    steps: {
      en: ['Choose your program on DAAD portal', 'Prepare all required documents', 'Submit online application', 'Wait for university nomination', 'DAAD final selection'],
      ps: ['خپله برنامه د DAAD پورټل کې وټاکئ', 'ټول اړین اسناد چمتو کړئ', 'آنلاین غوښتنلیک وسپارئ', 'د پوهنتون نوماند کیدو ته انتظار وکړئ', 'د DAAD وروستۍ ټاکنه'],
      fa: ['برنامه خود را در پورتال DAAD انتخاب کنید', 'تمام مدارک مورد نیاز را آماده کنید', 'درخواست آنلاین ارسال کنید', 'منتظر معرفی دانشگاه باشید', 'انتخاب نهایی DAAD'],
    },
    officialLink: 'https://www.daad.de',
  },
  '2': {
    title: 'Chevening Scholarship UK',
    country: 'United Kingdom',
    university: 'UK Universities',
    degree: 'MS',
    deadline: 'November 2026',
    fundingType: 'Fully Funded',
    eligibility: {
      en: ["Bachelor's degree (minimum 2:1)", 'At least 2 years of work experience', 'Return to home country after study', 'Strong leadership potential'],
      ps: ['د لیسانس سند (لږترلږه ۲:۱)', 'لږترلږه ۲ کاله د کار تجربه', 'د زده کړې وروسته خپل هیواد ته ستنیدل', 'قوي مشري ظرفیت'],
      fa: ['مدرک کارشناسی (حداقل ۲:۱)', 'حداقل ۲ سال سابقه کاری', 'بازگشت به کشور پس از تحصیل', 'پتانسیل رهبری قوی'],
    },
    documents: {
      en: ['Academic transcripts', 'Personal statement', 'Two references', 'English language certificate', 'Passport copy'],
      ps: ['د زده کړې نمرې', 'شخصي بیان', 'دوه سپارښتنې', 'د انګلیسي ژبې سند', 'د پاسپورټ کاپي'],
      fa: ['ریزنمرات تحصیلی', 'بیانیه شخصی', 'دو معرف', 'گواهی زبان انگلیسی', 'کپی پاسپورت'],
    },
    benefits: {
      en: ['Full tuition fees', 'Monthly living allowance', 'Return flights', 'Arrival allowance', 'Thesis grant'],
      ps: ['بشپړ د زده کړې لګښتونه', 'میاشتنۍ د ژوند لګښت', 'د راتګ او تللو الوتکه', 'د رارسیدو لګښت', 'د تیزس ګرانټ'],
      fa: ['شهریه کامل', 'کمک هزینه زندگی ماهانه', 'بلیط رفت و برگشت', 'کمک هزینه ورود', 'کمک هزینه پایان‌نامه'],
    },
    steps: {
      en: ['Register on Chevening website', 'Complete online application', 'Submit references', 'Attend interview if shortlisted', 'Receive award notification'],
      ps: ['د Chevening ویبسایټ کې ثبت نام کړئ', 'آنلاین غوښتنلیک بشپړ کړئ', 'سپارښتنې وسپارئ', 'که چیرې لنډ لیست شوئ مرکه ورکړئ', 'د جایزې خبرتیا ترلاسه کړئ'],
      fa: ['در وب‌سایت Chevening ثبت‌نام کنید', 'درخواست آنلاین را تکمیل کنید', 'معرفی‌نامه‌ها را ارسال کنید', 'در صورت کوتاه‌لیست شدن در مصاحبه شرکت کنید', 'اطلاعیه جایزه را دریافت کنید'],
    },
    officialLink: 'https://www.chevening.org',
  },
}

export default function ScholarshipDetails() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'ps' ? 'ps' : i18n.language === 'fa' ? 'fa' : 'en'
  const scholarship = MOCK[id]

  if (!scholarship) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-text-muted">
        <span className="material-symbols-outlined text-5xl text-primary-light">search_off</span>
        <p>{t('scholarships.not_found')}</p>
        <Link to={ROUTES.SCHOLARSHIPS} className="text-primary hover:underline font-semibold">
          {t('scholarships.back')}
        </Link>
      </div>
    )
  }

  const fundingLabel = scholarship.fundingType === 'Fully Funded'
    ? t('scholarships.fully_funded')
    : t('scholarships.partial')

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <Link to={ROUTES.SCHOLARSHIPS}
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-8 transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {t('scholarships.back')}
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left — Info */}
            <div className="flex-grow space-y-5">
              <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                {fundingLabel}
              </span>
              <h1 className="font-heading font-bold text-white text-4xl leading-tight">
                {scholarship.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: 'location_on', label: t('scholarships.country_label'), text: scholarship.country },
                  { icon: 'account_balance', label: t('scholarships.university_label'), text: scholarship.university },
                  { icon: 'grade', label: t('scholarships.degree_label'), text: scholarship.degree },
                  { icon: 'calendar_today', label: t('scholarships.deadline_label'), text: scholarship.deadline },
                ].map((tag) => (
                  <span key={tag.label} className="flex items-center gap-1.5 text-sm text-white/80 bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-base">{tag.icon}</span>
                    <span className="text-white/60 text-xs">{tag.label}:</span>
                    <span className="text-white font-medium">{tag.text}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right — CTA Card with image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl w-full lg:w-80 flex-shrink-0">
              {/* University image */}
              {scholarship.image && (
                <div className="h-40 overflow-hidden">
                  <img src={scholarship.image} alt={scholarship.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6 space-y-4">
                <h3 className="font-heading font-bold text-navy text-lg">{t('scholarships.apply_cta_title')}</h3>
                <p className="text-sm text-text-muted">{t('scholarships.apply_cta_desc')}</p>
                <a href="https://wa.me/923039393438" target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-btn text-sm">
                  <span className="material-symbols-outlined text-base">chat</span>
                  {t('scholarships.apply_whatsapp')}
                </a>
                {scholarship.officialLink && (
                  <a href={scholarship.officialLink} target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 text-sm">
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                    {t('scholarships.official_website')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">

              {/* Benefits */}
              <div className="card p-6 space-y-4">
                <h2 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">star</span>
                  {t('scholarships.benefits')}
                </h2>
                <ul className="space-y-2.5">
                  {(scholarship.benefits[lang] || scholarship.benefits.en).map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">check_circle</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility */}
              <div className="card p-6 space-y-4">
                <h2 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                  {t('scholarships.eligibility')}
                </h2>
                <ul className="space-y-2.5">
                  {(scholarship.eligibility[lang] || scholarship.eligibility.en).map((e, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">arrow_right</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Documents */}
              <div className="card p-6 space-y-4">
                <h2 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">folder</span>
                  {t('scholarships.required_docs')}
                </h2>
                <ul className="space-y-2.5">
                  {(scholarship.documents[lang] || scholarship.documents.en).map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">description</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Steps */}
              <div className="card p-6 space-y-4">
                <h2 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">format_list_numbered</span>
                  {t('scholarships.app_steps')}
                </h2>
                <ol className="space-y-3">
                  {(scholarship.steps[lang] || scholarship.steps.en).map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 mt-0.5">
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
              <AdBanner className="min-h-[200px]" />
              <div className="card p-6 space-y-4">
                <h3 className="font-heading font-bold text-navy text-lg">{t('scholarships.need_help_sidebar')}</h3>
                <p className="text-sm text-text-muted">{t('scholarships.need_help_sidebar_desc')}</p>
                <a href="https://wa.me/923039393438" target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-dark transition-all duration-200 text-sm shadow-btn">
                  <span className="material-symbols-outlined text-base">chat</span>
                  {t('scholarships.chat_whatsapp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
