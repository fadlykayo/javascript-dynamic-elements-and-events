const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  content: String,
  completed: Boolean
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Todos', TodoSchema)
