export const MENU = [
  {
    label: 'Anúncios',
    icon: 'img:/icons-menu/icon-contaspagar.svg',
    items: [
      {
        to: '/anuncios/form',
        label: 'Cadastrar',
        transacao: 'Geral-MensagemNotificacao-Inserir'
      },
      {
        to: '/anuncios',
        label: 'Listar',
        transacao: 'Geral-MensagemNotificacao-Inserir',
        disable: true
      }
    ]
  }
]

export default MENU
