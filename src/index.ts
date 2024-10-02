import express from 'express'
const app = express()
const port = 3003

app.get('/', (req, res) => {
  const a = 4
  if (a > 5 ) {
    res.send('Hello World!55555555')
  } else {
    res.send('Hello World!44444444')
  }
})

app.get('/users', (req, res) => {
  res.send('Hello I am users!!!!!!!!!!!!!!')
})

app.post('/users', (req, res) => {
    res.send('We have created users')
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})