// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // head: {
    //     title: 'GRTSINRY43的个人主页',
    //     meta: [
    //         {charset: 'utf-8'},
    //         {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    //         {hid: 'description', name: 'description', content: 'Meta description'}
    //     ],
    //     link: [
    //         {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    //     ]
    // },
    css: [
        '@/assets/global.css',
        '@/assets/fonts.css'
    ],
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: [
        "@nuxt/ui",
        "@nuxtjs/i18n",
        "@nuxtjs/sitemap",
        '@nuxtjs/color-mode',
        "@formkit/auto-animate",
        "@nuxt/image",
        '@nuxtjs/robots',
    ],
    // devServer: {
    //     host: '192.168.123.20',
    //     port: 3000
    // },
    nitro: {
        devProxy: {
            "/api": {
                target: "http://localhost:8080", // 这里是接口地址
                changeOrigin: true,
            },
        },
    },
    app: {
        head: {
            title: '开发，探索与折腾 - GRTSINTY43的个人主页',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
    site: {
        url: 'https://www.grtsinry43.com',
    },
    sitemap: {
        hostname: 'https://www.grtsinry43.com',
        gzip: true,
    },
    i18n: {
        vueI18n: './i18n.config.ts',
        locales: [
            { code: 'en', iso: 'en-US', name: 'English' },
            { code: 'zh', iso: 'zh-CN', name: '中文' }
        ],
        defaultLocale: 'zh',
    }
})
