const baseURL = location.hostname.includes('localhost')
  ? 'http://localhost:3000' : 'https://contact-list-server.herokuapp.com';

const urlParams = new URLSearchParams(location.search);

const id = urlParams.get('id');
const first_name = urlParams.get('first_name');
const last_name = urlParams.get('last_name');
const phone = urlParams.get('phone');
const email = urlParams.get('email');

const inputFirstName = document.querySelector('#first-name');
const inputLastName = document.querySelector('#last-name');
const inputPhone = document.querySelector('#phone');
const inputEmail = document.querySelector('#email');

const buttonCreate = document.querySelector('.button-edit-contact');

function fillInputs() {
  document.querySelector('.title-main').textContent = `Modificando ${first_name}`;

  inputFirstName.value = first_name;
  inputLastName.value = last_name;
  inputPhone.value = phone;
  inputEmail.value = email;
}

function sendData() {
  const formData = {
    id,
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    phone: inputPhone.value,
    email: inputEmail.value,
  };

  const requestDetails = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  };

  fetch(`${baseURL}/edit-contact`, requestDetails)
    .then((data) => data.json())
    .then((response) => {
      if (response.status === 'error') return alert(response.error);

      alert('Contato atualizado com sucesso!');
      location.href = '/';
    });
}

buttonCreate.addEventListener('click', sendData);

fillInputs();
