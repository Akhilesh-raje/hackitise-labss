/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          green: {
            dark: '#0f3d3e',
            light: '#145c5e',
          },
          purple: {
            light: '#6c63ff',
            dark: '#8a7dff',
          },
          bg: '#f0f3f5', // desaturated light teal/gray
          surface: '#ffffff',
        }
      },
      boxShadow: {
        'neo-out': '10px 10px 20px rgba(0,0,0,0.05), -10px -10px 20px rgba(255,255,255,0.8)',
        'neo-in': 'inset 10px 10px 20px rgba(0,0,0,0.05), inset -10px -10px 20px rgba(255,255,255,0.8)',
        'glow-purple': '0 0 20px rgba(108, 99, 255, 0.4)',
        'glow-green': '0 0 20px rgba(20, 92, 94, 0.4)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0f3d3e 0%, #145c5e 100%)',
        'gradient-primary-hover': 'linear-gradient(135deg, #145c5e 0%, #0f3d3e 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #6c63ff 0%, #8a7dff 100%)',
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
