<template>
  <div>
    <div class="bg main-wrapper">
      <!-- Breadcrumbs e Voltar -->
      <div class="row items-center justify-between q-mb-none">
        <div class="col-auto breadcrumb-container">
          <q-breadcrumbs separator=">" class="q-mb-none" active-color="secondary">
            <q-breadcrumbs-el to="/" label="Início" />
            <q-breadcrumbs-el :label="title" class="breadcrumb-last" />
          </q-breadcrumbs>
        </div>
        <div class="col-auto breadcrumb-container">
          <q-btn
            class="link-voltar q-pr-none"
            icon="chevron_left"
            label="Voltar"
            @click="voltar"
          />
        </div>
      </div>
      <q-form greedy>
        <div class="main-container q-gutter-md">
          <div class="row q-col-gutter-lg q-mt-xs">
            <!-- Imagens + Descrição -->
<div class="col-12 col-md-6">
    <q-card flat bordered class="rounded-borders">
      <q-carousel
        ref="carousel"
        swipeable
        animated
        arrows
        control-color="deep-purple-5"
        v-model="slide"
        infinite
        :height="fullscreen ? '100vh' : '280px'"
        class="rounded-borders"
      >
        <q-carousel-slide
          v-for="(img, index) in anuncio?.srcsDir"
          :key="index"
          :name="index + 1"
          :img-src="img"
        />
        <template v-slot:control>
          <q-carousel-control position="bottom-right" :offset="[18, 18]">
            <q-btn
              push
              round
              dense
              color="white"
              text-color="primary"
              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="toggleFullscreen"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </q-card>

    <q-card flat bordered class="q-mt-md q-pa-md rounded-borders description-card" v-if="!fullscreen">
      <h6 class="description-title">Descrição</h6>
      <p class="description-text">
        {{ anuncio?.descricao || 'Descrição não disponível.' }}
      </p>
    </q-card>
  </div>

            <!-- Informações do Anúncio -->
            <div class="col-12 col-md-6">
              <q-card flat bordered class="q-pa-md rounded-borders">
                <div class="q-mb-sm">
                  <h5 class="titulo-anuncio">{{ anuncio?.titulo || 'Título do Anúncio' }}</h5>
                  <p class="text-caption text-grey-7">
                    Publicado em {{ this.$fmt.dataToDisplay(anuncio?.dataPublicacao) }}
                  </p>
                  <q-badge
                    outline
                    :color="anuncio?.isUsado ? 'deep-purple' : 'purple'"
                    class="q-mt-xs"
                  >
                    {{ anuncio?.isUsado ? "Instrumento Usado" : "Instrumento Novo" }}
                  </q-badge>
                </div>

                <h6 class="valor-destaque q-my-md">
                  R$ {{ anuncio?.valor?.toFixed(2).replace('.', ',') || '0,00' }}
                </h6>

                <q-separator class="q-my-md" />

                <!-- Fale com o vendedor -->
                <div class="seller-section rounded-borders q-pa-md q-mb-md">
                  <div class="row items-center">
                    <div class="col-md-7">
                      <p class="seller-title q-mb-none">Fale com o anunciante:</p>
                    </div>
                    <div class="col-md-5 text-right">
                      <div class="seller-name">{{ anuncio?.vendedor?.nome || 'Nome do Vendedor' }}</div>
                    </div>
                  </div>
                  <q-separator class="q-my-md" />
<div class="row q-col-gutter-sm q-gutter-y-sm justify-between items-center">
  <div v-if="anuncio?.vendedor?.numeroWhatsApp" class="col-12 col-sm-auto">
    <q-btn
      unelevated
      color="green-7"
      icon="mdi-whatsapp"
      label="Enviar WhatsApp"
      :href="`https://wa.me/${anuncio.vendedor.numeroWhatsApp}`"
      target="_blank"
      rel="noopener noreferrer"
      class="full-width-sm"
    />
  </div>

  <div v-if="anuncio?.vendedor?.email" class="col-12 col-sm-auto text-right">
    <q-btn
      outline
      color="primary"
      icon="mdi-email"
      label="Enviar e-mail"
      @click="abrirModalParaEnvioEmail"
      class="full-width-sm"
    />
  </div>
