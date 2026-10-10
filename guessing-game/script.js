// Guess a sequence of three different digits (0-9) in ten tries.
var boxes = ["box1", "box2", "box3"].map(function (id) { return document.getElementById(id); });
var answer, guessesLeft;

function newGame() {
    var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    answer = [];
    while (answer.length < 3) {
        answer.push(digits.splice(Math.floor(Math.random() * digits.length), 1)[0]);
    }
    guessesLeft = 10;
    document.getElementById("counter").textContent = guessesLeft;
    document.getElementById("message").textContent = "";
    document.getElementById("submit").disabled = false;
    document.getElementById("restart").hidden = true;
    boxes.forEach(function (box) {
        box.value = "";
        box.className = "box";
        box.disabled = false;
    });
    boxes[0].focus();
}

function check() {
    var guess = boxes.map(function (box) { return box.value; });
    if (guess.some(function (value) { return value === ""; })) {
        document.getElementById("message").textContent = "Enter a number in every box.";
        return;
    }

    guess.forEach(function (value, i) {
        var n = Number(value);
        var colour = n === answer[i] ? "green" : answer.indexOf(n) !== -1 ? "yellow" : "red";
        boxes[i].className = "box " + colour;
    });

    guessesLeft--;
    document.getElementById("counter").textContent = guessesLeft;

    if (guess.join("") === answer.join("")) {
        endGame("You won!");
    } else if (guessesLeft === 0) {
        endGame("Out of guesses. The numbers were " + answer.join(" ") + ".");
    } else {
        document.getElementById("message").textContent = "";
    }
}

function endGame(text) {
    document.getElementById("message").textContent = text;
    document.getElementById("submit").disabled = true;
    document.getElementById("restart").hidden = false;
    boxes.forEach(function (box) { box.disabled = true; });
}

// Only one digit per box; move to the next box after typing one.
boxes.forEach(function (box, i) {
    box.addEventListener("input", function () {
        box.value = box.value.replace(/[^0-9]/g, "").slice(-1);
        if (box.value && boxes[i + 1]) boxes[i + 1].focus();
    });
    box.addEventListener("keydown", function (e) {
        if (e.key === "Enter") check();
    });
});

document.getElementById("submit").addEventListener("click", check);
document.getElementById("restart").addEventListener("click", newGame);
newGame();
