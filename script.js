
function createDeleteButton(userId) {
  const deleteButton = document.createElement('span');
  deleteButton.className = 'delete-button';
  deleteButton.innerHTML = '&#10060;';
  deleteButton.addEventListener('click', function() {
    deleteAppointment(userId);
  });
  return deleteButton;
}


function deleteAppointment(userId) {
  axios.delete(`https://crudcrud.com/api/your-unique-identifier/${userId}`)
    .then(response => {
      console.log('Appointment deleted successfully:', response.data);
      removeUserDetail(userId);
    })
    .catch(error => {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment. Please try again.');
    });
}


function removeUserDetail(userId) {
  const userElement = document.getElementById(userId);
  if (userElement) {
    userElement.remove();
  }
}


document.getElementById('appointmentForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  const appointment = {
    name: name,
    date: date,
    time: time
  };

  axios.post('https://crudcrud.com/api/your-unique-identifier', appointment)
    .then(response => {
      console.log('Appointment stored successfully:', response.data);
      alert('Appointment booked successfully!');
      document.getElementById('appointmentForm').reset();
      addUserDetail(response.data._id, name, date, time);
    })
    .catch(error => {
      console.error('Error storing appointment:', error);
      alert('Failed to book appointment. Please try again.');
    });
});


function addUserDetail(userId, name, date, time) {
  const userList = document.getElementById('userList');

  const userDetail = document.createElement('div');
  userDetail.className = 'user-detail';
  userDetail.id = userId;

  const userDetails = document.createElement('div');
  userDetails.className = 'user-info';

  const userName = document.createElement('p');
  userName.textContent = name;

  const userDate = document.createElement('p');
  userDate.textContent = date;

  const userTime = document.createElement('p');
  userTime.textContent = time;

  const deleteButton = createDeleteButton(userId);

  userDetails.appendChild(userName);
  userDetails.appendChild(userDate);
  userDetails.appendChild(userTime);

  userDetail.appendChild(userDetails);
  userDetail.appendChild(deleteButton);

  userList.appendChild(userDetail);
}


axios.get('https://crudcrud.com/api/your-unique-identifier')
  .then(response => {
    const appointments = response.data;
    for (const appointment of appointments) {
      addUserDetail(appointment._id, appointment.name, appointment.date, appointment.time);
    }
  })
  .catch(error => {
    console.error('Error fetching appointments:', error);
  });
