import money from 'v-money'

export default ({ app }) => {
  app.use(money, { precision: 2 })
}
