// store/filtros.js

const state = () => ({
  filtroAnuncios: null
})

const mutations = {
  setFiltroAnuncios (state, payload) {
    state.filtroAnuncios = payload
  }
}

const actions = {
  // se quiser alguma ação futura, pode adicionar aqui
}

const getters = {
  filtroAnuncios: (state) => state.filtroAnuncios
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
