const Analytic = require('../models/analytic.model')

const getAnalytic = async (request, response) => {
  const analytic = await Analytic.findOne({})
  response.status(200).json(analytic)
}

// const createAnalytic = async (request, response) => {
//     const analytic = new Analytic({
//       count: 0
//     })

//   const newAnalytic = await analytic.save()
//   response.status(201).json(newAnalytic)
// }

module.exports = {
  getAnalytic
}