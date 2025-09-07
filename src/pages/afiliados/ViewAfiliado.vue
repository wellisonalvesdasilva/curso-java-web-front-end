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
            <q-breadcrumbs-el label="Indicações e Ganhos" />
            <q-breadcrumbs-el :label="title" class="breadcrumb-last" />
          </q-breadcrumbs>
        </div>
      </div>
      <q-form greedy>
        <div class="main-container">
          <!-- Título principal -->
<div class="flex justify-between items-center q-mb-sm">
<h2 class="title-text">{{title}}</h2>
  <div class="flex flex-col md:flex-row justify-between items-center q-mb-sm gap-sm">
  <div class="flex items-center gap-sm">
    <q-btn
      label="Minha Chave Pix"
      class="btn-cadastrar"
      color="purple"
      text-color="white"
      icon="account_balance_wallet"
      dense
      unelevated
      style="min-width: 180px; font-weight: bold; text-transform: none;"
      @click="abrirDialogPix"
    />
  </div>
</div>

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
          <div class="flex items-center q-mb-sm">
            <h3 class="text-h6">👥 Meus Indicados</h3>
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
            @request="buscarPessoas"
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
                    v-if="col.name != 'actions' && col.name != 'dataCadastro'"
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
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-gutter-x-sm text-center">
                <q-btn
                  class="btn-action"
                  size="sm"
                  style="margin-right: 5px;"
                  round
                  flat
                  icon="dynamic_feed"
                  @click="detail(props.row)"
                >
                  <q-tooltip>Detalhar Anúncios do Indicado</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-form>
    </div>
<!-- Meu Link de Afiliado -->
<div class="bg">
  <q-form greedy>
    <div class="main-container q-pa-md">

      <!-- Cabeçalho -->
      <div class="flex items-center q-mb-md">
        <q-icon name="link" size="lg" class="q-mr-sm text-primary" />
        <h3 class="text-h5 font-bold">Meu Link de Afiliado</h3>
      </div>

      <!-- Área para copiar link -->
      <div class="row items-center q-gutter-sm q-mb-lg">
        <q-input
          v-model="meuLinkAfiliado"
          label="Link do Afiliado"
          outlined
          dense
          readonly
          class="col"
          rounded
          stack-label
        >
          <template v-slot:append>
            <q-btn
              color="primary"
              icon="content_copy"
              @click="copiarLink"
              rounded
              glossy
              dense
            >
              <q-tooltip>Copiar link</q-tooltip>
            </q-btn>
          </template>
        </q-input>
      </div>
<!-- Box explicativo --> <q-banner class="bg-orange-1 text-orange-10 q-pa-md rounded-borders shadow-2"> <div class="text-h6 q-mb-xs">💡 Como funciona o programa de afiliados</div> <div> Ao compartilhar o seu link exclusivo, toda pessoa que se cadastrar por meio dele será vinculada a você. <br /> Você receberá <strong>20% de comissão</strong> sobre cada anúncio pago publicado pelos seus indicados. Anúncios gratuitos não geram comissão. </div> </q-banner>

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
        <div class="text-h6 text-weight-bold">Detalhar Anúncios do Indicado</div>
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

      <q-dialog v-model="dialogPix" persistent>
