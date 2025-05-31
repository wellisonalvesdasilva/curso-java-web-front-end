/* eslint-env node */

import { configure } from 'quasar/wrappers'
import ESLintPlugin from 'eslint-webpack-plugin'
import dotenv from 'dotenv'

dotenv.config()

export default configure(function (/* ctx */) {
  return {
    boot: [
      'main',
      'axios',
      'utils'
    ],

    css: [
      'app.scss'
    ],

    extras: [
      'mdi-v7',
      'roboto-font',
      'material-icons'
    ],

    build: {
      target: {
        browser: ['es2020']
      },

      vueRouterMode: 'history',

      chainWebpack (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])
      },

      env: {
        API_MERCADO_INSTRUMENTAL: process.env.API_MERCADO_INSTRUMENTAL
      },

      vitePlugins: [
        ['vite-plugin-checker', {
          eslint: {
            lintCommand: 'eslint "./**/*.{js,mjs,cjs,vue}"'
          }
        }, { server: false }]
      ]
    },

    devServer: {
      open: true
    },

    framework: {
      config: {},

      iconSet: 'mdi-v7',
      lang: 'pt-BR',

      plugins: ['Notify', 'Dialog', 'Loading']
    },

    animations: [],

    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: ['render']
    },

    pwa: {
      workboxMode: 'generateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false
    },

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      inspectPort: 5858,
      bundler: 'packager',
      builder: {
        appId: 'mercado-instrumental-front-end'
      }
    },

    bex: {
      contentScripts: [
        'my-content-script'
      ]
    }
  }
})
