/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // App content
        "../../apps/*/app/**/*.{js,ts,jsx,tsx}",
        "../../apps/*/pages/**/*.{js,ts,jsx,tsx}",
        "../../apps/*/components/**/*.{js,ts,jsx,tsx}",
        "../../apps/*/src/**/*.{js,ts,jsx,tsx}",
        // Package content
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                orie: {
                    bg: "#F8F6F3",
                    text: "#2F2F2F",
                    "text-secondary": "#bfc5b6",
                    "bg-secondary": "#FAF8F5",
                    white: "#FFFFFF",
                    black: "#121212"
                }
            },
            fontFamily: {
                sans: ['Baskervville', 'serif'],
                serif: ['Baskervville', 'serif']
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
            }
        },
    },
    plugins: [],
};
