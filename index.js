document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("busBookingForm").addEventListener("submit", handleFormSubmit);
    fetchAndDisplayUsers();
});

function handleFormSubmit(event) {
    event.preventDefault();
    
    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        BusNumber: event.target.BusNumber.value
    };

    axios
        .post("https://crudcrud.com/api/2dc9274202a541ae8a542450d22bdd38/bookingdata", userDetails)
        .then((response) => {
            displayUserOnScreen(response.data);
            clearInputFields();
        })
        .catch((error) => console.log(error));
}

function clearInputFields() {
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("BusNumber").value = "Bus 1";
}

function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.className = 'booking-item';
    userItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone} - ${userDetails.BusNumber}`;
    userItem.id = userDetails._id; // Assigning an id to the list item for easier deletion

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => handleDelete(userItem, userDetails._id));
    userItem.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => handleEdit(userItem, userDetails));
    userItem.appendChild(editBtn);

    document.querySelector(".bookings ul").appendChild(userItem);
}

function handleDelete(userItem, id) {
    axios
        .delete(`https://crudcrud.com/api/2dc9274202a541ae8a542450d22bdd38/bookingdata/666ebbfc19f3e403e81e3280`)
        .then(() => {
            userItem.remove();
        })
        .catch((error) => console.log(error));
}

function handleEdit(userItem, userDetails) {
    // Populating input fields with user details
    document.getElementById("username").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;
    document.getElementById("BusNumber").value = userDetails.BusNumber;

    // Deleting the user from crudcrud
    handleDelete(userItem, userDetails._id);
}

function fetchAndDisplayUsers() {
    axios
        .get("https://crudcrud.com/api/2dc9274202a541ae8a542450d22bdd38/bookingdata")
        .then((response) => {
            response.data.forEach((user) => displayUserOnScreen(user));
        })
        .catch((error) => console.log(error));
}

function filterBookings() {
    const filterValue = document.getElementById('filter').value;
    const bookingsContainer = document.querySelector('.bookings ul');
    bookingsContainer.innerHTML = '';

    axios
        .get("https://crudcrud.com/api/2dc9274202a541ae8a542450d22bdd38/bookingdata")
        .then((response) => {
            const filteredBookings = filterValue === 'All' ? response.data : response.data.filter(user => user.BusNumber === filterValue);
            filteredBookings.forEach(user => displayUserOnScreen(user));
        })
        .catch((error) => console.log(error));
}
