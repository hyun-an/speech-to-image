const express = require('express')
const axios = require('axios')
const cors = require('cors')

const PORT = process.env.PORT || 3001

const app = express()
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

const getImage = async query => {
  const response = await axios.post(
    'https://api.replicate.com/v1/predictions',
    {
      version:
        '5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa',
      input: {
        text: `${query}`
      }
    },
    {
      headers: {
        Authorization: 'Token 07dda714b75046ebc87806db1916ea57fd857cb4',
        'Content-Type': 'application/json'
      }
    }
  )
  let resp = response.data
  let linkId = resp.id
  setTimeout(() => {}, 1500)
  const result = await axios.get(
    `https://api.replicate.com/v1/predictions/${linkId}`,
    {
      headers: {
        Authorization: 'Token 07dda714b75046ebc87806db1916ea57fd857cb4'
      }
    }
  )
  let resultOutput = result.data
  console.log(resultOutput)
  return resultOutput.output
}

app.post('/getimg', async (req, res) => {
  console.log(req.body)

  res.json({ output: 'no work' })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
