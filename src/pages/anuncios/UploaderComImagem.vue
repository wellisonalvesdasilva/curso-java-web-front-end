<template>
  <q-card
    v-for="(item, index) in listImagens"
    :key="index"
    class="flex justify-between no-shadow q-card--bordered flex-center q-mb-sm"
    :class="getClassCard(item)">
    <q-card-section class="flex flex-center">
      <img :src="getIconeCard(item)" :alt="'icone de erro'" />
      <span class="q-ml-sm" :class="'text-bold'">
        Imagem {{ item.numero == 1 ?  item.numero + ' (Capa)' : item.numero }}
        <!-- <q-tooltip> Válido até xxxx </q-tooltip> -->
      </span>
    </q-card-section>
    <q-card-section> </q-card-section>
    <q-card-section>
      <div class="flex">
        <q-icon
          v-if="item.srcDir"
          name="visibility"
          size="20px"
          @click="carregarPdf"
          class="q-ml-md cursor-pointer"
        />
        <!-- <img
          v-if="item.srcDir"
          :class="cursor-pointer"
          class="icon-documentos q-ml-md cursor-pointer"
          :src="iconDownload"
          alt="Download Documento"
        /> -->
        <img
          @click="uparDocumento(item)"
          class="cursor-pointer q-ml-md icon-documentos"
          :src="iconUpload"
          alt="Upload Documento"
        />
      </div>
    </q-card-section>
  </q-card>
  <q-file v-model="arquivo" ref="arquivoinput" style="display: none" />
</template>

<script>
import { ref } from 'vue'
import { artefatoAnuncioService } from 'src/services/api-service.js'
export default {
  data () {
    return {
      arquivo: ref(null),
      imagem: ref(null),
      iconExcluir: 'icons-geral/excluir.svg',
      iconDownload: '/imagens-errors/download.svg',
      iconUpload: '/imagens-errors/upload.svg',
      iconNa: '/imagens-errors/na.svg',
      iconSucesso: '/imagens-errors/check_circle.svg',
      iconError: '/imagens-errors/error.svg',
      iconErrorInvalid: '/imagens-errors/error_invalid.svg',
      iconErrorVencido: '/imagens-errors/error_denied.svg',
      listImagens: ref([])
    }
  },
  watch: {
    arquivo: {
      handler () {
        if (this.arquivo !== null) {
          this.uploadArquivo()
        }
      }
    }
  },
  mounted () {
    this.buscarArtefatos()
  },
  methods: {
    getClassCard (item) {
      return item.srcDir ? 'content-card-ok' : 'content-card-vencido'
    },
    getIconeCard (item) {
      return item.srcDir ? this.iconSucesso : this.iconErrorVencido
    },
    uparDocumento (imagem) {
      this.imagem = imagem
      this.$refs.arquivoinput.$el.click()
    },
    uploadArquivo () {
      artefatoAnuncioService.uploadArtefato(this.imagem.idArtefato, this.arquivo).then((retorno) => {
        this.$q.notify({ message: 'Upload realizado com sucesso!', color: 'positive', textColor: 'white' })
        this.buscarArtefatos()
      })
    },
    buscarArtefatos () {
      artefatoAnuncioService.getByIdAnuncio(this.$route.params.id).then((retorno) => {
        if (retorno) {
          this.listImagens = []
          this.listImagens = retorno.data
        }
      })
    }
  }
}
</script>
