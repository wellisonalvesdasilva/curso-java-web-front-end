<template class="no-scroll">
  <q-layout class="no-scroll" view="hHh LpR lfr">
    <div
      class="q-pa-none row items-center justify-center"
      style="min-height: calc(100vh - 64px)"
    >
    <q-page-container class="col-12 col-sm-10 col-md-6 col-lg-4 q-mt-lg">
      <q-card class="q-pa-md responsive-card">
          <q-card-section>
            <q-toolbar class="header justify-center">
<q-avatar
  @click="irParaHome"
  style="height: 100px; width: 180px; border-radius: 0px; cursor: pointer"
>
  <img
    src="../assets/img/logo-mercado-instrumental.png"
    style="height: 100%; width: 100%; object-fit: contain"
  />
</q-avatar>

            </q-toolbar>
            <router-view />
          </q-card-section>
        </q-card>
      </q-page-container>
    </div>
    <q-footer elevated class="bg-grey-9 text-white">
      <q-toolbar class="q-pa-sm justify-center items-center">
        <div class="text-caption text-center">
          <strong>Versão 1.0.0.1 de 31/08/2025</strong>
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

.responsive-card {
  max-width: 390px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

@media (max-width: 500px) {
  .responsive-card {
    width: calc(100% - 100px); /* margem lateral total de 32px (16px cada lado) */
    max-width: 100%;
    margin-left: 50px;
    margin-right: -50px;
  }
}

</style>
