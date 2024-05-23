const { userExtractor } = require('../utils/middleware')
const {getAnalytic } = require('../controllers/analytic.controller')
const express = require('express')
const analyticRouter = express.Router()

// analyticRouter.post('/', createAnalytic)
analyticRouter.get('/', userExtractor, getAnalytic)

module.exports = analyticRouter