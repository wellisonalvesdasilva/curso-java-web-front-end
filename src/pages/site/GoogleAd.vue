<template>
  <div class="adsense-container">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-3940256099942544"
         data-ad-slot="1234567890"
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
