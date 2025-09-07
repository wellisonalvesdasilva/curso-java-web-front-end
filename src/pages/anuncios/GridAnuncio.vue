<template>
  <div>
    <div class="bg">
      <div class="row items-center justify-between q-mb-none">
        <div class="col-auto breadcrumb-container">
          <q-breadcrumbs
            separator=">"
            class="q-mb-none"
            active-color="secondary">
            <q-breadcrumbs-el to="/admin/anuncios" label="Anúncios" />
            <q-breadcrumbs-el :label="title" class="breadcrumb-last" />
          </q-breadcrumbs>
        </div>
      </div>
      <q-form greedy>
        <div class="main-container">
          <div class="flex justify-between items-center q-mb-sm">
            <h2 class="title-text">{{ title }}</h2>
            <q-space />
          </div>
          <div class="divisor-line"></div>
        <div class="q-mt-lg">
        <q-table
          flat bordered ref="tableRef" class="last-sticky-header-column-table mais_colunas table_header scroll_default--custom scroll_default--table my-sticky-last-column-table" :rows="rows" :columns="columns"
          :rows-per-page-options="pagination.perpageOptions" row-key="id" v-model:pagination="pagination"
          :loading="loading" :filter="filter" binary-state-sort @request="buscarPessoas">
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                <q-input v-if="col.name != 'actions' && col.name != 'status' && col.name != 'dataPublicacao' && col.name != 'estado' && col.name != 'municipio' && col.name != 'tipo' && col.name != 'marca'" :model-value="filters[col.name]" @change="val => filtroTrocado(col.name, val)" filled dense>
                </q-input>
                  <q-select
                    v-else-if="col.name != 'dataPublicacao'"
                    v-show="!['actions'].includes(col.name)"
                    :option-value="opt => opt"
                    v-model="filters[col.name]"
                    :disable="col.name === 'municipio' && !filters.estado"
                    :class="{'select-disabled': col.name === 'municipio' && !filters.estado}"
                    :option-label="opt => col.name === 'estado' ? opt.sigla : col.name === 'municipio' ? opt.nome : opt.label"
                    :input-style="{ width: '100px' }"
                    :options="listaCamposFiltrados[col.name]" clearable dense
                    fill-input filled
                    hide-dropdown-icon hide-selected input-debounce=500 use-input
                    @filter="(val, update, abort) => filterSelectResponse(val, update, abort, col.name)" @update:model-value="(val, update, abort) => filtroTrocado(col.name, val)">
                  </q-select>
                  <q-input v-else-if="col.name == 'dataPublicacao'" v-model="dataPublicacao" dense fill-input filled
                    input-class="tamanho-minimo-data" mask="##/##/####" stack-label
                    @change="val => filtroTrocado(col.name, this.$fmt.dataToApi(val))">
                    <template v-slot:append>
                    </template>
                  </q-input>
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-x-sm text-center">
              <q-btn :disable="!isRevisao && (props.row.status.value === 'AGUARDANDO_PUBLICACAO' || props.row.status.value === 'AGUARDANDO_CONFIRMACAO_PAGAMENTO' || props.row.status.value === 'CANCELADO')" class="btn-action" size="sm" style="margin-right: 5px;" round flat icon="border_color"
                @click="editar(props.row)">
               <q-tooltip>{{ isRevisao ? 'Revisar' : 'Editar'}}</q-tooltip>
              </q-btn>
              <q-btn :disable="!isRevisao && (props.row.status.value === 'AGUARDANDO_PUBLICACAO' || props.row.status.value === 'AGUARDANDO_CONFIRMACAO_PAGAMENTO' || props.row.status.value === 'CANCELADO')" v-if="!isRevisao" class="btn-action" size="sm" round flat icon="cancel" @click="confirmarRemocao(props.row)">
                <!-- <q-tooltip>Excluir</q-tooltip> -->
              </q-btn>
              <q-btn
              v-if="props.row.idPagamentoLytex != null"
              class="btn-action"
              size="sm"
              @click="irParaLytex(props.row)"
              round
              flat
              icon="open_in_new">
              <q-tooltip>Fatura</q-tooltip>
            </q-btn>
            </q-td>
          </template>
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-icon v-if="props.value === 'Publicado'" class="icon_gap" color="green" name="circle"
                  size="10px"></q-icon>
                <q-icon v-if="props.value === 'Cancelado' || props.value === 'Expirado'  || props.value === 'Aguardando Confirmação de Pagamento' " class="icon_gap" color="red" name="circle"
                  size="10px"></q-icon>
               <q-icon v-if="props.value === 'Rascunho' || props.value === 'Aguardando Revisão para Publicação'"
                  class="icon_gap" color="orange" name="circle" size="10px"></q-icon>
                {{ props.value }}
              </q-td>
            </template>
          </q-table>
        </div>
         <div class="row q-mt-md">
  <div class="col-12">
    <div class="row justify-end q-col-gutter-sm">
      <div class="col-12 col-sm-auto">
        <q-btn
          @click="atualizar"
          type="button"
          label="Atualizar"
          icon="refresh"
          no-caps
          class="btn-voltar full-width"
        />
      </div>
      <div class="col-12 col-sm-auto" v-if="!isRevisao">
        <q-btn
          @click="cadastrar"
          type="button"
          label="Cadastrar"
          no-caps
          class="btn-cadastrar full-width"
        />
      </div>
    </div>
  </div>
</div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { anuncioService, enumService, ibgeService } from 'src/services/api-service.js'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

