const config = require('./utils/config')
const app = require('./app')

app.listen(config.PORT || 3001, () => {
  console.log(`Server running on port ${config.PORT}`)
})
