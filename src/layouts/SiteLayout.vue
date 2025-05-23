<template>
  <q-layout view="hHh LpR lfr">
    <q-header elevated class="header">
      <q-toolbar class="q-gutter-sm q-px-md q-py-sm flex items-center">
        <!-- Menu hambúrguer + logo -->
        <q-btn
          dense
          flat
          round
          v-if="isSmallScreen"
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <router-link to="/" class="header-logo-container q-mx-sm" style="margin-right: 32px;">
          <q-avatar class="responsive-logo">
            <img src="../assets/img/logo-mercado-instrumental-site.jpg" alt="Logo" />
          </q-avatar>
        </router-link>
        <q-input
          dense
          outlined
          debounce="300"
          placeholder="Digite o que você procura..."
          v-model="buscaGeral"
          class="q-mx-md"
          style="width: 100%; max-width: 250px; background-color: white; border-radius: 4px;"
          clearable
          @keyup.enter="executarBusca"
          :rules="[val => val.length >= 0 || 'Digite algo para buscar']"
        >
          <template v-slot:append>
            <q-icon name="search" @click="executarBusca" class="cursor-pointer" />
          </template>
        </q-input>

        <q-btn
            flat
            dense
            class="q-mr-md text-capitalize"
            icon="policy"
            label="Busca Detalhada"
          />
        <!-- Mostrar botões normais apenas se NÃO for tela pequena -->
        <template v-if="!isSmallScreen">
          <!-- <q-btn
            flat
            dense
            class="q-mr-xs text-capitalize"
            icon="expand_more"
            label="Categorias"
          >
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 150px">
                <q-item clickable @click="irParaSobre">
                  <q-item-section>Sobre nós</q-item-section>
                </q-item>
                <q-item clickable @click="irParaContato">
                  <q-item-section>Contato</q-item-section>
                </q-item>
                <q-item clickable @click="irParaAjuda">
                  <q-item-section>Ajuda</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn
            flat
            dense
            class="q-mr-xs text-capitalize"
            icon="expand_more"
            label="Marcas"
          >
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 150px">
                <q-item clickable @click="irParaSobre">
                  <q-item-section>Sobre nós</q-item-section>
                </q-item>
                <q-item clickable @click="irParaContato">
                  <q-item-section>Contato</q-item-section>
                </q-item>
                <q-item clickable @click="irParaAjuda">
                  <q-item-section>Ajuda</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn> -->
        </template>
        <q-space />
          <q-btn
            flat
            dense
            @click="irParaAreaAnunciante"
            class="q-mr-xs text-capitalize"
            icon="post_add"
            label="Publicar Anúncio"
          >
          </q-btn>
          <q-btn
            flat
            dense
            class="q-mr-xs text-capitalize"
            icon="account_circle"
            label="Conta"
            @click="irParaAreaAnunciante"
          >
            <!-- <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 150px">
                <q-item clickable @click="irParaSobre">
                  <q-item-section>Login</q-item-section>
                </q-item>
                <q-item clickable @click="irParaContato">
                  <q-item-section>Cadastro</q-item-section>
                </q-item>
              </q-list>
            </q-menu> -->
          </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Menu lateral com as opções para telas pequenas -->
<!-- Menu lateral com as opções para telas pequenas -->
<q-drawer v-if="isSmallScreen" v-model="leftDrawerOpen" side="left" bordered>
  <q-list>
    <q-item-label header>Menu</q-item-label>
    <q-expansion-item label="Categorias" icon="category" dense>
      <q-list>
        <q-item clickable @click="irParaSobre">
          <q-item-section>Sobre nós</q-item-section>
        </q-item>
        <q-item clickable @click="irParaContato">
          <q-item-section>Contato</q-item-section>
        </q-item>
        <q-item clickable @click="irParaAjuda">
          <q-item-section>Ajuda</q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
    <q-expansion-item label="Marcas" icon="branding_watermark" dense>
      <q-list>
        <q-item clickable @click="irParaSobre">
          <q-item-section>Sobre nós</q-item-section>
        </q-item>
        <q-item clickable @click="irParaContato">
          <q-item-section>Contato</q-item-section>
        </q-item>
        <q-item clickable @click="irParaAjuda">
          <q-item-section>Ajuda</q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
    <q-item clickable @click="abrirBuscaDetalhada" icon="search">
      <q-item-section>Busca Detalhada</q-item-section>
    </q-item>
  </q-list>
