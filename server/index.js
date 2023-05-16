const express = require('express')
const colors = require('colors')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()
const port = process.env.PORT

//connect to mongoDB database
connectDB()

app.use(cors())
app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})

//to use schema as well as grapiql tool in development mode
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  }),
)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
