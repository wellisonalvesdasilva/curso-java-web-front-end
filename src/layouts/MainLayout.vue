<template class="no-scroll">
  <q-layout class="no-scroll" view="hHh LpR lfr">
    <q-header elevated class="header">
      <q-toolbar class="flex items-center justify-between">
        <div class="row items-center">
          <q-btn dense flat round v-if="isSmallScreen" icon="menu" @click="toggleLeftDrawer" />

          <router-link class="header-logo-container" to="/admin">
            <q-avatar class="responsive-logo">
              <img src="../assets/img/logo-mercado-instrumental.jpg" alt="Logo" />
            </q-avatar>
            <div style="display: none;">VERSÃO SPRINT 75 - PBI 2195 - 2024-03-07 17:40</div>
          </router-link>
        </div>

        <div class="row items-center">
          <div class="q-mr-md" v-if="isAuthenticated">
            <span class="text-caption hidden-xs hidden-sm">Bem vindo, <b>{{ getMe?.nome?.toUpperCase() }}</b>!</span>
          </div>

          <q-btn stretch flat to="/account/login" v-if="!isAuthenticated" class="q-mr-sm">
            Entrar
          </q-btn>

          <q-btn
            padding="10px"
            stretch
            flat
            icon="person"
            class="q-ml-sm"
            @click="toggleRightDrawer"
            v-click-outside="toggleRightClose"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-click-outside="onClickOutside" show-if-above v-model="habilitaMenu" side="left" :mini="miniMode"
      @click.capture="drawerClick" @mouseover="miniState = false" @mouseout="miniState = true"
      class="sidebar-drawer sidebar-text">
      <q-scroll-area class="fit">
        <q-list padding class="rounded-borders">
          <q-item @click="irParaHome" class="sidebar-itemlvl1" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="img:/icons-menu/icon-home.svg" />
            </q-item-section>
            <q-item-section>
              Ir para o Site
            </q-item-section>
          </q-item>

          <q-expansion-item v-for="(item, key) in menus" :key="key" :label="item.label" :default-opened="false"
            :icon="item.icon" :to="item.to" expand-separator class="sidebar-expansionlvl1" ref="expansionItems"
            @click="menuPrincipalShow(item.label)">
            <div v-if="item.items">
              <div v-for="(item, key) in item.items" :key="key">
                <q-item :inset-level="2" clickable v-close-popup v-ripple :to="item.to" class="sidebar-itemlvl2" :disable="item.disable">
                  <q-item-section>{{ item.label }}</q-item-section>
                </q-item>
              </div>
            </div>
            <q-expansion-item v-for="(expansionItem, key) in item.expansionItem" :key="key" :header-inset-level="1"
              :label="expansionItem.label" class="sidebar-expansionlvl2" ref="expansionItemsSubMenu"
              @click="subMenuShow(expansionItem.label)">
              <div v-for="(subMenu, key) in expansionItem.subMenu" :key="key">
                <q-item :inset-level="2" clickable v-close-popup v-ripple :to="subMenu.to">
                  <q-item-section>{{ subMenu.label }}</q-item-section>
                </q-item>
              </div>
            </q-expansion-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>

      <div class="q-mini-drawer-hide absolute botao-menu">
        <q-btn dense round unelevated size="md" icon="chevron_left" @click="miniMode = true" />
      </div>
      <div class="q-mini-drawer-only absolute botao-menu">
        <q-btn dense round unelevated size="md" icon="chevron_right" @click="miniMode = false" />
      </div>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>
            <q-item-section @click="alterarDadosPessoais()">
              Meu Perfil
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="logout()">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
              Sair
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold text-primary">{{ getMe?.nome }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-9 text-white">
      <q-toolbar class="q-pa-sm justify-center items-center">
        <div class="text-caption text-center">
          <strong>Versão 1.0.0.0 de 09/06/2025</strong>
        </div>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<style src="../assets/scss/global.scss" lang='scss' />
<style lang="scss" scoped></style>

<script>
import { ref } from 'vue'
import { MENU } from '../mock/menu.mock'
import { useQuasar } from 'quasar'
import vClickOutside from 'click-outside-vue3'
import { mapGetters } from 'vuex'
import securityState from '../utils/securityState'

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
    this.obterFuncionarioBanco()
  },
  methods: {
    alterarDadosPessoais () {
      this.$router.push('/admin/profile')
    },
    logout () {
      this.$store.dispatch('auth/signOut')
      this.$router.push('/account/login')
    },
    obterFuncionarioBanco () {
      console.log('teste')
    },
    irParaHome () {
      this.$router.push('/')
    },
    onClickOutside () {
      this.fechartudo()
      this.miniMode = true
    },
    isUsuarioTemAcesso (item) {
      return securityState.hasTransaction(item.transacao)
    },
    atualizarMenu () {
      this.expansionItems.forEach((item) => {
        if (item.label !== this.menuPrincipal) {
          item.hide()
        } else {
          this.expansionItemsSubMenu.forEach((item) => {
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
      return todosItens.filter(item => this.isUsuarioTemAcesso(item))
    },
    filtrarMenusPrincipais () {
      this.menus = []

      MENU.forEach(item => {
        const novoItem = { ...item } // clonar objeto original superficialmente

        // Se tiver itens diretos (nível 2)
        if (novoItem.items) {
          const itensFiltrados = this.filtrarMenusItens(novoItem.items)
          if (itensFiltrados.length > 0) {
            novoItem.items = itensFiltrados
            this.menus.push(novoItem)
            return
          }
        }

        // Se tiver expansionItems (nível 2 com submenu)
        if (novoItem.expansionItem) {
          const expansionFiltrada = []

          novoItem.expansionItem.forEach(itExp => {
            const subMenuFiltrado = this.filtrarMenusItens(itExp.subMenu || [])
            if (subMenuFiltrado.length > 0) {
              expansionFiltrada.push({
                ...itExp,
                subMenu: subMenuFiltrado
              })
            }
          })

          if (expansionFiltrada.length > 0) {
            novoItem.expansionItem = expansionFiltrada
            this.menus.push(novoItem)
          }
        }
      })
    }
  },
  setup () {
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const habilitaMenu = ref(false) // ← menu fechado ao iniciar
    const miniMode = ref(true)
    return {
      menuPrincipal: ref(null),
      subMenu: ref(null),
      itensmenu: ref(null),
      expansionItems: ref([]),
      expansionItemsSubMenu: ref([]),
      leftDrawerOpen,
      habilitaMenu,
      miniMode,
      drawer: ref(false),
      drawerClick (e) {
        if (miniMode.value) {
          miniMode.value = false
          rightDrawerOpen.value = false
          e.stopPropagation()
        }
      },
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
  max-width: 200px;
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

  .q-toolbar .q-btn {
  align-self: center !important;
}

}
</style>
