<template>
  <div>
    <div class="bg">
      <div class="row items-center justify-between q-mb-none">
        <div class="col-auto breadcrumb-container">
          <q-breadcrumbs
            separator=">"
            class="q-mb-none"
            active-color="secondary">
            <q-breadcrumbs-el to="/admin/anuncios" label="Anúncios" />
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
      <q-form greedy ref="formPessoa" @submit="cadastrarOuAtualizar('RASCUNHO')">
        <div class="main-container">
        <div class="flex justify-between items-center q-mb-sm">
          <h2 class="title-text">{{ title }}</h2>
          <q-space/>
          <div>
            <div class="flex">
              <q-badge style="margin-right: 10px;" rounded :style="{ backgroundColor: anuncio?.status?.value === 'PUBLICADO' ? '#569f00' : '#EF8027' }" :label="anuncio?.status?.label" />
            </div>
          </div>
        </div>
          <div class="divisor-line"></div>
          <q-tabs
            v-model="tab"
            dense
            class="q-mt-lg text-h6 text-grey titulo-abas"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="plano-desejado" label="Plano Desejado" />
            <q-tab :disable="!planoSelecionado" name="dados-basicos" label="Dados Básicos" />
            <q-tab :disable="!anuncio?.id" name="imagens" label="Imagens" />
          </q-tabs>
            <div
              class="q-pa-md"
              style="margin-top: -30px"
              v-show="tab === 'dados-basicos'"
            >
  <div class="row q-col-gutter-md q-mt-sm">
    <div class="q-gutter-sm col-xs-12">
      <q-toggle
        style="font-size: 15px;"
        size="lg"
        v-model="anuncio.novo"
        val="xl"
        label="Produto novo?"
        left-label/>
    </div>

    <div class="col-xs-12 col-sm-6 col-md-2">
      <q-select
        stack-label
        dense
        label="Estado"
        v-model="anuncio.estado"
        use-input
        emit-value
        @update:model-value="val => alterouEstado()"
        map-options
        input-debounce="500"
        @click="(val, update, abort) => buscarEstados(val)" clearable
        :options="listaCamposFiltrados['estados']"
        option-label="sigla"
        @filter="(val, update, abort) => filterSelects(val, update, abort, 'estados')"
        :rules="[vRequired]"
      >
        <template v-slot:label>
                    <span class="input-label">Estado</span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Nenhum Dado Encontrado
                      </q-item-section>
                    </q-item>
                  </template>
      </q-select>
    </div>

    <div class="col-xs-12 col-sm-6 col-md-3">
      <q-select
        stack-label
        dense
        label="Município"
        :disable="!anuncio.estado || desabilitarMunicipio"
        v-model="anuncio.municipio"
        use-input
        emit-value
        map-options
        input-debounce="500"
        @click="(val, update, abort) => buscarMunicipios(val)" clearable
        :options="listaCamposFiltrados['municipios']"
        option-label="nome"
        @filter="(val, update, abort) => filterSelects(val, update, abort, 'municipios')"
        :rules="[vRequired]"
      >
  <template v-slot:label>
                    <span class="input-label">Município</span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Nenhum Dado Encontrado
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
    </div>

    <div class="col-xs-12 col-sm-6 col-md-2">
      <q-select
        stack-label
        dense
        label="Tipo"
        v-model="anuncio.tipo"
        use-input
        emit-value
        map-options
        input-debounce="500"
        @click="(val, update, abort) => buscarTiposInstrumentos(val)" clearable
        :options="listaCamposFiltrados['tiposInstrumentos']"
        option-label="label"
        @filter="(val, update, abort) => filterSelects(val, update, abort, 'tiposInstrumentos')"
        :rules="[vRequired]"
      >
        <template v-slot:label>
                    <span class="input-label">Tipo</span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Nenhum Dado Encontrado
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
    </div>

    <div class="col-xs-12 col-sm-6 col-md-3">
      <q-select
        stack-label
        dense
        label="Marca"
        v-model="anuncio.marca"
        use-input
        emit-value
        map-options
        input-debounce="500"
        @click="(val, update, abort) => buscarMarcas(val)" clearable
        :options="listaCamposFiltrados['marcas']"
        option-label="label"
        @filter="(val, update, abort) => filterSelects(val, update, abort, 'marcas')"
        :rules="[vRequired]"
      >
  <template v-slot:label>
                    <span class="input-label">Marca</span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Nenhum Dado Encontrado
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
    </div>

    <div class="col-xs-12 col-sm-6 col-md-2">
      <q-input
        stack-label
        dense
        v-model="anuncio.valor"
        v-money="moneyFormatForDirective"
        :rules="[vRequired]"
        :lazy-rules="true"
        label="Valor do Anúncio"
      >
        <template v-slot:label>
              <span class="input-label">Valor do Anúncio</span>
            </template>
          </q-input>
    </div>

    <div class="col-xs-12">
      <q-input
        stack-label dense maxlength="4000"
        :rules="[vRequired]"
        v-model="anuncio.titulo"
        label="Título"
        class="custom-textarea"
      >
      <template v-slot:label>
              <span class="input-label">Título </span>
            </template>
          </q-input>
    </div>

    <div class="col-xs-12">
      <q-input
        :rules="[vRequired]"
        stack-label
        dense maxlength="4000"
        autogrow
        v-model="anuncio.descricao"
        label="Descrição"
        class="custom-textarea"
      >
        <template v-slot:label>
              <span class="input-label">Descrição </span>
            </template>
      </q-input>
    </div>
  </div>

            </div>
        <div class="q-pa-md" v-if="tab === 'imagens'">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-12">
                <UploaderComImagem :visualizar="false" :idAnuncio="anuncio?.id" />
            </div>
          </div>
        </div>
  <div class="q-pa-lg" v-if="tab === 'plano-desejado'">
    <q-card class="q-pa-md bg-white shadow-3">
      <div class="q-pa-md">

        <!-- Layout Desktop (Tabela) -->
        <div v-if="!isMobile" class="q-mb-md">
          <q-markup-table
            flat
            bordered
            class="shadow-2 rounded-borders table-wrapper"
            style="border-radius: 12px; overflow-x: auto;"
          >
            <thead>
              <tr class="bg-grey-3 text-white text-weight-bold text-center">
                <th class="bg-grey-3 text-grey-9 text-left text-subtitle2"></th>
                <th class="bg-blue-5 text-white text-subtitle2">Premium</th>
                <th class="bg-amber-5 text-white text-subtitle2">Avançado</th>
                <th class="bg-grey-6 text-white text-subtitle2">Básico</th>
                <th class="bg-red-5 text-white text-subtitle2">Grátis</th>
              </tr>
            </thead>
            <tbody class="text-center text-body1">
              <tr>
                <td class="text-left text-weight-medium bg-grey-2">Valor</td>
                <td class="text-weight-bold">R$ 99,90</td>
                <td class="text-weight-bold">R$ 79,90</td>
                <td class="text-weight-bold">R$ 59,90</td>
                <td class="text-weight-bold">Primeiro Anúncio</td>
              </tr>
              <tr>
                <td class="text-left text-weight-medium bg-grey-2">Tempo de Veiculação</td>
                <td>60 dias</td>
                <td>45 dias</td>
                <td>30 dias</td>
                <td>20 dias</td>
              </tr>
              <tr>
                <td class="text-left text-weight-medium bg-grey-2">Fixo na Página de Destaque</td>
                <td><q-icon name="check" color="green" size="md" /></td>
                <td><q-icon name="check" color="green" size="md" /></td>
                <td><q-icon name="close" color="red" size="md" /></td>
                <td><q-icon name="close" color="red" size="md" /></td>
              </tr>
