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
      <q-form greedy ref="formPessoa" @submit="cadastrarOuAtualizar(false)">
        <div class="main-container">
        <div class="flex justify-between items-center q-mb-sm">
          <h2 class="title-text">{{ title }}</h2>
          <q-space/>
          <div>
            <div class="flex">
              <q-badge style="margin-right: 10px;" rounded :style="{ backgroundColor: anuncio?.status?.value === 'PUBLICADO' ? '#569f00' : '#EF8027' }" :label="anuncio?.status?.label" />
            </div>
          </div>
        </div>
          <div class="divisor-line"></div>
          <q-tabs
            v-model="tab"
            dense
            class="q-mt-md text-h6 text-grey titulo-abas"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="dados-contrato" label="Dados Básicos" />
            <q-tab :disable="!anuncio?.id" name="imagens" label="Imagens" />
          </q-tabs>
          <div
            class="q-pa-md"
            style="margin-top: -30px"
            v-show="tab === 'dados-contrato'"
          >
            <div class="row q-col-gutter-md q-mt-sm">
              <div class="q-gutter-sm col-12">
                <q-toggle
                style="font-size: 15px;"
                size="lg"
                v-model="anuncio.novo"
                val="xl"
                label="Produto novo?"
                left-label/>
              </div>
              <div class="col-2">
              <q-select
                stack-label
                dense
                label="Estado"
                v-model="anuncio.estado"
                use-input
                emit-value
                @update:model-value="val => alterouEstado()"
                map-options
                input-debounce="500"
                @click="(val, update, abort) => buscarEstados(val)" clearable
                :options="listaCamposFiltrados['estados']"
                option-label="sigla"
                @filter="(val, update, abort) => filterSelects(val, update, abort, 'estados')"
                :rules="[vRequired]"
              >
                <template v-slot:label>
                  <span class="input-label">Estado</span>
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
              <div class="col-3">
              <q-select
                stack-label
                dense
                label="Município"
                :disable="!anuncio.estado || desabilitarMunicipio"
                v-model="anuncio.municipio"
                use-input
                emit-value
                map-options
                input-debounce="500"
                @click="(val, update, abort) => buscarMunicipios(val)" clearable
                :options="listaCamposFiltrados['municipios']"
                option-label="nome"
                @filter="(val, update, abort) => filterSelects(val, update, abort, 'municipios')"
                :rules="[vRequired]"
              >
                <template v-slot:label>
                  <span class="input-label">Município</span>
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
              <div class="col-2">
              <q-select
                stack-label
                dense
                label="Tipo"
                v-model="anuncio.tipo"
                use-input
                emit-value
                map-options
                input-debounce="500"
                @click="(val, update, abort) => buscarTiposInstrumentos(val)" clearable
                :options="listaCamposFiltrados['tiposInstrumentos']"
                option-label="label"
                @filter="(val, update, abort) => filterSelects(val, update, abort, 'tiposInstrumentos')"
                :rules="[vRequired]"
              >
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
              <div class="col-3">
              <q-select
                stack-label
                dense
                label="Marca"
                v-model="anuncio.marca"
                use-input
                emit-value
                map-options
                input-debounce="500"
                @click="(val, update, abort) => buscarMarcas(val)" clearable
                :options="listaCamposFiltrados['marcas']"
                option-label="label"
                @filter="(val, update, abort) => filterSelects(val, update, abort, 'marcas')"
                :rules="[vRequired]"
              >
                <template v-slot:label>
                  <span class="input-label">Marca</span>
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
              <div class="col-2">
                <q-input
                  stack-label
                  dense
                  v-model="anuncio.valor"
                  v-money="moneyFormatForDirective"
                  :rules="[vRequired]"
                  :lazy-rules="true"
                  label="Valor do Anúncio">
                  <template v-slot:label>
                    <span class="input-label">Valor do Anúncio</span>
                  </template>
                </q-input>
              </div>
              <div class="col-12">
              <q-input
              stack-label dense maxlength="4000"
              :rules="[vRequired]"
              v-model="anuncio.titulo"
              label="Parecer de aprovação"
              class="custom-textarea">
          <template v-slot:label>
            <span class="input-label">Título</span>
          </template>
        </q-input>
              </div>
              <div class="col-12">
        <q-input
                :rules="[vRequired]"
                stack-label
                dense maxlength="4000"
                autogrow
                v-model="anuncio.descricao"
                label="Descrição"
                class="custom-textarea">
          <template v-slot:label>
            <span class="input-label">Descrição </span>
          </template>
        </q-input>
              </div>
            </div>
          </div>
        <div class="q-pa-md" v-if="tab === 'imagens'">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-12">
                <UploaderComImagem :visualizar="false" :idAnuncio="anuncio?.id" />
            </div>
          </div>
        </div>
          <div class="row q-mt-md">
            <div class="col-12">
              <div style="float: right">
                <q-btn
                  @click="voltar"
                  style="margin-right: 10px"
                  label="Voltar"
                  no-caps
                  class="btn-voltar"
                />
                <q-btn
                  v-if="!isPublicado"
                  type="submit"
                  style="margin-right: 10px"
                  label="Salvar Rascunho"
                  no-caps
                  class="btn-salvar"
                />

                <q-btn
                  @click="cadastrarOuAtualizar(true)"
                  v-if="anuncio?.id"
                  type="button"
                  label="Publicar"
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
import { ref } from 'vue'
import { anuncioService, enumService, ibgeService } from 'src/services/api-service.js'
import { useQuasar } from 'quasar'
import UploaderComImagem from './UploaderComImagem.vue'

