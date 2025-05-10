const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'anuncios', component: () => import('pages/anuncios/GridAnuncio.vue'), meta: { requireLogin: true, transacao: 'ROLE_ANUNCIANTE' } },
      { path: 'anuncios/form', component: () => import('pages/anuncios/CreateEditAnuncio.vue'), meta: { requireLogin: true, transacao: 'ROLE_ANUNCIANTE' } },
      { path: 'anuncios/form/:id', component: () => import('pages/anuncios/CreateEditAnuncio.vue'), meta: { requireLogin: true, transacao: 'ROLE_ANUNCIANTE' } },
      { path: 'anuncios/view/:id', component: () => import('pages/anuncios/ViewAnuncio.vue'), meta: { requireLogin: true, transacao: 'ROLE_ANUNCIANTE' } },
      { path: 'configuracoes/categorias', component: () => import('pages/categorias/GridAnuncio.vue'), meta: { requireLogin: true, transacao: 'ROLE_ANUNCIANTE' } },
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requireLogin: true, transacao: 'ROLE_ANUNCIANTE' } }
    ]
  },

  {
    name: 'LoginIn',
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
