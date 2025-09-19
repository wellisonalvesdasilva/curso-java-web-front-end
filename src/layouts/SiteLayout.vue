<template>
  <q-layout view="hHh LpR lfr">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-grey-9 text-white">
      <q-toolbar class="q-pa-sm justify-center items-center">
        <div class="text-caption text-center">
              <strong>Curso Java Web (Versão 1.0.0.0 de 2025)</strong>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>

</template>

<style src="../assets/scss/global.scss" lang="scss" />
<style lang="scss" scoped></style>

<script>

export default {
  setup () {
    return {
      teste: null
    }
  }
}

</script>
<style>
</style>
