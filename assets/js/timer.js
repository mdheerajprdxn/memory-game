import { showGameOver } from "./showGameOver.js";

let gameOver = false;

export function setGameover() {
  gameOver = true;
}

export function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    if (gameOver) {
      return;
    }
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      showGameOver("lose");
      gameOver = true;
    }
  }, 1000);
}

window.onload = function () {
  var timeLimit = 60,
    display = document.querySelector("#time");
  startTimer(timeLimit, display);
};
