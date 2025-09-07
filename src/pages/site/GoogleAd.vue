<template>
  <div class="adsense-container">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-7288503048445574"
         data-ad-slot="8083358086"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </div>
</template>

<script>
export default {
  name: 'GoogleAd',
  mounted () {
    this.$nextTick(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.warn('Erro ao carregar AdSense:', e)
      }
    })
  }
}
</script>

<style scoped>
.adsense-container {
  text-align: center;
  margin: 16px 0;
  min-height: 90px; /* garante espaço para o anúncio */
}
</style>
