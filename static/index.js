/*global Request fetch */
const form = document.getElementById('source');
const inputSource = document.getElementById('input');
const language = document.getElementById('lang');
const code = document.getElementById('bindings');

form.addEventListener('submit', ev => {
  ev.preventDefault();

  const body = {
    source: inputSource.value,
    lang: language.options[language.selectedIndex].value
  };

  const request = new Request('/api/bindgen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  fetch(request).then((response) => {
    if (!response.ok) {
      throw Error('Failed to generate bindings.');
    }
    return response.text();
  }).then((bindings) => {
    code.innerText = bindings;
    code.style.display = 'block';
  }).catch((error) => {
    code.innerText = error;
  });
});
