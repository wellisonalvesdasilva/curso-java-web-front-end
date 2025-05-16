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
        <div class="col-auto breadcrumb-container">
          <q-btn
            class="link-voltar q-pr-none"
            icon="chevron_left"
            label="Voltar"
            @click="voltar"
          />
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
          <q-table flat bordered ref="tableRef" class="last-sticky-header-column-table mais_colunas table_header scroll_default--custom scroll_default--table my-sticky-last-column-table" :rows="rows" :columns="columns"
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
                <q-input v-if="col.name != 'actions'" :model-value="filters[col.name]"
                  @change="val => filtroTrocado(col.name, val)" filled dense>
                </q-input>
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-x-sm text-center">
              <q-btn class="btn-action" size="sm" style="margin-right: 5px;" round flat icon="border_color"
                @click="editar(props.row)">
                <q-tooltip>Editar Registro</q-tooltip>
              </q-btn>
              <q-btn class="btn-action" size="sm" round flat icon="cancel" @click="confirmarRemocao(props.row)">
                <q-tooltip>Excluir Registro</q-tooltip>
              </q-btn>
            </q-td>
          </template>
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-icon v-if="props.value === 'Publicado'" class="icon_gap" color="green" name="circle"
                  size="10px"></q-icon>
               <q-icon
                  v-if="props.value === 'Rascunho' || props.value === 'Em Elaboração' || props.value === 'Suspenso'"
                  class="icon_gap" color="orange" name="circle" size="10px"></q-icon>
                {{ props.value }}
              </q-td>
            </template>
          </q-table>
        </div>
          <div class="row q-mt-md">
            <div class="col-12">
              <div style="float: right">
                <q-btn
                  @click="cadastrar"
                  type="button"
                  label="Cadastrar"
                  no-caps
                  class="btn-cadastrar"
                />
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
import { anuncioService } from 'src/services/api-service.js'
import { useQuasar } from 'quasar'

const columns = [
  { name: 'id', align: 'center', label: 'Id', field: 'id' },
  { name: 'status', align: 'left', label: 'Status', field: val => val.status.label },
  { name: 'titulo', align: 'left', label: 'Título', field: 'titulo' },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado' },
  { name: 'municipio', align: 'left', label: 'Município', field: 'municipio' },
  { name: 'Tipo', align: 'left', label: 'Tipo', field: val => val.tipo.label },
  { name: 'Marca', align: 'left', label: 'Marca', field: val => val.marca.label },
  { name: 'actions', label: 'Ações', required: true, align: 'center' }
]

export default {
  name: 'GridAnuncio',
  setup () {
    const $q = useQuasar()
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
      const req = { page: pageAt, size: fetchCount, direction: pagination.value.descending ? 'DESC' : 'ASC', ordenarPor: 'id' }
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
      Object.assign(request, filters)
      for (const key of Object.keys(request)) {
        if (request[key] === null) {
          delete request[key]
          continue
        }
        if (typeof request[key] === 'object') {
          if (Array.isArray(request[key])) {
            continue
          }
          delete request[key]
          if (request[key].id) {
            request[key] = request[key].id
            continue
          }
          request[key] = request[key].value
        }
      }
      Object.assign(request, req)
      return request
    }

    onMounted(() => {
      tableRef.value.requestServerInteraction()
    })

    return {
      tableRef,
      loading,
      pagination,
      columns,
      rows,
      buscarPessoas,
      filters,
      $q,
      title: 'Gerenciar Anúncios'
    }
  },
  methods: {
    filtroTrocado (campoNome, valor) {
      if (valor === null || valor === '') {
        delete this.filters[campoNome]
      } else {
        this.filters[campoNome] = valor
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
          outline: true,
          color: 'blue'
        },
        persistent: true
      }).onOk(() => {
        anuncioService.delete(row.id).then(() => {
          this.$q.notify({ message: 'Removido com sucesso!', color: 'positive', textColor: 'white' })
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
      this.$router.push('/admin/anuncios/form/' + row.id)
    }
  }
}
</script>
<style lang="sass">
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
</style>
