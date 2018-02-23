const express = require('express')
const stops = require('./controllers/stops')
const stopsTimes = require('./controllers/stopTimes')

const app = express()
const router = express.Router()


router.get('/', (req, res) => {
  res.json({
    status: "API is serving!"
  })
})

router.get('/stop/:name?', (req, res, next) => {
  stops.getAll();
})

// Our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
router.use(function (req, res) {
  res.status(404).json({ error: "Lame, can't find that" })
});

module.exports = router;