const routes = [

  // Site
  {
    path: '',
    component: () => import('layouts/SiteLayout.vue'),
    children: [
      { path: '', component: () => import('pages/site/GridIndex.vue') },
      { path: 'anuncio/:id', component: () => import('pages/site/ViewAnuncio.vue') }
    ]
  },

  // Admin
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'profile', component: () => import('pages/profile/AlterarDadosPessoais.vue'), meta: { requireLogin: true, transacao: 'ROLE_ANUNCIANTE' } },
      { path: 'anuncios', component: () => import('pages/anuncios/GridAnuncio.vue'), meta: { requireLogin: true, transacao: 'ROLE_ANUNCIANTE' } },
      { path: 'anuncios/form', component: () => import('pages/anuncios/CreateEditAnuncio.vue'), meta: { requireLogin: true, transacao: 'ROLE_ANUNCIANTE' } },
      { path: 'anuncios/form/:id', component: () => import('pages/anuncios/CreateEditAnuncio.vue'), meta: { requireLogin: true, transacao: 'ROLE_ANUNCIANTE' } },
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    name: 'LoginIn',
    path: '/account',
    component: () => import('layouts/UsuarioLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/account/Login.vue') },
      { path: 'login/:active', component: () => import('pages/account/Login.vue') },
      { path: 'cadastro', component: () => import('pages/account/Cadastro.vue') },
      { path: 'recuperacao-senha/:chave', component: () => import('pages/account/RecuperarSenha.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
