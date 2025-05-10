<template>
  <q-layout class="no-scroll" view="hHh LpR lfr">
    <!-- Centralização vertical do conteúdo -->
    <div class="q-pa-none row items-center justify-center" style="min-height: calc(100vh - 64px);">
      <q-page-container class="col-12 col-sm-8 col-md-4 q-mt-lg">
        <q-card class="q-pa-lg">
          <q-card-section>
            <q-toolbar-title class="header justify-center">
                <q-avatar
                  style="height: 48px; width: 220px; border-radius: 8px">
                  <img
                    src="../assets/img/logo-mercado-instrumental.jpg"
                    style="height: 100%; width: 100%; object-fit: contain"
                  />
                </q-avatar>
            </q-toolbar-title>
            <div class="q-pt-lg">
              <div class="text-h6 flex justify-center">
                <p style="font-size: 30px">Login</p>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit.prevent="submitForm">
              <q-input label="E-mail" v-model="login.email"></q-input>
              <q-input label="Senha" type="password" v-model="login.senha"></q-input>
              <div class="q-mt-sm text-right">
                 <a href="#" class="text-link">Esqueceu sua senha?</a>
              </div>

              <!-- Botão Entrar -->
              <div class="row justify-center">
                <q-btn type="submit" label="Entrar" no-caps class="btn-cadastrar q-mt-sm" />
              </div>

              <!-- Texto Novo usuário sempre abaixo do botão -->
              <div class="q-mt-lg text-center">
                Novo usuário?
                <a href="#" class="text-link">Cadastre-se.</a>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page-container>
    </div>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle2 text-center">
          Desenvolvido por WAS Software LTDA.
        </q-toolbar-title>
        <div class="text-caption float-right">
          <div>Versão 1.0</div>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style src="../assets/scss/global.scss" lang="scss" />
<style lang="scss" scoped></style>
<script>
import { useQuasar } from 'quasar'
import { mapActions } from 'vuex'

let $q

export default {
  name: 'LoginPage',
  data () {
    return {
      login: {
        email: null,
        senha: null
      }
    }
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
    async submitForm () {
      if (!this.login.email || !this.login.senha) {
        $q.notify({
          type: 'negative',
          message: 'Usuário e/ou senha estão incorretos.'
        })
      } else if (this.login.senha.length < 3) {
        $q.notify({
          type: 'negative',
          message: 'A senha deve ter 3 ou mais caracteres.'
        })
      } else {
        try {
          await this.doLogin(this.login)
          const toPath = this.$route.query.to || '/'
          this.$router.push(toPath)
        } catch (err) {
          if (err.response.data.message) {
            $q.notify({
              type: 'negative',
              message: err.response.data.message
            })
          }
        }
      }
    }
  },
  mounted () {
    $q = useQuasar()
  }
}
</script>
<style scoped>
.text-link {
  color: #1e88e5;
  text-decoration: none;
  font-size: 14px
}

.text-link:hover {
  text-decoration: underline; /* Adiciona o sublinhado ao passar o mouse */
}
</style>
