import axios from 'axios'
import { Loading } from 'quasar'

const apiMercadoInstrumental = axios.create({
  baseURL: process.env.API_MERCADO_INSTRUMENTAL
})

apiMercadoInstrumental.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')

  // Não adiciona o token em chamadas para '/anuncios-site'
  if (token && !config.url.startsWith('/anuncios-site')) {
    config.headers.Authorization = `${token}`
  }

  if (!config.preventLoading) {
    Loading.show({ group: config.url })
  }

  return config
}, error => {
  return Promise.reject(error)
})

apiMercadoInstrumental.interceptors.response.use(response => {
  Loading.hide(response.config.url)
  return response
}, (response) => {
  Loading.hide(response.config.url)
  if (response.response) {
    switch (response.response.status) {
      case 401:
        return Promise.reject(new Error('Token Expirado'))
      case 501:
        return Promise.reject(new Error('Serviço Não implementado, contate o suporte técnico!'))
      case 502:
        return Promise.reject(new Error('Porta de entrada ruim, contate o suporte técnico!'))
      case 503:
        return Promise.reject(new Error('Serviço Indisponível, contate o suporte técnico!'))
      case 504:
        return Promise.reject(new Error('Tempo limite(time-out), tente novamente mais tarde ou contate o suporte técnico!'))
      case 505:
        return Promise.reject(new Error('Versão HTTP não suportada, contate o suporte técnico!'))
      default:
        return Promise.reject(response)
    }
  }
  return Promise.reject(response)
})

export class AnuncioService {
  path = '/anuncios'

  findAll (params, config) {
    const finalConfig = Object.assign({ params }, config)
    return apiMercadoInstrumental.get(this.path, finalConfig)
  }

  create (anuncio) {
    return apiMercadoInstrumental.post(this.path, anuncio)
  }

  update (id, anuncio) {
    return apiMercadoInstrumental.put(this.path + '/' + id, anuncio)
  }

  getById (id) {
    return apiMercadoInstrumental.get(this.path + '/' + id)
  }

  delete (id) {
    return apiMercadoInstrumental.delete(this.path + '/' + id)
  }
}

export class EnumService {
  path = '/enum'

  getTiposInstrumentos () {
    return apiMercadoInstrumental.get(this.path + '/tipos-instrumentos')
  }

  getMarcas () {
    return apiMercadoInstrumental.get(this.path + '/marcas')
  }

  getSituacoes () {
    return apiMercadoInstrumental.get(this.path + '/status')
  }
}

export class IbgeService {
  path = '/ibge-dados'

  getEstados (preventLoading = true) {
    return apiMercadoInstrumental.get(this.path + '/estados', { preventLoading })
  }

  getMunicipios (estado, preventLoading = true) {
    return apiMercadoInstrumental.get(this.path + '/municipios/' + estado, { preventLoading })
  }
}

export class UsuarioService {
  path = '/usuarios'

  activate (palavraChave) {
    return apiMercadoInstrumental.post(this.path + '/activate/' + palavraChave)
  }

  requestPasswordRecovery (email) {
    return apiMercadoInstrumental.post(this.path + '/recuperacao-de-senha/pedido/' + email)
  }

  create (usuario) {
    return apiMercadoInstrumental.post(this.path, usuario)
  }

  confirmacaoRecuperacaoSenha (senha, palavraPasse) {
    return apiMercadoInstrumental.post(this.path + '/confirmacao-recuperacao-senha?senha=' + senha + '&palavraPasse=' + palavraPasse)
  }
}

export class ArtefatoAnuncioService {
  path = '/imagens'

  getByIdAnuncio (idAnuncio) {
    return apiMercadoInstrumental.get(this.path + '/' + idAnuncio)
  }

  uploadArtefato (idArtefato, arquivo) {
    const formData = new FormData()
    formData.append('arquivo', arquivo)
    return apiMercadoInstrumental.post(this.path + '/' + idArtefato + '/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  downloadArtefato (idArtefato) {
    return apiMercadoInstrumental.post(this.path + '/' + idArtefato + '/download')
  }
}

export class UsuarioInternoService {
  path = '/usuariosInterno'

  findDadosUsuarioLogado () {
    return apiMercadoInstrumental.get(this.path)
  }

  updatePassword (senhaAtual, novaSenha) {
    return apiMercadoInstrumental.post(this.path + '?senhaAtual=' + senhaAtual + '&novaSenha=' + novaSenha)
  }
}

export class AnuncioSiteService {
  path = '/anuncios-site'

  findAll (params, config) {
    const finalConfig = Object.assign({ params }, config)
    return apiMercadoInstrumental.get(this.path, finalConfig)
  }

  getById (id) {
    return apiMercadoInstrumental.get(this.path + '/' + id)
  }

  envioEmail (dto, idAnuncio) {
    return apiMercadoInstrumental.post(this.path + '/envio-email/' + idAnuncio, dto)
  }
}

export const anuncioSiteService = new AnuncioSiteService()
export const anuncioService = new AnuncioService()
export const artefatoAnuncioService = new ArtefatoAnuncioService()
export const enumService = new EnumService()
export const ibgeService = new IbgeService()
export const usuarioService = new UsuarioService()
export const usuarioInternoService = new UsuarioInternoService()
