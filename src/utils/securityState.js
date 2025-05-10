export default {
  hasTransaction (nome) {
    console.log('caiu aqui')
    const perfis = JSON.parse(sessionStorage.getItem('perfis'))
    if (!nome || !perfis || perfis.length === 0) {
      return false
    }
    return perfis.find(t => (t.authority === nome))
  },
  hasSomeTransaction () {
    console.log('caiu aqui')
    const perfis = JSON.parse(sessionStorage.getItem('perfis'))
    if (!perfis || perfis.length === 0) {
      return false
    }
    return true
  }
}
