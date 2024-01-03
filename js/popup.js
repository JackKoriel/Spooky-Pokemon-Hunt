class Popup {
  constructor() {
    this.popup = document.getElementById("popup");
    this.scoreResults = document.getElementById("score-result");
    this.timeResults = document.getElementById("time-result");
    this.buttonRestart = document.getElementById("restart");
  }
  showPop = (score, time) => {
    this.scoreResults.innerText = score;
    this.timeResults.innerText = time;
    this.popup.classList.add("visible");
    this.addEventListeners();
    audio.pause();
  };
  addEventListeners = () => {
    this.buttonRestart.addEventListener("click", () => {
      location.reload();
    });
  };
}
