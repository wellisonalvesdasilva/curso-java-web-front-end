<template class="no-scroll">
  <q-layout class="no-scroll" view="hHh LpR lfr">
    <div
      class="q-pa-none row items-center justify-center"
      style="min-height: calc(100vh - 64px)"
    >
    <q-page-container class="col-12 col-sm-10 col-md-6 col-lg-4 q-mt-lg">
      <q-card class="q-pa-md responsive-card">
          <q-card-section>
            <q-toolbar-title class="header justify-center">
<q-avatar
  @click="irParaHome"
  style="height: 48px; width: 220px; border-radius: 8px; cursor: pointer"
>
  <img
    src="../assets/img/logo-mercado-instrumental.jpg"
    style="height: 100%; width: 100%; object-fit: contain"
  />
</q-avatar>

            </q-toolbar-title>
            <router-view />
          </q-card-section>
        </q-card>
      </q-page-container>
    </div>
    <q-footer elevated class="bg-grey-9 text-white">
      <q-toolbar class="q-pa-sm justify-center items-center">
        <div class="text-caption text-center">
          <strong>Versão 1.0.0.0 de 04/06/2025</strong>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<style src="../assets/scss/global.scss" lang="scss" />
<style lang="scss" scoped></style>
<script>
export default {
  methods: {
    irParaHome: function () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
@media (max-width: 600px) {
  .responsive-card {
    width: calc(100% - 32px); // margem lateral total de 32px (16px cada lado)
    max-width: 100%;
    margin-left: 16px;
    margin-right: 16px;
  }
}

.responsive-card {
  max-width: 390px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

</style>
