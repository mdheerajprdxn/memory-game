import { modal, restart } from "./elements.js";

export function showGameOver(status) {
  modal.classList.add("gameover-modal");
  document.body.append(modal);
  let modalInner = document.createElement("div");
  modalInner.className = status;
  if (status == "win") {
    modalInner.innerHTML = "<span>you won</span>";
  } else if (status == "lose") {
    modalInner.innerHTML = "<span>you lost</span>";
  }
  modalInner.append(restart);
  modal.append(modalInner);
}
