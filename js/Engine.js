// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // this.counter = 0;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    this.projectiles = [];
    this.timer = new Timer(document.getElementById("timer"));
    this.score = new Score(this.root);
    this.lives = new Lives(this.root);
    this.popup = new Popup();
    this.interval = null;
    addBackground(this.root);
  }

  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
      if (this.lives.lives === 0) {
        enemy.pause();
      }
    });
    this.projectiles.forEach((projectile) => {
      projectile.update(timeDiff);
    });
    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });
    this.projectiles = this.projectiles.filter((projectile) => {
      return !projectile.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      this.lives.updateLives();
      if (this.lives.lives === 0) {
        this.popup.showPop(this.score.getScore(), this.timer.getingTime());
        this.timer.pause();

        return;
      }
    }
    this.isCollided();
    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    // let game = setTimeout(this.gameLoop, 20);
    this.score.domElement.innerText = `Score: ${this.score.getScore()}`;
    this.interval = setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  start = () => {
    this.gameLoop();
    this.timer.start();
  };

  pause = () => {
    this.timer.pause();
    this.enemies.forEach((enemy) => {
      enemy.pause();
    });
    clearInterval(this.interval);
  };

  isPlayerDead = () => {
    let isPlayerDead = false;

    this.enemies.forEach((enemy) => {
      if (
        this.player.x < enemy.x + ENEMY_WIDTH &&
        this.player.x + PLAYER_WIDTH > enemy.x &&
        this.player.y < enemy.y + ENEMY_HEIGHT
      ) {
        isPlayerDead = true;
      }
    });

    return isPlayerDead;
  };

  isCollided = () => {
    const audio = new Audio("audio/catch.mp3");
    audio.volume = 0.1;
    let isCollided = false;
    for (let enemy = 0; enemy <= this.enemies.length; enemy++) {
      for (
        let projectile = 0;
        projectile <= this.projectiles.length;
        projectile++
      ) {
        if (
          typeof this.projectiles[projectile] !== "undefined" &&
          typeof this.enemies[enemy] !== "undefined"
        ) {
          if (
            this.projectiles[projectile].x <
              this.enemies[enemy].x + ENEMY_WIDTH &&
            this.projectiles[projectile].x + PROJECTILE_WIDTH >
              this.enemies[enemy].x &&
            this.projectiles[projectile].y <
              this.enemies[enemy].y + ENEMY_HEIGHT &&
            this.projectiles[projectile].y + PROJECTILE_HEIGHT >
              this.enemies[enemy].y
          ) {
            isCollided = true;
            audio.play();
            this.enemies[enemy].destroyed = true;
            this.projectiles[projectile].destroyed = true;
            this.score.score++;
          }
        }
      }
    }

    return isCollided;
  };
}
