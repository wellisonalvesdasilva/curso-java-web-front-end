import { date } from 'quasar'

export default {
  isDataValida (data) {
    let saida = false
    const match = /^(\d{2})([/]?)(\d{2})\2(\d{4})$/.exec(data)
    if (match) {
      const dia = parseInt(match[1])
      const mes = parseInt(match[3])
      const ano = parseInt(match[4])

      const d = new Date(ano, mes - 1, dia)
      saida = d.getFullYear() === ano && d.getMonth() + 1 === mes && d.getDate() === dia
    }

    if (!saida) {
      const matchApi = /^(\d{4})([-]?)(\d{2})\2(\d{2})$/.exec(data)
      if (matchApi) {
        const dia = parseInt(matchApi[4])
        const mes = parseInt(matchApi[3])
        const ano = parseInt(matchApi[1])

        const d = new Date(ano, mes - 1, dia)
        saida = d.getFullYear() === ano && d.getMonth() + 1 === mes && d.getDate() === dia
      }
    }
    if (!saida) {
      const matchISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})$/.exec(data)
      if (matchISO) {
        const ano = parseInt(matchISO[1])
        const mes = parseInt(matchISO[2])
        const dia = parseInt(matchISO[3])
        const hora = parseInt(matchISO[4])
        const minuto = parseInt(matchISO[5])
        const segundo = parseInt(matchISO[6])
        const milissegundo = parseInt(matchISO[7])

        const d = new Date(ano, mes - 1, dia, hora, minuto, segundo, milissegundo)
        saida = d.getFullYear() === ano && d.getMonth() + 1 === mes && d.getDate() === dia &&
          d.getHours() === hora && d.getMinutes() === minuto && d.getSeconds() === segundo &&
          d.getMilliseconds() === milissegundo
      }
    }
    return saida
  },
  formatarDataParaDDMMYYYY (data) {
    const d = new Date(data)
    const dia = String(d.getDate()).padStart(2, '0')
    const mes = String(d.getMonth() + 1).padStart(2, '0')
    const ano = d.getFullYear()

    // Retorna a data no formato dd/MM/yyyy
    return `${dia}/${mes}/${ano}`
  },
  dataToDisplay (data) {
    if (!data || !this.isDataValida(data)) {
      return null
    }
    return date.formatDate(date.extractDate(data, 'YYYY-MM-DD'), 'DD/MM/YYYY')
  },
  dataToApi (data) {
    if (!data || !this.isDataValida(data)) {
      return null
    }
    return date.formatDate(date.extractDate(data, 'DD/MM/YYYY'), 'YYYY-MM-DD')
  },
  anoMesToDisplay (data) {
    if (!data || !this.isDataValida(data + '-01')) {
      return null
    }
    return date.formatDate(date.extractDate(data + '-01', 'YYYY-MM-DD'), 'YYYY/MM')
  },
  mesAnoToDisplay (data) {
    if (!data || !this.isDataValida(data + '-01')) {
      return null
    }
    return date.formatDate(date.extractDate(data + '-01', 'YYYY-MM-DD'), 'MM/YYYY')
  },
  anoMesToApi (data) {
    if (!data) {
      return null
    }
    return date.formatDate(date.extractDate(data + '/01', 'YYYY/MM/DD'), 'YYYY-MM')
  },
  mesAnoToApi (data) {
    if (!data || !this.isDataValida('01/' + data)) {
      return null
    }
    return date.formatDate(date.extractDate('01/' + data, 'DD/MM/YYYY'), 'YYYY-MM')
  },
  dataHoraToDisplay (data) {
    if (!data || !this.isDataValida(data)) {
      return null
    }
    return date.formatDate(date.extractDate(data, 'YYYY-MM-DDTHH:mm:ss.SSS'), 'DD/MM/YYYY')
  },
  dataHoraToApi (data) {
    if (!data || !this.isDataValida(data)) {
      return null
    }
    return date.formatDate(date.extractDate(data, 'DD/MM/YYYY'), 'YYYY-MM-DDTHH:mm:ss.SSS')
  },
  dataHoraToDateApi (data) {
    if (!data) {
      return null
    }
    return date.formatDate(date.extractDate(data, 'YYYY-MM-DDTHH:mm:ss.SSS'), 'YYYY-MM-DD')
  },

  dataHoraToDateDisplay (data) {
    if (!data) {
      return null
    }
    return date.formatDate(date.extractDate(data, 'YYYY-MM-DDTHH:mm:ss.SSS'), 'DD/MM/YYYY')
  },
  dataHoraInputToDisplay (data) {
    if (!data) {
      return null
    }
    return date.formatDate(date.extractDate(data, 'YYYY-MM-DDTHH:mm:ss.SSS'), 'DD/MM/YYYY HH:mm')
  },
  dataHoraInputToApi (data) {
    if (!data) {
      return null
    }
    const extractDate = date.extractDate(data, 'DD/MM/YYYY HH:mm')
    return date.formatDate(extractDate, 'YYYY-MM-DDTHH:mm:ss.SSS')
  },
  dataCompetenciaToDisplay (data) {
    if (!data || !this.isDataValida(data + '-01')) {
      return null
    }
    return date.formatDate(date.extractDate(data + '-01', 'YYYY-MM-DD'), 'MM/YYYY')
  },
  dataCompetenciaToApi (data) {
    if (!data || !this.isDataValida('01/' + data)) {
      return null
    }
    return date.formatDate(date.extractDate('01/' + data, 'DD/MM/YYYY'), 'YYYY-MM')
  },
  horaToDisplay (hora) { // TODO formatar isso
    return hora
  },
  horaToApi (hora) { // TODO formatar isso
    return hora
  },
  formatadorMultiploToDisplay (val, tipo) { // usado para a parte de inputs gerados de SLA
    switch (tipo) {
      case 'PERCENTUAL':
        return val
      case 'DATA':
        return this.dataToDisplay(val)
      case 'HORA':
        return this.horaToDisplay(val)
      case 'DATA_HORA':
        return this.dataHoraInputToDisplay(val)
      default:
        return val
    }
  },
  formatadorMultiploToApi (val, tipo) {
    switch (tipo) {
      case 'DATA':
        return this.dataToApi(val)
      case 'HORA':
        return this.horaToApi(val)
      case 'DATA_HORA':
        return this.dataHoraInputToApi(val)
      default:
        return val
    }
  },
  cep (valor) {
    if (!valor) {
      return null
    }
    return valor.replace(/^([\d]{2})([\d]{3})([\d]{3})/, '$1.$2-$3')
  },
  cpfCnpj (valor) {
    if (!valor) {
      return null
    }
    if (valor.length <= 11) {
      return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
    return valor.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  },
  ativoSeNull (data) {
    return data === null || data === undefined ? 'ATIVO' : 'INATIVO'
  },
  ativoSeTrue (data) {
    return data ? 'ATIVO' : 'INATIVO'
  },
  ativoSeDataEntreInicioEFim (dataInicio, dataFim) {
    const dataAtual = new Date()
    dataAtual.setHours(0, 0, 0, 0)
    const dataInicioComparada = new Date(dataInicio + 'T00:00:00')
    const dataFimComparada = new Date(dataFim + 'T00:00:00')
    if (dataAtual.getTime() >= dataInicioComparada.getTime() && dataAtual.getTime() <= dataFimComparada.getTime()) {
      return 'ATIVO'
    } else {
      return 'INATIVO'
    }
  },
  ativoSeDataMaiorQueHoje (data) {
    const dataComparada = new Date(data + 'T00:00:00')
    const dataAtual = new Date()
    dataAtual.setHours(0, 0, 0, 0)
    return dataAtual.getTime() <= dataComparada.getTime() ? 'ATIVO' : 'INATIVO'
  },
  simSeTrue (data) {
    return data ? 'Sim' : 'Não'
  },
  filtrarNumeros (data) {
    if (!data) {
      return null
    }
    return data.replace(/[^0-9]/gi, '')
  },
  descricaoEnumResponse (data) {
    if (!data) {
      return ''
    }
    return data.label
  },
  valorEnumResponse (data) {
    if (!data) {
      return null
    }
    return data.value
  },
  prepararRequest (pageRequest, params) {
    const request = {}
    Object.assign(request, params)
    for (const key of Object.keys(request)) {
      if (request[key] === null) {
        delete request[key]
        continue
      }
      if (typeof request[key] === 'object') {
        if (params[key]) {
          if (Array.isArray(params[key])) {
            continue
          }
          delete request[key]
          // objetos dentro do filtro, devem ter atributo 'value' ou 'id' por padrao, uso enums response
          if (params[key].id) {
            request[key] = params[key].id
            continue
          }
          request[key] = params[key].value
        }
      }
    }
    Object.assign(request, pageRequest)
    return request
  },
  telefone (data) {
    data = data.replace(/[^0-9]/gi, '')
    let tel1 = ''
    let tel2 = ''
    const ddd = data.substring(0, 2)
    if (data.length <= 10) {
      tel1 = data.substring(2, 6)
      tel2 = data.substring(6, 10)
    } else {
      tel1 = data.substring(2, 7)
      tel2 = data.substring(7, 11)
    }
    return '(' + ddd + ') ' + tel1 + '-' + tel2
  },
  decimalToApi (valor) {
    if (!valor) {
      return null
    }
    valor = valor + ''
    valor = valor.replaceAll('R$', '').replaceAll(' ', '')
    valor = valor.replaceAll('.', '')
    valor = valor.replaceAll(',', '.')
    return valor
  },
  numberToDecimal (valor) {
    if (!valor) {
      return null
    }
    return parseFloat(valor).toLocaleString('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  },
  decimalToApiNumber (valor) {
    const numero = this.decimalToApi(valor)
    if (!numero) {
      return null
    }
    return Number(numero)
  },
  mesApiToString (valor) {
    switch (valor) {
      case 1:
        return 'Janeiro'
      case 2:
        return 'Fevereiro'
      case 3:
        return 'Março'
      case 4:
        return 'Abril'
      case 5:
        return 'Maio'
      case 6:
        return 'Junho'
      case 7:
        return 'Julho'
      case 8:
        return 'Agosto'
      case 9:
        return 'Setembro'
      case 10:
        return 'Outubro'
      case 11:
        return 'Novembro'
      case 12:
        return 'Dezembro'
      default:
        return false
    }
  },
  formatContaPdg (data) {
    data = data.replace(/[^0-9]/gi, '')
    const p1 = data.substring(0, 1)
    const p2 = data.substring(1, 4)
    const p3 = data.substring(4, 7)
    const p4 = data.substring(7, 10)
    return p1 + '.' + p2 + '.' + p3 + '.' + p4
  },

  municipioEnumResponse (data) {
    if (!data) {
      return ''
    }
    return data.label
  },

  notificacaoUsuarioEnumResponse (data) {
    if (!data) {
      return ''
    }
    return data.label
  },

  dataMaisCinquentaAnos () {
    const data = new Date()
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()
    return `${dia}/${mes}/${ano + 50}`
  },

  formatarValorChavePix (chave) {
    if (!chave) {
      return null
    }
    if (chave.tipoChavePix.value === 'CPF_CNPJ') {
      return this.cpfCnpj(chave.valorChave)
    }
    if (chave.tipoChavePix.value === 'TELEFONE') {
      return this.telefone(chave.valorChave)
    }
    return chave.valorChave
  },
  fCurrency (value) {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
}
