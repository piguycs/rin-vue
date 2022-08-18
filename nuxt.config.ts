import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: ["@nuxtjs/tailwindcss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "assets/styles/_variables.scss";',
        },
      },
    },
  },
  publicRuntimeConfig: {
    APIKEY: process.env.APIKEY,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    SERVICEACCOUNT: process.env.SERVICEACCOUNT
  },
  privateRuntimeConfig: {
    APIKEY: process.env.APIKEY,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    SERVICEACCOUNT: process.env.SERVICEACCOUNT
  }
});
