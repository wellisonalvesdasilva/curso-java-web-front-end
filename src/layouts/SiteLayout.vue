<template>
  <q-layout view="hHh LpR lfr">
    <q-header elevated class="header">
      <q-toolbar class="q-gutter-sm q-px-md q-py-sm flex items-center">
        <!-- Menu hambúrguer + logo -->
        <q-btn
          dense
          flat
          round
          v-if="isSmallScreen"
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <router-link @click="limparFiltros()" to="/" class="header-logo-container q-mx-sm" style="margin-right: 32px;">
          <q-avatar class="responsive-logo">
            <img src="../assets/img/logo-mercado-instrumental-site.jpg" alt="Logo" />
          </q-avatar>
        </router-link>
        <q-input
          dense
          outlined
          :disable="botaoBusca === 'Editar Filtros' && buscaGeral == null"
          placeholder="Digite o que você procura..."
          v-model="buscaGeral"
          class="q-mx-md"
          style="width: 100%; max-width: 250px; background-color: white; border-radius: 4px;"
          clearable
          :rules="[val => val.length >= 0 || 'Digite algo para buscar']"
        >
          <template v-slot:append>
            <q-icon name="search" @click="executarBusca" class="cursor-pointer" />
          </template>
        </q-input>
        <q-btn
            flat
            dense
            class="q-mr-md text-capitalize"
            icon="policy"
            :disable="buscaGeral != null && buscaGeral != ''"
            :label="botaoBusca"
            @click="abrirModalBuscaDetalhada"
          />
        <!-- Mostrar botões normais apenas se NÃO for tela pequena -->
        <template v-if="!isSmallScreen">
          <!-- <q-btn
            flat
            dense
            class="q-mr-xs text-capitalize"
            icon="expand_more"
            label="Categorias"
          >
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 150px">
                <q-item clickable @click="irParaSobre">
                  <q-item-section>Sobre nós</q-item-section>
                </q-item>
                <q-item clickable @click="irParaContato">
                  <q-item-section>Contato</q-item-section>
                </q-item>
                <q-item clickable @click="irParaAjuda">
                  <q-item-section>Ajuda</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn
            flat
            dense
            class="q-mr-xs text-capitalize"
            icon="expand_more"
            label="Marcas"
          >
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 150px">
                <q-item clickable @click="irParaSobre">
                  <q-item-section>Sobre nós</q-item-section>
                </q-item>
                <q-item clickable @click="irParaContato">
                  <q-item-section>Contato</q-item-section>
                </q-item>
                <q-item clickable @click="irParaAjuda">
                  <q-item-section>Ajuda</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn> -->
        </template>
        <q-space />
          <q-btn
            flat
            dense
            @click="irParaAreaAnunciante"
            class="q-mr-xs text-capitalize"
            icon="post_add"
            label="Publicar Anúncio"
          >
          </q-btn>
          <q-btn
            flat
            dense
            class="q-mr-xs text-capitalize"
            icon="account_circle"
            label="Conta"
            @click="irParaAreaAnunciante"
          >
          </q-btn>
      </q-toolbar>
    </q-header>

<q-drawer v-if="isSmallScreen" v-model="leftDrawerOpen" side="left" bordered>
  <q-list>
    <q-item-label header>Menu</q-item-label>
    <q-expansion-item label="Categorias" icon="category" dense>
      <q-list>
        <q-item clickable @click="irParaSobre">
          <q-item-section>Sobre nós</q-item-section>
        </q-item>
        <q-item clickable @click="irParaContato">
          <q-item-section>Contato</q-item-section>
        </q-item>
        <q-item clickable @click="irParaAjuda">
          <q-item-section>Ajuda</q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
    <q-expansion-item label="Marcas" icon="branding_watermark" dense>
      <q-list>
        <q-item clickable @click="irParaSobre">
          <q-item-section>Sobre nós</q-item-section>
        </q-item>
        <q-item clickable @click="irParaContato">
          <q-item-section>Contato</q-item-section>
        </q-item>
        <q-item clickable @click="irParaAjuda">
          <q-item-section>Ajuda</q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
    <q-item clickable @click="modalVisualizarImagem" icon="search">
      <q-item-section>Busca Detalhada</q-item-section>
    </q-item>
  </q-list>
