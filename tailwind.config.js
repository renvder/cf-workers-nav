// Tailwind CSS v3.4 config used to precompile the styles embedded in the page (<style id="tw-compiled">).
// input.css = "@tailwind base; @tailwind components; @tailwind utilities;"
// Build: npx tailwindcss@3.4.17 -c tailwind.config.js -i input.css -o out.css --minify
module.exports = {
  content: ['./page.html'], // the page's HTML saved to a file

            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Share Tech Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
                        display: ['Orbitron', 'ui-sans-serif', 'sans-serif'],
                    },
                    colors: {
                        glass: {
                            border: 'rgba(168, 85, 247, 0.25)',
                            darkBorder: 'rgba(168, 85, 247, 0.15)',
                        },
                        // Cyberpunk terminal neutrals: purple-black instead of blue-grey
                        slate: {
                            50: '#f6f1ff', 100: '#ece2fd', 200: '#d7c3fb', 300: '#bb96f2',
                            400: '#9c6de6', 500: '#8347d1', 600: '#6931ab', 700: '#4c1f80',
                            800: '#2a1147', 900: '#170a29', 950: '#0a0414',
                        },
                        // Primary accent: neon purple/violet replacing the old green
                        emerald: {
                            50: '#faf0ff', 100: '#f3d9ff', 200: '#e6b3ff', 300: '#d685ff',
                            400: '#c04dff', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce',
                            800: '#5b1798', 900: '#3b0764',
                        },
                        // Secondary accent: neon cyan for contrast against the purple field
                        blue: {
                            100: '#cffafe', 300: '#67e8f9', 400: '#22d3ee',
                            600: '#0891b2', 900: '#083344',
                        },
                        teal: {
                            600: '#d926c9',
                        },
                        gray: {
                            100: '#f3edfb', 200: '#e6d9f7', 300: '#d0bdf0', 600: '#5f3a94',
                        },
                    },
                    
                    boxShadow: {
                        'glass': '0 4px 30px rgba(168, 85, 247, 0.15)',
                        'glass-hover': '0 10px 40px rgba(168, 85, 247, 0.25)',
                    }
                }
            }
        };