</q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
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
import { ref, inject } from 'vue'
import { MENU } from '../mock/menu.mock'
import { useQuasar } from 'quasar'
import vClickOutside from 'click-outside-vue3'
import { mapGetters } from 'vuex'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  computed: {
    isSmallScreen () {
      return this.$q.screen.lt.md
    },
    ...mapGetters('auth', ['isAuthenticated', 'getMe'])
  },
  mounted () {
    this.filtrarMenusPrincipais()
  },
  methods: {
    executarBusca () {},
    irParaCadastro () {
      this.$router.push('/account/cadastro')
    },
    irParaAreaAnunciante () {
      if (!this.isAuthenticated) {
        this.$router.push('/account/login')
      } else {
        this.$router.push('/admin/anuncios')
      }
    },
    irParaHome: function () {
      this.fechartudo()
      this.$router.push('/admin')
      this.handleShow(null)
    },
    onClickOutside (event) {
      this.fechartudo()
      this.miniMode = true
    },
    isUsuarioTemAcesso (item) {
      if (!item.transacao) {
        return false
      }
      return true
    },
    atualizarMenu () {
      this.expansionItems.forEach((item, index) => {
        if (item.label !== this.menuPrincipal) {
          item.hide()
        } else {
          this.expansionItemsSubMenu.forEach((item, index) => {
            if (item.label !== this.subMenu) {
              item.hide()
            }
          })
        }
      })
    },
    menuPrincipalShow (key) {
      this.menuPrincipal = key
      this.subMenu = null
      this.atualizarMenu()
    },
    subMenuShow (key) {
      this.subMenu = key
      this.atualizarMenu()
    },
    fechartudo () {
      this.menuPrincipal = null
      this.subMenu = null
      this.atualizarMenu()
    },
    filtrarMenusItens (todosItens) {
      const itens = []
      todosItens.forEach((item) => {
        if (this.isUsuarioTemAcesso(item)) {
          itens.push(item)
        }
      })
      return itens
    },
    filtrarMenusPrincipais () {
      this.menus = []
      MENU.forEach((item) => {
        if (item.items) {
          item.itens = this.filtrarMenusItens(item.items)
          if (item.itens.length > 0) {
            this.menus.push(item)
            return
          }
        }
        if (item.expansionItem) {
          item.expansionItem.forEach((itExp) => {
            itExp.subMenu = this.filtrarMenusItens(itExp.subMenu)
          })
          const teste = item.expansionItem.filter(
            (itExp) => itExp.subMenu.length > 0
          )
          if (teste.length > 0) {
            item.expansionItem = teste
            this.menus.push(item)
          }
        }
      })
    }
  },
  setup () {
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const habilitaMenu = ref(true)
    const miniMode = ref(true)
    const rotaHome = '/'
    return {
      anuncios: ref([]),
      rotaHome,
      menuPrincipal: ref(null),
      subMenu: ref(null),
      itensmenu: ref(null),
      expansionItems: ref([]),
      expansionItemsSubMenu: ref([]),
      leftDrawerOpen,
      habilitaMenu,
      miniMode,
      securityState: inject('securityState'),
      drawer: ref(false),
      drawerClick (e) {
        if (miniMode.value) {
          miniMode.value = false
          rightDrawerOpen.value = false
          e.stopPropagation()
        }
      },
      link: ref('inbox'),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
        if ($q.screen.lt.md) {
          miniMode.value = false
          habilitaMenu.value = !habilitaMenu.value
        } else {
          habilitaMenu.value = true
          miniMode.value = !miniMode.value
        }
      },
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
        miniMode.value = true
      },
      toggleRightClose () {
        rightDrawerOpen.value = false
      },
      menus: ref([]),
      mainMenu: MENU,
      funcionarioBanco: ref(null)
    }
  }
}

</script>
<style>
.responsive-logo {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.responsive-logo img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

@media (max-width: 600px) {
  .header-logo-container {
    max-width: 150px;
  }

  .header span {
    font-size: 12px;
  }

  .hidden-xs {
    display: none !important;
  }
}

.q-btn span {
    text-transform: none !important;
  }

.q-field--with-bottom {
padding-bottom: 0px
}

</style>
