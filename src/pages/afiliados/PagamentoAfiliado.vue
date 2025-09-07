<template>
  <div>
    <!-- Dashboard -->
    <div class="bg">
            <div class="row items-center justify-between q-mb-none">
        <div class="col-auto breadcrumb-container">
          <q-breadcrumbs
            separator=">"
            class="q-mb-none"
            active-color="secondary">
            <q-breadcrumbs-el to="/admin/anuncios" label="Administração" />
            <q-breadcrumbs-el :label="title" class="breadcrumb-last" />
          </q-breadcrumbs>
        </div>
      </div>
      <q-form greedy>
        <div class="main-container">
          <!-- Título principal -->
<div class="flex justify-between items-center q-mb-sm">
<h2 class="title-text">{{title}}</h2>

</div>
          <div class="divisor-line"></div>
          <!-- Cards do resumo -->
<div class="row q-mt-sm q-col-gutter-md q-mb-xl">
  <div
    v-for="card in dashboardCards"
    :key="card.label"
    class="col-xs-12 col-sm-6 col-md-3"
  >
    <q-card
      flat
      bordered
      class="q-pa-md text-center rounded-lg shadow-hover bg-gradient"
    >
      <!-- Cabeçalho do card -->
      <div class="text-h6 flex items-center justify-center q-mb-xs font-bold">
        <q-icon :name="card.icon" :color="card.color" size="lg" class="q-mr-sm" />
        {{ card.label }}
      </div>

      <!-- Valor do card -->
      <div :class="['text-h5', card.class, 'font-weight-bold']">
        {{ card.value }}
      </div>
    </q-card>
  </div>
</div>

          <!-- Subtítulo Indicados -->
<div class="row items-center q-mb-sm">
  <!-- Título -->
  <div class="col-12 col-md-auto">
    <h3 class="text-h6 q-mb-xs q-mb-md-none">👥 Usuários</h3>
  </div>

  <q-space class="gt-md" />

  <!-- Toggle -->
  <div class="col-12 col-md-auto">
    <q-toggle
      size="lg"
      color="secondary"
      v-model="pagamentoPendente"
      class="toggle-destaque"
      label="Exibir somente usuários com comissão pendente?"
    />
  </div>
</div>

          <div class="divisor-line q-mb-md"></div>

          <!-- Tabela de indicados -->
          <q-table
            flat
            bordered
            ref="tableRef"
            class="last-sticky-header-column-table mais_colunas table_header scroll_default--custom scroll_default--table my-sticky-last-column-table"
            :rows="rows"
            :columns="columns"
            :rows-per-page-options="pagination.perpageOptions"
            row-key="id"
            v-model:pagination="pagination"
            :loading="loading"
            :filter="filter"
            binary-state-sort
            @request="buscarIndicados"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  <q-input
                    v-if="col.name != 'actions' && col.name != 'dataCadastro' && col.name != 'tiposChavePix' && col.name != 'whats'"
                    :model-value="filters[col.name]"
                    @change="val => filtroTrocado(col.name, val)"
                    filled
                    dense
                  />
                  <q-input
                    v-else-if="col.name === 'whats'"
                    mask="## #####-####"
                    :model-value="filters[col.name]"
                    @change="val => filtroTrocado(col.name, val)"
                    filled
                    dense
                  />
                  <q-input
                    v-else-if="col.name == 'dataCadastro'"
                    v-model="dataPublicacao"
                    dense
                    fill-input
                    filled
                    input-class="tamanho-minimo-data"
                    mask="##/##/####"
                    stack-label
                    @change="val => filtroTrocado(col.name, this.$fmt.dataToApi(val))"
                  />
                   <q-select
                    v-else-if="col.name == 'tiposChavePix'"
                    v-show="!['actions'].includes(col.name)"
                    :option-value="opt => opt"
                    v-model="filters[col.name]"
                    :option-label="label"
                    :input-style="{ width: '100px' }"
                    :options="listaCamposFiltrados[col.name]" clearable dense
                    fill-input filled
                    hide-dropdown-icon hide-selected input-debounce=500 use-input
                    @filter="(val, update, abort) => filterSelectResponse(val, update, abort, col.name)" @update:model-value="(val, update, abort) => filtroTrocado(col.name, val)">
                  </q-select>
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-gutter-x-sm text-center">
                <q-btn
                  :disabled="!props.row.quantidadeIndicacoes > 0"
                  class="btn-action"
                  size="sm"
                  style="margin-right: 5px;"
                  round
                  flat
                  icon="dynamic_feed"
                  @click="detail(props.row)"
                >
                  <q-tooltip>Ver Anúncios dos Indicados</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-form>
    </div>

  </div>

      <q-dialog v-model="dialog" persistent>