export default {
  name: 'GridAnuncio',
  setup () {
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
      const req = { page: pageAt, size: fetchCount, direction: pagination.value.descending ? 'DESC' : 'ASC', ordenarPor: 'id', listarParaRevisao: route.path.includes('/revisao') }
      anuncioService.findAll(prepararFiltros(req)).then(retorno => {
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
          // Extrai a string apropriada para cada campo
          if (key === 'estado' && valor.sigla) {
            request[key] = valor.sigla
          } else if (key === 'municipio' && valor.nome) {
            request[key] = valor.nome
          } else if (valor.label) {
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
      // Junta os filtros com os dados de paginação/sorting
      return {
        ...request,
        ...req
      }
    }
    onMounted(() => {
      tableRef.value.requestServerInteraction()
    })

    return {
      tableRef,
      columns: ref([]),
      loading,
      pagination,
      rows,
      buscarPessoas,
      listaCamposFiltrados: ref([]),
      listaCampos: ref([]),
      filters,
      $q,
      route
    }
  },
  props: {
    title: {
      type: String,
      default: () => 'Gerenciar Anúncios'
    },
    isRevisao: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.carregarTabela()
    this.buscarEstados()
    this.buscarTiposInstrumentos()
    this.buscarMarcas()
    this.buscarSituacoes()
  },
  computed: {
    dataPublicacao: {
      get () {
        return this.$fmt.dataToDisplay(this.filters.dataPublicacao)
      },
      set (data) {
        this.filters.dataPublicacao = this.$fmt.dataToApi(data)
      }
    }
  },
  methods: {
    atualizar () {
      this.tableRef.requestServerInteraction()
      this.$msg.warning('Listagem atualizada!')
    },
    carregarTabela () {
      this.columns = [
        { name: 'id', align: 'center', label: 'Código', field: 'id' },
        { name: 'status', align: 'left', label: 'Situação', field: val => val.status.label },
        { name: 'titulo', align: 'left', label: 'Título', field: 'titulo' },
        { name: 'estado', align: 'left', label: 'Estado', field: 'estado' },
        { name: 'municipio', align: 'left', label: 'Município', field: 'municipio' },
        { name: 'tipo', align: 'left', label: 'Tipo', field: val => val.tipo.label },
        { name: 'marca', align: 'left', label: 'Marca', field: val => val.marca.label },
        { name: 'quantidadeAcesso', align: 'center', label: 'Quantidade de Visualizações', field: 'quantidadeAcesso' },
        { name: 'dataPublicacao', label: 'Data de Publicação', align: 'left', field: val => this.$fmt.dataToDisplay(val.dataPublicacao) },
        { name: 'actions', label: 'Ações', required: true, align: 'center' }
      ]
    },
    buscarSituacoes () {
      enumService.getSituacoes().then(response => {
        this.listaCampos.status = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os tipos de instrumentos!', error)
      })
    },
    buscarTiposInstrumentos () {
      enumService.getTiposInstrumentos().then(response => {
        this.listaCampos.tipo = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os tipos de instrumentos!', error)
      })
    },
    buscarMarcas () {
      enumService.getMarcas().then(response => {
        this.listaCampos.marca = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar as marcas!', error)
      })
    },
    buscarEstados () {
      ibgeService.getEstados().then(response => {
        this.listaCampos.estado = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os estados!', error)
      })
    },
    buscarMunicipios (uf) {
      ibgeService.getMunicipios(uf, false).then(response => {
        this.listaCampos.municipio = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os estados!', error)
      })
    },
    filterSelectResponse (val, update, abort, colName) {
      update(() => {
        const needle = val.toLowerCase()
        const options = this.listaCampos[colName] || []
        let filtrada = []
        if (colName === 'estado') {
          filtrada = options.filter(it => it.sigla.toLowerCase().indexOf(needle) > -1)
        } else if (colName === 'municipio') {
          filtrada = options.filter(it => it.nome.toLowerCase().indexOf(needle) > -1)
        } else {
          filtrada = options.filter(it => this.$fmt.descricaoEnumResponse(it).toLowerCase().indexOf(needle) > -1)
        }
        this.listaCamposFiltrados[colName] = filtrada
      })
    },
    filtroTrocado (campoNome, valor) {
      if (valor === null || valor === '') {
        delete this.filters[campoNome]
        if (campoNome === 'estado') {
          const campoNomeComplementar = 'municipio'
          delete this.filters[campoNomeComplementar]
        }
      } else {
        this.filters[campoNome] = valor
        if (campoNome === 'estado') {
          this.buscarMunicipios(valor.sigla)
        }
      }
      this.buscarPessoas()
    },
    confirmarRemocao (row) {
      this.$q.dialog({
        title: 'Alerta',
        message: 'Tem certeza que deseja excluir?',
        style: 'width:300px',
        ok: {
          label: 'Remover',
          push: true,
          color: 'red'
        },
        cancel: {
          label: 'Cancelar',
          push: true,
          color: 'blue',
          class: 'btn-exclusao'
        },
        persistent: true,
        separateButtons: true
      }).onOk(() => {
        anuncioService.delete(row.id).then(() => {
          this.$q.notify({ message: 'Cancelamento realizado com sucesso!', color: 'positive', textColor: 'white' })
          this.buscarPessoas()
        }).catch(error => {
          console.log(error)
        })
      })
    },
    cadastrar () {
      this.$router.push('/admin/anuncios/form')
    },
    editar (row) {
      this.$router.push((this.isRevisao ? '/admin/anuncios/revisao/form/' : '/admin/anuncios/form/') + row.id)
    },
    irParaLytex (row) {
      window.open(row.urlBaseLytex + '/' + row.hashIdPagamentoLytex)
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
</style>
