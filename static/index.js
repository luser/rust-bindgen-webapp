/*global URLSearchParams, FormData, Request fetch */
const form = document.getElementById('source');
const code = document.getElementById('bindings');

form.addEventListener("submit", ev => {
  ev.preventDefault();

  const body = new URLSearchParams();
  const formData = new FormData(form);

  // Rocket does not support multipart/form-data, this is a hack to use
  // application/x-www-form-urlencoded
  for (const [k, v] of formData.entries()) {
    if (typeof k == 'string') {
      body.append(k, v);
    }
  }

  const request = new Request('/api/bindgen', {
    method: 'POST',
    body: body
  });

  fetch(request).then((response) => {
    if (!response.ok) {
      throw Error("Failed to generate bindings.");
    }
    return response.text();
  }).then((bindings) => {
    code.innerText = bindings;
    code.style.display = 'block';
  }).catch((error) => {
    code.innerText = error;
  });
});
