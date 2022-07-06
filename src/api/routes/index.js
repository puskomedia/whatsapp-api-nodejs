const express = require('express')
const router = express.Router()
const instanceRoutes = require('./instance.route')
const messageRoutes = require('./message.route')
const miscRoutes = require('./misc.route')
const groupRoutes = require('./group.route')
const messageV2Routes = require('./message.v2.route')

router.get('/status', (req, res) => res.send('OK'))
router.use('/instance', instanceRoutes)
router.use('/message', messageRoutes)
router.use('/group', groupRoutes)
router.use('/misc', miscRoutes)
router.use('/v2/message',messageV2Routes)

module.exports = router
