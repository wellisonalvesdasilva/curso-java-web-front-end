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
          @click="carregarImagem(item)"
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

  <q-dialog v-model="modalVisualizarImagem" persistent>
    <q-card class="q-px-md modal-sm" style="min-width: 60%">
      <q-card-section class="modal-title-container-left">
        <h5>{{ 'Visualizar Imagem - ' + this.imagemEmVisualizacao?.titulo + '' + (this.imagemEmVisualizacao?.titulo == 1 ? ' (Capa)' : '')  }}</h5>
      </q-card-section>
      <div class="divisor-line" style="margin-top: 3px;"></div>
      <hr class="separadorModal"/>
          <q-card-section style="max-height: 70vh; overflow: auto;">
            <div v-if="imagemEmVisualizacao" class="flex flex-center">
              <img
                :src="'data:image/' + imagemEmVisualizacao.headers + ';base64,' + imagemEmVisualizacao.base64"
                alt="Imagem carregada"
                style="max-width: 100%; max-height: 100%"
              />
            </div>
          </q-card-section>
          <div class="row q-mt-md" style="width: 100%">
            <div class="col-12">
              <div class="btn-container-right">
                <q-btn class="btn-cancelar" label="Fechar" @click="fecharModal()"/>
              </div>
            </div>
          </div>
    </q-card>
  </q-dialog>

</template>
<script>
import { ref } from 'vue'
import { artefatoAnuncioService } from 'src/services/api-service.js'
export default {
  data () {
    return {
      arquivo: ref(null),
      imagemEmVisualizacao: ref(null),
      imagem: ref(null),
      iconExcluir: 'icons-geral/excluir.svg',
      iconDownload: '/imagens-errors/download.svg',
      iconUpload: '/imagens-errors/upload.svg',
      iconNa: '/imagens-errors/na.svg',
      iconSucesso: '/imagens-errors/check_circle.svg',
      iconError: '/imagens-errors/error.svg',
      iconErrorInvalid: '/imagens-errors/error_invalid.svg',
      iconErrorVencido: '/imagens-errors/error_denied.svg',
      listImagens: ref([]),
      modalVisualizarImagem: ref(false)
    }
  },
  props: {
    idAnuncio: {
      type: Object,
      default: () => null
    }
  },
  watch: {
    arquivo: {
      handler () {
        if (this.arquivo !== null) {
          this.uploadArquivo()
        }
      }
    },
    idAnuncio: {
      handler () {
        this.buscarArtefatos()
      }
    }
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
        this.arquivo = null
        this.buscarArtefatos()
      })
    },
    buscarArtefatos () {
      artefatoAnuncioService.getByIdAnuncio(this.idAnuncio).then((retorno) => {
        if (retorno) {
          this.listImagens = []
          this.listImagens = retorno.data
        }
      })
    },
    carregarImagem (item) {
      artefatoAnuncioService.downloadArtefato(item.idArtefato).then((retorno) => {
        this.imagemEmVisualizacao = retorno.data
        this.imagemEmVisualizacao.titulo = item.numero
        this.modalVisualizarImagem = true
      })
    },
    fecharModal () {
      this.modalVisualizarImagem = false
    }
  },
  mounted () {
    debugger
    this.buscarArtefatos()
  }
}
</script>