</div>
                </div>

                <!-- Visitas e Localização -->
                <div class="visits-card q-mt-md q-pa-md bg-grey-1 rounded-borders">

                  <div class="visits-item row ">
                    <div class="col-md-10">
                      <p class="q-ma-none"><strong>Visitas neste anúncio:</strong> {{ anuncio?.quantidadeAcesso }}</p>
                    </div>
                  </div>

                  <q-separator class="q-my-sm" />

                  <div class="location-info">
                    <div class="row items-center q-mb-xs">
                      <div class="col-md-10">
                        <p class="q-ma-none"><strong>Localização</strong></p>
                      </div>
                      <div class="col-md-2 text-right">
                        <q-icon name="mdi-map-marker" color="primary" size="20px" />
                      </div>
                    </div>

                    <div class="row location-row q-mb-xs items-center">
                      <q-icon name="mdi-city" color="primary" size="18px" class="q-mr-sm" />
                      <div class="col">Cidade</div>
                      <div class="col text-right">{{ anuncio?.municipio }}</div>
                    </div>

                    <div class="row location-row items-center">
                      <q-icon name="mdi-flag" color="primary" size="18px" class="q-mr-sm" />
                      <div class="col">Estado</div>
                      <div class="col text-right">{{ anuncio?.uf }}</div>
                    </div>

                  </div>
                </div>

              </q-card>
            </div>
          </div>

          <!-- Aviso -->
          <q-card flat bordered class="aviso-card q-mt-lg rounded-borders q-mb-lg">
            <div class="row items-start no-wrap q-gutter-sm">
              <q-icon
                name="mdi-alert-circle-outline"
                size="28px"
                class="aviso-icon"
              />
              <p class="aviso-text">
                <strong>Aviso:</strong> O Mercado Instrumental é uma plataforma de divulgação de anúncios entre particulares.
                Não somos proprietários dos produtos anunciados.
                A negociação, pagamento e entrega dos itens são de responsabilidade exclusiva entre compradores e vendedores.
                Ao utilizar esta plataforma, o usuário assume integralmente todos os riscos envolvidos.
              </p>
            </div>
          </q-card>
        </div>
      </q-form>
    </div>
  </div>

<q-dialog v-model="exibirModalEnviarEmail">

  <q-card
    class="q-px-md modal-sm"
    style="min-width: 60%; max-height: 85vh; display: flex; flex-direction: column;">
<q-form greedy ref="form" @submit="confirmarDisparoEmail()">
<q-card-section class="row items-center justify-between">
  <div class="text-h6 text-weight-bold">Enviar Mensagem</div>
  <q-btn icon="close" flat round dense v-close-popup />
</q-card-section>
    <div class="divisor-line"></div>
    <q-card-section
      style="font-size: 14px; overflow-y: hidden; flex-grow: 1; padding-top: 0;">
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-xs-12 col-sm-12  q-mt-md">
        <q-input
          stack-label
          dense
          :rules="[vRequired]"
          v-model="filtro.nome"
          label="Seu nome">
          <template v-slot:label>
            <span class="input-label">Seu nome</span>
          </template>
        </q-input>
      </div>
      <div class="col-xs-8 col-sm-9">
        <q-input
          stack-label
          :rules="[vRequired]"
          dense
          label="Seu e-mail"
          v-model="filtro.email">
          <template v-slot:label>
            <span class="input-label">Seu e-mail</span>
          </template>
        </q-input>
      </div>
        <div class="col-xs-4 col-sm-3">
<q-input
  stack-label
  dense
  label="Whatsapp"
  :rules="[vRequired]"
  v-model="filtro.whats"
  mask="## #####-####"
  fill-mask
  unmasked-value
  required
