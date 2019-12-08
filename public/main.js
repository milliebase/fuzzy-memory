const gameBoard = document.querySelector(".game__board");

// Overlay variables
const overlay = document.querySelector(".overlay");
const overlayTextH2 = document.querySelector(".overlay__text h2");
const overlayTextP = document.querySelector(".overlay__text p");
const replay = document.querySelector(".replay");

//Array for choosed cards
let chosenCards = [];

//Deck and level variables
let level;
let gameDeck;
let numOfPlayers;

// Stats variables
const statsFirstPlayer = document.querySelector(".stats__players--one");
const pointsFirstPlayer = document.querySelector(
  ".stats__players--one h4:nth-of-type(2)"
);

const statsSecondPlayer = document.querySelector(".stats__players--two");
const pointsSecondPlayer = document.querySelector(
  ".stats__players--two h4:last-of-type"
);

//Keeping track of gameplay variables
let currentTurn = "first player";

let firstPlayerPoints = 0;
let secondPlayerPoints = 0;

////////////////////GAMEPLAY///////////////////////
/**
 * Function whichs toggles the game overlay
 */
const toggleOverlay = function() {
  overlay.classList.toggle("overlay--hidden");
  setTimeout(() => {
    overlay.classList.toggle("overlay--placement");
  }, 500);
};

/**
 * Functions whichs controls which player's turn it is.
 *
 * @param {boolean} wasItAMatch
 */
const handleTurns = function(wasItAMatch) {
  if (numOfPlayers === "1" && currentTurn === "first player") {
    setTimeout(() => {
      gameBoard.classList.remove("game__board--one");
      gameBoard.classList.add("game__board--two");
    }, 1000);

    currentTurn = "second player";

    if (wasItAMatch) {
      firstPlayerPoints++;
      pointsFirstPlayer.textContent = firstPlayerPoints;
    }
  } else if (currentTurn === "second player") {
    setTimeout(() => {
      gameBoard.classList.remove("game__board--two");
      gameBoard.classList.add("game__board--one");
    }, 1000);

    currentTurn = "first player";

    if (wasItAMatch) {
      secondPlayerPoints++;
      pointsSecondPlayer.textContent = secondPlayerPoints;
    }
  }
};

/**
 * Checks if the chosen cards are a match or not.
 *
 * @param {array} chosenCards
 */
const isMatch = function(chosenCards) {
  let firstCard = chosenCards[0].dataset.name;
  let secondCard = chosenCards[1].dataset.name;

  if (!(firstCard === secondCard)) {
    chosenCards.forEach(chosenCard => {
      setTimeout(() => {
        chosenCard.classList.remove("card--flip");
      }, 1000);
    });
  } else {
    return true;
  }
};

const getWinner = function(numOfPlayers) {
  if (numOfPlayers === "0") {
    overlayTextH2.textContent = "You won!";
  }

  if (numOfPlayers === "1" && firstPlayerPoints === secondPlayerPoints) {
    overlayTextH2.textContent = "It's a tie!";
  }

  if (numOfPlayers === "1" && firstPlayerPoints > secondPlayerPoints) {
    overlayTextH2.textContent = "Player 1 won!";
  }

  if (numOfPlayers === "1" && firstPlayerPoints < secondPlayerPoints) {
    overlayTextH2.textContent = "Player 2 won!";
  }

  overlayTextP.textContent = "Play again or choose another level";

  replay.classList.remove("replay--hidden");
  setTimeout(() => {
    toggleOverlay();
  }, 500);
};

/**
 * Function with eventlisteners for playing the game
 */
const playGame = function() {
  const cards = document.querySelectorAll(".card");
  let availableMatches = cards.length / 2;

  //Eventlistener for flipping card
  cards.forEach(card => {
    card.addEventListener("click", event => {
      //Prevent from being able to click more than once
      event.currentTarget.classList.add("card--locked");

      if (numOfPlayers === "0") {
        firstPlayerPoints++;
        pointsFirstPlayer.textContent = firstPlayerPoints;
      }

      event.currentTarget.classList.add("card--flip");
      chosenCards.push(event.currentTarget);

      if (chosenCards.length === 2) {
        gameBoard.classList.add("game__board--locked");

        let wasItAMatch = isMatch(chosenCards);

        if (numOfPlayers === "1") {
          handleTurns(wasItAMatch);
        }

        if (wasItAMatch) {
          availableMatches--;
        }

        if (availableMatches === 0) {
          getWinner(numOfPlayers);
        }

        chosenCards = [];

        setTimeout(() => {
          gameBoard.classList.remove("game__board--locked");

          cards.forEach(card => {
            card.classList.remove("card--locked");
          });
        }, 950);
      }
    });
  });
};