<q-card
    class="q-px-md modal-sm"
    style="min-width: 90%; max-width: 90vw; max-height: 85vh; display: flex; flex-direction: column;"
  >
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-weight-bold">Ver Anúncios dos Indicados</div>
      </q-card-section>
    <div class="divisor-line"></div>
    <hr class="separadorModal" />
        <q-card-section>
          <q-table
            flat
            bordered
            ref="tableRef"
            class="last-sticky-header-column-table mais_colunas table_header scroll_default--custom scroll_default--table my-sticky-last-column-table"
            :rows="rowsDialog"
            :columns="columnsIndicado"
            :rows-per-page-options="pagination.perpageOptions"
            row-key="id"
            v-model:pagination="pagination"
            :loading="loading"
            :filter="filter"
            binary-state-sort>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-gutter-x-sm text-center">
                <q-btn
                  class="btn-action"
                  size="sm"
                  style="margin-right: 5px;"
                  round
                  flat
                  icon="travel_explore"
                  @click="abrirAnuncio(props.row)">
                  <q-tooltip>Abrir Anúncio</q-tooltip>
                </q-btn>

                 <q-btn
                  v-if="props.row.situacaoAnuncio === 'Comissão a Pagar'"
                  class="btn-action"
                  size="sm"
                  style="margin-right: 5px;"
                  round
                  flat
                  icon="monetization_on"
                  @click="abrirDialogOcorrencia(props.row)">
                  <q-tooltip>Indicar Ocorrência de Pagamento</q-tooltip>
                </q-btn>
              </q-td>
            </template>
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-icon
                  v-if="props.value"
                  class="icon_gap"
                  name="circle"
                  size="10px"
                  :color="props.value === 'Comissão a Pagar' ? 'orange' : props.value === 'Comissão Paga' ? 'green' : 'blue'"
                />
                {{ props.value }}
              </q-td>
            </template>
          </q-table>
          <div class="row q-mt-md">
  <div class="col-12">
    <div
      style="
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        flex-wrap: nowrap;
      "
      class="buttons-container"
    >
      <q-btn
        @click="fecharModal"
        class="btn-cancelar"
        label="Fechar"
        dense
        style="min-width: 120px;"
      />
    </div>
  </div>
</div>
        </q-card-section>
      </q-card>
    </q-dialog>

          <q-dialog v-model="dialogOcorrencia" persistent>
<q-card
    class="q-px-md modal-sm"
    style="min-width: 30%; max-width: 90vw; max-height: 85vh; display: flex; flex-direction: column;"
  >
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-weight-bold">Informar Pagamento</div>
      </q-card-section>
    <div class="divisor-line"></div>
    <hr class="separadorModal" />
 <div class="col-xs-12 col-sm-6 col-md-6 q-mb-md">
    <q-input
      v-model="pagamento.data"
      mask="##/##/####"
      label="Data do Pagamento"
      stack-label
      dense
      class="custom-textarea"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="pagamento.data" mask="DD/MM/YYYY" />
          </q-popup-proxy>
        </q-icon>
      </template>
      <template v-slot:label>
        <span class="input-label">Data do Pagamento</span>
      </template>
    </q-input>
  </div>

  <!-- Número da Transação -->
  <div class="col-xs-12 col-sm-6 col-md-6">
    <q-input
      v-model="pagamento.numeroTransacao"
      label="Número da Transação"
      maxlength="255"
      stack-label
      dense
      class="custom-textarea"
    >
      <template v-slot:label>
        <span class="input-label">Número da Transação</span>
      </template>
    </q-input>
  </div>
  <div class="row q-mt-md">
  <div class="col-12">
    <div class="row justify-center q-gutter-sm">
  <q-btn :disabled="!pagamento.data || !pagamento.numeroTransacao"
    type="button"
    label="Salvar"
    icon="save"
    @click="salvarPagamento()"
    no-caps
    class="btn-cadastrar col-12 col-sm-auto"
    style="min-width: 120px;"
  />
  <q-btn
    @click="fecharModalPagamento"
    class="btn-cancelar col-12 col-sm-auto"
    label="Fechar"
    dense
    style="min-width: 120px;"
  />
