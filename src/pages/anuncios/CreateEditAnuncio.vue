<template>
  <div>
    <div class="bg">
      <div class="row items-center justify-between q-mb-none">
        <div class="col-auto breadcrumb-container">
          <q-breadcrumbs
            separator=">"
            class="q-mb-none"
            active-color="secondary"
          >
            <q-breadcrumbs-el to="/contratacao/contrato" label="Anúncios" />
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
      <q-form greedy ref="formPessoa" @submit="cadastrarOuAtualizar">
        <div class="main-container">
          <div class="q-mb-md">
            <h4 class="title q-mb-sm">
              {{ anuncio?.id ? "Editar " : "Cadastrar " }} Anúncio
            </h4>
            <div class="divisor-line"></div>
          </div>
          <q-tabs
            v-model="tab"
            dense
            class="text-h6 text-grey titulo-abas"
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
                <q-toggle style="font-size: 15px;" size="lg" v-model="anuncio.novo" val="xl" label="Produto novo?" left-label/>
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
                label="Categoria"
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
                        <q-input stack-label dense maxlength="4000" :rules="[vRequired]" v-model="anuncio.titulo" label="Parecer de aprovação" class="custom-textarea">
          <template v-slot:label>
            <span class="input-label">Título</span>
          </template>
        </q-input>
              </div>
              <div class="col-12">
        <q-input :rules="[vRequired]" stack-label dense maxlength="4000" autogrow v-model="anuncio.descricao"
                 label="Descrição" class="custom-textarea">
          <template v-slot:label>
            <span class="input-label">Descrição </span>
          </template>
        </q-input>
              </div>
            </div>
          </div>
<div class="q-pa-md" v-show="tab === 'imagens'">
  <div class="row q-col-gutter-md">
    <div
      class="col-12 col-md-6"
      v-for="(item, index) in listImagens"
      :key="index"
    >
        <UploaderComImagem :item="item" :getUrl="getUrl" />
    </div>
  </div>
</div>

          <div class="row">
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
                  type="submit"
                  :label="anuncio?.id ? 'Salvar' : 'Cadastrar'"
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
      valor: null
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
    const listImagens = ref([
      {
        descricao: 'Destaque',
        imagem: 'https://images.tcdn.com.br/img/img_prod/885742/tuba_sinfonica_4_4_ideal_4_pistos_sib_modelo_j981_niquelada_nova_1181_1_47fce504ab835df8e14344fc6a0d80de.jpg'
      },
      {
        descricao: '1'
      },
      {
        descricao: '2'
      },
      {
        descricao: '3'
      },
      {
        descricao: '4'
      },
      {
        descricao: '5'
      }
    ])
    const uploaderRefs = []
    return {
      uploaderRefs,
      $q,
      anuncio,
      title: 'Cadastrar Anúncio',
      tab: ref('dados-contrato'),
      valorFormatado: ref(''),
      tiposInstrumentos,
      marcas,
      listaCamposFiltrados: ref([]),
      estados: ref([]),
      municipios: ref([]),
      moneyFormatForDirective,
      desabilitarMunicipio: ref(false),
      listImagens
    }
  },
  mounted () {
    this.buscarPessoaParaEdicao()
    this.buscarEstados()
    this.buscarTiposInstrumentos()
    this.buscarMarcas()
  },
  methods: {
    getUrl (files) {
      console.log(files)
      return 'v1/api/teste'
    },
    buscarPessoaParaEdicao () {
      if (!this.$route.params.id) return
      anuncioService.getById(this.$route.params.id).then((retorno) => {
        this.anuncio = retorno.data
        this.anuncio.valor = this.anuncio.valor.toFixed(2)
        this.buscarMunicipios()
      })
    },
    cadastrarOuAtualizar () {
      const dto = { ...this.anuncio }
      dto.estado = dto.estado?.sigla || dto.estado
      dto.municipio = dto.municipio?.nome || dto.municipio
      dto.valor = this.$fmt.decimalToApi(dto.valor)
      dto.tipo = dto.tipo.value || dto.tipo
      dto.marca = dto.marca.value || dto.marca
      if (this.anuncio.id) {
        anuncioService.update(dto.id, dto).then((response) => {
          this.$q.notify({
            message: 'Registro editado com sucesso!',
            color: 'positive',
            textColor: 'white'
          })
          this.voltar()
        }).catch((error) => {
          console.log(error)
        })
      } else {
        anuncioService.create(dto).then((response) => {
          this.$q.notify({
            message: 'Registro cadastrado com sucesso!',
            color: 'positive',
            textColor: 'white'
          })
          this.voltar()
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    buscarTiposInstrumentos () {
      enumService.getTiposInstrumentos().then(response => {
        this.tiposInstrumentos = response.data
        this.listaCamposFiltrados.tiposInstrumentos = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar dossiê', error)
      })
    },
    buscarMarcas () {
      enumService.getMarcas().then(response => {
        this.marcas = response.data
        this.listaCamposFiltrados.marcas = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar dossiê', error)
      })
    },
    buscarEstados () {
      ibgeService.getEstados().then(response => {
        this.estados = response.data
        this.listaCamposFiltrados.estados = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar dossiê', error)
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
      this.$router.push('/pessoas')
    }
  }
}

</script>
