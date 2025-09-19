const routes = [

  // Site
  {
    path: '',
    component: () => import('layouts/SiteLayout.vue'),
    children: [
      { name: 'GridIndex', path: '', component: () => import('pages/site/GridIndex.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
