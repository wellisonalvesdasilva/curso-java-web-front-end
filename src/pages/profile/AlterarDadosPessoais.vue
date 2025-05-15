<template>
  <div>
    <div class="bg">
      <div class="row items-center justify-between q-mb-none">
        <div class="col-auto breadcrumb-container">
          <q-breadcrumbs
            separator=">"
            class="q-mb-none"
            active-color="secondary">
            <q-breadcrumbs-el label="Usuário" />
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
      <q-form greedy ref="formPessoa">
        <div class="main-container">
          <div class="flex justify-between items-center q-mb-sm">
            <h2 class="title-text">{{ title }}</h2>
            <q-space />
          </div>
          <div class="divisor-line"></div>
          <div class="q-pa-md">
            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-6">
                <q-input
                  stack-label
                  dense
                  disable
                  maxlength="255"
                  :rules="[vRequired]"
                  v-model="usuario.nome"
                  label="Parecer de aprovação"
                  class="custom-textarea"
                >
                  <template v-slot:label>
                    <span class="input-label">Nome</span>
                  </template>
                </q-input>
              </div>
              <div class="col-4">
                <q-input
                  stack-label
                  dense
                  maxlength="255"
                  :rules="[vRequired]"
                  v-model="usuario.email"
                  disable
                  label="E-mail"
                  class="custom-textarea"
                >
                  <template v-slot:label>
                    <span class="input-label">E-mail</span>
                  </template>
                </q-input>
              </div>
              <div class="col-2">
                <q-input
                  stack-label
                  dense
                  maxlength="255"
                  :rules="[vRequired]"
                  v-model="usuario.whatsapp"
                  mask="## #####-####"
                  disable
                  label="E-mail"
                  class="custom-textarea"
                >
                  <template v-slot:label>
                    <span class="input-label">Whatsapp</span>
                  </template>
                </q-input>
              </div>
              <div class="col-3">
                <q-input
                  stack-label
                  dense
                  maxlength="255"
                  type="password"
                  :rules="[vRequired]"
                  v-model="senhaAtual"
                  label="E-mail"
                  class="custom-textarea">
                  <template v-slot:label>
                    <span class="input-label">Senha atual</span>
                  </template>
                </q-input>
              </div>
              <div class="col-3">
                <q-input
                  stack-label
                  dense
                  maxlength="255"
                  type="password"
                  :rules="[vRequired]"
                  v-model="senha"
                  label="E-mail"
                  class="custom-textarea">
                  <template v-slot:label>
                    <span class="input-label">Nova Senha</span>
                  </template>
                </q-input>
              </div>
              <div class="col-3">
                <q-input
                  stack-label
                  dense
                  maxlength="255"
                  type="password"
                  :rules="[vRequired]"
                  v-model="confirmacao"
                  label="E-mail"
                  class="custom-textarea">
                  <template v-slot:label>
                    <span class="input-label">Confirmação</span>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-12">
              <div style="float: right">
                <q-btn
                  @click="voltar"
                  style="margin-right: 10px"
                  label="Voltar"
                  no-caps
                  class="btn-voltar"
                />
                <q-btn
                  @click="atualizar()"
                  type="button"
                  label="Atualizar"
                  no-caps
                  class="btn-cadastrar"
                />
              </div>
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { usuarioInternoService } from 'src/services/api-service.js'

export default {
  name: 'AlterarDadosPessoais',
  setup () {
    return {
      title: ref('Suas Informações'),
      usuario: ref({
      }),
      senhaAtual: ref(null),
      senha: ref(null),
      confirmacao: ref(null)
    }
  },
  mounted () {
    this.buscarDadosUsuarioLogado()
  },
  methods: {
    buscarDadosUsuarioLogado () {
      usuarioInternoService.findDadosUsuarioLogado().then((retorno) => {
        this.usuario = retorno.data
      })
    },
    async atualizar () {
      const isValid = await this.$refs.formPessoa.validate()
      if (!isValid) return

      if (this.senha !== this.confirmacao) {
        this.$msg.warning('A confirmação de senha deve ser igual à nova senha informada!')
      } else {
        usuarioInternoService.updatePassword(this.senhaAtual, this.senha).then((retorno) => {
          this.$msg.success('Você alterou sua senha com sucesso. Por segurança, realize o login novamente.')
          this.$store.dispatch('auth/signOut')
          this.$router.push('/account/login')
        }).catch(error => {
          this.$msg.apiError('Falha ao salvar o anúncio!', error)
        })
      }
    },
    voltar () {
      this.$router.push('/admin/anuncios')
    }
  }
}
</script>
