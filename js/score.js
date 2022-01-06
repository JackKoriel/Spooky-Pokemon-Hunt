class Score {
  constructor(root) {
    this.score = 0;
    this.domElement = document.createElement("div");
    this.domElement.classList.add("score");
    this.domElement.innerText = `Score:${this.score}`;
    root.appendChild(this.domElement);
  }
  getScore = () => {
    return this.score;
  };
}
