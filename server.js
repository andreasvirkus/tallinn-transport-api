const gtfs = require('gtfs')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const compression = require('compression')
const conf = require('./config')
const router = require('./api')
const importData = require('./import').importData

const app = express()
const port = conf.port

app.use(helmet())
app.use(compression())
app.use(morgan('common'))
app.use(cors({
  origin: conf.isDev ? 'http://localhost:8080' : 'https://viimane.info',
  methods: ['GET']
}))

app.get('/', (req, res) => res.redirect('/docs'))
app.use('/api', router)

app.get('/docs', (req, res) => {
  const docs = {
    status: 'Welcome to the (unofficial) Tallinn Transportation API! This is a temporary plain-text documentation to list the available endpoints:',
    endpoints: {
      '/stops/:amount': 'Get data about a certain number of stops',
      '/stop/:name': 'Get data about a specific stop',
      '/area/:lat/:lon': 'Get stops in a small radius for the provided latitude and longitude',
      '/center': 'Get stops in the city center',
      '/agencies': 'Get agencies'
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(docs, null, 2));
})

// Our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function (req, res) {
  res.status(404).json({ error: `Lame, can't find that` })
})

if (!conf.isDev) importData()

app.listen(port, () => console.log(`Server listening on port ${port}`))
