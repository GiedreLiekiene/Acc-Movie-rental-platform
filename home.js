// JavaScript array containing information about 8 movies
const movies = [
  { name: "Movie 1", genre: "Action", price: "4.55$", stockCount: 5 },
  { name: "Movie 2", genre: "Comedy", price: "3.99$", stockCount: 0 },
  { name: "Movie 3", genre: "Drama", price: "6.25$", stockCount: 2 },
  { name: "Movie 4", genre: "Thriller", price: "5.75$", stockCount: 0 },
  { name: "Movie 5", genre: "Adventure", price: "7.50$", stockCount: 3 },
  { name: "Movie 6", genre: "Sci-Fi", price: "6.99$", stockCount: 1 },
  { name: "Movie 7", genre: "Romance", price: "4.25$", stockCount: 0 },
  { name: "Movie 8", genre: "Horror", price: "4.99$", stockCount: 4 },
];

// Store the available movies array in local storage
localStorage.setItem("availableMovies", JSON.stringify(movies));

// Array to store rented movies
const yourMovies = [];

// Function to generate the movie list dynamically
function generateMovieList() {
  const movieTable = document.getElementById("movieTable");
  movieTable.innerHTML = ""; // Clear the existing table content

  // Retrieve available movies from local storage
  const availableMovies =
    JSON.parse(localStorage.getItem("availableMovies")) || [];

  availableMovies.forEach((movie) => {
    // ... (rest of the function remains the same)
  });

  movies.forEach((movie) => {
    const row = document.createElement("tr");
    row.className = "table-content";

    const nameCell = document.createElement("td");
    nameCell.textContent = movie.name;
    row.appendChild(nameCell);

    const genreCell = document.createElement("td");
    genreCell.textContent = movie.genre;
    row.appendChild(genreCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = movie.price;
    row.appendChild(priceCell);

    const stockCell = document.createElement("td");
    const stockIcon = document.createElement("img");
    stockIcon.style.height = "10%";
    stockIcon.style.width = "10%";

    if (movie.stockCount > 0) {
      stockIcon.src = "./icons/green.png";
    } else {
      stockIcon.src = "./icons/red.png";
    }
    stockCell.appendChild(stockIcon);
    row.appendChild(stockCell);

    const buttonCell = document.createElement("td");
    buttonCell.className = "btn-column";
    const rentButton = document.createElement("button");
    rentButton.className = "button";
    rentButton.textContent = "Rent";
    rentButton.href = "home.html";

    // Add event listener to the "Rent" button
    rentButton.addEventListener("click", () => {
      rentMovie(movie);
    });

    buttonCell.appendChild(rentButton);
    row.appendChild(buttonCell);
    movieTable.appendChild(row);
  });
}

// Call the function to generate the movie list on page load
generateMovieList();

// Function to log the content of the yourMovies array to the console
function showYourMovies() {
  console.log("Your Movies:", yourMovies);
}

// Function to handle renting a movie
function rentMovie(movie) {
  // Check if the movie is in stock before allowing rental
  if (movie.stockCount > 0) {
    // Reduce the stock count for the rented movie
    movie.stockCount--;
  } else {
    alert("Sorry, this movie is out of stock.");

    // Add the rented movie to the yourMovies array
    yourMovies.push({
      name: movie.name,
      genre: movie.genre,
      price: movie.price,
    });

    // Update available movies in local storage
    const availableMovies = JSON.parse(localStorage.getItem("availableMovies"));
    const movieIndex = availableMovies.findIndex((m) => m.name === movie.name);
    if (movieIndex !== -1) {
      availableMovies[movieIndex].stockCount--;
      localStorage.setItem("availableMovies", JSON.stringify(availableMovies));
    }

    // Update the user's information in local storage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Retrieve current user's information from local storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Add the rented movie to the user's rented movies
    currentUser.rentedMovies.push({
      name: movie.name,
      genre: movie.genre,
      price: movie.price,
    });

    // Function to display the user's rented movies
    function displayRentedMovies() {
      const rentedMoviesList = document.getElementById("rentedMoviesList");

      if (currentUser && currentUser.rentedMovies) {
        currentUser.rentedMovies.forEach((movie) => {
          const movieItem = document.createElement("li");
          movieItem.textContent = `${movie.name} - ${movie.genre} - ${movie.price}`;
          rentedMoviesList.appendChild(movieItem);
        });
      }
    }

    // Call the function to display rented movies on page load
    displayRentedMovies();

    // List of restricted pages for empty user
    const restrictedPages = ["home.html", "yourMovies.html", "profile.html"];

    // Redirect user if currentUser is empty and they are trying to access a restricted page
    if (
      !currentUser &&
      restrictedPages.includes(window.location.pathname.split("/").pop())
    ) {
      window.location.href = "login.html"; // Redirect to login page
    }

    // If currentUser is not empty and the user tries to access the login page, redirect them to home.html
    if (
      currentUser &&
      window.location.pathname.split("/").pop() === "login.html"
    ) {
      window.location.href = "home.html";
    }

    if (currentUser) {
      console.log("Current User:", currentUser);

      // Example: Display the user's name on the page
      const userNameElement = document.getElementById("userName");
      if (userNameElement) {
        userNameElement.textContent = currentUser.name;
      }
    } else {
      console.log("No current user found.");
    }

    // Log the rented movie to the console
    console.log(`You rented: ${movie.name} - ${movie.genre} - ${movie.price}`);

    // Update the movie table
    generateMovieList();
  }
}

// Function to handle user logout
function logoutUser() {
  // Clear any user-related data or session
  localStorage.removeItem("currentUser");

  // Redirect to the login page
  window.location.href = "login.html";
}