</q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle2 text-center">
          Desenvolvido por WAS Software LTDA.
        </q-toolbar-title>
        <div class="text-caption float-right">
          <div>Versão 1.0</div>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
<q-dialog v-model="modalVisualizarBuscaDetalhada">
  <q-card
    class="q-px-md modal-sm"
    style="min-width: 60%; max-height: 85vh; display: flex; flex-direction: column;">
    <q-card-section class="modal-title-container-left" style="flex-shrink: 0;">
      <h5 class="q-mb-none">{{ 'Busca Detalhada' }}</h5>
    </q-card-section>
    <div class="divisor-line"></div>
    <hr class="separadorModal" />
    <q-card-section
      style="font-size: 14px; overflow-y: hidden; flex-grow: 1; padding-top: 0;">
      <div class="text-primary text-bold q-mb-sm">Localização</div>
      <div class="row q-col-gutter-md q-mb-md">
        <!-- seus selects aqui -->
        <div class="col-xs-12 col-sm-6">
          <q-select
            stack-label
            dense
            label="Estado"
            v-model="filtro.estado"
            use-input
            emit-value
            input-debounce="500"
            @update:model-value="val => alterouEstado()"
            @click="(val, update, abort) => buscarEstados(val)"
            clearable
            :options="listaCamposFiltrados['estados']"
            option-label="sigla"
            map-options
            @filter="(val, update, abort) => filterSelects(val, update, abort, 'estados')"
          >
            <template v-slot:label>
              <span class="input-label">Estado</span>
            </template>
            <template v-slot:no-option>
              <q-item><q-item-section class="text-grey">Nenhum Dado Encontrado</q-item-section></q-item>
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-select
            stack-label
            dense
            label="Município"
            :disable="!filtro.estado || desabilitarMunicipio"
            v-model="filtro.municipio"
            use-input
            emit-value
            input-debounce="500"
            @click="(val, update, abort) => buscarMunicipios(val)"
            clearable
            :options="listaCamposFiltrados['municipios']"
            option-label="nome"
            map-options
            @filter="(val, update, abort) => filterSelects(val, update, abort, 'municipios')"
          >
            <template v-slot:label>
              <span class="input-label">Município</span>
            </template>
            <template v-slot:no-option>
              <q-item><q-item-section class="text-grey">Nenhum Dado Encontrado</q-item-section></q-item>
            </template>
          </q-select>
        </div>
      </div>

      <div class="text-primary text-bold q-mb-sm">Características do Instrumento</div>
      <div class="row q-col-gutter-md q-mb-md">
        <!-- seus selects aqui -->
        <div class="col-xs-12 col-sm-6">
          <q-select
            stack-label
            dense
            label="Tipo"
            v-model="filtro.tipo"
            use-input
            emit-value
            input-debounce="500"
            @click="(val, update, abort) => buscarTiposInstrumentos(val)"
            clearable
            :options="listaCamposFiltrados['tiposInstrumentos']"
            option-label="label"
            map-options
            @filter="(val, update, abort) => filterSelects(val, update, abort, 'tiposInstrumentos')"
          >
            <template v-slot:label>
              <span class="input-label">Tipo</span>
            </template>
            <template v-slot:no-option>
              <q-item><q-item-section class="text-grey">Nenhum Dado Encontrado</q-item-section></q-item>
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-select
            stack-label
            dense
            label="Marca"
            v-model="filtro.marca"
            use-input
            emit-value
            input-debounce="500"
            @click="(val, update, abort) => buscarMarcas(val)"
            clearable
            :options="listaCamposFiltrados['marcas']"
            option-label="label"
            map-options
            @filter="(val, update, abort) => filterSelects(val, update, abort, 'marcas')"
          >
            <template v-slot:label>
              <span class="input-label">Marca</span>
            </template>
            <template v-slot:no-option>
              <q-item><q-item-section class="text-grey">Nenhum Dado Encontrado</q-item-section></q-item>
            </template>
          </q-select>
        </div>
      </div>

