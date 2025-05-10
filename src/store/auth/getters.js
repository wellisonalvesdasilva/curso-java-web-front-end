export function getMe (state) {
  return state.me
}

export function getToken (state) {
  return state.token
}
export function isAuthenticated (state) {
  console.log('caiu aqui')
  return state.isAuthenticated
}