</div>

  </div>
</div>
      </q-card>
    </q-dialog>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { indicacaoService, enumService } from 'src/services/api-service.js'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import fmt from 'src/utils/formatadores.js'

export default {
  name: 'GridAnuncio',
  setup () {
    const pagamentoPendente = ref(false)
    const meuLinkAfiliado = ref('https://www.mercadoinstrumental.com.br/afiliado=') // substituir pelo retorno da API
    const resumo = ref({
      valorAReceber: 0,
      valorRecebido: 0,
      qtdeComAnunciosPro: 0,
      hash: null
    })
    const dashboardCards = computed(() => [
      {
        label: 'A pagar',
        value: fmt.fCurrency(resumo.value.valorAReceber),
        icon: 'savings',
        color: 'primary',
        class: 'text-primary'
      },
      {
        label: 'Já pago',
        value: fmt.fCurrency(resumo.value.valorRecebido),
        icon: 'check_circle',
        color: 'positive',
        class: 'text-positive'
      },
      {
        label: 'Total de Usuários',
        value: resumo.value.qtdeIndicados,
        icon: 'groups',
        color: 'secondary',
        class: 'text-secondary'
      },
      {
        label: 'Com anúncio Pro',
        value: resumo.value.qtdeComAnunciosPro,
        icon: 'campaign',
        color: 'purple-5',
        class: 'text-purple-5'
      }
    ])
    function copiarLink () {
      navigator.clipboard.writeText(meuLinkAfiliado.value)
      $q.notify({ type: 'positive', message: 'Link copiado com sucesso!' })
    }
    const $q = useQuasar()
    const route = useRoute()
    const tableRef = ref()
    const rows = ref([])
    const loading = ref(false)
    const filters = {}
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 5,
      perpageOptions: [1, 5, 10, 20]
    })
    function buscarIndicados (props) {
      loading.value = true
      const { page, rowsPerPage, sortBy, descending } = props === undefined ? pagination.value : props.pagination
      const pageAt = page - 1
      const fetchCount = rowsPerPage
      pagination.value.rowsPerPage = fetchCount
      const req = { hasComissaoPendente: pagamentoPendente.value, visaoAdmin: true, page: pageAt, size: fetchCount, direction: pagination.value.descending ? 'DESC' : 'ASC', ordenarPor: 'id', listarParaRevisao: route.path.includes('/revisao') }
      indicacaoService.findAll(prepararFiltros(req)).then(retorno => {
        rows.value.splice(0, rows.value.length, ...retorno.data.data)
        pagination.value.page = retorno.data.page + 1
        pagination.value.rowsNumber = retorno.data.totalRecords
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
        loading.value = false
      })
    }
    function prepararFiltros (req) {
      const request = {}
      for (const key in filters) {
        const valor = filters[key]
        if (valor === null || valor === '') {
          continue
        }
        if (typeof valor === 'object' && !Array.isArray(valor)) {
          if (valor.label) {
            request[key] = valor.label
          } else {
            // fallback: tenta pegar valor direto (caso incomum)
            request[key] = valor.value || ''
          }
        } else {
          // Valor já é string ou número
          request[key] = valor
        }
      }
      return {
        ...request,
        ...req
      }
    }
    onMounted(() => {
      tableRef.value.requestServerInteraction()
    })

    return {
      chavePixClone: ref({}),
      tiposChavePix: ref([]),
      pagamentoPendente,
      rowsDialog: ref([]),
      chavePix: ref({
        tipo: null,
        numero: null
      }),
      pagamento: ref({
        idAnuncio: null,
        data: null,
        numeroTransacao: null
      }),
      dialogPix: ref(false),
      dialogOcorrencia: ref(false),
      dialog: ref(false),
      tableRef,
      meuLinkAfiliado,
      dashboardCards,
      resumo,
      copiarLink,
      columns: ref([]),
      columnsIndicado: ref([]),
      loading,
      pagination,
      rows,
      buscarIndicados,
      listaCamposFiltrados: ref([]),
      listaCampos: ref([]),
      filters,
      $q,
      route,
      title: 'Gerenciamento de Comissões'
    }
  },
  mounted () {
    this.carregarTabela()
    this.buscarIndicadores()
    this.buscarChavesPix()
  },
  watch: {
    pagamentoPendente: {
      handler () {
        this.buscarIndicados()
      },
      deep: true,
      immediate: false
    }
  },
  computed: { },
  methods: {
    carregarTabela () {
      this.columns = [
        { name: 'id', align: 'center', label: 'Código', field: 'id', style: 'width: 180px;' },
        { name: 'nome', align: 'left', label: 'Nome', field: 'nome' },
        { name: 'whats', label: 'Whatsapp', align: 'center', field: val => val.whats ? this.$fmt.telefone(val.whats) : '-', style: 'width: 200px;' },
        { name: 'chavePix', label: 'Chave Pix', align: 'center', field: val => val.chavePix ? this.formatarValorChavePix(val.tipoChavePix, val.chavePix) : '-', style: 'width: 200px;' },
        { name: 'tiposChavePix', label: 'Tipo Chave Pix', align: 'center', field: val => val.tipoChavePix?.label || '-', style: 'width: 200px;' },
        { name: 'dataCadastro', label: 'Data de Cadastro', align: 'center', field: val => this.$fmt.dataToDisplay(val.dataCadastro), style: 'width: 200px;' },
        { name: 'quantidadeIndicacoes', align: 'center', label: 'Total de Indicações', field: 'quantidadeIndicacoes' },
        { name: 'quantidadeAnunciosPublicados', align: 'center', label: 'Qtde. Anúncios', field: 'quantidadeAnunciosPublicados' },
        { name: 'actions', label: 'Ações', required: true, align: 'center', style: 'width: 120px;' }
      ]
    },
    formatarValorChavePix (tipo, chave) {
      return this.$fmt.formatarValorChavePix({
        tipoChavePix: tipo,
        valorChave: chave
      })
    },
    fecharModalPagamento () {
      this.dialogOcorrencia = false
      this.pagamento.numeroTransacao = null
      this.pagamento.data = null
      this.pagamento.idAnuncio = null
      this.pagamento.idUsuario = null
    },
    fecharModalPix () {
      this.dialogPix = false
      this.chavePix = Object.assign({}, this.chavePixClone)
    },
    abrirDialogOcorrencia (row) {
      this.pagamento.idAnuncio = row.idAnuncio
      this.dialogOcorrencia = true
    },
    abrirDialogPix () {
      this.chavePixClone = Object.assign({}, this.chavePix)
      this.dialogPix = true
    },
    buscarChavesPix () {
      enumService.getTiposChavesPix().then(response => {
        this.listaCampos.tiposChavePix = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os tipos de chave pix!', error)
      })
    },
    abrirAnuncio (row) {
      window.open(row.link)
    },
    filtroTrocado (campoNome, valor) {
      if (valor === null || valor === '') {
        delete this.filters[campoNome]
      } else {
        if (campoNome === 'whats') {
          this.filters[campoNome] = valor.replace(/\D/g, '')
        } else this.filters[campoNome] = valor
      }
      this.buscarIndicados()
    },
    fecharModal () {
      this.dialog = false
    },
    salvarPagamento () {
      indicacaoService.savePagamento(
        this.pagamento.idAnuncio,
        this.$fmt.dataToApi(this.pagamento.data),
        this.pagamento.numeroTransacao
      ).then(response => {
        this.dialogOcorrencia = false
        this.atualizarAposSalvarPagamento()
        this.$msg.success('Comissão registrada como paga com sucesso!')
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar salvar chave pix!', error)
      })
    },
    atualizarAposSalvarPagamento () {
      this.buscarIndicados()
      this.buscarIndicadores()
      this.buscarPublicacoes(this.pagamento.idUsuario)
    },
    filterSelectResponse (val, update, abort, colName) {
      update(() => {
        const needle = val.toLowerCase()
        const options = this.listaCampos[colName] || []
        let filtrada = []
        if (colName === 'tiposChavePix') {
          filtrada = options.filter(it => it.label.toLowerCase().indexOf(needle) > -1)
        }
        this.listaCamposFiltrados[colName] = filtrada
      })
    },
    buscarIndicadores () {
      indicacaoService.dash(true).then(response => {
        this.resumo = response.data
        this.meuLinkAfiliado = this.meuLinkAfiliado + response.data.hash
        this.chavePix.numero = response.data.chavePix
        this.chavePix.tipo = response.data.tipoChavePix
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os indicadores!', error)
      })
    },
    detail (row) {
      this.pagamento.idUsuario = row.id
      if (this.columnsIndicado.length === 0) {
        this.columnsIndicado = [
          { name: 'anuncio', align: 'left', label: 'Anúncio', field: 'anuncio' },
          { name: 'tipoPlano', label: 'Tipo Plano', align: 'center', field: val => val.tipoPlano.label },
          { name: 'valorPlano', label: 'Valor Plano Assinado', align: 'center', field: val => this.$fmt.fCurrency(val.valorPlano) },
          { name: 'comissao', label: 'Comissão (20%)', align: 'center', field: val => this.$fmt.fCurrency(val.comissao) },
          { name: 'dataPagamentoComissao', label: 'Data Pagamento Comissão', align: 'center', field: val => val.dataPagamentoComissao ? this.$fmt.dataToDisplay(val.dataPagamentoComissao) : '-' },
          { name: 'numeroTransacaoPix', label: 'Nº Transação Pagamento', align: 'center', field: val => val.numeroTransacaoPix ? val.numeroTransacaoPix : '-' },
          { name: 'status', align: 'left', label: 'Status', field: 'situacaoAnuncio' },
          { name: 'actions', label: 'Ações', required: true, align: 'center' }
        ]
      }
      this.buscarPublicacoes(row.id)
      this.dialog = true
    },
    buscarPublicacoes (id) {
      indicacaoService.publicacoes(id, true).then(response => {
        this.rowsDialog = response.data
        this.dialog = true
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os indicadores!', error)
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.my-sticky-last-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%

  thead tr:last-child th:last-child
    /* bg color is important for th; just specify one */
    background-color: #EF8027

  td:last-child
    background-color: #EF8027

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1

.select-disabled .q-field__control
    background-color: #f0f0f0 !important
    color: #999 !important
    cursor: not-allowed

.btn-exclusao
    margin-right: 4px

.rounded-lg
  border-radius: 16px;

.shadow-hover
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)

.shadow-hover:hover
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2)
  transform: translateY(-4px)

.bg-gradient
  background: linear-gradient(135deg, #f3e8ff, #d9bfff)

.font-bold
  font-weight: 700

.card-neon
  border-radius: 14px
  background-color: #1b1b2f
  color: #f3c623
  text-shadow: 0 0 5px #f3c623
  box-shadow: 0 0 15px rgba(243,198,35,0.4)
  transition: box-shadow 0.3s ease

.card-neon:hover
  box-shadow: 0 0 25px rgba(243,198,35,0.7)
  transform: translateY(-2px)

.toggle-destaque
  padding: 6px 12px
  border-radius: 8px
  background: rgba(139, 92, 246, 0.1)
  font-weight: bold

</style>
