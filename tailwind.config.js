/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            transitionProperty: {
                height: 'height',
            },
            rotate: {
                30: '30deg',
            },
            aspectRatio: {
                '29/37': '29/37',
                '40/15': '40/15',
            },
            animation: {
                shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) infinite',
            },
            keyframes: {
                shake: {
                    '10%, 90% ': { transform: 'translate3d(-0.5px, 0, 0)' },

                    '20%, 80%': { transform: 'translate3d(1px, 0, 0)' },

                    '30%, 50%, 70%': { transform: 'translate3d(-2px, 0, 0)' },

                    '40%, 60%': { transform: 'translate3d(2px, 0, 0)' },
                },
            },
        },
    },
    plugins: [],
}