<tr>
  <td class="text-left text-weight-medium bg-grey-2">Selecionar</td>
  <td>
    <div :style="anuncio?.id ? 'pointer-events: none;' : ''">
      <q-radio :disable="anuncio?.id" v-model="planoSelecionado" val="PREMIUM" color="blue" />
    </div>
  </td>
  <td>
    <div :style="anuncio?.id ? 'pointer-events: none;' : ''">
      <q-radio :disable="anuncio?.id" v-model="planoSelecionado" val="AVANCADO" color="amber" />
    </div>
  </td>
  <td>
    <div :style="anuncio?.id ? 'pointer-events: none;' : ''">
      <q-radio :disable="anuncio?.id" v-model="planoSelecionado" val="BASICO" color="grey-8" />
    </div>
  </td>
  <td>
    <div :style="anuncio?.id ? 'pointer-events: none;' : ''">
      <q-radio :disable="hasAnuncioFree || anuncio?.id" v-model="planoSelecionado" val="GRATIS" color="red" />
    </div>
  </td>
</tr>
            </tbody>
          </q-markup-table>
        </div>

        <!-- Layout Mobile (Cards empilhados) -->
      <div v-else class="q-gutter-md">
        <!-- Premium -->
        <q-card
          class="q-pa-lg"
          style="
            cursor: pointer;
            border-radius: 20px;
            background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
            box-shadow:
              0 8px 16px rgba(13, 71, 161, 0.3),
              inset 0 0 12px rgba(255, 255, 255, 0.3);
            transition: box-shadow 0.4s ease, border 0.4s ease;
            border: 3px solid transparent;
            color: #0d47a1;
            font-family: 'Roboto', sans-serif;
            user-select: none;
          "
          :class="planoSelecionado === 'PREMIUM' ? 'premium-planoSelecionado' : ''"
          @click="!anuncio?.id && (planoSelecionado = 'PREMIUM')"
          v-ripple
          @mouseenter="$el.style.boxShadow='0 12px 28px rgba(13, 71, 161, 0.5), inset 0 0 16px rgba(255,255,255,0.4)'"
          @mouseleave="$el.style.boxShadow=planoSelecionado === 'PREMIUM' ? '0 12px 28px rgba(13, 71, 161, 0.7), inset 0 0 20px rgba(255,255,255,0.5)' : '0 8px 16px rgba(13, 71, 161, 0.3), inset 0 0 12px rgba(255, 255, 255, 0.3)'"
        >
          <div :style="anuncio?.id ? 'pointer-events: none;' : ''" class="row items-center justify-between q-mb-md">
            <div>
              <div style="font-size: 1.8rem; font-weight: 700; letter-spacing: 0.04em;">Premium</div>
              <!-- <div style="font-size: 1rem; opacity: 0.85; margin-top: -4px;">Plano completo com todos recursos</div> -->
            </div>
            <!-- <q-radio
              :disabled="anuncio?.id"
              v-model="planoSelecionado"
              val="PREMIUM"
              color="#0d47a1"
              size="28px"
              @click.stop
              unchecked-icon="radio_button_unchecked"
              checked-icon="radio_button_checked"
            /> -->
          </div>

          <div
            style="font-size: 2rem; font-weight: 900; color: #08306b; margin-bottom: 12px; text-shadow: 1px 1px 3px rgba(0,0,0,0.15);"
          >
            R$ 99,90
          </div>

          <q-chip
            dense
            outline
            style="background: rgba(13, 71, 161, 0.15); color: #08306b; font-weight: 600; font-size: 0.9rem; padding: 4px 12px;"
          >
            Ativo por 60 dias
          </q-chip>

          <div style="margin-top: 16px; font-weight: 600; color: #0d47a1; font-size: 1.1rem;">
            Recursos:
          </div>

          <ul
            style="list-style: none; padding-left: 0; margin-top: 6px; font-size: 1rem; color: #19519f;"
          >
            <li style="display: flex; align-items: center; margin-bottom: 8px;">
              <q-icon
                name="check"
                color="#7fff00"
                size="24px"
                style="text-shadow: 0 0 6px #7fff00;"
                class="q-mr-sm"
              />
              Fixo na Página de Destaque
            </li>
          </ul>
        </q-card>
        <!-- Avançado -->
        <q-card
          class="q-pa-lg"
          style="
            cursor: pointer;
            border-radius: 20px;
            background: linear-gradient(135deg, #fff8e1 0%, #ffe082 100%);
            box-shadow:
              0 8px 16px rgba(111, 79, 30, 0.3),
              inset 0 0 12px rgba(255, 255, 255, 0.3);
            transition: box-shadow 0.4s ease, border 0.4s ease;
            border: 3px solid transparent;
            color: #6f4f1e;
            user-select: none;
            font-family: 'Roboto', sans-serif;
          "
          :class="planoSelecionado === 'AVANCADO' ? 'avancado-planoSelecionado' : ''"
          @click="!anuncio?.id && (planoSelecionado = 'AVANCADO')"
          v-ripple
          @mouseenter="$el.style.boxShadow='0 12px 28px rgba(111, 79, 30, 0.5), inset 0 0 16px rgba(255,255,255,0.4)'"
          @mouseleave="$el.style.boxShadow=planoSelecionado === 'AVANCADO' ? '0 12px 28px rgba(111, 79, 30, 0.7), inset 0 0 20px rgba(255,255,255,0.5)' : '0 8px 16px rgba(111, 79, 30, 0.3), inset 0 0 12px rgba(255, 255, 255, 0.3)'"
        >
          <div :style="anuncio?.id ? 'pointer-events: none;' : ''" class="row items-center justify-between q-mb-md">
            <div>
              <div style="font-size: 1.8rem; font-weight: 700; letter-spacing: 0.04em;">Avançado</div>
              <!-- <div style="font-size: 1rem; opacity: 0.85; margin-top: -4px;">Plano intermediário</div> -->
            </div>
            <!-- <q-radio
              :disabled="anuncio?.id"
              v-model="planoSelecionado"
              val="AVANCADO"
              color="#6f4f1e"
              size="28px"
              @click.stop
              unchecked-icon="radio_button_unchecked"
              checked-icon="radio_button_checked"
            /> -->
          </div>

          <div
            style="font-size: 2rem; font-weight: 900; color: #4e342e; margin-bottom: 12px; text-shadow: 1px 1px 3px rgba(0,0,0,0.1);"
          >
            R$ 79,90
          </div>

          <q-chip
            dense
            outline
            style="background: rgba(111, 79, 30, 0.15); color: #4e342e; font-weight: 600; font-size: 0.9rem; padding: 4px 12px;"
          >
            Ativo por 45 dias
          </q-chip>

          <div style="margin-top: 16px; font-weight: 600; color: #6f4f1e; font-size: 1.1rem;">
            Recursos:
          </div>

          <ul
            style="list-style: none; padding-left: 0; margin-top: 6px; font-size: 1rem; color: #6d4c41;"
          >
            <li style="display: flex; align-items: center; margin-bottom: 8px;">
              <q-icon
                name="check"
                color="#7fff00"
                size="24px"
                style="text-shadow: 0 0 6px #7fff00;"
                class="q-mr-sm"
              />
              Fixo na Página de Destaque
            </li>
          </ul>
        </q-card>
        <!-- Básico -->
        <q-card
          class="q-pa-lg"
          style="
            cursor: pointer;
            border-radius: 20px;
            background: linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%);
            box-shadow:
              0 8px 16px rgba(55, 71, 79, 0.3),
              inset 0 0 12px rgba(255, 255, 255, 0.4);
            transition: box-shadow 0.4s ease, border 0.4s ease;
            border: 3px solid transparent;
            color: #37474f;
            user-select: none;
            font-family: 'Roboto', sans-serif;
          "
          :class="planoSelecionado === 'BASICO' ? 'basico-planoSelecionado' : ''"
           @click="!anuncio?.id && (planoSelecionado = 'BASICO')"
          v-ripple
          @mouseenter="$el.style.boxShadow='0 12px 28px rgba(55, 71, 79, 0.5), inset 0 0 16px rgba(255,255,255,0.45)'"
          @mouseleave="$el.style.boxShadow=planoSelecionado === 'BASICO' ? '0 12px 28px rgba(55, 71, 79, 0.7), inset 0 0 20px rgba(255,255,255,0.5)' : '0 8px 16px rgba(55, 71, 79, 0.3), inset 0 0 12px rgba(255, 255, 255, 0.4)'"
        >
          <div :style="anuncio?.id ? 'pointer-events: none;' : ''" class="row items-center justify-between q-mb-md">
            <div>
              <div style="font-size: 1.8rem; font-weight: 700; letter-spacing: 0.04em;">Básico</div>
              <!-- <div style="font-size: 1rem; opacity: 0.85; margin-top: -4px;">Plano básico para começar</div> -->
            </div>
            <!-- <q-radio
            :disabled="anuncio?.id"
              v-model="planoSelecionado"
              val="BASICO"
              color="#37474f"
              size="28px"
              @click.stop
              unchecked-icon="radio_button_unchecked"
              checked-icon="radio_button_checked"
            /> -->
          </div>
          <div style="font-size: 2rem; font-weight: 900; color: #263238; margin-bottom: 12px; text-shadow: 1px 1px 3px rgba(0,0,0,0.1);">
            R$ 59,90
          </div>
          <q-chip
            dense
            outline
            style="background: rgba(55, 71, 79, 0.15); color: #263238; font-weight: 600; font-size: 0.9rem; padding: 4px 12px;">
            Ativo por 30 dias
          </q-chip>
          <div style="margin-top: 16px; font-weight: 600; color: #37474f; font-size: 1.1rem;">
            Recursos:
          </div>
          <ul style="list-style: none; padding-left: 0; margin-top: 6px; font-size: 1rem; color: #c62828;">
            <li style="display: flex; align-items: center; margin-bottom: 8px;">
              <q-icon
                name="close"
                color="#ef9a9a"
                size="24px"
                style="text-shadow: 0 0 6px #ef9a9a;"
                class="q-mr-sm"
              />
              Fixo na Página de Destaque
            </li>
          </ul>
        </q-card>
        <!-- Grátis -->
        <q-card
          class="q-pa-lg"
          style="
            cursor: pointer;
            border-radius: 20px;
            background: linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%);
            box-shadow:
              0 8px 16px rgba(183, 28, 28, 0.3),
              inset 0 0 12px rgba(255, 255, 255, 0.4);
            transition: box-shadow 0.4s ease, border 0.4s ease;
            border: 3px solid transparent;
            color: #b71c1c;
            user-select: none;
            font-family: 'Roboto', sans-serif;
          "
          :class="planoSelecionado === 'GRATIS' ? 'gratis-planoSelecionado' : ''"
           @click="(!anuncio?.id && !hasAnuncioFree) && (planoSelecionado = 'GRATIS')"
          v-ripple
          @mouseenter="$el.style.boxShadow='0 12px 28px rgba(183, 28, 28, 0.5), inset 0 0 16px rgba(255,255,255,0.5)'"
          @mouseleave="$el.style.boxShadow=planoSelecionado === 'GRATIS' ? '0 12px 28px rgba(183, 28, 28, 0.7), inset 0 0 20px rgba(255,255,255,0.6)' : '0 8px 16px rgba(183, 28, 28, 0.3), inset 0 0 12px rgba(255, 255, 255, 0.4)'"
        >
          <div :style="anuncio?.id ? 'pointer-events: none;' : ''" class="row items-center justify-between q-mb-md">
            <div>
              <div style="font-size: 1.8rem; font-weight: 700; letter-spacing: 0.04em;">Grátis</div>
              <div style="font-size: 1rem; opacity: 0.85; margin-top: 4px;">Somente o primeiro anúncio</div>
            </div>
            <!-- <q-radio
              :disabled="anuncio?.id"
              v-model="planoSelecionado"
              val="Grátis"
              color="#b71c1c"
              size="28px"
              @click.stop
              unchecked-icon="radio_button_unchecked"
              checked-icon="radio_button_checked"
            /> -->
          </div>

          <div
            style="font-size: 2rem; font-weight: 900; color: #7f0000; margin-bottom: 12px; text-shadow: 1px 1px 3px rgba(0,0,0,0.1);"
          >
            1º Anúncio
          </div>

          <q-chip
            dense
            outline
            style="background: rgba(183, 28, 28, 0.15); color: #7f0000; font-weight: 600; font-size: 0.9rem; padding: 4px 12px;"
          >
            Ativo por 20 dias
          </q-chip>

          <div style="margin-top: 16px; font-weight: 600; color: #b71c1c; font-size: 1.1rem;">
            Recursos:
          </div>

          <ul
            style="list-style: none; padding-left: 0; margin-top: 6px; font-size: 1rem; color: #c62828;"
          >
            <li style="display: flex; align-items: center; margin-bottom: 8px;">
              <q-icon
                name="close"
                color="#ef9a9a"
                size="24px"
                style="text-shadow: 0 0 6px #ef9a9a;"
                class="q-mr-sm"
              />
              Fixo na Página de Destaque
            </li>
          </ul>
        </q-card>
      </div>
      <div class="q-mt-md text-right text-weight-medium text-subtitle1">
        Plano selecionado:
        <span class="text-primary text-weight-bold">{{ obterDescricaoPlano(planoSelecionado) || 'Nenhum' }}</span>
      </div>
    </div>
    </q-card>
  </div>
