// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
})