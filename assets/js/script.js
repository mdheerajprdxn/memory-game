/* Author: 

*/
import { startTimer, setGameover } from "./timer.js";
import { timer, game } from "./elements.js";
import { showGameOver } from "./showGameOver.js";

window.onload = function () {
  let tileList = document.createElement("ul");

  //   Start Timer
  startTimer(60, timer);

  game.append(tileList);
  let arr = {};
  for (let i = 1; i < 7; i++) {
    arr[i] = i;
  }

  //   Create the object wich decides the layout of the tiles
  function generateAnswer() {
    for (const [key, value] of Object.entries(arr)) {
      arr[key] = [];
      for (let i = 0; i < 2; i++) {
        let duplicate = true;
        let randomNo;
        let i = 1;
        while (duplicate) {
          i++;
          if (i > 100) return;
          randomNo = Math.floor(Math.random() * 12);
          duplicate = ifDuplicate(randomNo);
        }
        arr[key].push(randomNo);
      }
    }
    console.log("full array", arr);
  }

  generateAnswer();

  function ifDuplicate(no) {
    let duplicate = false;
    for (const [key, value] of Object.entries(arr)) {
      if (Object.values(arr[key]).indexOf(no) > -1) {
        duplicate = true;
      }
    }
    return duplicate;
  }

  //   render the tiles
  let createTiles = () => {
    for (let i = 0; i < 12; i++) {
      let tile = document.createElement("li");
      let index;
      for (const [key, value] of Object.entries(arr)) {
        if (Object.values(arr[key]).indexOf(i) > -1) {
          index = key;
        }
      }
      tile.setAttribute("answer", index);
      tile.classList.add("tile");
      tile.addEventListener("click", turnTile);
      tile.style.backgroundImage = `url(./assets/images/secret.jpg)`;
      tileList.append(tile);
    }
  };

  createTiles();

  let turned = 0;
  function turnTile(e) {
    turned++;
    if (turned > 2) {
      resetTiles();
      turned = 1;
    }
    let tile = e.target;
    if (tile.getAttribute("done")) {
      return;
    }
    tile.setAttribute("turned", true);

    if (turned == 2) {
      checkMatch();
    }
    let img = tile.getAttribute("answer");
    tile.style.backgroundImage = `url(./assets/images/${img}.jpg)`;
  }

  //   reset tiles after two tiles are turned
  function resetTiles() {
    let tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile) => {
      if (!tile.getAttribute("done")) {
        tile.style.backgroundImage = `url(./assets/images/secret.jpg)`;
        tile.setAttribute("turned", false);
      }
    });
  }

  //   check for matching tiles
  function checkMatch() {
    let turnedTiles = document.querySelectorAll("li[turned='true']");

    if (turnedTiles.length > 1) {
      console.log("in check");
      if (
        turnedTiles[0].getAttribute("answer") ==
        turnedTiles[1].getAttribute("answer")
      ) {
        turnedTiles[0].setAttribute("done", true);
        turnedTiles[1].setAttribute("done", true);
        turnedTiles[0].setAttribute("turned", false);
        turnedTiles[1].setAttribute("turned", false);
        turnedTiles[0].classList.add("done");
        turnedTiles[1].classList.add("done");
        checkFinish();
      }
    }
  }

  //   check if all tiles are matched
  function checkFinish() {
    let doneTiles = document.querySelectorAll("li[done='true']");
    if (doneTiles.length == 12) {
      showGameOver("win");
      gameOver = true;
      setGameover();
    }
  }
};
