const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not started', 'In progress', 'Completed'],
  },
  //associate projectId with clientId
  clientId: {
    type: mongoose.Schema.Types.ObjectId, //objectId realts to the client model defined in ref below
    ref: 'Client',
  },
})

module.exports = mongoose.model('Project', ProjectSchema)
