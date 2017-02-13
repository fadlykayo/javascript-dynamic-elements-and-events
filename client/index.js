$(document).ready(function () {
  showTodos()
})

function showTodos () {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/',
    success: function (resp) {
      for (let i = 0; i < resp.length; i++) {
        let todo = resp[i]
        let id = todo._id
        console.log(typeof id)
        $('#add-todo').append(
          `<tr>
            <td>${i + 1}</td>
            <td>${todo.content}</td>
            <td>${todo.completed}</td>
            <td style="width:50%;"><button type="submit" class="btn btn-primary" onclick="updateTodo('${id}',${todo.completed})">Update</button> | <button type="submit" class="btn btn-danger" onclick="deleteTodo('${id}')">Delete</button></td>
          </tr>`
        )
      }
    },
    error: function () {
      console.log('GET Response Error')
    }
  })
}

function updateTodo (id, completed) {
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/update/${id}`,
    data: {update: !completed},
    success: function (resp) {
      $('#add-todo').empty()
      for (let i = 0; i < resp.length; i++) {
        let todo = resp[i]
        let id = todo._id
        $('#add-todo').append(
          `<tr>
            <td>${i + 1}</td>
            <td>${todo.content}</td>
            <td>${todo.completed}</td>
            <td style="width:50%;"><button type="submit" class="btn btn-primary" onclick="updateTodo('${id}',${todo.completed})">Update</button> | <button type="submit" class="btn btn-danger" onclick="deleteTodo('${id}')">Delete</button></td>
          </tr>`
        )
      }
    },
    error: function () {
      console.log('PUT Response Error')
    }
  })
}

function deleteTodo (id) {
  if (confirmDelete()) {
    $.ajax({
      type: 'DELETE',
      url: `http://localhost:3000/delete/${id}`,
      success: function (resp) {
        $('#add-todo').empty()
        for (let i = 0; i < resp.length; i++) {
          let todo = resp[i]
          let id = todo._id
          $('#add-todo').append(
            `<tr>
              <td>${i + 1}</td>
              <td>${todo.content}</td>
              <td>${todo.completed}</td>
              <td style="width:50%;"><button type="submit" class="btn btn-primary" onclick="updateTodo('${id}',${todo.completed})">Update</button> | <button type="submit" class="btn btn-danger" onclick="deleteTodo('${id}')">Delete</button></td>
            </tr>`
          )
        }
      },
      error: function () {
        console.log('DELETE Response Error')
      }
    })
  }
}

function createTodo () {
  let inputVal = $('input[name=create]').val()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/create',
    data: {create: inputVal},
    success: function (resp) {
      $('#add-todo').empty()
      $('input[name=create').val('')
      for (let i = 0; i < resp.length; i++) {
        let todo = resp[i]
        let id = todo._id
        $('#add-todo').append(
          `<tr>
            <td>${i + 1}</td>
            <td>${todo.content}</td>
            <td>${todo.completed}</td>
            <td style="width:50%;"><button type="submit" class="btn btn-primary" onclick="updateTodo('${id}',${todo.completed})">Update</button> | <button type="submit" class="btn btn-danger" onclick="deleteTodo('${id}')">Delete</button></td>
          </tr>`
        )
      }
    },
    error: function () {
      console.log('POST Response Error')
    }
  })
}

function confirmDelete () {
  return confirm('Are you sure?')
}
