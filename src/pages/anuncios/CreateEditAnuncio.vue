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
      <q-form greedy ref="formPessoa" @submit="cadastrarOuAtualizar('RASCUNHO')">
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
            <q-tab name="plano-desejado" label="Plano" />
            <q-tab :disable="!planoSelecionado" name="dados-basicos" label="Dados Básicos" />
            <q-tab :disable="!anuncio?.id" name="imagens" label="Imagens" />
          </q-tabs>
            <div
              class="q-pa-md"
              style="margin-top: -30px"
              v-show="tab === 'dados-basicos'"
            >
  <div class="row q-col-gutter-md q-mt-sm">
    <div class="q-gutter-sm col-xs-12">
      <q-toggle
        style="font-size: 15px;"
        size="lg"
        v-model="anuncio.novo"
        val="xl"
        label="Produto novo?"
        left-label/>
    </div>

    <div class="col-xs-12 col-sm-6 col-md-2">
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

    <div class="col-xs-12 col-sm-6 col-md-3">
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

    <div class="col-xs-12 col-sm-6 col-md-2">
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

    <div class="col-xs-12 col-sm-6 col-md-3">
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

    <div class="col-xs-12 col-sm-6 col-md-2">
      <q-input
        stack-label
        dense
        v-model="anuncio.valor"
        v-money="moneyFormatForDirective"
        :rules="[vRequired]"
        :lazy-rules="true"
        label="Valor do Anúncio"
      >
        <template v-slot:label>
              <span class="input-label">Valor do Anúncio</span>
            </template>
          </q-input>
    </div>

    <div class="col-xs-12">
      <q-input
        stack-label dense maxlength="4000"
        :rules="[vRequired]"
        v-model="anuncio.titulo"
        label="Título"
        class="custom-textarea"
      >
      <template v-slot:label>
              <span class="input-label">Título </span>
            </template>
          </q-input>
    </div>

    <div class="col-xs-12">
      <q-input
        :rules="[vRequired]"
        stack-label
        dense maxlength="4000"
        autogrow
        v-model="anuncio.descricao"
        label="Descrição"
        class="custom-textarea"
      >
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
        <div class="q-pa-lg" v-if="tab === 'plano-desejado'">
          <q-card
            class="q-pa-md bg-white"
            style="
              max-width: 1000px;
              margin: auto;
              border: 1px solid #e0e0e0;
              border-radius: 12px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            "
          >
            <!-- Aviso: Escolha um plano -->
            <div
              v-if="!planoSelecionado"
              class="q-mb-md flex items-center q-pa-sm"
              style="
                background-color: #fff8e1;
                border: 2px solid #ffc107;
                border-radius: 10px;
                color: #795548;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
              "
            >
              <q-icon name="warning" size="20px" class="q-mr-sm text-warning" />
              <div><strong>Escolha um plano</strong> para continuar.</div>
            </div>

            <!-- Lista de planos -->
            <div class="row q-col-gutter-md">
              <div
                v-for="plano in planos"
                :key="plano.id"
                class="col-12 col-sm-6 col-md-3"
              >
                <q-card
                  flat
                  bordered
                  class="full-height text-white relative-position"
                  :style="{
                    backgroundColor: plano.bg,
                    borderRadius: '10px',
                    boxShadow: plano.destaque
                      ? '0 0 14px 4px rgba(255, 215, 0, 0.7)'
                      : '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }"
                >
                  <q-card-section class="text-center">
                    <!-- Ícone -->
                    <q-icon :name="plano.icone" size="36px" class="q-mb-sm" />

                    <!-- Nome -->
                    <div class="text-subtitle1 text-bold">
                      {{ plano.nome }}
                    </div>

                    <!-- Duração -->
                    <div class="text-caption q-mt-xs">
                      {{ plano.duracao }}
                    </div>

                    <!-- Valor -->
                    <div class="q-mt-md">
                      <div class="text-body2 text-bold">
                        {{ plano.valorAvista }}
                      </div>
                    </div>

                    <!-- Radio -->
                    <q-radio
                      :model-value="planoSelecionado"
                      :val="plano.id"
                      :disabled="anuncio?.id"
                      v-if="plano.id !== 'GRATIS' || (plano.id === 'GRATIS' && !hasAnuncioFree)"
                      color="white"
                      class="q-mt-md"
                      checked-icon="radio_button_checked"
                      unchecked-icon="radio_button_unchecked"
                      size="md"
                      @update:model-value="evitarTroca"
                    />

                    <!-- Recomendado -->
                    <div
                      v-if="plano.destaque"
                      class="q-mt-md text-caption"
                      style="color: #FFC107; font-weight: 500;"
                    >
                      🔥 Recomendado
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>

            <!-- Informações complementares -->
            <div class="q-mt-xl text-center">
              <div
                style="
                  color: #4A4A4A;
                  font-size: 15px;
                  font-weight: 500;
                  margin-bottom: 6px;
                "
              >
                💳 Formas de pagamento: <span style="font-weight: 600;">PIX</span> ou <span style="font-weight: 600;">Boleto Bancário.  </span>
              </div>

              <div
                style="
                  color: #EF6C00;
                  font-size: 14px;
                  font-style: italic;
                  font-weight: 500;
                "
              >
                * O plano grátis está disponível apenas uma vez por usuário.
              </div>
            </div>
          </q-card>
        </div>
      <div class="row q-mt-md">
            <div class="col-12">
              <div style="float: right">
                <!-- <q-btn
                  @click="voltar"
                  style="margin-right: 10px"
                  label="Voltar"
                  no-caps
                  class="btn-voltar"
                /> -->

                <q-btn
                  v-if="tab === 'plano-desejado'"
                  :disable="!planoSelecionado"
                  type="button"
                  style="margin-right: 10px"
                  label="Continuar"
                  no-caps
                  icon="chevron_right"
                  class="btn-salvar"
                  @click="tab = 'dados-basicos'"
                />

                <q-btn
                  v-if="!permiteRascunho && !estaNaRevisao && tab !== 'plano-desejado'"
                  type="submit"
                  style="margin-right: 10px"
                  label="Salvar Rascunho"
                  no-caps
                  icon="save"
                  class="btn-salvar"
                />

                <q-btn
                  @click="cadastrarOuAtualizar('AGUARDANDO_PUBLICACAO')"
                  v-if="anuncio?.id && estaNaRevisao === false"
                  type="button"
                  label="Cadastrar"
                  no-caps
                  icon="save"
                  class="btn-cadastrar"
                />

                <q-btn
                  @click="cadastrarOuAtualizar('PUBLICADO')"
                  v-if="anuncio?.id && estaNaRevisao"
                  type="button"
                  label="Salvar e Aprovar"
                  no-caps
                  class="btn-aprovar"
                  icon="save"
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
      status: { label: 'Rascunho', value: 'RASCUNHO' },
      planoDesejado: null
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
    const planos = [
      {
        id: 'GRATIS',
        nome: 'Plano Grátis',
        duracao: 'Duração: 15 dias',
        valorAvista: 'Sem custo',
        bg: '#FB8C00',
        icone: 'mdi-gift'
      },
      {
        id: 'BASICO',
        nome: 'Plano Básico',
        duracao: 'Ativo por 20 dias',
        valorAvista: 'R$ 30,00 à vista',
        bg: '#5C6BC0',
        icone: 'mdi-star-outline'
      },
      {
        id: 'PREMIUM',
        nome: 'Plano Premium',
        duracao: 'Ativo por 30 dias',
        valorAvista: 'R$ 40,00 à vista',
        bg: '#7E57C2',
        icone: 'mdi-star-half-full'
      },
      {
        id: 'AVANCADO',
        nome: 'Plano Avançado',
        duracao: 'Ativo por 60 dias',
        valorAvista: 'R$ 60,00 à vista',
        bg: '#6A1B9A',
        icone: 'mdi-star',
        destaque: true
      }
    ]
    return {
      planos,
      uploaderRefs,
      $q,
      anuncio,
      title: ref('Cadastrar Anúncio'),
      tab: ref('plano-desejado'),
      valorFormatado: ref(''),
      tiposInstrumentos,
      marcas,
      listaCamposFiltrados: ref([]),
      estados: ref([]),
      municipios: ref([]),
      moneyFormatForDirective,
      hasAnuncioFree: ref(false),
      desabilitarMunicipio: ref(false),
      planoSelecionado: ref(null)
    }
  },
  computed: {
    permiteRascunho: {
      get () {
        return this.anuncio?.status?.value === 'AGUARDANDO_PUBLICACAO' && this.anuncio?.status?.value === 'PUBLICADO'
      }
    },
    estaNaRevisao () {
      return this.$route.path.includes('/revisao')
    }
  },
  mounted () {
    this.confirmarSeJaTemAnuncioFree()
    this.buscarPessoaParaEdicao()
    this.buscarEstados()
    this.buscarTiposInstrumentos()
    this.buscarMarcas()
  },
  methods: {
    confirmarSeJaTemAnuncioFree () {
      if (this.$route.params.id) return
      anuncioService.getInfoHasAnuncioFree().then((retorno) => {
        this.hasAnuncioFree = retorno.data
      })
    },
    buscarPessoaParaEdicao () {
      if (!this.$route.params.id) return
      this.title = 'Editar Anúncio'
      anuncioService.getById(this.$route.params.id).then((retorno) => {
        this.anuncio = retorno.data
        this.anuncio.valor = this.anuncio.valor.toFixed(2)
        this.planoSelecionado = this.anuncio.tipoPlano?.value
        this.buscarMunicipios()
      })
    },
    cadastrarOuAtualizar (status) {
      const dto = { ...this.anuncio }
      dto.estado = dto.estado?.sigla || dto.estado
      dto.municipio = dto.municipio?.nome || dto.municipio
      dto.valor = this.$fmt.decimalToApi(dto.valor)
      dto.tipo = dto.tipo.value || dto.tipo
      dto.marca = dto.marca.value || dto.marca
      dto.status = status
      if (this.anuncio.id) {
        anuncioService.update(dto.id, dto)
          .then(response => {
            this.$msg.success('Ação realizada com sucesso!' + (status === 'AGUARDANDO_PUBLICACAO' ? ' Em breve, você receberá um e-mail com informações sobre a publicação.' : ''))
            this.voltar()
          })
          .catch(error => {
            this.$msg.apiError('Erro ao cadastrar/atualizar!', error)
          })
      } else {
        dto.tipoPlano = this.planoSelecionado
        anuncioService.create(dto)
          .then(async response => {
            this.$msg.success('Anúncio salvo. Prossiga com o upload das imagens!')
            const id = response.data
            await this.irParaEdicao(id)
            this.anuncio.id = id
            this.tab = 'imagens'
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
      this.$router.push(this.estaNaRevisao ? '/admin/anuncios/revisao' : '/admin/anuncios')
    },
    irParaEdicao (id) {
      this.$router.push((this.estaNaRevisao ? '/admin/anuncios/revisao/form/' : '/admin/anuncios/form/') + id)
    },
    evitarTroca (novoValor) {
      if (!this.anuncio?.id) {
        this.planoSelecionado = novoValor
      }
    }
  }
}

</script>

<style scoped>

</style>
