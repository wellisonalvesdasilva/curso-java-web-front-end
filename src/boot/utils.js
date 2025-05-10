// import messages from '../utils/messages'
import formatadores from '../utils/formatadores'
// import fileutil from '../utils/fileutil'
// import QInputDate from '../components/QInputDate.vue'
// import buscarPreferencias from '../library/PluginColunas'
export default ({ app, router, store }) => {
  // app.config.globalProperties.$msg = messages
  // app.config.globalProperties.$msgs = messages
  app.config.globalProperties.$fmt = formatadores
  // app.config.globalProperties.$file = fileutil
  // app.config.globalProperties.$preferenciasUsuario = buscarPreferencias
  // app.component('QInputDate', QInputDate)
}