<div class="row q-mt-md">
  <div class="col-12">
    <div class="row justify-end q-gutter-sm">
      <!-- <q-btn
        @click="voltar"
        label="Voltar"
        no-caps
        class="btn-voltar col-12 col-sm-auto"
      /> -->

      <q-btn
        v-if="tab === 'plano-desejado'"
        :disable="!planoSelecionado"
        type="button"
        label="Continuar"
        no-caps
        icon="chevron_right"
        class="btn-salvar col-12 col-sm-auto"
        @click="tab = 'dados-basicos'"
      />

      <q-btn
        v-if="!permiteRascunho && !estaNaRevisao && tab !== 'plano-desejado'"
        type="submit"
        label="Salvar Rascunho"
        no-caps
        icon="save"
        class="btn-cadastrar col-12 col-sm-auto"
      />

      <q-btn
        @click="cadastrarOuAtualizar('AGUARDANDO_PUBLICACAO')"
        v-if="anuncio?.id && estaNaRevisao === false"
        type="button"
        label="Cadastrar"
        no-caps
        icon="save"
        class="btn-aprovar col-12 col-sm-auto"
      />

      <q-btn
        @click="cadastrarOuAtualizar('PUBLICADO')"
        v-if="anuncio?.id && estaNaRevisao"
        type="button"
        label="Salvar/Aprovar"
        no-caps
        icon="update"
        class="btn-aprovar col-12 col-sm-auto"
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
import { ref, computed } from 'vue'
import { anuncioService, enumService, ibgeService } from 'src/services/api-service.js'
import { useQuasar } from 'quasar'
import UploaderComImagem from './UploaderComImagem.vue'

