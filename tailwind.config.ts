module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,vue}',
    ],
    theme: {
        extend: {
            boxShadow: {
                'lg': '0 20px 40px rgba(0, 0, 0, 0.1)',
                'dark-lg': '0 20px 40px rgba(255, 255, 255, 0.1)',
            },
        },
    },
    variants: {
        extend: {
            boxShadow: ['dark'],
        },
    },
    plugins: [],
}
