<template>
  <div>
    <div class="bg q-mt-lg">
      <q-form greedy>
        <div class="main-container">
        <div v-if="isAuthenticated" class="text-right p-2 bg-light rounded shadow-sm">
          <span class="text-caption hidden-xs hidden-sm">
<span style="font-size: 1rem; color: #9c27b0; font-weight: bold;">
  Bem-vindo(a), <span style="text-transform: uppercase;">{{ getMe?.nome }}!</span>
</span>
            <br>
            <span class="text-muted" style="font-size: 0.9rem;">
              {{ new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
            </span>
          </span>
        </div>
          <div class="flex justify-between items-center q-mb-sm">
            <h2 class="title-text">{{ title }}</h2>
            <q-space />
          </div>
          <div class="divisor-line"></div>
          <div class="row q-col-gutter-md q-mt-md">
            <div
              v-for="anuncio in anunciosPagina"
              :key="anuncio.idAnuncio"
              class="col-12 col-sm-6 col-md-3 col-lg-3">
              <q-card>
                <router-link :to="`/anuncio/${anuncio.idAnuncio}`">
                  <q-img
                    :src="anuncio.srcMiniatura"
                    no-native-menu
                    style="width: 100%; height: 197px; object-fit: contain;"
                    alt="Miniatura do anúncio"
                    class="q-pa-sm"
                  />
                </router-link>
<q-card-section class="q-pa-sm">
  <div class="anuncio-content">
    <div class="anuncio-title">{{ anuncio.titulo }}</div>
    <div class="anuncio-valor">{{ this.$fmt.fCurrency(anuncio.valor) }}</div>

    <div class="anuncio-condicao">
      <q-badge outline :color="anuncio.isUsado ? 'deep-purple' : 'purple'">
        {{ anuncio.isUsado ? "Usado" : "Novo" }}
      </q-badge>
    </div>

    <div class="anuncio-info">
      <div class="info-line">
        <q-icon name="category" size="16px" class="q-mr-xs text-grey-7" />
        <span class="text-caption text-grey-8">Marca:</span>
        <span class="text-caption text-dark q-ml-xs">{{ anuncio.marca?.label || 'Não informada' }}</span>
      </div>
      <div class="info-line q-mt-xs">
        <q-icon name="place" size="16px" class="q-mr-xs text-grey-7" />
        <span class="text-caption text-grey-8">Local:</span>
        <span class="text-caption text-dark q-ml-xs">{{ anuncio.municipio }}/{{ anuncio.uf }}</span>
      </div>
    </div>
  </div>
</q-card-section>

              </q-card>
            </div>
          </div>
          <!-- Paginação -->
          <div class="q-mt-lg flex justify-center teste">
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
      </q-form>
    </div>
  </div>
</template>

<script>
import { anuncioSiteService } from 'src/services/api-service.js'
import { ref } from 'vue'
import { mapGetters } from 'vuex'

export default {
  name: 'GridIndex',
  data () {
    return {
      title: 'Anúncios',
      anuncios: ref({
        data: [],
        totalPages: 1,
        pageSize: 4,
        totalRecords: 0,
        page: 0
      }),
      current: 1
    }
  },
  computed: {
    anunciosPagina () {
      return this.anuncios.data
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
  mounted () {
    this.carregarAnuncios()
  },
  methods: {
    carregarAnuncios () {
      anuncioSiteService
        .findAll({ page: this.current - 1, size: this.anuncios.pageSize, direction: 'ASC', ordenarPor: 'id' })
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
    onPageChange (page) {
      this.current = page
      this.carregarAnuncios()
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
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  line-height: 1.3;
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

.info-line {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  line-height: 1.2;
}
</style>
