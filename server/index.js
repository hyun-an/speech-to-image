const express = require('express')
const axios = require('axios')

const PORT = process.env.PORT || 3001

const app = express()

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.get('/getimg', (req, res) => {
  console.log('from server: this is running')
  res.json({ message: 'fuck ' })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
