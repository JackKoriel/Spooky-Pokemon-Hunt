// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const buttonStart = document.getElementById("start-button");
const buttonPause = document.getElementById("pause-button");
const buttonMute = document.getElementById("mute-button");
const iconMute = document.getElementById("mute_icon");
const buttonLeft = document.getElementById("left-button");
const buttonRight = document.getElementById("right-button");
const buttonShoot = document.getElementById("shoot-button");
const gameEngine = new Engine(document.getElementById("app"));
let isPaused = false;
const audio = new Audio("audio/rocket.mp3");
audio.volume = 0.1;
// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  event.preventDefault();
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)

  if (event.code === "ArrowLeft" && !isPaused) {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === "ArrowRight" && !isPaused) {
    gameEngine.player.moveRight();
  }

  if (event.code === "KeyP") {
    gameEngine.pause();
    isPaused = true;
    audio.pause();
  }

  if (event.code === "ArrowUp" || event.code === "Space") {
    let bullet = gameEngine.player.shoot();
    if (!bullet) {
      return;
    }
    gameEngine.projectiles.push(bullet);
  }
};
// console.log(gameEngine.lives.lives);
// if (gameEngine.lives.lives === 0) {
//   gameEngine.pause();
//   document.removeEventListener("keydown", keydownHandler);
// }
const startHandler = () => {
  gameEngine.start();
  isPaused = false;
  audio.play();
};
const leftHandler = () => {
  gameEngine.player.moveLeft();
};
const rightHandler = () => {
  gameEngine.player.moveRight();
};
const shootHandler = () => {
  let bullet = gameEngine.player.shoot();
  if (!bullet) {
    return;
  }
  gameEngine.projectiles.push(bullet);
};
const pauseHandler = () => {
  gameEngine.pause();
  isPaused = true;
  audio.pause();
};
let muteFlag = false;
const muteHandler = () => {
  audio.muted = !audio.muted;
  muteFlag = !muteFlag;
  muteFlag
    ? (iconMute.style.display = "block")
    : (iconMute.style.display = "none");
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);
buttonStart.addEventListener("click", startHandler);
buttonPause.addEventListener("click", pauseHandler);
buttonMute.addEventListener("click", muteHandler);
buttonLeft.addEventListener("click", leftHandler);
buttonRight.addEventListener("click", rightHandler);
buttonShoot.addEventListener("click", shootHandler);
// We call the gameLoop method to start the game
// gameEngine.gameLoop();

// const gameText = new Text(document.getElementById("app"), 10, 10);
// gameText.update("Score");
// gameEngine.countDownTimer();
// setTimeout(gameEngine.gameLoop, 4000);
