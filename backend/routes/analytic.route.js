const {getAnalytic } = require('../controllers/analytic.controller')
const express = require('express')
const analyticRouter = express.Router()

// analyticRouter.post('/', createAnalytic)
analyticRouter.get('/', getAnalytic)

module.exports = analyticRouter