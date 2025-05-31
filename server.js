const express = require('express')
const path = require('path')
const app = express()

// Serve os arquivos estáticos da pasta dist/spa
app.use(express.static(path.join(__dirname, 'dist/spa')))

// Roteia todas as requisições para o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/spa', 'index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
