// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },

      // Custom keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
      },

      // Background gradients
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom right, #e0e7ff, #faf5ff, #fce7f3)',
        'glass-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'violet-purple': 'linear-gradient(to bottom right, #8b5cf6, #9333ea)',
        'blue-gradient': 'linear-gradient(to bottom right, #3b82f6, #2563eb)',
        'green-gradient': 'linear-gradient(to bottom right, #10b981, #059669)',
        'pink-gradient': 'linear-gradient(to bottom right, #ec4899, #db2777)',
        'purple-gradient': 'linear-gradient(to bottom right, #a855f7, #9333ea)',
        'pattern': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },

      // Backdrop blur and filters
      backdropBlur: {
        xs: '2px',
      },

      // Custom colors (extracted from gradients)
      colors: {
        violet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        purple: {
          50: '#faf5ff',
          500: '#a855f7',
          600: '#9333ea',
        },
        indigo: {
          100: '#e0e7ff',
        },
        pink: {
          100: '#fce7f3',
          500: '#ec4899',
          600: '#db2777',
        },
      },

      // Opacity values
      opacity: {
        10: '0.1',
        75: '0.75',
        80: '0.8',
        90: '0.9',
        95: '0.95',
      },

      // Border radius
      borderRadius: {
        '4xl': '2rem',
      },

      // Box shadows
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },

      // Custom widths
      width: {
        72: '18rem',
        80: '20rem',
      },

      // Custom spacing
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
      },

      // Typography - Font sizes based on modular scale (1.25 - Major Third)
      // Provides harmonious proportions following golden ratio principles
      fontSize: {
        // Micro text - for badges, timestamps, fine print
        '2xs': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.01em', fontWeight: '400' }],
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em', fontWeight: '400' }],

        // Body text - for paragraphs, descriptions
        'sm': ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0.0075em', fontWeight: '400' }],
        'base': ['1rem', { lineHeight: '1.618rem', letterSpacing: '0.005em', fontWeight: '400' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0em', fontWeight: '400' }],

        // Display text - for headings and emphasis
        'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.015em', fontWeight: '600' }],
        '3xl': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.02em', fontWeight: '700' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.025em', fontWeight: '700' }],
        '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.03em', fontWeight: '800' }],
        '6xl': ['3.75rem', { lineHeight: '4.25rem', letterSpacing: '-0.035em', fontWeight: '800' }],

        // Specialized sizes
        'heading-sm': ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-md': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.015em', fontWeight: '700' }],
        'heading-lg': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.025em', fontWeight: '800' }],

        'label': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em', fontWeight: '500' }],
        'button': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.02em', fontWeight: '500' }],
        'caption': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.015em', fontWeight: '400' }],
      },

      // Font weights - semantic naming for different text types
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',        // Body text
        'medium': '500',        // Labels, buttons, subtle emphasis
        'semibold': '600',      // Section headings, strong emphasis
        'bold': '700',          // Main headings
        'extrabold': '800',     // Hero text, display headings
        'black': '900',         // Ultra emphasis (use sparingly)
      },

      // Letter spacing - for fine-tuning text hierarchy
      letterSpacing: {
        'tightest': '-0.04em',  // Large display text
        'tighter': '-0.025em',  // Headings
        'tight': '-0.015em',    // Subheadings
        'normal': '0em',        // Body text
        'wide': '0.015em',      // Uppercase labels
        'wider': '0.025em',     // Small uppercase text
        'widest': '0.05em',     // Tracking for emphasis
      },

      // Line height - optimized for readability
      lineHeight: {
        'none': '1',
        'tight': '1.25',        // Headings
        'snug': '1.375',        // Subheadings
        'normal': '1.5',        // Body text (ideal for reading)
        'relaxed': '1.618',     // Golden ratio - comfortable reading
        'loose': '1.75',        // Spacious body text
        'extra-loose': '2',     // Maximum breathing room
      },

      // Text opacity - for hierarchy and emphasis
      textOpacity: {
        '0': '0',
        '10': '0.1',
        '20': '0.2',
        '30': '0.3',
        '40': '0.4',           // Disabled text
        '50': '0.5',           // Placeholder text
        '60': '0.6',           // Secondary text (lighter)
        '70': '0.7',           // Secondary text
        '80': '0.8',           // Body text (subtle)
        '87': '0.87',          // Body text (standard - Material Design)
        '90': '0.9',           // Primary text (subtle)
        '95': '0.95',          // Primary text
        '100': '1',            // Full opacity
      },
    },
  },
  plugins: [
    // Plugin for custom utilities
    function({ addUtilities }) {
      const newUtilities = {
        // Glass morphism effect
        '.glass': {
          background: 'rgba(255, 255, 255, 0.95)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
        },
        // Gradient text
        '.gradient-text': {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        // Sidebar transition
        '.sidebar-transition': {
          transition: 'transform 0.3s ease-in-out',
        },
        // Prevent body scroll
        '.no-scroll': {
          overflow: 'hidden',
        },
        // Hide scrollbar
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      }
      addUtilities(newUtilities)
    },
    // Plugin for semantic typography utilities
    function({ addUtilities }) {
      const typographyUtilities = {
        // Display text - Hero sections, major headings
        '.text-display-1': {
          'font-size': '3.75rem',
          'line-height': '4.25rem',
          'letter-spacing': '-0.035em',
          'font-weight': '800',
        },
        '.text-display-2': {
          'font-size': '3rem',
          'line-height': '3.5rem',
          'letter-spacing': '-0.03em',
          'font-weight': '800',
        },
        '.text-display-3': {
          'font-size': '2.25rem',
          'line-height': '2.75rem',
          'letter-spacing': '-0.025em',
          'font-weight': '700',
        },

        // Headings - Page sections
        '.text-h1': {
          'font-size': '2.25rem',
          'line-height': '2.75rem',
          'letter-spacing': '-0.025em',
          'font-weight': '800',
        },
        '.text-h2': {
          'font-size': '1.875rem',
          'line-height': '2.375rem',
          'letter-spacing': '-0.02em',
          'font-weight': '700',
        },
        '.text-h3': {
          'font-size': '1.5rem',
          'line-height': '2rem',
          'letter-spacing': '-0.015em',
          'font-weight': '700',
        },
        '.text-h4': {
          'font-size': '1.25rem',
          'line-height': '1.875rem',
          'letter-spacing': '-0.01em',
          'font-weight': '600',
        },
        '.text-h5': {
          'font-size': '1.125rem',
          'line-height': '1.75rem',
          'letter-spacing': '-0.01em',
          'font-weight': '600',
        },
        '.text-h6': {
          'font-size': '1rem',
          'line-height': '1.5rem',
          'letter-spacing': '0em',
          'font-weight': '600',
        },

        // Body text - Paragraphs and content
        '.text-body-lg': {
          'font-size': '1.125rem',
          'line-height': '1.75rem',
          'letter-spacing': '0em',
          'font-weight': '400',
          'opacity': '0.87',
        },
        '.text-body': {
          'font-size': '1rem',
          'line-height': '1.618rem',
          'letter-spacing': '0.005em',
          'font-weight': '400',
          'opacity': '0.87',
        },
        '.text-body-sm': {
          'font-size': '0.875rem',
          'line-height': '1.375rem',
          'letter-spacing': '0.0075em',
          'font-weight': '400',
          'opacity': '0.87',
        },

        // Supporting text - Labels, captions
        '.text-label': {
          'font-size': '0.875rem',
          'line-height': '1.25rem',
          'letter-spacing': '0.025em',
          'font-weight': '500',
          'text-transform': 'uppercase',
        },
        '.text-caption': {
          'font-size': '0.75rem',
          'line-height': '1rem',
          'letter-spacing': '0.015em',
          'font-weight': '400',
          'opacity': '0.7',
        },
        '.text-overline': {
          'font-size': '0.75rem',
          'line-height': '1rem',
          'letter-spacing': '0.1em',
          'font-weight': '500',
          'text-transform': 'uppercase',
          'opacity': '0.7',
        },

        // Interactive text - Buttons, links
        '.text-button': {
          'font-size': '0.875rem',
          'line-height': '1.25rem',
          'letter-spacing': '0.02em',
          'font-weight': '500',
        },
        '.text-link': {
          'font-size': '1rem',
          'line-height': '1.5rem',
          'letter-spacing': '0em',
          'font-weight': '500',
          'text-decoration': 'underline',
          'text-decoration-thickness': '1px',
          'text-underline-offset': '2px',
        },

        // Specialized text types
        '.text-code': {
          'font-family': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          'font-size': '0.875rem',
          'line-height': '1.5rem',
          'letter-spacing': '0em',
          'font-weight': '400',
        },
        '.text-quote': {
          'font-size': '1.125rem',
          'line-height': '1.75rem',
          'letter-spacing': '-0.005em',
          'font-weight': '400',
          'font-style': 'italic',
          'opacity': '0.8',
        },
      }
      addUtilities(typographyUtilities)
    },
    // Plugin for custom scrollbar
    function({ addBase }) {
      addBase({
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: '#f1f5f9',
          'border-radius': '4px',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#cbd5e1',
          'border-radius': '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#94a3b8',
        },
      })
    },
  ],
}
