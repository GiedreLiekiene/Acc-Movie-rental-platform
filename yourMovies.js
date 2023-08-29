// JavaScript array containing information about the movies the user has rented
const yourMovies = [
  {
    name: "Batman",
    genre: "Action",
    time: "12h",
    price: "4.55$",
  },
  {
    name: "Batman",
    genre: "Action",
    time: "12h",
    price: "4.55$",
  },
];

// Function to generate the list of rented movies
function generateRentedMoviesList() {
  const rentedMoviesTable = document.querySelector(".table2");
  const elements = document.querySelectorAll("." + "table-content");
  elements.forEach((element) => {
    element.remove();
  });
  yourMovies.forEach((movie) => {
    const row = document.createElement("tr");
    row.className = "table-content";

    const nameCell = document.createElement("td");
    nameCell.textContent = movie.name;
    row.appendChild(nameCell);

    const genreCell = document.createElement("td");
    genreCell.textContent = movie.genre;
    row.appendChild(genreCell);

    const timeCell = document.createElement("td");
    const timeWindow = document.createElement("span");
    timeWindow.className = "time-window";
    const leftArrowButton = createTimeButton("<", "button-time");
    const rightArrowButton = createTimeButton(">", "button-time");
    let rentalTime = parseInt(movie.time); // Parse the rental time as an integer

    leftArrowButton.addEventListener("click", () => {
      rentalTime = Math.max(rentalTime - 12, 12); // Decrement by 12 hours, but not below 12 hours
      updateTimeWindow();
    });

    rightArrowButton.addEventListener("click", () => {
      rentalTime = Math.min(rentalTime + 12, 168); // Increment by 12 hours, but not above 168 hours (1 week)
      updateTimeWindow();
    });

    function updateTimeWindow() {
      timeWindow.textContent = rentalTime + "h";
    }

    updateTimeWindow();

    timeCell.appendChild(leftArrowButton);
    timeCell.appendChild(timeWindow);
    timeCell.appendChild(rightArrowButton);
    row.appendChild(timeCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = movie.price;
    row.appendChild(priceCell);

    const buttonCell = document.createElement("td");
    buttonCell.className = "btn-column";
    const removeButton = document.createElement("button");
    removeButton.className = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeMovie(movie);
    });
    buttonCell.appendChild(removeButton);
    row.appendChild(buttonCell);

    rentedMoviesTable.appendChild(row);
  });
}

// Helper function to create time buttons for rental period
function createTimeButton(text, className) {
  const button = document.createElement("button");
  button.className = className;
  button.textContent = text;
  return button;
}

// Function to handle removing a movie from yourMovies array
function removeMovie(movie) {
  const movieIndex = yourMovies.findIndex((m) => m.name === movie.name);
  if (movieIndex !== -1) {
    yourMovies.splice(movieIndex, 1);
    generateRentedMoviesList(); // Update the table after removing the movie
    updateHomePageMovieList(movie.name); // Increment the count in stock value in the home page movie list
  }
}

// Function to increment the count in stock value in the home page movie list
function updateHomePageMovieList(movieName) {
  const movieTable = document.getElementById("movieTable");
  if (!movieTable) return; // If the table is not present, do nothing

  const movieRows = movieTable.querySelectorAll(".table-content");
  movieRows.forEach((row) => {
    const nameCell = row.querySelector("td:first-child");
    if (nameCell.textContent === movieName) {
      const stockCell = row.querySelector("td:last-child");
      const stockImage = stockCell.querySelector("img");
      stockImage.src = "icons/green.png"; // Assuming green.png indicates the movie is in stock
      // Increment the count in stock value (assuming it's stored as a custom attribute "data-stock")
      const stockCount = parseInt(stockCell.getAttribute("data-stock"));
      stockCell.setAttribute("data-stock", stockCount + 1);
    }
  });
}

// Call the function to generate the list of rented movies on page load
generateRentedMoviesList();
