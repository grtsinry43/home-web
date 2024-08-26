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
        '@/assets/global.css'
    ],
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: [
        "@nuxt/ui",
        "@nuxtjs/i18n",
        "@nuxtjs/sitemap",
        '@nuxtjs/color-mode',
        "@formkit/auto-animate",
        "@nuxt/image"
    ],
    devServer: {
        host: '192.168.123.20',
        port: 3000
    }
})
