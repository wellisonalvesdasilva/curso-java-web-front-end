import { api } from 'boot/axios'

export const doLogin = async ({ commit, dispatch }, payload) => {
  console.log('caiu aqui....')
  await api.post('/auth', payload).then(response => {
    const retorno = response.data
    commit('setToken', retorno.token)
    window.sessionStorage.setItem('perfis', JSON.stringify(retorno.perfis))
    api.defaults.headers.common.Authorization = retorno.token
    dispatch('getMe', retorno.token)
  })
}

export const signOut = ({ commit }) => {
  console.log('caiu aqui....')
  api.defaults.headers.common.Authorization = ''
  commit('signOut')
}

export const getMe = async ({ commit }, token) => {
  console.log('caiu aqui....')
  await api.get('/auth/profile', token.access).then(response => {
    commit('setMe', response.data)
  })
}

export const init = async ({ commit, dispatch }) => {
  console.log('caiu aqui....')
  const token = sessionStorage.getItem('token')
  if (token) {
    await commit('setToken', token)
    api.defaults.headers.common.Authorization = token
    dispatch('getMe', token)
  } else {
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('perfis')
  }
}
