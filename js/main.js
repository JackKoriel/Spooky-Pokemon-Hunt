// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById("app"));
const buttonStart = document.getElementById("start-button");
const buttonPause = document.getElementById("pause-button");
const buttonMute = document.getElementById("mute-button");
const buttonLeft = document.getElementById("left-button");
const buttonRight = document.getElementById("right-button");
const buttonShoot = document.getElementById("shoot-button");
const iconMute = document.getElementById("mute_icon");
const startText = document.getElementById("start_text");
const pauseText = document.getElementById("pause_text");
const muteText = document.getElementById("mute_text");
const unmuteText = document.getElementById("unmute_text");
const controlsContainer = document.querySelectorAll(".button_container button");

let isPaused = true;
const audio = new Audio("audio/rocket.mp3");
audio.volume = 0.1;
let lastTouchTime = 0;
let muteFlag = false;
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

  if ((event.code === "ArrowUp" || event.code === "Space") && !isPaused) {
    let bullet = gameEngine.player.shoot();
    if (!bullet) {
      return;
    }
    gameEngine.projectiles.push(bullet);
  }
};
const toggleHandler = () => {
  if (isPaused) {
    startHandler();
  } else {
    pauseHandler();
  }
};
const startHandler = () => {
  gameEngine.start();
  isPaused = false;
  audio.play();
  startText.style.display = "none";
  pauseText.style.display = "block";
};
const pauseHandler = () => {
  gameEngine.pause();
  isPaused = true;
  audio.pause();
  startText.style.display = "block";
  pauseText.style.display = "none";
};
const leftHandler = () => {
  if (isPaused) return;
  gameEngine.player.moveLeft();
};
const rightHandler = () => {
  if (isPaused) return;
  gameEngine.player.moveRight();
};
const shootHandler = () => {
  if (isPaused) return;
  let bullet = gameEngine.player.shoot();
  if (!bullet) {
    return;
  }
  gameEngine.projectiles.push(bullet);
};
const muteHandler = () => {
  audio.muted = !audio.muted;
  muteFlag = !muteFlag;
  if (muteFlag) {
    iconMute.style.display = "block";
    muteText.style.display = "none";
    unmuteText.style.display = "block";
  } else {
    iconMute.style.display = "none";
    muteText.style.display = "block";
    unmuteText.style.display = "none";
  }
};
controlsContainer.forEach((button) => {
  button.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      return;
    }
    let now = new Date().getTime();
    // We add an event listener to document. document is the ancestor of all DOM nodes in the DOM.
    if (now - lastTouchTime <= 300) {
      event.preventDefault();
    }
    lastTouchTime = now;
  });
});
// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);
buttonStart.addEventListener("click", toggleHandler);

buttonMute.addEventListener("click", muteHandler);
buttonLeft.addEventListener("click", leftHandler);
buttonRight.addEventListener("click", rightHandler);
buttonShoot.addEventListener("click", shootHandler);
