<template>
<q-uploader
  :url="getUrl"
  :auto-upload="false"
  :factory="loadFiles"
/>
</template>

<script>
export default {
  props: {
    item: Object,
    getUrl: Function
  },
  methods: {
    async loadFiles () {
      const response = await fetch('https://upload.wikimedia.org/wikipedia/commons/0/0f/Exemplo.jpg')
      const blob = await response.blob()
      const file = new File([blob], 'image.jpg', { type: blob.type })
      return [file]
    }
  }
}
</script>