<q-card
    class="q-px-md modal-sm"
    style="min-width: 30%; max-width: 90vw; max-height: 85vh; display: flex; flex-direction: column;"
  >
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-weight-bold">Minha Chave Pix</div>
      </q-card-section>
    <div class="divisor-line"></div>
    <hr class="separadorModal" />
        <div class="col-xs-6 col-sm-6 col-md-6">
      <q-select
        stack-label
        dense
        label="Tipo"
        v-model="chavePix.tipo"
        @update:model-value="this.chavePix.numero = null"
        use-input
        emit-value
        map-options
        input-debounce="500"
        :options="tiposChavePix"
        option-label="label"
        :rules="[vRequired]">
        <template v-slot:label>
                    <span class="input-label">Tipo</span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Nenhum Dado Encontrado
                      </q-item-section>
                    </q-item>
                  </template>
      </q-select>
    </div>

    <div class="col-xs-6 col-sm-6 col-md-6">
      <q-input
        stack-label dense maxlength="255"
        v-model="chavePix.numero"
        label="Título"
        class="custom-textarea"
      >
      <template v-slot:label>
              <span class="input-label">Chave Pix </span>
            </template>
      </q-input>
    </div>
  <div class="row q-mt-md">
  <div class="col-12">
    <div class="row justify-center q-gutter-sm">
  <q-btn :disabled="!chavePix.numero || !chavePix.tipo"
    type="button"
    label="Salvar"
    icon="save"
    @click="salvarChavePix()"
    no-caps
    class="btn-cadastrar col-12 col-sm-auto"
    style="min-width: 120px;"
  />
  <q-btn
    @click="fecharModalPix"
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
    const meuLinkAfiliado = ref('https://www.mercadoinstrumental.com.br?afiliado=') // substituir pelo retorno da API
    const resumo = ref({
      valorAReceber: 0,
      valorRecebido: 0,
      qtdeIndicados: 0,
      qtdeComAnunciosPro: 0,
      hash: null
    })
    const dashboardCards = computed(() => [
      {
        label: 'A receber',
        value: fmt.fCurrency(resumo.value.valorAReceber),
        icon: 'savings',
        color: 'primary',
        class: 'text-primary'
      },
      {
        label: 'Já recebido',
        value: fmt.fCurrency(resumo.value.valorRecebido),
        icon: 'check_circle',
        color: 'positive',
        class: 'text-positive'
      },
      {
        label: 'Indicados',
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
    function buscarPessoas (props) {
      loading.value = true
      const { page, rowsPerPage, sortBy, descending } = props === undefined ? pagination.value : props.pagination
      const pageAt = page - 1
      const fetchCount = rowsPerPage
      pagination.value.rowsPerPage = fetchCount
      const req = { visaoAdmin: false, page: pageAt, size: fetchCount, direction: pagination.value.descending ? 'DESC' : 'ASC', ordenarPor: 'id', listarParaRevisao: route.path.includes('/revisao') }
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
      rowsDialog: ref([]),
      chavePix: ref({
        tipo: null,
        numero: null
      }),
      dialogPix: ref(false),
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
      buscarPessoas,
      listaCamposFiltrados: ref([]),
      listaCampos: ref([]),
      filters,
      $q,
      route,
      title: 'Minhas Indicações'
    }
  },
  mounted () {
    this.carregarTabela()
    this.buscarIndicadores()
  },
  computed: { },
  methods: {
    carregarTabela () {
      this.columns = [
        { name: 'id', align: 'center', label: 'Código', field: 'id', style: 'width: 180px;' },
        { name: 'nome', align: 'left', label: 'Nome', field: 'nome' },
        { name: 'dataCadastro', label: 'Data de Cadastro', align: 'center', field: val => this.$fmt.dataToDisplay(val.dataCadastro), style: 'width: 200px;' },
        { name: 'actions', label: 'Ações', required: true, align: 'center', style: 'width: 120px;' }
      ]
    },
    fecharModalPix () {
      this.dialogPix = false
      this.chavePix = Object.assign({}, this.chavePixClone)
    },
    abrirDialogPix () {
      this.chavePixClone = Object.assign({}, this.chavePix)
      if (this.tiposChavePix.length === 0) {
        this.buscarChavesPix()
      }
      this.dialogPix = true
    },
    buscarChavesPix () {
      enumService.getTiposChavesPix().then(response => {
        this.tiposChavePix = response.data
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
        this.filters[campoNome] = valor
      }
      this.buscarPessoas()
    },
    fecharModal () {
      this.dialog = false
    },
    salvarChavePix () {
      indicacaoService.saveChavePix(
        this.chavePix.numero,
        typeof this.chavePix.tipo === 'object' ? this.chavePix.tipo?.value : this.chavePix.tipo
      ).then(response => {
        this.$msg.success('Chave atualizada com sucesso!')
        this.dialogPix = false
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar salvar chave pix!', error)
      })
    },
    buscarIndicadores () {
      indicacaoService.dash(false).then(response => {
        this.resumo = response.data
        this.meuLinkAfiliado = this.meuLinkAfiliado + response.data.hash
        this.chavePix.numero = response.data.chavePix
        this.chavePix.tipo = response.data.tipoChavePix
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os indicadores!', error)
      })
    },
    detail (row) {
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
      indicacaoService.publicacoes(row.id, false).then(response => {
        this.rowsDialog = response.data
        this.dialog = true
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os indicadores!', error)
      })

      this.dialog = true
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

</style>
