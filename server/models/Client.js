//mongoose schema is not related to graphql schema. The mongoose layer (object data mapper layer) lives on top of the database. This schema includes fields for our database collections. On top of the mongoose layer is graphql schema layer.
const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
})

module.exports = mongoose.model('Client', ClientSchema)
