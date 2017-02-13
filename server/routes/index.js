var express = require('express')
var router = express.Router()
const todoController = require('../controllers/todos')

/* GET home page. */
router.get('/', todoController.getTodos)

router.post('/create', todoController.createTodo)

router.put('/update/:id', todoController.updateTodo)

router.delete('/delete/:id', todoController.deleteTodo)

module.exports = router
