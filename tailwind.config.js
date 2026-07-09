/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cockpit palette — mirrors the Dad Strength app (dark theme).
        // Old semantic names kept as aliases so nothing renders off-brand.
        carbon:       '#0B0E14', // page base — deep carbon
        'carbon-2':   '#10141B',
        panel:        '#141A26', // card surface (blue-slate)
        edge:         '#1E2C3E', // steel border
        rosso:        '#EA0B2F', // brand red
        'rosso-deep': '#B00822',
        titanium:     '#E3EAF2', // headline steel-white
        ink:          '#C0CCD8', // body text
        steel:        '#6A82A0', // muted chrome
        // aliases (legacy names → cockpit values)
        background:   '#0B0E14',
        dark:         '#141A26',
        primary:      '#1E2C3E',
        accent:       '#EA0B2F',
        text:         '#E3EAF2',
        subtext:      '#6A82A0',
      },
      fontFamily: {
        // Chakra Petch = industrial display + body. Share Tech Mono = telemetry.
        display:   ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        heading:   ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        body:      ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        drama:     ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        mono:      ['"Share Tech Mono"', 'ui-monospace', 'monospace'],
        telemetry: ['"Share Tech Mono"', 'ui-monospace', 'monospace'],
      }
    },
  },
  plugins: [],
}
