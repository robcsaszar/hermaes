module.exports = {
  plugins: {
    tailwindcss: {
      content: ['widget/**/*.{svelte}'],
      theme: {
        fontSize: {
          xs: [
            '9px',
            {
              lineHeight: '12px',
            },
          ],
          sm: [
            '12px',
            {
              lineHeight: '16px',
            },
          ],
          base: [
            '16px',
            {
              lineHeight: '24px',
            },
          ],
          lg: [
            '20px',
            {
              lineHeight: '24px',
            },
          ],
          xl: [
            '32px',
            {
              lineHeight: '40px',
            },
          ],
          '2xl': [
            '40px',
            {
              lineHeight: '56px',
            },
          ],
          '3xl': [
            '48px',
            {
              lineHeight: '64px',
            },
          ],
          '4xl': [
            '64px',
            {
              lineHeight: '80px',
            },
          ],
          'dynamic-sm': [
            'clamp(0.85rem, 0.75rem + 1vw, 3rem)',
            {
              lineHeight: 'clamp(12.00px, 1.333rem + 1vw, 3.790rem)',
            },
          ],
          'dynamic-md': [
            'clamp(1rem, 0.6rem + 1.25vw, 4rem)',
            {
              lineHeight: 'clamp(14.00px, 1.555rem + 1.5vw, 5.30rem)',
            },
          ],
          dynamic: [
            'clamp(1rem, 0.4rem + 3vw, 4rem)',
            {
              lineHeight: 'clamp(16.00px, 1.777rem + 3vw, 7.580rem)',
            },
          ],
          'dynamic-lg': [
            'clamp(2rem, 0.75rem + 3vw, 4rem)',
            {
              lineHeight: 'clamp(16.00px, 1.777rem + 3vw, 7.580rem)',
            },
          ],
          'dynamic-xl': [
            'clamp(2rem, 0.4rem + 8vw, 10rem)',
            {
              lineHeight: 'clamp(32.00px, 3.555rem + 8vw, 15.160rem)',
            },
          ],
        },
        extend: {
          colors: {
            transparent: 'transparent',
            current: 'currentColor',
            background: '#F0F1E9',
            primary: {
              dark: '#110D1C',
              light: '#F0F1E9',
            },
            ebony: {
              DEFAULT: '#110D1C',
              50: '#9AB0D0',
              100: '#8298C5',
              200: '#5162AE',
              300: '#3A3D7E',
              400: '#28244D',
              500: '#110D1C',
              600: '#0E0A15',
              700: '#0B070E',
              800: '#060307',
              900: '#000000',
            },
            wheatfield: {
              DEFAULT: '#E6E4D6',
              50: '#F1F3EC',
              100: '#F0F1E9',
              200: '#ECEDE3',
              300: '#E9EADD',
              400: '#E6E4D6',
              500: '#C6BFA4',
              600: '#A79672',
              700: '#7B674D',
              800: '#483A2D',
              900: '#16110E',
            },
          },
        },
      },
    },
    autoprefixer: {},
  },
}