export default {
  name: 'CreateEditPessoa',
  components: {
    UploaderComImagem
  },
  setup () {
    const modalVisivel = ref(false)
    const isMobile = computed(() => $q.screen.lt.md)
    const anuncio = ref({
      id: null,
      novo: false,
      tipo: null,
      marca: null,
      valor: null,
      status: { label: 'Rascunho', value: 'RASCUNHO' },
      planoDesejado: null
    })
    const $q = useQuasar()
    const tiposInstrumentos = ref([])
    const marcas = ref([])
    const moneyFormatForDirective = ref({
      decimal: ',',
      thousands: '.',
      precision: 2,
      prefix: 'R$ ',
      masked: false /* doesn't work with directive */
    })
    const uploaderRefs = []
    return {
      modalVisivel,
      planoSelecionado: ref(null),
      uploaderRefs,
      $q,
      anuncio,
      title: ref('Cadastrar Anúncio'),
      tab: ref('plano-desejado'),
      valorFormatado: ref(''),
      tiposInstrumentos,
      marcas,
      listaCamposFiltrados: ref([]),
      estados: ref([]),
      municipios: ref([]),
      moneyFormatForDirective,
      hasAnuncioFree: ref(false),
      desabilitarMunicipio: ref(false),
      isMobile
    }
  },
  computed: {
    permiteRascunho: {
      get () {
        return this.anuncio?.status?.value === 'AGUARDANDO_PUBLICACAO' && this.anuncio?.status?.value === 'PUBLICADO'
      }
    },
    estaNaRevisao () {
      return this.$route.path.includes('/revisao')
    }
  },
  mounted () {
    this.confirmarSeJaTemAnuncioFree()
    this.buscarPessoaParaEdicao()
    this.buscarEstados()
    this.buscarTiposInstrumentos()
    this.buscarMarcas()
  },
  methods: {
    confirmarSeJaTemAnuncioFree () {
      if (this.$route.params.id) return
      anuncioService.getInfoHasAnuncioFree().then((retorno) => {
        this.hasAnuncioFree = retorno.data
      })
    },
    buscarPessoaParaEdicao () {
      if (!this.$route.params.id) return
      this.title = 'Editar Anúncio'
      anuncioService.getById(this.$route.params.id).then((retorno) => {
        this.anuncio = retorno.data
        this.anuncio.valor = this.anuncio.valor.toFixed(2)
        this.planoSelecionado = this.anuncio.tipoPlano?.value
        this.buscarMunicipios()
      })
    },
    cadastrarOuAtualizar (status) {
      const dto = { ...this.anuncio }
      dto.estado = dto.estado?.sigla || dto.estado
      dto.municipio = dto.municipio?.nome || dto.municipio
      dto.valor = this.$fmt.decimalToApi(dto.valor)
      dto.tipo = dto.tipo.value || dto.tipo
      dto.marca = dto.marca.value || dto.marca
      dto.status = status
      if (this.anuncio.id) {
        anuncioService.update(dto.id, dto)
          .then(response => {
            if (response?.data !== '') {
              this.$msg.warning('Prossiga com o pagamento!')
              const url = response?.data
              window.open(url, '_blank')
            } else {
              this.$msg.success('Ação realizada com sucesso!' + (status === 'AGUARDANDO_PUBLICACAO' ? ' Em breve, você receberá um e-mail com informações sobre a publicação.' : ''))
            }
            this.voltar()
          })
          .catch(error => {
            this.$msg.apiError('Erro ao cadastrar/atualizar!', error)
          })
      } else {
        dto.tipoPlano = this.planoSelecionado
        anuncioService.create(dto)
          .then(async response => {
            this.$msg.success('Anúncio salvo. Prossiga com o upload das imagens!')
            const id = response.data
            await this.irParaEdicao(id)
            this.anuncio.id = id
            this.tab = 'imagens'
          }).catch(error => {
            this.$msg.apiError('Falha ao salvar o anúncio!', error)
          })
      }
    },
    buscarTiposInstrumentos () {
      enumService.getTiposInstrumentos().then(response => {
        this.tiposInstrumentos = response.data
        this.listaCamposFiltrados.tiposInstrumentos = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os tipos de instrumentos!', error)
      })
    },
    buscarMarcas () {
      enumService.getMarcas().then(response => {
        this.marcas = response.data
        this.listaCamposFiltrados.marcas = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar as marcas!', error)
      })
    },
    buscarEstados () {
      ibgeService.getEstados().then(response => {
        this.estados = response.data
        this.listaCamposFiltrados.estados = response.data
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar os estados!', error)
      })
    },
    alterouEstado () {
      this.desabilitarMunicipio = true
      this.anuncio.municipio = null
      this.buscarMunicipios()
    },
    buscarMunicipios () {
      const estado = this.anuncio?.estado.sigla || this.anuncio?.estado
      ibgeService.getMunicipios(estado).then(response => {
        this.municipios = response.data
        this.listaCamposFiltrados.municipios = response.data
        this.desabilitarMunicipio = false
      }).catch(error => {
        this.$msg.apiError('Erro ao buscar dossiê', error)
      })
    },
    filterSelects (val, update, abort, colName) {
      update(() => {
        const isEstado = colName === 'estados'
        const isMunicipio = colName === 'municipios'
        const needle = val.toLowerCase()
        let options = []
        switch (colName) {
          case 'tiposInstrumentos':
            options = this.tiposInstrumentos || []
            break
          case 'marcas':
            options = this.marcas || []
            break
          case 'estados':
            options = this.estados || []
            break
          case 'municipios':
            options = this.municipios || []
            break
          default:
            options = []
        }
        const filtrada = options.filter(it => (!isEstado && !isMunicipio) ? this.$fmt.descricaoEnumResponse(it).toLowerCase().indexOf(needle) > -1 : isEstado ? it.sigla.toLowerCase().indexOf(needle) > -1 : it.nome.toLowerCase().indexOf(needle) > -1)
        this.listaCamposFiltrados[colName] = filtrada
      })
    },
    voltar () {
      this.$router.push(this.estaNaRevisao ? '/admin/anuncios/revisao' : '/admin/anuncios')
    },
    irParaEdicao (id) {
      this.$router.push((this.estaNaRevisao ? '/admin/anuncios/revisao/form/' : '/admin/anuncios/form/') + id)
    },
    evitarTroca (novoValor) {
      if (!this.anuncio?.id) {
        this.planoSelecionado = novoValor
      }
    },
    obterDescricaoPlano (val) {
      return val === null ? '' : val === 'PREMIUM' ? 'Premium' : val === 'AVANCADO' ? 'Avançado' : val === 'BASICO' ? 'Básico' : 'Grátis'
    }
  }
}

