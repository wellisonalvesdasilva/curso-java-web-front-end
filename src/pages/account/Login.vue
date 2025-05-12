<template>
  <div class="q-pt-lg">
    <div class="text-h6 flex justify-center">
      <p style="font-size: 30px">Login</p>
    </div>
  </div>
  <q-card-section>
    <q-form class="q-gutter-md" @submit.prevent="submitForm">
      <q-input label="E-mail" v-model="login.email"></q-input>
      <q-input label="Senha" type="password" v-model="login.senha"></q-input>
      <div class="q-mt-sm text-right">
        <a @click="esqueciMinhaSenha()" class="text-link"
          >Esqueceu sua senha?</a
        >
      </div>

      <!-- Botão Entrar -->
      <div class="row justify-center">
        <q-btn
          type="submit"
          label="Entrar"
          no-caps
          class="btn-cadastrar q-mt-sm"
        />
      </div>

      <!-- Texto Novo usuário sempre abaixo do botão -->
      <div class="q-mt-lg text-center">
        Novo usuário?
        <a @click="cadastrar()" class="text-link">Cadastre-se.</a>
      </div>
    </q-form>
  </q-card-section>
</template>

<script>
import { usuarioService } from 'src/services/api-service.js'
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
          const toPath = this.$route.query.to || '/admin'
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
    },
    esqueciMinhaSenha () {
      if (!this.login.email) {
        this.$q.notify({
          message: 'O e-mail deve ser informado.',
          color: 'negative',
          textColor: 'white'
        })
        return
      }
      usuarioService.requestPasswordRecovery(this.login.email).then((retorno) => {
        this.$q.notify({
          message: 'Enviamos um link para redefinir sua senha para o e-mail informado.',
          color: 'positive',
          textColor: 'white'
        })
      })
    },
    cadastrar () {
      this.$router.push('/account/cadastro')
    },
    tratamentoAtivacao () {
      const activate = this.$route.params.active || null
      if (activate) {
        usuarioService.activate(activate).then((retorno) => {
          this.$q.notify({ message: 'Usuário ativado com sucesso!', color: 'positive', textColor: 'white' })
          this.$router.push('/account/login')
        })
      }
    }
  },
  mounted () {
    $q = useQuasar()
    this.tratamentoAtivacao()
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
