let diffHeight = null;
let diffWidth = null;
export async function movePlayer(player, direction, distance) {
  const _c = document.defaultView.getComputedStyle(player);
  let currentPosition = parseInt(_c[direction].split("px")[0]);
  let targetPosition = currentPosition + distance;
  let step = distance > 0 ? 5 : -5;
  const gameboard = document.getElementById("board-game");
  const gameboardRect = gameboard.getBoundingClientRect();
  if (diffHeight == null) {
    diffHeight = currentPosition;
  }
  if (diffWidth == null) {
    diffWidth = parseInt(_c["left"].split("px")[0]);
  }
  console.log(gameboard.style);
  console.log(gameboard.style.left);
  console.log(gameboard.style.top + gameboard.style.height);
  console.log(gameboard.style.left + gameboard.style.width);

  const height = gameboardRect.height; /*+ diffHeight*/
  const width = gameboardRect.width; /*+ diffWidth*/

  const maxFrameBottom = height - player.clientHeight;
  const maxFrameTop = height + player.clientHeight;
  const maxFrameRight = width - player.clientWidth;
  const maxFrameLeft = width;

  console.log("b", maxFrameBottom);
  console.log("t", maxFrameTop);
  console.log("r", maxFrameRight);
  console.log("l", maxFrameLeft);
  console.log("h", height);
  console.log("w", width);
  console.log("dh", diffHeight);
  console.log("dw", diffWidth);
  console.log("c", currentPosition);

  let error = false;
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (direction === "top") {
        if (
          distance > 0 &&
          currentPosition < targetPosition &&
          currentPosition < maxFrameBottom
        ) {
          currentPosition += step;
        } else if (
          distance < 0 &&
          currentPosition > targetPosition &&
          currentPosition > maxFrameTop
        ) {
          currentPosition += step;
        } else {
          error = true;
        }
      } else if (direction === "left") {
        if (
          distance > 0 &&
          currentPosition < targetPosition &&
          currentPosition < maxFrameRight
        ) {
          currentPosition += step;
        } else if (
          distance < 0 &&
          currentPosition > targetPosition &&
          currentPosition > maxFrameLeft
        ) {
          currentPosition += step;
        } else {
          error = true;
        }
      }

      player.style[direction] = currentPosition + "px";
      if (
        (distance > 0 && currentPosition >= targetPosition) ||
        (distance < 0 && currentPosition <= targetPosition) ||
        error
      ) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
}