<div class="text-primary text-bold q-mb-sm">Informações Adicionais</div>
<div class="row q-col-gutter-md q-mb-md">
  <div class="col-xs-12 col-sm-4">
    <q-input
      stack-label
      dense
      v-model="filtro.titulo"
      label="Título"
    >
      <template v-slot:label>
        <span class="input-label">Título</span>
      </template>
    </q-input>
  </div>
  <div class="col-xs-12 col-sm-5">
    <q-input
      stack-label
      dense
      label="Descrição"
      v-model="filtro.descricao"
    >
      <template v-slot:label>
        <span class="input-label">Descrição</span>
      </template>
    </q-input>
  </div>
  <div class="col-xs-12 col-sm-3">
    <div class="q-mt-lg">
      <q-toggle
        v-model="filtro.novo"
        label="Instrumento novo?"
        left-label
        size="md"
        dense
      />
    </div>
  </div>
</div>

      <div class="text-primary text-bold q-mb-sm">Faixa de Valor</div>
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-xs-12 col-sm-6">
          <q-input
            stack-label
            dense
            label="Valor de"
            v-model="filtro.valorInicial"
            v-money="moneyFormatForDirective"
            :lazy-rules="true"
          >
            <template v-slot:label>
              <span class="input-label">Valor de</span>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-input
            stack-label
            dense
            v-model="filtro.valorFinal"
            v-money="moneyFormatForDirective"
            :lazy-rules="true"
            label="Até"
          >
            <template v-slot:label>
              <span class="input-label">Até</span>
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>

<div class="row q-mt-md">
            <div class="col-12">
              <div style="float: right">
  <q-btn
    style="margin-right: 10px"
    class="btn-cancelar"
    @click="limparFiltros()"
    label="Limpar Filtros"
  />
  <q-btn
    type="button"
    label="Buscar"
    icon="search"
    @click="buscar(true)"
    no-caps
    class="btn-cadastrar"
  />
</div></div></div>
  </q-card>
</q-dialog>

</template>

<style src="../assets/scss/global.scss" lang="scss" />
<style lang="scss" scoped></style>

