<template class="no-scroll">
  <q-layout class="no-scroll" view="hHh LpR lfr">
    <q-header elevated class="header">
      <q-toolbar>
        <q-btn dense flat round v-if="isSmallScreen" icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <router-link class="header-logo-container" clickable to="/">
            <q-avatar style="height: 48px; width: 220px; border-radius: 8px; overflow: hidden;">
              <img src="../assets/img/logo-mercado-instrumental.jpg" style="height: 100%; width: 100%; object-fit: contain;">
            </q-avatar>
            <div style="display:none;"> VERSÃO SPRINT 75 - PBI 2195 - 2024-03-07 17:40 </div>
          </router-link>
        </q-toolbar-title>
<span v-if="isAuthenticated">
  Bem vindo, <b>{{ getMe?.nome?.toUpperCase() }}</b>!
</span>
<span>&nbsp;</span>
<q-btn stretch flat to="/account/login" v-if="!isAuthenticated">Entrar</q-btn>

<q-btn
  padding="10px"
  stretch
  flat
  icon="person"
  class="q-ml-sm"
  @click="toggleRightDrawer"
  v-click-outside="toggleRightClose"
/>
      </q-toolbar>
    </q-header>
    <!-- MENU LATERAL ESQUERDO -->
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
              Início
            </q-item-section>
          </q-item>
          <q-expansion-item v-for="(item, key) in menus" :key="key" :label="item.label" :default-opened="item.oppend"
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
    <!-- FIM MENU LATERAL ESQUERDO -->
    <!-- INICIO MENU LATERAL DIREITO -->
    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>
            <q-item-section>
              E-Mail Corporativo
            </q-item-section>
          </q-item>
          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>
            <q-item-section>
              Atividades Pendentes
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
          <div class="text-weight-bold text-primary">{{ securityState?.name }}</div>
          <!-- <div class="text-weight-bold text-primary">{{securityState?.hasTransaction('PaisCetip|DESATIVACAO')}}</div> -->

          <div class="text-secondary">{{ funcionarioBanco?.unidade?.codigoUnidadePai }} -
            {{ funcionarioBanco?.unidade?.codigoUnidadeVinculada }}</div>
        </div>
      </q-img>
    </q-drawer>
    <!-- FIM MENU LATERAL DIREITO -->
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle2 text-center">
          Desenvolvido por WAS Software LTDA.
        </q-toolbar-title>
        <div class="text-caption float-right">
          <div>
            Versão 1.0
          </div>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<style src="../assets/scss/global.scss" lang='scss' />
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
    this.obterFuncionarioBanco()
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/signOut')
      this.$router.push('/account/login')
    },
    obterFuncionarioBanco: function () {
      console.log('teste')
    },
    irParaHome: function () {
      this.fechartudo()
      this.$router.push('/admin')
      this.handleShow(null)
    },
    // Recolher o menu esquerdo se clicado fora dele.
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
      todosItens.forEach(item => {
        if (this.isUsuarioTemAcesso(item)) {
          itens.push(item)
        }
      })
      return itens
    },
    filtrarMenusPrincipais () {
      this.menus = []
      MENU.forEach(item => {
        if (item.items) {
          item.itens = this.filtrarMenusItens(item.items)
          if (item.itens.length > 0) {
            this.menus.push(item)
            return
          }
        }
        if (item.expansionItem) {
          item.expansionItem.forEach(itExp => {
            itExp.subMenu = this.filtrarMenusItens(itExp.subMenu)
          })
          const teste = item.expansionItem.filter(itExp => itExp.subMenu.length > 0)
          if (teste.length > 0) {
            item.expansionItem = teste
            this.menus.push(item)
          }
        }
      })
      // console.log(JSON.stringify(this.menus))
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
