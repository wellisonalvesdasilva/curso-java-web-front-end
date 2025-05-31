import { boot } from 'quasar/wrappers'
import axios from 'axios'
import validators from '../validators/validator-set'

const api = axios.create({ baseURL: 'https://mercado-instrumental-api-production.up.railway.app/v1/api' })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  app.mixin({ methods: validators })
})

export { axios, api }
