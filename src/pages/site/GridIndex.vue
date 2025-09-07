<template>
  <div>
    <div class="bg q-mt-lg">
                <div class="q-mb-sm" style="width: 100%; display: flex; justify-content: flex-end; padding: 0px 0px 0 0;">
            <!-- Banners promocionais para anúncio -->

            <q-btn label="Anunciar" color="red" icon="publish" dense unelevated
              style="min-width: 100px; font-weight: bold;" @click="irParaAreaAnunciante" />
          </div>
        <div class="main-container">
          <!-- <div v-if="isAuthenticated" class="text-right p-2 bg-light rounded shadow-sm">
          <span class="text-caption hidden-xs hidden-sm">
<span style="font-size: 1rem; color: #9c27b0; font-weight: bold;">
  Bem-vindo(a), <span style="text-transform: uppercase;">{{ getMe?.nome }}!</span>
</span>
            <br>
            <span class="text-muted" style="font-size: 0.9rem;">
              {{ new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
            </span>
          </span>
        </div> -->
 <picture>
    <!-- Mobile -->
    <source srcset="/img/logo-mercado-instrumental-index-807x376.png" media="(max-width: 768px)" />

    <!-- Tablet -->
    <source srcset="/img/logo-mercado-instrumental-index-1135-350.png" media="(max-width: 1200px)" />

    <!-- Desktop (default) -->
<img
  @click="irParaAreaAnunciante"
  src="img/logo-mercado-instrumental-index-1576-300.png"
  alt="Banner Anuncie aqui"
  style="width: 100%; height: auto; cursor: pointer;"
/>
  </picture>
        </div>
    </div>
        <GoogleAd />
        <div class="bg">
<q-form greedy>
  <div class="main-container" v-if="anuncios?.data != null">
    <!-- Se houver anúncios -->
    <div v-if="anunciosPagina?.length > 0">

      <!-- Banner de destaque -->
      <q-banner class="bg-purple-1 text-primary q-mb-md" rounded>
        <template v-slot:avatar>
          <q-icon name="star" color="deep-purple" />
        </template>
        <div class="text-subtitle1 text-weight-medium">Instrumentos disponíveis</div>
        <div class="text-caption text-grey-8">
          Escolha seu plano e seja visto!
        </div>
      </q-banner>

      <!-- Cards de anúncios -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div v-for="anuncio in anunciosPagina" :key="`destaque-${anuncio.idAnuncio}`" class="col-6 col-sm-2 col-md-2 col-lg-2">
          <q-card class="card-destaque">
            <!-- Link para detalhe do anúncio -->
            <router-link :to="`/anuncio/${anuncio.idAnuncio}`">
              <div class="q-pa-sm destaque-img-container">
                <q-badge color="deep-purple" class="absolute-top-left q-mt-sm q-ml-sm" :class="{ 'badge-destaque': anuncio.isDestaque }" rounded label="Destaque" />
                <q-img :src="anuncio.srcMiniatura" no-native-menu alt="Miniatura do anúncio" class="destaque-img" />
              </div>
            </router-link>

            <!-- Informações do anúncio -->
            <q-card-section class="q-pa-sm">
              <div class="anuncio-content">
                <div class="anuncio-title">{{ formatarTitulo(anuncio.titulo) }}</div>
                <div class="anuncio-valor">{{ $fmt.fCurrency(anuncio.valor) }}</div>
                <div class="anuncio-condicao q-mt-xs">
                  <q-badge outline :color="anuncio.isUsado ? 'deep-purple' : 'purple'">
                    {{ anuncio.isUsado ? "Instrumento Usado" : "Instrumento Novo" }}
                  </q-badge>
                </div>

                <!-- Marca e Local -->
                <div class="anuncio-info q-mt-xs">
                  <div class="info-line">
                    <q-icon name="category" size="16px" class="q-mr-xs text-grey-7" />
                    <span class="text-caption text-grey-8">Marca:</span>
                    <span class="text-caption text-dark q-ml-xs">{{ formatarMarca(anuncio.marca?.label) }}</span>
                  </div>
                  <div class="info-line q-mt-xs">
                    <q-icon name="place" size="16px" class="q-mr-xs text-grey-7" />
                    <span class="text-caption text-grey-8">Local:</span>
                    <span class="text-caption text-dark q-ml-xs">{{ formatarLocal(anuncio.municipio, anuncio.uf) }}</span>
                  </div>
                </div>
              </div>
            </q-card-section>

          </q-card>
        </div>
      </div>

      <!-- Paginação -->
      <div class="q-mt-lg flex justify-center">
        <q-pagination
          v-model="current"
          :max="totalPages"
          direction-links
          unelevated
          color="black"
          active-color="purple"
          @update:model-value="onPageChange"
        />
      </div>

      <!-- Informações de registros -->
      <div class="q-mt-md text-center text-caption text-grey-7 q-pa-sm bg-grey-2 rounded-borders">
        Página {{ anuncios.page + 1 }} de {{ anuncios.totalPages }} - Exibindo {{ registrosExibidos }} de {{ anuncios.totalRecords }} registros no total
      </div>
    </div>

    <!-- Se não houver anúncios -->
    <div v-else class="row q-col-gutter-md q-mt-md">
      <div class="col-12">
        <q-banner class="bg-purple-8 text-center text-white" dense rounded>
          <template v-slot:avatar>
            <q-icon name="info" color="#aaaaaa" />
          </template>
          Nenhum dado encontrado para os parâmetros informados.
        </q-banner>
      </div>
    </div>

  </div>
</q-form>
    </div>
  </div>

</template>

<script>
import { anuncioSiteService } from 'src/services/api-service.js'
import GoogleAd from './GoogleAd.vue'
import { ref } from 'vue'
import { mapGetters } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'GridIndex',
  data () {
    return {
      route: useRoute(),
      title: 'Anúncios',
      anuncios: ref({
        data: null,
        totalPages: 1,
        pageSize: 4,
        totalRecords: 0,
        page: 0
      }),
      current: 1
    }
  },
  components: {
    GoogleAd
  },
  computed: {
    filtro () {
      console.log(this.$store.state.filtros.filtroAnuncios)
      return this.$store.state.filtros.filtroAnuncios
    },
    anunciosPagina () {
      return this.anuncios?.data
    },
    totalPages () {
      return this.anuncios.totalPages || 1
    },
    registrosExibidos () {
      const registrosAteAgora = (this.current - 1) * this.anuncios.pageSize + this.anuncios.data.length
      return Math.min(registrosAteAgora, this.anuncios.totalRecords)
    },
    ...mapGetters('auth', ['isAuthenticated', 'getMe'])
  },
  watch: {
    filtro: {
      handler () {
        this.current = 1 // Reinicia para a primeira página, se desejado
        this.carregarAnuncios()
      },
      deep: true,
      immediate: false
    }
  },
  mounted () {
    this.carregarAnuncios()
  },
  methods: {
    formatarTitulo (titulo) {
      if (!titulo) return ''.padEnd(47, ' ')
      const maxLength = 47
      if (titulo.length < maxLength) return titulo.padEnd(maxLength, ' ')
      if (titulo.length > maxLength) return titulo.slice(0, 44) + '...'
      return titulo
    },
    irParaAreaAnunciante () {
      if (!this.isAuthenticated) {
        const afiliado = this.route.query.afiliado || null
        window.location.href = '/account/login' + (afiliado != null ? ('?afiliado=' + afiliado) : '')
      } else {
        window.location.href = '/admin/anuncios/form'
      }
    },
    carregarAnuncios () {
      let params = { page: this.current - 1, size: this.anuncios.pageSize, direction: 'ASC', ordenarPor: 'id' }
      params = this.incluirFiltrosBuscaDetalhada(params)
      anuncioSiteService
        .findAll(params)
        .then(response => {
          const data = response.data
          this.anuncios = {
            data: data.data,
            totalPages: data.totalPages || 1,
            pageSize: data.pageSize || 1,
            page: data.page || 0,
            totalRecords: data.totalRecords || 0
          }
        })
        .catch(error => {
          this.$msg.apiError('Erro ao buscar os anúncios!', error)
        })
    },
    incluirFiltrosBuscaDetalhada (params) {
      const filtros = this.$store.state.filtros.filtroAnuncios || null
      if (filtros != null) {
        params.estado = filtros.estado?.sigla
        params.municipio = filtros.municipio?.nome
        params.tipo = filtros.tipo
        params.marca = filtros.marca
        params.titulo = filtros.titulo
        params.descricao = filtros.descricao
        params.precoMin = this.$fmt.decimalToApi(filtros.valorInicial)
        params.precoMax = this.$fmt.decimalToApi(filtros.valorFinal)
        params.condicao = filtros.novo
      }
      return params
    },
    onPageChange (page) {
      this.current = page
      this.carregarAnuncios()
    },
    formatarMarca (marca) {
      const texto = marca || 'Não informada'
      const maxLength = 22
      if (texto.length < maxLength) return texto.padEnd(maxLength, ' ')
      if (texto.length > maxLength) return texto.slice(0, 19) + '...'
      return texto
    },
    formatarLocal (municipio, uf) {
      const texto = municipio && uf ? `${municipio}/${uf}` : 'Não informado'
      const maxLength = 22
      if (texto.length < maxLength) return texto.padEnd(maxLength, ' ')
      if (texto.length > maxLength) return texto.slice(0, 19) + '...'
      return texto
    }
  }
}

</script>

<style scoped>
.anuncio-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.anuncio-title {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6em; /* força ocupar 2 linhas com base no line-height */
  white-space: normal;
}

.anuncio-valor {
  font-size: 1.15rem;
  font-weight: 600;
  color: #7b1fa2;
}

.anuncio-condicao {
  margin-top: 4px;
}

.anuncio-info {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

img,
q-img {
  max-width: 100%;
  display: block;
}

.info-line {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  line-height: 1.2;
}

.zoom-hover {
  transition: transform 0.3s ease;
}

.zoom-hover:hover {
  transform: scale(1.01);
}

.destaque-img-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.destaque-img {
  transition: transform 0.3s ease;
  border-radius: 8px;
}

.destaque-img-container:hover .destaque-img {
  transform: scale(1.05);
}

.banner-wrapper {
  display: flex;
  justify-content: center;
  /* Se quiser alinhar verticalmente no meio do container pai, pode adicionar: */
  /* align-items: center; */
}

.banner-728x90 {
  width: 728px;
  height: 90px;
}

.banner-728x90 .q-img__image {
  width: 728px !important;
  height: 90px !important;
  object-fit: contain;
}

.badge-destaque {
  z-index: 10; /* ou outro valor baixo, suficiente para ficar sobre a imagem mas abaixo de modais */
}

.destaque-img-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}
</style>
