export const MENU = [
  {
    label: 'Gerenciar Anúncios',
    icon: 'img:/icons-menu/icon-contaspagar.svg',
    items: [
      {
        to: '/admin/anuncios/form',
        label: 'Cadastrar',
        transacao: 'Geral-MensagemNotificacao-Inserir'
      },
      {
        to: '/admin/anuncios',
        label: 'Listar',
        transacao: 'Geral-MensagemNotificacao-Inserir'
      }
    ]
  }
]

export default MENU
