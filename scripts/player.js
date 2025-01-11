export async function movePlayer(player, direction, distance) {
  const _c = document.defaultView.getComputedStyle(player);
  let currentPosition = parseInt(_c[direction].split("px")[0]);
  let targetPosition = currentPosition + distance;
  let step = distance > 0 ? 5 : -5;

  const gameboard = document.getElementById("board-game");
  const gameboardRect = gameboard.getBoundingClientRect();

  const maxFrameBottom = gameboardRect.bottom - player.clientHeight;
  const maxFrameTop = gameboardRect.x;
  const maxFrameRight = gameboardRect.left - player.clientWidth;
  const maxFrameLeft = gameboardRect.y;

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
