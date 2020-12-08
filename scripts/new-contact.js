const baseURL = location.hostname.includes('localhost')
  ? 'http://localhost:3000' : 'https://contact-list-server.herokuapp.com';

function sendData() {
  const firstName = document.querySelector('#first-name').value;
  const lastName = document.querySelector('#last-name').value;
  const phone = document.querySelector('#phone').value;
  const email = document.querySelector('#email').value;

  const formData = {
    firstName,
    lastName,
    phone,
    email,
  };

  const requestDetails = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  };

  fetch(`${baseURL}/save-data`, requestDetails)
    .then((data) => data.json())
    .then((response) => {
      if (response.status === 'error') return alert(response.error);

      alert('Contato cadastrado com sucesso!');
      location.href = '/';
    });
}

const buttonCreate = document.querySelector('.button-create-contact');
buttonCreate.addEventListener('click', sendData);
