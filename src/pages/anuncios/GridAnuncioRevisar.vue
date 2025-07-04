<template>
  <grid-anuncio :title="title" :isRevisao="true" />
</template>

<script>
import GridAnuncio from './GridAnuncio.vue'

export default {
  name: 'GridAnuncioRevisar',
  setup () {
    return {
      title: 'Revisar Anúncios'
    }
  },
  components: {
    GridAnuncio
  }
}
</script>
