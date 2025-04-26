/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        blue: {
          primary: '#3B82F6',
          hover: '#2563EB'
        },
        theme: {
          dark: {
            bg: {
              primary: '#171E26',
              secondary: '#1E2631',
              tertiary: '#252E3A',
              card: 'rgba(30, 38, 49, 0.95)',
              input: '#252E3A'
            },
            text: {
              primary: '#FFFFFF',
              secondary: '#B0B7C3',
              muted: '#6B7280'
            },
            border: '#2D3748'
          }
        }
      },
      backgroundColor: {
        'theme-primary': 'var(--bg-primary)',
        'theme-secondary': 'var(--bg-secondary)',
        'theme-tertiary': 'var(--bg-tertiary)',
        'theme-card': 'var(--card-bg)',
        'theme-input': 'var(--input-bg)',
      },
      textColor: {
        'theme-primary': 'var(--text-primary)',
        'theme-secondary': 'var(--text-secondary)',
        'theme-muted': 'var(--text-muted)',
      },
      borderColor: {
        'theme': 'var(--border)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
} 