>
  <template v-slot:label>
    <span class="input-label">Whatsapp</span>
  </template>
</q-input>

        </div>
      <div class="col-xs-12 col-sm-12">
        <q-input
          :rules="[vRequired]"
          stack-label
          dense maxlength="4000"
          autogrow
          v-model="filtro.mensagem"
          label="Mensagem"
          class="custom-textarea"
        >
          <template v-slot:label>
                <span class="input-label">Mensagem </span>
              </template>
        </q-input>
      </div>
    </div>
    </q-card-section>
<div class="row q-mt-md">
  <div class="col-12">
    <div
      class="btn-container"
      style="display: flex; justify-content: flex-end;"
    >
      <q-btn
        type="submit"
        label="Enviar"
        icon="outgoing_mail"
        no-caps
        class="btn-cadastrar"
        style="min-width: 120px;"
      />
    </div>
  </div>
</div>

    </q-form>
  </q-card>
</q-dialog>

</template>

<script>
import { anuncioSiteService } from 'src/services/api-service.js'
import { ref } from 'vue'

export default {
  name: 'GridIndex',
  data () {
    return {
      title: 'Visualizar Anúncio',
      slide: 1,
      fullscreen: false,
      anuncio: null,
      exibirModalEnviarEmail: ref(false),
      filtro: ref({
        nome: null,
        email: null,
        whats: null,
        mensagem: null
      })
    }
  },
  mounted () {
    this.detalharAnuncio()
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        this.fullscreen = false
      }
    })
  },
  methods: {
    async toggleFullscreen () {
      const carouselEl = this.$refs.carousel.$el

      if (!this.fullscreen) {
        // Tenta entrar em fullscreen usando a Fullscreen API
        if (carouselEl.requestFullscreen) {
          try {
            await carouselEl.requestFullscreen()
            this.fullscreen = true
          } catch (err) {
            console.error('Erro ao entrar em fullscreen:', err)
            this.fullscreen = true // fallback visual, mesmo sem fullscreen nativo
          }
        } else {
          // Se não suportar fullscreen nativo, apenas ativa o fullscreen visual
          this.fullscreen = true
        }
      } else {
        // Sai do fullscreen
        if (document.fullscreenElement) {
          await document.exitFullscreen()
        }
        this.fullscreen = false
      }
    },
    abrirModalParaEnvioEmail () {
      this.resetDto()
      this.exibirModalEnviarEmail = true
    },
    confirmarDisparoEmail () {
      this.$refs.form.validate().then(isValid => {
        if (!isValid) return
        anuncioSiteService.envioEmail(this.filtro, this.$route.params.id)
          .then(response => {
            this.$msg.success('E-mail enviado com sucesso!')
          }).catch(error => {
            this.$msg.apiError('Erro ao cadastrar/atualizar!', error)
          })
      })
    },
    voltar () {
      this.$router.go(-1)
    },
    detalharAnuncio () {
      const id = this.$route.params.id
      anuncioSiteService
        .getById(id)
        .then((response) => {
          this.anuncio = response.data
        })
        .catch((error) => {
          this.$msg.apiError('Erro ao detalhar o anúncio!', error)
        })
    },
    formatAnuncianteDesde (dataCadastro) {
      if (!dataCadastro) return null
      const date = new Date(dataCadastro)
      const options = { year: 'numeric', month: 'long' }
      return date.toLocaleDateString('pt-BR', options)
    },
    resetDto () {
      this.filtro.nome = null
      this.filtro.email = null
      this.filtro.whats = null
      this.filtro.mensagem = null
    }
  }
}
</script>

<style scoped>

@media (max-width: 600px) {
  .btn-container {
    justify-content: center !important; /* centraliza o botão no mobile, opcional */
  }
  .btn-container > .btn-cadastrar {
    width: 100% !important; /* botão ocupa toda largura na tela pequena */
    min-width: unset !important; /* remove largura mínima para não forçar tamanho */
  }
}

