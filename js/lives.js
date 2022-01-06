class Lives {
  constructor(root) {
    this.emoji = ["❤️❤️❤️", "💀❤️❤️", "💀💀❤️", "💀💀💀"];
    this.lives = 3;
    this.domElement = document.createElement("div");
    this.domElement.classList.add("lives");
    this.domElement.innerText = `${this.emoji[0]}`;
    root.appendChild(this.domElement);
  }
  updateLives = () => {
    this.lives = this.lives - 1;
    if (this.lives === 2) {
      this.domElement.innerText = `${this.emoji[1]}`;
      window.alert(`You've lost a life`);
    }
    if (this.lives === 1) {
      this.domElement.innerText = `${this.emoji[2]}`;
      window.alert(`You've lost a life`);
    }
    if (this.lives === 0) {
      this.domElement.innerText = `${this.emoji[3]}`;
      window.alert(`Game Over!`);
    }
  };
}
