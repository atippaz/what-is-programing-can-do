import { movePlayer } from "./player.js";
function getElement(key) {
  return document.getElementById(key);
}

const playerImages = {
  up: "Player_run_up.gif",
  down: "Player_run_down.gif",
  left: "Player_run_left.gif",
  right: "Player_run_right.gif",
  idle: "Player_idle.gif",
};

const baseAssetAddress = "../asset/";

const element = {
  startGame: "start-game",
  boardGame: "board-game",
  player: "player",
};

// const startgame = document.getElementById(element.startGame);
let hasPress = false;

// startgame.addEventListener("click", (e) => {
//   startgame.style.display = "none";

// });
document.addEventListener("DOMContentLoaded", () => {
  const gameboard = document.getElementById(element.boardGame);
  var elem = document.createElement("img");
  elem.setAttribute("src", baseAssetAddress + playerImages.idle);
  elem.setAttribute("height", "50");
  elem.setAttribute("width", "50");
  elem.setAttribute("id", element.player);
  elem.style.top = gameboard.style.top;
  elem.style.left = gameboard.style.left;
  elem.style.position = "absolute";

  gameboard.appendChild(elem);
  document.addEventListener("keypress", async (e) => {
    if (hasPress) return;

    const keyboardPressed = e.key;
    const player = getElement(element.player);
    const maxDistance = 50;
    hasPress = true;
    if (keyboardPressed === "w") {
      player.src = baseAssetAddress + playerImages.up;
      await movePlayer(player, "top", -maxDistance);
    } else if (keyboardPressed === "s") {
      player.src = baseAssetAddress + playerImages.down;
      await movePlayer(player, "top", maxDistance);
    } else if (keyboardPressed === "a") {
      player.src = baseAssetAddress + playerImages.left;
      await movePlayer(player, "left", -maxDistance);
    } else if (keyboardPressed === "d") {
      player.src = baseAssetAddress + playerImages.right;
      await movePlayer(player, "left", maxDistance);
    }
    player.src = baseAssetAddress + playerImages.idle;
    hasPress = false;
  });
});
