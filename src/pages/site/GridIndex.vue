<template>
  <div>
    <div class="bg q-mt-lg">
      <q-form greedy>
        <div class="main-container">
          <div class="flex justify-between itemseS-center q-mb-sm">
            <h2 class="title-text">{{ title }}</h2>
            <q-space />
          </div>
          <div class="divisor-line"></div>
          <div class="row">
            aquiiiiiiii {{ anuncios }}
          </div>
          <div class="q-mt-lg flex justify-center">
            <q-pagination
              v-model="current"
              :max="5"
              direction-links
              unelevated
              color="black"
              active-color="purple"
            />
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { anuncioSiteService } from 'src/services/api-service.js'

export default {
  name: 'GridIndex',
  setup () {
    return {
      title: 'Instrumentos Musicais à Venda',
      anuncios: ref([]),
      current: ref(1)
    }
  },
  mounted () {
    this.carregarAnuncios()
  },
  methods: {
    carregarAnuncios () {
      anuncioSiteService
        .findAll()
        .then((response) => {
          this.anuncios = response.data
        })
        .catch((error) => {
          this.$msg.apiError('Erro ao buscar os estados!', error)
        })
    }
  }
}

</script>
<style></style>
