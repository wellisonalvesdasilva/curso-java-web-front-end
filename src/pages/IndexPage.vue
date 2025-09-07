<template>
  <div></div>
</template>

<script>
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

export default {
  name: 'IndexPage',

  setup () {
    const $q = useQuasar()
    const router = useRouter()

    const abrirModalCadastro = () => {
      $q.dialog({
        html: true,
        class: 'custom-modal q-pa-md',
        title: `<div class="text-h6 text-weight-bold text-primary flex items-center">
                  <q-icon name="campaign" class="q-mr-sm" size="28px" />
                  Criar Anúncio
                </div>`,
        message: `
          <div class="q-pt-sm text-center">
            <q-icon name="music_note" size="48px" class="text-primary q-mb-sm" />
            <div class="text-body1 q-mb-sm">
              Deseja criar um novo anúncio agora?
            </div>
          <div class="text-caption text-grey-7 texto-aviso">
            Você será redirecionado para o formulário de cadastro.
          </div>
          </div>
        `,
        ok: {
          label: '🎯 Criar agora',
          color: 'primary',
          unelevated: true,
          class: 'q-px-md q-py-sm text-bold full-width text-white shadow-4'
        },
        cancel: {
          label: '❌ Cancelar',
          color: 'grey-5',
          flat: true,
          class: 'q-px-md q-py-sm text-grey-8 full-width'
        },
        persistent: true,
        transitionShow: 'scale',
        transitionHide: 'fade'
      }).onOk(() => {
        router.push('/admin/anuncios/form')
      })
    }

    onMounted(() => {
      abrirModalCadastro()
    })
  }
}
</script>

<style scoped>

.custom-modal {
  max-width: 420px;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #ffffff, #f4f7ff);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

/* Destaque extra para o botão OK */
.custom-modal .q-btn.text-white.shadow-4 {
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(25, 118, 210, 0.7);
}

.texto-aviso {
  color: #37474F;       /* Cor mais escura e mais visível */
  font-weight: 600;     /* Negrito leve */
  opacity: 1;           /* Força opacidade */
  font-size: 0.8rem;    /* Pode aumentar um pouco o tamanho */
  user-select: none;    /* Opcional: não deixa selecionar */
}

</style>
