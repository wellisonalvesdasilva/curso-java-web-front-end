<template>
  <q-page class="flex flex-center">
          <!-- <q-input
                stack-label
                dense
                v-model="valor"
                v-money="moneyFormatForDirective"
                :rules="[vRequired]"
                :lazy-rules="true"
                label="Valor"
                >
            <template v-slot:label>
                <span class="input-label">Valor </span>
              </template>
          </q-input> -->
  </q-page>
</template>

<script>

export default {
  name: 'CreateEditPessoa',
  setup () {
    const moneyFormatForDirective = {
      decimal: ',',
      thousands: '.',
      precision: 2,
      prefix: 'R$ ',
      masked: false /* doesn't work with directive */
    }
    return {
      valor: '',
      moneyFormatForDirective
    }
  }
}

</script>
