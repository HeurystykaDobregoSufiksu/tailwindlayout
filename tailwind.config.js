// tailwind.config.js
module.exports = {
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

      // Font sizes
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
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
