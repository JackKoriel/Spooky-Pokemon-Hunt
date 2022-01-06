class Projectile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.destroyed = false;
    this.domElement = document.createElement("img");
    this.domElement.src = "images/ball2.gif";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = "10";
    this.root = document.getElementById("app");
    this.root.appendChild(this.domElement);
  }
  update(timeDiff) {
    this.y = this.y - timeDiff * 0.5;
    this.domElement.style.top = `${this.y}px`;
    if (this.y <= 0) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
    if (this.destroyed) {
      this.domElement.remove();
    }
  }
}
