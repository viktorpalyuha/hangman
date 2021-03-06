let guess = document.querySelector(".guess");
let button = document.querySelector("button");
let answer = document.querySelector(".answer");
let attempts = document.querySelector(".attempts");
let words = ["cat", "fish", "rabbit", "rat"];
let randomWord = words[Math.floor(Math.random() * words.length)].split("");
let remainingLetters = randomWord.length;
let remainingAttempts = 6;
let answerArray = [];
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

//Draw gallows
ctx.fillRect(225, 475, 75, 25);
ctx.fill();
ctx.beginPath();
ctx.lineWidth = 8;
ctx.moveTo(265, 475);
ctx.lineTo(265, 200);
ctx.lineTo(400, 200);
ctx.stroke();
ctx.lineWidth = 6;
ctx.moveTo(390, 200);
ctx.lineTo(390, 280);
ctx.stroke();

let hangingMan = {
  5: function drawHead() {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.arc(390, 300, 20, 0, Math.PI * 2, false); // head
    ctx.stroke();
  },
  4: function drawBody() {
    ctx.moveTo(390, 320);
    ctx.lineTo(390, 400); // body
    ctx.stroke();
  },
  3: function drawLeftHand() {
    ctx.moveTo(390, 340);
    ctx.lineTo(370, 380); // left hand
    ctx.stroke();
  },
  2: function drawRightHand() {
    ctx.moveTo(390, 340);
    ctx.lineTo(410, 380); // right hand
    ctx.stroke();
  },
  1: function drawLeftLeg() {
    ctx.moveTo(390, 400);
    ctx.lineTo(370, 440); // left leg
    ctx.stroke();
  },
  0: function drawRightLeg() {
    ctx.moveTo(390, 400);
    ctx.lineTo(410, 440); // right leg
    ctx.stroke();
  },
};

function startGame() {
  for (let i = 0; i < randomWord.length; i++) {
    answerArray.push("_");
  }
  answer.innerHTML = answerArray.join(" ");
}

function checkGuess(guess) {
  if (guess.value.length !== 1) {
    alert("Please, enter only one letter");
  } else if (randomWord.includes(guess.value.toLowerCase())) {
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === guess.value.toLowerCase()) {
        answerArray[i] = guess.value.toLowerCase();
        answer.innerHTML = answerArray.join(" ");
        remainingLetters--;
      }
    }
    randomWord = randomWord.map((item, i) => item === guess.value.toLowerCase() ? "" : item);
    console.log(randomWord);
  } else {
    remainingAttempts--;
    hangingMan[remainingAttempts]();
  }

  guess.value = "";

  if (remainingLetters === 0) {
    setTimeout(() => {
      alert(answerArray.join(" "));
      alert("Great! Your guess was correct");
    }, 0);
    guess.remove();
    button.remove();
  } else if (remainingAttempts === 0) {
    setTimeout(() => alert("You lost :("), 0);
    guess.remove();
    button.remove();
  }
}

button.addEventListener("click", () => checkGuess(guess));

guess.addEventListener("keyup", () => {
  if (event.keyCode === 13) {
    event.preventDefault;
    checkGuess(guess);
  }
});

startGame();
