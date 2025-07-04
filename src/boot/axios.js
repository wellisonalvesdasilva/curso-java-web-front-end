import { boot } from 'quasar/wrappers'
import axios from 'axios'
import validators from '../validators/validator-set'

const api = axios.create({ baseURL: process.env.API_MERCADO_INSTRUMENTAL })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  app.mixin({ methods: validators })
})

export { axios, api }
