<template>
  <div class="q-pt-lg">
    <div class="text-h6 flex justify-center">
      <p style="font-size: 30px">Recuperar senha</p>
    </div>
  </div>
  <q-card-section>
    <q-form @submit.prevent="recuperar">
      <div class="row">
        <div class="col-12 q-pr-sm">
          <q-input
            label="Palavra passe"
            disable
            v-model="chave"
            type="email"
            required
          ></q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-6 q-pr-sm">
          <q-input
            label="Senha"
            type="password"
            v-model="senha"
            required
          ></q-input>
        </div>
        <div class="col-6">
          <q-input
            label="Confirmação"
            type="password"
            v-model="confirmacao"
            required
          ></q-input>
        </div>
      </div>
      <div class="row justify-center q-mt-md">
        <q-btn
          type="submit"
          label="Confirmar"
          no-caps
          class="btn-cadastrar q-mt-sm"
        />
      </div>
      <div class="q-mt-lg text-center">
        Já tem uma conta?
        <a @click="voltar" class="text-link">Iniciar sessão</a>
      </div>
    </q-form>
  </q-card-section>
</template>

<script>
import { usuarioService } from 'src/services/api-service.js'
import { ref } from 'vue'

export default {
  name: 'LoginPage',
  data () {
    return {
      senha: ref(null),
      confirmacao: ref(null),
      chave: ref(null)
    }
  },
  mounted () {
    this.chave = this.$route.params.chave
  },
  methods: {
    recuperar () {
      const avancar = this.validacoes()
      if (avancar) {
        usuarioService.confirmacaoRecuperacaoSenha(this.senha, this.chave).then((retorno) => {
          this.$q.notify({ message: 'Sua senha foi atualizada com sucesso. Por favor, faça login novamente.', color: 'positive', textColor: 'white' })
          this.voltar()
        })
      }
    },
    voltar () {
      this.$router.push('/account/login')
    },
    validacoes () {
      if (this.senha !== this.confirmacao) {
        this.$q.notify({
          message: 'A confirmação de senha deve ser igual à senha.',
          color: 'negative',
          textColor: 'white'
        })
        return false
      }
      return true
    }
  }
}

</script>
<style scoped>
.text-link {
  color: #1e88e5;
  text-decoration: none;
  font-size: 14px;
}

.text-link:hover {
  text-decoration: underline; /* Adiciona o sublinhado ao passar o mouse */
}
</style>
