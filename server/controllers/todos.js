const Todos = require('../models/Todos')

module.exports = {
  getTodos: (req, res) => {
    Todos.find().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  createTodo: (req, res) => {
    Todos.create({
      content: req.body.create,
      completed: false
    }).then(function () {
      Todos.find().then(function (data) {
        res.send(data)
      })
    }).catch(function (err) {
      res.send(err)
    })
  },

  updateTodo: (req, res) => {
    Todos.findOneAndUpdate({
      _id: req.params.id
    }, {completed: req.body.update}, {
      new: true
    }).then(function () {
      Todos.find().then(function (data) {
        res.send(data)
      })
    }).catch(function (err) {
      res.send(err)
    })
  },

  deleteTodo: (req, res) => {
    Todos.findOneAndRemove({
      _id: req.params.id
    }).then(function () {
      Todos.find().then(function (data) {
        res.send(data)
      })
    }).catch(function (err) {
      res.send({m: 'Error data not found'})
    })
  }
}
