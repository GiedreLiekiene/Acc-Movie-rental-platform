// Hardcoded values
let name = "John";
let surname = "Newman";
let email = "john.newman@mail.com";

function resetPassword() {
  // Implement password reset functionality here if needed
  console.log("Password reset functionality not implemented yet.");
}

function resetEmail() {
  const newEmail = prompt("Enter your new email:");

  if (newEmail !== null && newEmail.trim() !== "") {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(newEmail)) {
      email = newEmail;
      updateProfileInfo();
    } else {
      alert("Invalid email format. Please enter a valid email.");
    }
  } else if (newEmail !== null) {
    alert("Email cannot be empty. Please enter a valid email.");
  }
}

function updateProfileInfo() {
  document.getElementById("name").textContent = `Name: ${name}`;
  document.getElementById("surname").textContent = `Surname: ${surname}`;
  document.getElementById("email").textContent = `Email: ${email}`;
}
