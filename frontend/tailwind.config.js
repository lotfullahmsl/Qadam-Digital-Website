/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // QADAM Digital Blue Palette
        primary: '#00AAFF',          // Vivid blue — CTAs, buttons, highlights
        'primary-dark': '#0A5C7A',   // Dark blue — hover states, secondary elements
        'primary-light': '#A8D8F0',  // Light blue — borders, subtle accents
        'primary-pale': '#DAEEF8',   // Palest blue — section backgrounds
        navy: '#062030',             // Darkest navy — footer, deep backgrounds

        // Semantic aliases
        background: '#F0F8FF',       // Very light blue-white page background
        surface: '#FFFFFF',          // Card / panel surfaces
        'surface-alt': '#DAEEF8',    // Alternate section background
        'surface-dark': '#062030',   // Dark sections (footer, hero overlay)

        // Text
        'text-primary': '#062030',   // Main body text (dark navy)
        'text-secondary': '#0A5C7A', // Secondary text (dark blue)
        'text-muted': '#4A7A8A',     // Muted / placeholder text
        'text-on-primary': '#FFFFFF',// Text on vivid blue backgrounds
        'text-on-dark': '#DAEEF8',   // Text on dark navy backgrounds

        // Borders
        border: '#A8D8F0',
        'border-dark': '#0A5C7A',

        // Status
        error: '#DC2626',
        success: '#16A34A',
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px',
      },
      spacing: {
        lg: '2rem',
        section: '6rem',
        gutter: '24px',
        xl: '4rem',
        md: '1rem',
        sm: '0.5rem',
        xs: '0.25rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'body-md': ['1rem', { lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' }],
        h1: ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        h3: ['1.75rem', { lineHeight: '1.3', letterSpacing: '0em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0em', fontWeight: '400' }],
        'label-caps': ['0.75rem', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '600' }],
        h2: ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(0,170,255,0.08)',
        'card-hover': '0 8px 32px 0 rgba(0,170,255,0.18)',
        btn: '0 4px 14px 0 rgba(0,170,255,0.35)',
      },
    },
  },
  plugins: [],
}
