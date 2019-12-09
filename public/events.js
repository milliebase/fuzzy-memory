///////////////////////////EVENTS////////////////////////////
const deckButtons = document.querySelectorAll(".deck__buttons");
const playerButtons = document.querySelectorAll(".player__buttons");
const levelButtons = document.querySelectorAll(".level__buttons");

const header = document.querySelector("header");

const handleFirstPlayerClick = function() {
  overlayTurn.classList.remove("overlay__turn--hidden");
  turnText.style.backgroundColor = "rgba(141, 26, 64, 0.608)";
  turnTextSpan.textContent = "Player one";
};

/**
 * Callback function to handle the deck buttons eventlisteners.
 * When a deck button is clicked, it will initiate eventlisteners for player buttons.
 */
const handleDeckButtons = function() {
  deckButtons.forEach(deckButton => {
    deckButton.classList.remove("deck__buttons--mulan-active");
    deckButton.classList.remove("deck__buttons--lion-king-active");
  });

  if (this.dataset.deck === "mulan") {
    deck = mulan;

    isLevelChosen(levelButtons);

    header.classList.remove("header--lion-king");
    gameBoard.classList.remove("game__board--lion-king");

    this.classList.add("deck__buttons--mulan-active");
  }

  if (this.dataset.deck === "lion-king") {
    deck = lionKing;

    isLevelChosen(levelButtons);

    header.classList.add("header--lion-king");
    gameBoard.classList.add("game__board--lion-king");

    this.classList.add("deck__buttons--lion-king-active");
  }

  //Initiate clicks for player buttons.
  playerButtons.forEach(playerButton => {
    playerButton.classList.add("player__buttons--clickable");

    //Eventlistener for each player button.
    playerButton.addEventListener("click", handlePlayerButtons);
  });
};

/**
 * Callback function to handle the player buttons eventlisteners.
 * When a player button is clicked, it will initiate eventlisteners for level buttons.
 */
const handlePlayerButtons = function() {
  //Prevent from being able to click twice.
  this.classList.add("player__buttons--locked");

  //Always set the first player as player one and indicate to user.
  if (this.dataset.players === "1") {
    currentTurn = "player one";

    if (level != null) {
      setTimeout(() => {
        handleFirstPlayerClick();
      }, 400);
    } else {
      setTimeout(() => {
        handleFirstPlayerClick();
      }, 1500);
    }
  }

  chosenCards = [];

  overlayTurn.classList.add("overlay__turn--hidden");

  numOfPlayers = this.dataset.players;

  this.classList.add("player__buttons--active");

  playerButtons.forEach(playerButton => {
    if (playerButton !== this) {
      playerButton.classList.remove("player__buttons--active");
      playerButton.classList.remove("player__buttons--locked");
    }

    isLevelChosen(levelButtons);
  });

  if (numOfPlayers === "0") {
    statsFirstPlayer.classList.remove("stats__players--hidden");
    statsSecondPlayer.classList.add("stats__players--hidden");
    gameBoard.classList.remove("game__board--one");
    gameBoard.classList.remove("game__board--two");

    statsFirstPlayer.children[2].textContent = "clicks:";
  }

  if (numOfPlayers === "1") {
    statsFirstPlayer.classList.remove("stats__players--hidden");
    statsSecondPlayer.classList.remove("stats__players--hidden");

    statsFirstPlayer.children[2].textContent = "points:";
  }

  //Initiate clicks for level buttons.
  levelButtons.forEach(levelButton => {
    levelButton.classList.add("level__buttons--clickable");

    //Eventlistener for each level button.
    levelButton.addEventListener("click", handleLevelButtons);
  });
};

/**
 * Callback function to handle the level buttons eventlisteners.
 */
const handleLevelButtons = function() {
  chosenCards = [];

  this.classList.add("level__buttons--active");

  levelButtons.forEach(levelButton => {
    if (levelButton !== this) {
      levelButton.classList.remove("level__buttons--active");
    }
  });

  if (numOfPlayers === "1") {
    setTimeout(() => {
      gameBoard.classList.add("game__board--one");
    }, 400);
  }

  level = this.textContent;
  initiateChosenLevel(level);
};

//Eventlisteners for the deck buttons.
deckButtons.forEach(deckButton => {
  deckButton.addEventListener("click", handleDeckButtons);
});

//Eventlistener for the replay button
replay.addEventListener("click", () => {
  initiateChosenLevel(level);
});