</script>

<style scoped>

.plan-card {
  cursor: pointer;
  transition: border-color 0.3s ease;
  margin-bottom: 12px;
  border-radius: 12px;
  border: 1.5px solid #ddd;
}

.plan-card-planoSelecionado {
  border-color: var(--q-primary);
  box-shadow: 0 0 8px var(--q-primary);
}

.my-card {
  cursor: pointer;
  transition: border-color 0.3s ease;
  margin-bottom: 10px;
  border-radius: 12px;
}

.planoSelecionado-card {
  border-width: 2px !important;
}

.table-container {
  overflow-x: auto;
  max-width: 100%;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.styled-table th,
.styled-table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #eee;
  font-size: 15px;
}

.styled-table th {
  font-weight: bold;
}

.label {
  font-weight: 500;
  background-color: #f5f5f5;
  text-align: left;
  padding-left: 16px;
}

.premium-planoSelecionado {
  border-color: #0d47a1 !important;
  box-shadow: 0 12px 28px rgba(13, 71, 161, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.5) !important;
}

.avancado-planoSelecionado {
  border-color: #6f4f1e !important;
  box-shadow: 0 12px 28px rgba(111, 79, 30, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.5) !important;
}

.basico-planoSelecionado {
  border-color: #455a64 !important;
  box-shadow: 0 12px 28px rgba(55, 71, 79, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.5) !important;
}

.gratis-planoSelecionado {
  border-color: #b71c1c !important;
  box-shadow: 0 12px 28px rgba(183, 28, 28, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.6) !important;
}

.table-wrapper {
  max-width: 100%;
  overflow-x: auto;
  font-size: 1.05rem;
}
@media (max-width: 600px) {
  .table-wrapper {
    font-size: 0.95rem;
  }
}
</style>