<script>
import { ref, inject } from 'vue'
import { MENU } from '../mock/menu.mock'
import { useQuasar } from 'quasar'
import vClickOutside from 'click-outside-vue3'
import { mapGetters } from 'vuex'
import { enumService, ibgeService } from 'src/services/api-service.js'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  setup () {
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const habilitaMenu = ref(true)
    const miniMode = ref(true)
    const rotaHome = '/'
    return {
      moneyFormatForDirective: ref({
        decimal: ',',
        thousands: '.',
        precision: 2,
        prefix: 'R$ ',
        masked: false
      }),
      anuncios: ref([]),
      buscaGeral: ref(null),
      rotaHome,
      filtro: ref({
        novo: null,
        tipo: null,
        marca: null,
        valor: null,
        estado: null,
        municipio: null,
        valorInicial: null,
        valorFinal: null,
        titulo: null,
        descricao: null
      }),
      botaoBusca: ref(''),
      valorDefaultBotaoBusca: ref('Busca Detalhada'),
      menuPrincipal: ref(null),
      subMenu: ref(null),
      itensmenu: ref(null),
      expansionItems: ref([]),
      expansionItemsSubMenu: ref([]),
      leftDrawerOpen,
      habilitaMenu,
      modalVisualizarImagem: ref(false),
      modalVisualizarBuscaDetalhada: ref(false),
      miniMode,
      valorFormatado: ref(''),
      desabilitarMunicipio: ref(false),
      tiposInstrumentos: ref([]),
      marcas: ref([]),
      listaCamposFiltrados: ref([]),
      estados: ref([]),
      municipios: ref([]),
      securityState: inject('securityState'),
      drawer: ref(false),
      drawerClick (e) {
        if (miniMode.value) {
          miniMode.value = false
          rightDrawerOpen.value = false
          e.stopPropagation()
        }
      },
      link: ref('inbox'),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
        if ($q.screen.lt.md) {
          miniMode.value = false
          habilitaMenu.value = !habilitaMenu.value
        } else {
          habilitaMenu.value = true
          miniMode.value = !miniMode.value
        }
      },
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
        miniMode.value = true
      },
      toggleRightClose () {
        rightDrawerOpen.value = false
      },
      menus: ref([]),
      mainMenu: MENU,
      funcionarioBanco: ref(null)
    }
  },
  computed: {
    isSmallScreen () {
      return this.$q.screen.lt.md
    },
    ...mapGetters('auth', ['isAuthenticated', 'getMe'])
  },
  mounted () {
    this.botaoBusca = this.valorDefaultBotaoBusca
  },
  watch: {
    buscaGeral: {
      handler () {
        this.executarBusca()
      }
    }
  },
  methods: {
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
    abrirModalBuscaDetalhada () {
      this.buscarEstados()
      this.buscarTiposInstrumentos()
      this.buscarMarcas()
      this.modalVisualizarBuscaDetalhada = true
    },
    buscarMarcas () {
      enumService.getMarcas().then(response => {
        this.marcas = response.data
        this.listaCamposFiltrados.marcas = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar as marcas!', error)
      })
    },
    buscarTiposInstrumentos () {
      enumService.getTiposInstrumentos().then(response => {
        this.tiposInstrumentos = response.data
        this.listaCamposFiltrados.tiposInstrumentos = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os tipos de instrumentos!', error)
      })
    },
    alterouEstado () {
      this.desabilitarMunicipio = true
      this.filtro.municipio = null
      this.buscarMunicipios()
    },
    buscarMunicipios () {
      const estado = this.filtro?.estado.sigla || this.filtro?.estado
      ibgeService.getMunicipios(estado).then(response => {
        this.municipios = response.data
        this.listaCamposFiltrados.municipios = response.data
        this.desabilitarMunicipio = false
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar dossiê', error)
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
    limparFiltros () {
      this.modalVisualizarBuscaDetalhada = false
      Object.keys(this.filtro).forEach(chave => {
        this.filtro[chave] = null
      })
      this.buscaGeral = null
      this.buscar()
    },
    irParaCadastro () {
      this.$router.push('/account/cadastro')
    },
    irParaAreaAnunciante () {
      if (!this.isAuthenticated) {
        this.$router.push('/account/login')
      } else {
        this.$router.push('/admin/anuncios')
      }
    },
    irParaHome: function () {
      this.fechartudo()
      this.$router.push('/admin')
      this.handleShow(null)
    },
    onClickOutside (event) {
      this.fechartudo()
      this.miniMode = true
    },
    executarBusca () {
      if (this.buscaGeral != null && this.buscaGeral !== '') {
        this.filtro.titulo = this.buscaGeral
        this.buscar(false)
      } else {
        this.limparFiltros()
      }
    },
    buscar () {
      this.modalVisualizarBuscaDetalhada = false
      this.$router.push({ name: 'GridIndex' })
      this.$store.commit('filtros/setFiltroAnuncios', JSON.parse(JSON.stringify(this.filtro)))
      this.temCampoPreenchido()
    },
    temCampoPreenchido () {
      const algumCampoPreenchido = Object.values(this.filtro).some(
        valor => valor !== null && valor !== '' && valor !== 'R$ 0,00'
      )
      this.botaoBusca = algumCampoPreenchido ? 'Editar Filtros' : this.valorDefaultBotaoBusca
    }
  }
}

</script>
<style>
.responsive-logo {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.responsive-logo img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

@media (max-width: 600px) {
  .header-logo-container {
    max-width: 150px;
  }

  .header span {
    font-size: 12px;
  }

  .hidden-xs {
    display: none !important;
  }
}

.q-btn span {
    text-transform: none !important;
  }

.q-field--with-bottom {
padding-bottom: 0px
}

.bordered-section {
  border-left: 4px solid #027be3;
  border-radius: 4px;
}
.scrollable-content {
  overflow-y: auto;
  flex-grow: 1;
}

.q-card-actions.justify-end {
  display: flex;
  justify-content: flex-end;
}

</style>
