const express = require('express')
const controller = require('../controllers/message.controller')
const keyVerify = require('../middlewares/keyCheck')
const loginVerify = require('../middlewares/loginCheck')
const multer = require('multer')

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, inMemory: true }).single('file')

router.route('/text').post(keyVerify, loginVerify, controller.BroadcastText)
router.route('/image').post(keyVerify, loginVerify, upload, controller.BroadcastImage)
router.route('/doc').post(keyVerify, loginVerify, upload, controller.BroadcastDocument)

module.exports = router