/* Layout geral */
.main-wrapper {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: #333;
}

/* Título */
.titulo-anuncio {
  font-weight: 700;
  font-size: 1.8rem;
  color: #512da8;
  margin-bottom: 0.5rem;
}

/* Valor */
.valor-destaque {
  font-size: 2rem;
  font-weight: 800;
  color: #7e57c2;
  margin: 0.5rem 0;
}

/* Descrição */
.description-card {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 1rem;
  border: none;
}

.description-title {
  font-weight: 600;
  font-size: 1.2rem;
  color: #5e35b1;
  margin-bottom: 0.4rem;
}

.description-text {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

/* Seção vendedor */
.seller-section {
  background: #f5f0fa;
  border: none;
  padding: 1rem;
  border-radius: 10px;
}

.seller-title {
  font-size: 1rem;
  font-weight: 600;
  color: #6a1b9a;
  margin-bottom: 0.2rem;
}

.seller-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #512da8;
}

.contact-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

/* Botões */
.q-btn.full-width {
  width: 100%;
}

/* Visitas e localização */
.visits-card {
  background: #f5f0fa;
  border-radius: 10px;
  padding: 1rem;
  border: none;
  color: #4a148c;
}

.visits-item p {
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
}

.location-info p {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
}

.location-row {
  font-size: 1rem;
  margin-bottom: 0.3rem;
}

.location-row div:first-child {
  font-weight: 600;
  color: #6a1b9a;
}

.location-row div:last-child {
  font-weight: 500;
  color: #7e57c2;
  text-align: right;
}

/* Aviso */
.aviso-card {
  border-left: 4px solid #ff9800;
  background: #fff8e1;
  color: #5d4037;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  gap: 0.8rem;
}

.aviso-icon {
  color: #f57c00 !important;
  margin-top: 3px;
}

.aviso-text {
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Carousel - setas roxas */
.q-carousel__control--arrow {
  color: #7e57c2 !important;
}

.q-carousel__control--arrow svg {
  fill: #7e57c2 !important;
}

/* Responsividade */

/* Ajuste geral do container */
.main-container {
  max-width: 100% !important;
  padding: 0 1rem;
}

/* Tablet e telas médias */
@media (max-width: 991px) {
  .main-container .row {
    flex-wrap: wrap;
  }
  .col-md-6 {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
  .location-row div {
    text-align: left !important;
  }
  /* Carousel menor em tablet */
  .q-carousel {
    height: 200px !important;
  }
  /* Ajuste nos botões para ocupar largura total */
  .seller-section .q-btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .seller-section .row.justify-between {
    flex-direction: column;
    align-items: stretch;
  }
}

/* Celular e telas pequenas */
@media (max-width: 576px) {
  .q-carousel {
    height: 160px !important;
  }
  .titulo-anuncio {
    font-size: 1.4rem;
  }
  .valor-destaque {
    font-size: 1.5rem;
  }
  .description-text {
    font-size: 0.9rem;
  }
  .seller-title,
  .seller-name {
    font-size: 1rem;
  }
  .visits-card {
    padding: 0.5rem !important;
  }
  .aviso-text {
    font-size: 0.85rem;
  }
  /* Botões de contato ficam full width */
  .full-width-sm {
    width: 100% !important;
  }
}

.q-carousel.rounded-borders.fullscreen {
  width: 100vw !important;
  height: 100vh !important;
  max-height: 100vh !important;
}

/* No fullscreen escondemos a descrição para otimizar espaço */
.description-card {
  display: block;
}

.description-card[style*="display: none"] {
  display: none !important;
}

/* Para evitar overflow no body quando fullscreen */
body.fullscreen {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  position: fixed;
}

/* Carousel controla o fullscreen button - mantém estilização roxa */
.q-carousel__control--arrow {
  color: #7e57c2 !important;
}

.q-carousel__control--arrow svg {
  fill: #7e57c2 !important;
}

</style>
