const express = require('express')
const axios = require('axios')
const cors = require('cors')

const PORT = process.env.PORT || 3001

const app = express()
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
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
  console.log('id from getImage: ' + resp.id)
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
  console.log('from getimageLink: ' + result.data.output)
  console.log(result.data.output)
  return result.data.output
}

app.post('/getimg', (req, response) => {
  let reqText = req.body.queryText
  let outputLink = []
  getImage(reqText).then(res => {
    setTimeout(async () => {
      outputLink = await getImageLink(res)
      if (outputLink !== null && outputLink.length === 8) {
        console.log('from timeout 1: ')
        console.log(outputLink)
        response.json({ output: outputLink })
      } else if (outputLink.length !== 8) {
        setTimeout(async () => {
          outputLink = await getImageLink(res)
          console.log('from timeout else if: ')
          console.log(outputLink)
          response.json({ output: outputLink })
        }, 2500)
      } else
        setTimeout(async () => {
          outputLink = await getImageLink(res)
          console.log('from timeout 2: ')
          console.log(outputLink)
          response.json({ output: outputLink })
        }, 10000)
    }, 15500)
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
