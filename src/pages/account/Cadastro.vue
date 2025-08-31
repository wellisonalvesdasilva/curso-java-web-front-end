<template>
  <div class="q-pt-lg">
    <div class="text-h6 flex justify-center">
      <p style="font-size: 30px">Cadastre-se</p>
    </div>
  </div>
  <q-card-section>
    <q-form @submit.prevent="cadastrar">
      <div class="row">
        <div class="col-12">
          <q-input label="Nome" v-model="usuario.nome" required></q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-8 q-pr-sm">
          <q-input
            label="E-mail"
            v-model="usuario.email"
            type="email"
            required
          ></q-input>
        </div>
        <div class="col-4">
          <q-input
            label="Whatsapp"
            v-model="usuario.whats"
            mask="## #####-####"
            fill-mask
            unmasked-value
            required
          ></q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-6 q-pr-sm">
          <q-input
            label="Senha"
            type="password"
            v-model="usuario.senha"
            required
          ></q-input>
        </div>
        <div class="col-6">
          <q-input
            label="Confirmação"
            type="password"
            v-model="usuario.confirmacao"
            required
          ></q-input>
        </div>
      </div>

      <div class="row justify-center q-mt-md">
        <q-btn
          type="submit"
          label="Cadastrar"
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
import { useRoute } from 'vue-router'

export default {
  name: 'LoginPage',
  data () {
    return {
      route: useRoute(),
      usuario: ref({
        nome: null,
        email: null,
        whats: null,
        senha: null,
        confirmacao: null
      })
    }
  },
  methods: {
    cadastrar () {
      const avancar = this.validacoes()
      if (avancar) {
        this.usuario.hashAfiliado = this.route.query.afiliado || null
        usuarioService.create(this.usuario).then((retorno) => {
          this.$msg.success('Cadastro realizado! Verifique seu e-mail para ativar e acessar sua conta!')
          this.voltar()
        }).catch(error => {
          this.$msg.apiError('Erro ao criar o usuário!', error)
        })
      }
    },
    voltar () {
      this.$router.push('/account/login')
    },
    validacoes () {
      if (this.usuario.senha !== this.usuario.confirmacao) {
        this.$msg.warning('A confirmação de senha deve ser igual à nova senha informada!')
        return false
      }
      const whats = this.usuario.whats.replace(/\D/g, '')
      if (!/^\d{11}$/.test(whats)) {
        this.$msg.warning('Informe um número de WhatsApp válido com DDD (11 dígitos)!')
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
