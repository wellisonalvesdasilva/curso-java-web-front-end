import { Notify } from 'quasar'
export default {
  success (messageOrOptions) {
    const message = typeof messageOrOptions === 'string' ? messageOrOptions : messageOrOptions.message
    const options = typeof messageOrOptions === 'object' ? messageOrOptions : { message }
    const notificationConfig = {
      group: false,
      icon: 'img:/icons-notification/sucess-barra.svg',
      attrs: { style: 'background: #4CB050 !important;' }
    }
    this.notify(Object.assign(notificationConfig, options))
  },
  notify (options) {
    if (!options.position) {
      options.position = 'top'
    }
    if (!options.timeout) {
      options.timeout = 10000
    }

    Notify.create(options)
  },
  error (messageOrOptions, e) {
    if (e) {
      if (e.response) {
        console.error(e.response)
      } else {
        console.error(e)
      }
    }

    if (messageOrOptions) {
      const message = typeof messageOrOptions === 'string' ? messageOrOptions : messageOrOptions.message
      const options = typeof messageOrOptions === 'object' ? messageOrOptions : { message }
      const notification = {
        group: false,
        // iconSize: 'lg', propriedade adicionada somente na versão 2.5.5 do quasar
        icon: 'img:/icons-notification/x-barra.svg',
        attrs: {
          style: 'background: #FF5353 !important;'
        }
      }
      this.notify(Object.assign(notification, options))
    }
  },
  warning (messageOrOptions, e) {
    if (e) {
      if (e.response) {
        console.error(e.response)
      } else {
        console.error(e)
      }
    }
    if (messageOrOptions) {
      const message = typeof messageOrOptions === 'string' ? messageOrOptions : messageOrOptions.message
      const options = typeof messageOrOptions === 'object' ? messageOrOptions : { message }
      this.notify(Object.assign({ group: false, color: 'orange' }, options))
    }
  },
  apiError (msg, e) {
    if (e.response && e.response.status) {
      if (e.response.status === 401) {
        this.error('Falha na autenticação - Por favor, tente novamente.', e)
        return
      }
      if (e.response.status === 403) {
        this.error('Acesso não permitido - /recurso que você está tentando acessar tem acesso restrito.', e)
        return
      }
      if (e.response.status === 400) {
        this.error('Solicitação não concluída - Ocorreu um erro de preenchimento dos dados. Tente novamente. Após preencher o formuláro, revise os dados antes de prosseguir.', e)
        return
      }
      if (e.response.status === 422) {
        if (e.response.data.message != null) {
          this.error(e.response.data.message, e)
          return
        }
        this.error('Entidade Não Processável - Falha no envio da solicitação. Por favor, tente novamente.', e)
        return
      }
    }
    if (e.response && e.response.data) {
      console.debug('falha tratada [' + msg + '] resposta api [' + JSON.stringify(e.response.data) + ']')
      this.error(e.response.data.erro)
      return
    }
    this.error(msg, e)
  },
  apiErrorGetCode (e) {
    if (e.response && e.response.status === 412) {
      return e.response.data.codigo
    }
    if (e.response && e.response.status === 422) {
      return e.response.data.code
    }
  },
  apiErrorGetMsg (e) {
    if (e.response && e.response.status === 412) {
      return e.response.data.erro
    }
    if (e.response && e.response.status === 422) {
      return e.response.data.message
    }
  },
  saveSuccess () {
    this.success('REGISTRO SALVO COM SUCESSO.')
  }
}
