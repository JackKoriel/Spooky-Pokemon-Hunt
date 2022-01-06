class Timer {
  constructor(root, seconds = 0, minutes = 0, hours = 0) {
    this.root = root;
    this.seconds = seconds;
    this.minutes = minutes;
    this.hours = hours;

    this.interval = null;
  }

  start = () => {
    this.interval = setInterval(() => {
      this.seconds++;
      this.printTime();
    }, 1000);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  getingTime = () => this.printTime();

  printTime = () => {
    let secondsShown;
    let minutesShown;
    let hoursShown;

    if (this.seconds > 59) {
      this.seconds = 0;
      this.minutes++;
    }

    if (this.minutes > 59) {
      this.minutes = 0;
      this.hours++;
    }

    secondsShown = this.seconds < 10 ? "0" + this.seconds : this.seconds;
    minutesShown = this.minutes < 10 ? "0" + this.minutes : this.minutes;
    hoursShown = this.hours < 10 ? "0" + this.hours : this.hours;

    const printTime = hoursShown + ":" + minutesShown + ":" + secondsShown;

    this.root.textContent = printTime;

    return printTime;
  };
}
