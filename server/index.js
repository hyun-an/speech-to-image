const express = require('express')
const path = require('path')
const axios = require('axios')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, '../client/build')))

app.get('/api', (req, res) => {
  res.json({ message: 'API is working properly' })
})

const getImage = async query => {
  const response = await axios.post(
    'https://api.replicate.com/v1/predictions',
    {
      version:
        '52aa777b11880357b272aa7c793080f2626cafe44a03877e3017452528a920c3',
      input: {
        text: `${query}`,
        grid_size: 1
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
  console.log(resp.id)
  return resp.id
}

const getImageLink = async linkId => {
  const result = await axios.get(
    `https://api.replicate.com/v1/predictions/${linkId}`,
    {
      headers: {
        Authorization: 'Token 07dda714b75046ebc87806db1916ea57fd857cb4'
      }
    }
  )

  return result.data.output
}

app.post('/getimg', (req, response) => {
  let reqText = req.body.queryText.queryText
  let outputLink = []
  getImage(reqText).then(res => {
    setTimeout(async () => {
      outputLink = await getImageLink(res)
      if (outputLink !== null && outputLink?.length === 8) {
        console.log(outputLink[7])
        response.json({ output: outputLink[7] })
      } else if (outputLink?.length !== 8) {
        setTimeout(async () => {
          outputLink = await getImageLink(res)
          console.log(outputLink[7])
          if (outputLink?.length === 8) response.json({ output: outputLink[7] })
        }, 3000)
      } else
        setTimeout(async () => {
          outputLink = await getImageLink(res)
          console.log(outputLink[7])
          response.json({ output: outputLink[7] })
        }, 10000)
    }, 15500)
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})
