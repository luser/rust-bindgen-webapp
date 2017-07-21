var form = document.getElementById('source')
var code = document.getElementById('bindings')
form.onsubmit = (ev) => {
  ev.preventDefault();
  var body = new URLSearchParams()
  var formData = new FormData(form)
  // Rocket does not support multipart/form-data, this is a hack to use
  // application/x-www-form-urlencoded
  for (var pair of formData.entries()) {
    typeof pair[1]=='string' && body.append(pair[0], pair[1])
  }
  var headers = new Headers()
  var requestInit = {
    method: 'POST',
    headers: headers,
    body: body
  }
  var request = new Request('/api/bindgen', requestInit)
  fetch(request).then((response) => {
    if (!response.ok) {
      throw Error("Failed to generate bindings.")
    }
    return response.text();
  }).then((bindings) => {
    code.innerText = bindings
  }).catch((error) => {
    code.innerText = error
  })
}
