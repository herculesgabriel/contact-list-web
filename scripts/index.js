const baseURL = location.hostname.includes('localhost')
  ? 'http://localhost:3000' : 'https://contact-list-server.herokuapp.com';

function createList(data) {
  const emptyList = document.querySelector('.empty-list');
  const contactList = document.querySelector('.contact-list');

  data.forEach(({ id, first_name, last_name, phone, email }) => {
    const contacts = document.querySelector('.contacts');

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${first_name}</td>
      <td>${last_name}</td>
      <td>${phone}</td>
      <td>${email}</td>
      <td class="buttons-row">
        <a href="/pages/edit-contact.html?id=${id}&first_name=${first_name}&last_name=${last_name}&phone=${phone}&email=${email}">
          <button class="table-button edit-button" type="button"></button>
        </a>

        <button
          class="table-button delete-button"
          type="button"
          onclick="deleteContact(${id})">
        </button>
      </td>
    `;

    contacts.appendChild(row);
  });

  emptyList.style.display = 'none';
  contactList.style.display = 'flex';
}

function deleteContact(id) {
  fetch(`${baseURL}/delete-contact/${id}`, { method: 'POST' })
    .then((data) => data.json())
    .then((response) => {
      if (response.status === 'error') return alert(response.error);

      alert('Contato deletado com sucesso!');
      location.href = '/';
    });
}

function getData() {
  fetch(`${baseURL}/get-data`)
    .then((data) => data.json())
    .then((response) => {
      if (response.status === 'OK') createList(response.rows);
    });
}

getData();
