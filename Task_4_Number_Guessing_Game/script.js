let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let gameOver = false;

function checkGuess() {

    if (gameOver) {
        return;
    }

    const input = document.getElementById("guessInput");
    const guess = Number(input.value);
    const message = document.getElementById("message");

    if (guess < 1 || guess > 100 || !Number.isInteger(guess)) {
        message.textContent = "Please enter a number between 1 and 100.";
        return;
    }

    attempts++;

    document.getElementById("attempts").textContent = attempts;

    if (guess === secretNumber) {

        message.textContent =
            `🎉 Correct! You guessed the number in ${attempts} attempts.`;

        gameOver = true;
        input.disabled = true;

    } else if (guess < secretNumber) {

        message.textContent = "📈 Too Low! Try a higher number.";

    } else {

        message.textContent = "📉 Too High! Try a lower number.";
    }

    input.value = "";
    input.focus();
}

function restartGame() {

    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;

    document.getElementById("attempts").textContent = "0";
    document.getElementById("guessInput").value = "";
    document.getElementById("guessInput").disabled = false;

    document.getElementById("message").textContent =
        "New game started! Make your first guess.";

    document.getElementById("guessInput").focus();
}