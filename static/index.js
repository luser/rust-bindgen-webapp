const form = document.getElementById('source')
const code = document.getElementById('bindings')
form.onsubmit = (ev) => {
  ev.preventDefault();
  const body = new URLSearchParams()
  const formData = new FormData(form)
  // Rocket does not support multipart/form-data, this is a hack to use
  // application/x-www-form-urlencoded
  for (const pair of formData.entries()) {
    typeof pair[1]=='string' && body.append(pair[0], pair[1])
  }
  const headers = new Headers()
  const requestInit = {
    method: 'POST',
    headers: headers,
    body: body
  }
  const request = new Request('/api/bindgen', requestInit)
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
