import axios from 'axios'

const apiMercadoInstrumental = axios.create({
  baseURL: process.env.API_MERCADO_INSTRUMENTAL
})

apiMercadoInstrumental.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export class AnuncioService {
  path = '/anuncios'

  create (anuncio) {
    return apiMercadoInstrumental.post(this.path, anuncio)
  }

  update (id, anuncio) {
    return apiMercadoInstrumental.put(this.path + '/' + id, anuncio)
  }

  getById (id) {
    return apiMercadoInstrumental.get(this.path + '/' + id)
  }

  findAll (params, config) {
    const finalConfig = Object.assign({ params }, config)
    return apiMercadoInstrumental.get(this.path, finalConfig)
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
}

export class IbgeService {
  path = '/ibge-dados'

  getEstados () {
    return apiMercadoInstrumental.get(this.path + '/estados')
  }

  getMunicipios (estado) {
    return apiMercadoInstrumental.get(this.path + '/municipios/' + estado)
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
}

export const anuncioService = new AnuncioService()
export const enumService = new EnumService()
export const ibgeService = new IbgeService()
export const usuarioService = new UsuarioService()
export const artefatoAnuncioService = new ArtefatoAnuncioService()
