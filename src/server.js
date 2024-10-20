const express = require('express')
const cors = require('cors')

require('dotenv').config()
const app = express()

app.use(express())
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'production') app.use('/api', require('./routes'))
else app.use('/api', require('./routes'))

console.log('DB_HOST : ' + process.env.DB_HOST)
console.log('DB_PORT : ' + process.env.DB_PORT)
console.log('DB_NAME : ' + process.env.DB_NAME)

const PORT = process.env.PORT || 9000

app.listen(PORT, console.log(`server running on port ${PORT}`))