export default {
  name: 'CreateEditPessoa',
  components: {
    UploaderComImagem
  },
  setup () {
    const anuncio = ref({
      id: null,
      novo: false,
      tipo: null,
      marca: null,
      valor: null,
      status: { label: 'Rascunho', value: 'RASCUNHO' }
    })
    const $q = useQuasar()
    const tiposInstrumentos = ref([])
    const marcas = ref([])
    const moneyFormatForDirective = ref({
      decimal: ',',
      thousands: '.',
      precision: 2,
      prefix: 'R$ ',
      masked: false /* doesn't work with directive */
    })
    const uploaderRefs = []
    return {
      uploaderRefs,
      $q,
      anuncio,
      title: ref('Cadastrar Anúncio'),
      tab: ref('dados-contrato'),
      valorFormatado: ref(''),
      tiposInstrumentos,
      marcas,
      listaCamposFiltrados: ref([]),
      estados: ref([]),
      municipios: ref([]),
      moneyFormatForDirective,
      desabilitarMunicipio: ref(false)
    }
  },
  computed: {
    isPublicado: {
      get () {
        return this.anuncio?.status?.value === 'PUBLICADO'
      }
    }
  },
  mounted () {
    this.buscarPessoaParaEdicao()
    this.buscarEstados()
    this.buscarTiposInstrumentos()
    this.buscarMarcas()
  },
  methods: {
    buscarPessoaParaEdicao () {
      if (!this.$route.params.id) return
      this.title = 'Editar Anúncio'
      anuncioService.getById(this.$route.params.id).then((retorno) => {
        this.anuncio = retorno.data
        this.anuncio.valor = this.anuncio.valor.toFixed(2)
        this.buscarMunicipios()
      })
    },
    cadastrarOuAtualizar (publicar) {
      const dto = { ...this.anuncio }
      dto.estado = dto.estado?.sigla || dto.estado
      dto.municipio = dto.municipio?.nome || dto.municipio
      dto.valor = this.$fmt.decimalToApi(dto.valor)
      dto.tipo = dto.tipo.value || dto.tipo
      dto.marca = dto.marca.value || dto.marca
      if (this.anuncio.id) {
        dto.isPublicacao = publicar
        anuncioService.update(dto.id, dto)
          .then(response => {
            this.$msg.success('Registro editado com sucesso!')
            this.voltar()
          })
          .catch(error => {
            this.$msg.apiError('Erro ao cadastrar/atualizar!', error)
          })
      } else {
        anuncioService.create(dto)
          .then(response => {
            this.$msg.success('Anúncio salvo. Prossiga com o upload das imagens!')
            const id = response.data
            this.irParaEdicao(id).then(() => {
              this.anuncio.id = id
              this.tab = 'imagens'
            })
          }).catch(error => {
            this.$msg.apiError('Falha ao salvar o anúncio!', error)
          })
      }
    },
    buscarTiposInstrumentos () {
      enumService.getTiposInstrumentos().then(response => {
        this.tiposInstrumentos = response.data
        this.listaCamposFiltrados.tiposInstrumentos = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os tipos de instrumentos!', error)
      })
    },
    buscarMarcas () {
      enumService.getMarcas().then(response => {
        this.marcas = response.data
        this.listaCamposFiltrados.marcas = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar as marcas!', error)
      })
    },
    buscarEstados () {
      ibgeService.getEstados().then(response => {
        this.estados = response.data
        this.listaCamposFiltrados.estados = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os estados!', error)
      })
    },
    alterouEstado () {
      this.desabilitarMunicipio = true
      this.anuncio.municipio = null
      this.buscarMunicipios()
    },
    buscarMunicipios () {
      const estado = this.anuncio?.estado.sigla || this.anuncio?.estado
      ibgeService.getMunicipios(estado).then(response => {
        this.municipios = response.data
        this.listaCamposFiltrados.municipios = response.data
        this.desabilitarMunicipio = false
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar dossiê', error)
      })
    },
    filterSelects (val, update, abort, colName) {
      update(() => {
        const isEstado = colName === 'estados'
        const isMunicipio = colName === 'municipios'
        const needle = val.toLowerCase()
        let options = []
        switch (colName) {
          case 'tiposInstrumentos':
            options = this.tiposInstrumentos || []
            break
          case 'marcas':
            options = this.marcas || []
            break
          case 'estados':
            options = this.estados || []
            break
          case 'municipios':
            options = this.municipios || []
            break
          default:
            options = []
        }
        const filtrada = options.filter(it => (!isEstado && !isMunicipio) ? this.$fmt.descricaoEnumResponse(it).toLowerCase().indexOf(needle) > -1 : isEstado ? it.sigla.toLowerCase().indexOf(needle) > -1 : it.nome.toLowerCase().indexOf(needle) > -1)
        this.listaCamposFiltrados[colName] = filtrada
      })
    },
    voltar () {
      this.$router.push('/admin/anuncios')
    },
    irParaEdicao (id) {
      this.$router.push('/admin/anuncios/form/' + id)
    }
  }
}

</script>