//////////////////GENERATE GAME-BOARD////////////////////
/**
 *Function which shuffles the deck.

 * @param {array} deck
 */
const shuffle = function(deck) {
  return deck.sort(() => Math.random() - 0.5);
};

/**
 * Function which creates a new array with duplicates from the original deck.
 *
 * @param {int} numOfCards
 */
const generateDeck = function(numOfCards) {
  let newDeck = deck.slice(0, numOfCards);
  let doubleDeck = [...newDeck, ...newDeck];
  shuffle(doubleDeck);

  return doubleDeck;
};

/**
 * Function to generate the card templates for each card in the gameboard.
 *
 * @param {string} name
 * @param {string} image
 */
const generateCards = function(name, image) {
  const card = document.createElement("div");

  card.classList.add("card");

  card.setAttribute("data-name", `${name}`);

  const template = `
    <div class="card--front"></div>
	  <img class="card--back" src="images/${image}" alt="${name}"/>
  `;

  card.innerHTML = template;

  return card;
};

/**
 *  Function to generate deck cards depending on chosen level
 *
 * @param {string} cardLevelClass
 * @param {array} gameDeck
 */
const generateLevel = function(cardLevelClass, gameDeck) {
  let card;

  gameDeck.forEach(item => {
    let name = item.name;
    let image = item.image;
    card = generateCards(name, image);
    card.classList.add(cardLevelClass);
    gameBoard.appendChild(card);
  });
};

const initiateChosenLevel = function(level) {
  gameBoard.innerHTML = "";

  firstPlayerPoints = 0;
  pointsFirstPlayer.textContent = firstPlayerPoints;

  secondPlayerPoints = 0;
  pointsSecondPlayer.textContent = secondPlayerPoints;

  shuffle(deck);

  if (level === "easy") {
    gameDeck = generateDeck(6);
    generateLevel("card--easy", gameDeck);
    level = "easy";
  }

  if (level === "medium") {
    gameDeck = generateDeck(8);
    generateLevel("card--medium", gameDeck);
    level = "medium";
  }

  if (level === "hard") {
    gameDeck = generateDeck(10);
    generateLevel("card--hard", gameDeck);
    level = "hard";
  }

  if (!overlay.classList.contains("overlay--hidden")) {
    toggleOverlay();
  }

  playGame();
};

///////////////////////////EVENTS////////////////////////////
const levelButtons = document.querySelectorAll(".level__buttons");
const playerButtons = document.querySelectorAll(".player__buttons");

playerButtons.forEach(playerButton => {
  playerButton.addEventListener("click", event => {
    numOfPlayers = event.currentTarget.dataset.players;

    event.currentTarget.classList.add("player__buttons--active");

    playerButtons.forEach(playerButton => {
      if (playerButton !== event.currentTarget) {
        playerButton.classList.remove("player__buttons--active");
      }

      levelButtons.forEach(levelButton => {
        if (levelButton.classList.contains("level__buttons--active")) {
          initiateChosenLevel(level);

          if (
            levelButton.classList.contains("level__buttons--active") &&
            numOfPlayers === "1"
          ) {
            setTimeout(() => {
              gameBoard.classList.add("game__board--one");
            }, 100);
          }
        }
      });
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

    //Eventlistener for each game level
    levelButtons.forEach(levelButton => {
      levelButton.classList.add("level__buttons--clickable");

      levelButton.addEventListener("click", event => {
        event.currentTarget.classList.add("level__buttons--active");

        levelButtons.forEach(levelButton => {
          if (levelButton !== event.currentTarget) {
            levelButton.classList.remove("level__buttons--active");
          }
        });

        if (numOfPlayers === "1") {
          setTimeout(() => {
            gameBoard.classList.add("game__board--one");
          }, 400);
        }

        level = event.currentTarget.textContent;
        initiateChosenLevel(level);
      });
    });
  });
});

//Eventlistener for replay button
replay.addEventListener("click", () => {
  initiateChosenLevel(level);
});
