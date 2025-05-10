export const setToken = (state, token) => {
  state.token = token
  state.isAuthenticated = true
  window.sessionStorage.setItem('token', token)
}

export const signOut = (state, token) => {
  console.log('caiu aqui')
  state.token = ''
  state.isAuthenticated = false
  state.me = ''
  window.sessionStorage.removeItem('token')
  window.sessionStorage.removeItem('perfis')
}

export const setMe = (state, me) => {
  console.log('caiu aqui')
  state.me = me
  window.sessionStorage.setItem('perfis', JSON.stringify(me.perfis))
}
