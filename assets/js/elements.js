export let restart = document.createElement("button");
restart.className = "restart";
restart.innerHTML = "restart";
restart.addEventListener("click", () => {
  location.reload();
});

export let timer = document.querySelector("#timer"),
  modal = document.createElement("div"),
  game = document.querySelector(".game");
