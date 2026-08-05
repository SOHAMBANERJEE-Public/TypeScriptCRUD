// Load existing data from localStorage
let user_arr = JSON.parse(localStorage.getItem("User_Data") || "[]");
// Handle form submission
document.getElementById("userForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveData();
});
let editIndex = null; // Track which row is being edited
function saveData() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let paswd = document.getElementById("password");
    let gender = document.querySelector('input[name="option"]:checked');
    let city = document.getElementById("city");
    let user_data = {
        user_Name: name.value,
        user_email: email.value,
        user_paswd: paswd.value,
        user_gender: gender?.value || "",
        user_city: city.value
    };
    if (user_arr.some(user => user.user_email === email.value && editIndex === null)) {
        alert("Email already exists! Please use a different email.");
        return;
    }
    if (editIndex !== null) {
        user_arr[editIndex] = user_data;
        editIndex = null;
        alert("Data updated successfully!");
    }
    else {
        // Add new entry
        user_arr.push(user_data);
        alert("Registration successful!");
    }
    // Save to localStorage
    localStorage.setItem("User_Data", JSON.stringify(user_arr));
    // Reset form
    document.getElementById("userForm").reset();
    displayData();
}
function deleteData(index) {
    user_arr.splice(index, 1);
    localStorage.setItem("User_Data", JSON.stringify(user_arr));
    displayData();
}
function editData(index) {
    let user = JSON.parse(JSON.stringify(user_arr[index]));
    document.getElementById('submit').value = "Update"; // Change button text to "Update"
    document.getElementById("name").value = user.user_Name;
    document.getElementById("email").disabled = true;
    document.getElementById("email").value = user.user_email;
    document.getElementById("password").value = user.user_paswd;
    (document.querySelector(`input[name="option"][value="${user.user_gender}"]`)).checked = true;
    document.getElementById("city").value = user.user_city;
    editIndex = index; // Mark this index for updating
}
function displayData() {
    let tbody = document.querySelector("#userTable tbody");
    tbody.innerHTML = "";
    user_arr.forEach((user, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
      <td>${user.user_Name}</td>
      <td>${user.user_email}</td>
      <td>${user.user_paswd}</td>
      <td>${user.user_gender}</td>
      <td>${user.user_city}</td>
      <td>
        <button onclick="deleteData(${index})">Delete</button>
        <button onclick="editData(${index})">Edit</button>
      </td>
    `;
        tbody.appendChild(row);
    });
}
// Display data on page load
displayData();
// Expose functions globally for button onclick
window.deleteData = deleteData;
window.editData = editData;
export {};
//# sourceMappingURL=index.js.map