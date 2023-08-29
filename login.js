// Login form validation
let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

function validateLoginForm() {
  const emailInput = document.getElementById("emailLogin");
  const passwordInput = document.getElementById("passwordLogin");
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Check if both email and password fields are not empty
  if (email === "" || password === "") {
    alert("Both email and password fields are required.");
    return;
  }

  //Find a registered user with matching email and password
  const matchedUser = registeredUsers.find(
    (user) => user.email === email && user.password === password
  );

  if (matchedUser) {
    alert("Login successful!");

    // Store current user's information in local storage
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));

    // Redirect to home.html and pass user's rented movies as a query parameter
    window.location.href = `home.html?rentedMovies=${JSON.stringify(
      matchedUser.rentedMovies
    )}`;
  } else {
    alert("Invalid email or password. Please try again.");
  }
}

//Register form validation
function validateRegisterForm() {
  const nameInput = document.getElementById("name");
  const surnameInput = document.getElementById("surname");
  const emailInput = document.getElementById("emailRegister");
  const emailAgainInput = document.getElementById("emailAgain");
  const passwordInput = document.getElementById("passwordRegister");
  const passwordAgainInput = document.getElementById("passwordAgain");

  const name = nameInput.value.trim();
  const surname = surnameInput.value.trim();
  const email = emailInput.value.trim();
  const emailAgain = emailAgainInput.value.trim();
  const password = passwordInput.value.trim();
  const passwordAgain = passwordAgainInput.value.trim();

  // Name field validation
  const nameRegex = /^[A-Za-z]{2,}$/;
  if (!nameRegex.test(name)) {
    alert("Name should contain two or more letters and cannot be empty.");
    nameInput.focus();
    return;
  }

  // Surname field validation (optional)
  if (surname !== "" && !nameRegex.test(surname)) {
    alert("Surname should contain two or more letters.");
    surnameInput.focus();
    return;
  }

  // Email field validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log(email, emailInput);
    alert("Please provide a valid email address.");
    emailInput.focus();
    return;
  }

  // Email again field validation
  if (emailAgain !== email) {
    alert("Email addresses do not match.");
    emailAgainInput.focus();
    return;
  }

  // Password field validation
  if (password.length < 8) {
    alert("Password should be 8 or more symbols long.");
    passwordInput.focus();
    return;
  }

  // Password again field validation
  if (passwordAgain !== password) {
    alert("Passwords do not match.");
    passwordAgainInput.focus();
    return;
  }

  const newUser = {
    name: name,
    surname: surname,
    email: email,
    password: password,
  };

  registeredUsers.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

  // Store current user's information in local storage
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  // Redirect to home.html after successful registration
  window.location.href = "home.html";
}
