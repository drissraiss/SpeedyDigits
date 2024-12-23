// Function to generate a random number between 1 and 9999
function generateRandomNumber() {
    return Math.floor(Math.random() * 9999) + 1;
}

// Function to update and style the random number while typing
function updateRandomNumberStyling() {
    const userInput = document.getElementById("userInput").value;
    const messageElement = document.getElementById("message");
    const errorMessageElement = document.getElementById("error-message");

    // Show error message if the input is not a valid number
    const userNumber = parseInt(userInput, 10);
    if (isNaN(userNumber) && userInput.length > 0) {
        errorMessageElement.classList.remove("hidden");
    } else {
        errorMessageElement.classList.add("hidden");
    }

    // Split random number into individual digits
    const randomNumberString = randomNumber.toString();
    let styledNumber = "";

    let correctInput = true; // flag to track if all digits are correct

    // Iterate through each digit of the random number and style it
    for (let i = 0; i < randomNumberString.length; i++) {
        const randomDigit = randomNumberString[i];
        const userDigit = userInput[i];

        // If the user typed the correct digit at this position, style it as green
        if (userDigit === randomDigit) {
            styledNumber += `<span class="correct">${randomDigit}</span>`;
        }
        // If the user typed a digit that does not match, style it as red
        else if (userDigit !== undefined) {
            styledNumber += `<span class="incorrect">${randomDigit}</span>`;
            correctInput = false; // mark that the input is incorrect
        }
        // If the digit has not been typed, display it in black
        else {
            styledNumber += `<span class="untyped">${randomDigit}</span>`;
        }
    }

    // Update the random number with the styled digits
    document.getElementById("randomNumber").innerHTML = styledNumber;

    // Play sound based on whether the typed digit is correct or not
    if (correctInput) {
        correctSound.play();
    } else {
        incorrectSound.play();
    }
}

// Function to check the user's guess when clicking the "Check" button
function checkGuess() {
    let userInput = document.getElementById("userInput").value.trim(); // Trim spaces from input
    const messageElement = document.getElementById("message");
    const errorMessageElement = document.getElementById("error-message");

    // Check if the input is a valid number
    const userNumber = parseInt(userInput, 10);

    // If the input is not a valid number
    if (isNaN(userNumber) || userInput === "") {
        errorMessageElement.classList.remove("hidden");
        return;
    } else {
        errorMessageElement.classList.add("hidden");
    }

    // Play the appropriate sound based on the correctness of the guess
    if (userInput === randomNumber.toString()) {
        messageElement.textContent = "Correct! Well done.";
        messageElement.className = "correct";
        messageElement.classList.remove("hidden");

        // Increment the games won counter
        gamesWon++;
        document.getElementById("gamesWon").textContent = gamesWon;

        // Generate a new random number and reset the game state
        randomNumber = generateRandomNumber();
        document.getElementById("randomNumber").textContent = randomNumber;

        resetInput(); // Clear input and reset message
    } else {
        messageElement.textContent = "Incorrect! Try again.";
        messageElement.className = "incorrect";
        messageElement.classList.remove("hidden");
    }
}

// Function to reset the input and message display
function resetInput() {
    document.getElementById("userInput").value = ""; // Clear input
    document.getElementById("message").classList.add("hidden");
    document.getElementById("error-message").classList.add("hidden");
    document.getElementById("randomNumber").style.color = "black";
}

// Generate the initial random number
let randomNumber = generateRandomNumber();
document.getElementById("randomNumber").textContent = randomNumber;

// Initialize the gamesWon counter
let gamesWon = 0;

// Audio elements for correct and incorrect guesses
const correctSound = new Audio("correct.mp3"); // Make sure the path is correct
const incorrectSound = new Audio("incorrect.mp3"); // Make sure the path is correct

// Event listener for the "Check" button
document.getElementById("checkBtn").addEventListener("click", checkGuess);

// Allow checking on pressing space or enter
document.addEventListener("keydown", function (event) {
    if (event.key === " " || event.key === "Enter") {
        event.preventDefault(); // Prevent spacebar or enter from being typed
        checkGuess(); // Check the guess
    }
});

// Continuously update styling while typing
document.getElementById("userInput").addEventListener("input", updateRandomNumberStyling);
document.getElementById("userInput").onblur = function () {
    this.focus();
};
