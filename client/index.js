$(document).ready(function () {
  showMemos()
})

function showMemos() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/',
    success: function(resp) {
      for (let i = 0; i < resp.length; i++) {
        let memo = resp[i]
        $('#add-memo').append(
          `<tr>
            <td>${memo.id}</td>
            <td>${memo.text}</td>
            <td style="width:50%;"><input style="width:50%; padding:5.5px; border-radius:3px;" type="text" name="input-${i + 1}" placeholder="Edit something.."> <button type="submit" class="btn btn-primary" onclick="updateMemo(${i},${memo.id})">Update</button> | <button type="submit" class="btn btn-danger" onclick="deleteMemo(${i},${memo.id})">Delete</button></td>
          </tr>`
        )
      }
    },
    error: function() {
      console.log('GET Response Error')
    }
  })
}

function updateMemo(i, id) {
  let inputVal = $(`input[name=input-${i + 1}]`).val()
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/update/${id}`,
    data: {update: inputVal},
    success: function(resp) {
      $(`input[name=input-${i + 1}]`).val('')
      $('#add-memo').empty()
      for (let i = 0; i < resp.length; i++) {
        let memo = resp[i]
        $('#add-memo').append(
          `<tr>
            <td>${memo.id}</td>
            <td>${memo.text}</td>
            <td style="width:50%;"><input style="width:50%; padding:5.5px; border-radius:3px;" type="text" name="input-${i + 1}" placeholder="Edit something.."> <button type="submit" class="btn btn-primary" onclick="updateMemo(${i},${memo.id})">Update</button> | <button type="submit" class="btn btn-danger" onclick="deleteMemo(${i},${memo.id})">Delete</button></td>
          </tr>`
        )
      }
    },
    error: function() {
      console.log('PUT Response Error')
    }
  })
}

function deleteMemo(i, id) {
  if(confirmDelete()) {
    $.ajax({
      type: 'DELETE',
      url: `http://localhost:3000/delete/${id}`,
      success: function(resp) {
        $('#add-memo').empty()
        for (let i = 0; i < resp.length; i++) {
          let memo = resp[i]
          $('#add-memo').append(
            `<tr>
              <td>${memo.id}</td>
              <td>${memo.text}</td>
              <td style="width:50%;"><input style="width:50%; padding:5.5px; border-radius:3px;" type="text" name="input-${i + 1}" placeholder="Edit something.."> <button type="submit" class="btn btn-primary" onclick="updateMemo(${i},${memo.id})">Update</button> | <button type="submit" class="btn btn-danger" onclick="deleteMemo(${i},${memo.id})">Delete</button></td>
            </tr>`
          )
        }
      },
      error: function() {
        console.log('DELETE Response Error')
      }
    })
  }
}

function createMemo() {
  let inputVal = $('input[name=create]').val()
  $('#add-memo').empty()
  $.ajax({
  type: 'POST',
  url: 'http://localhost:3000/create',
  data: {create: inputVal},
  success: function(resp) {
    $('input[name=create').val('')
    for (let i = 0; i < resp.length; i++) {
      let memo = resp[i]
      $('#add-memo').append(
        `<tr>
          <td>${memo.id}</td>
          <td>${memo.text}</td>
          <td style="width:50%;"><input style="width:50%; padding:5.5px; border-radius:3px;" type="text" name="input-${i + 1}" placeholder="Edit something.."> <button type="submit" class="btn btn-primary" onclick="updateMemo(${i},${memo.id})">Update</button> | <button type="submit" class="btn btn-danger" onclick="deleteMemo(${i},${memo.id})">Delete</button></td>
        </tr>`
      )
    }
  },
  error: function() {
    console.log('POST Response Error')
  }
  })
}

function confirmDelete() {
  return confirm('Are you sure?')
}
