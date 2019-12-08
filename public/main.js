////////////////////GAMEPLAY///////////////////////
const gameBoard = document.querySelector(".game__board");
const overlay = document.querySelector(".overlay");
const overlayTextH2 = document.querySelector(".overlay__text h2");
const overlayTextP = document.querySelector(".overlay__text p");
const replay = document.querySelector(".replay");
let chosenCards = [];

let level;
let gameDeck;
let player;

const toggleOverlay = function() {
  overlay.classList.toggle("overlay--hidden");
  setTimeout(() => {
    overlay.classList.toggle("overlay--placement");
  }, 500);
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

/**
 * Function with eventlisteners for playing the game
 */
const playGame = function() {
  const cards = document.querySelectorAll(".card");
  let availableMatches = cards.length / 2;

  //Eventlistener for flipping card
  cards.forEach(card => {
    card.addEventListener("click", event => {
      event.currentTarget.classList.add("card--flip");

      chosenCards.push(event.currentTarget);

      if (chosenCards.length === 2) {
        gameBoard.classList.add("game__board--locked");

        let ifMatch = isMatch(chosenCards);

        if (ifMatch) {
          availableMatches--;
        }

        if (availableMatches === 0) {
          overlayTextH2.textContent = "You won!";
          overlayTextP.textContent = "Play again or choose another level";
          replay.classList.remove("replay--hidden");
          setTimeout(() => {
            toggleOverlay();
          }, 500);
        }

        chosenCards = [];

        setTimeout(() => {
          gameBoard.classList.remove("game__board--locked");
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

const checkChosenLevel = function(level) {
  gameBoard.innerHTML = "";

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
    event.currentTarget.classList.add("player__buttons--active");

    playerButtons.forEach(playerButton => {
      if (playerButton !== event.currentTarget) {
        playerButton.classList.remove("player__buttons--active");
      }

      player = event.currentTarget.dataset.player;
    });
  });
});

//Eventlistener for each game level
levelButtons.forEach(levelButton => {
  levelButton.addEventListener("click", event => {
    event.currentTarget.classList.add("level__buttons--active");

    levelButtons.forEach(levelButton => {
      if (levelButton !== event.currentTarget) {
        levelButton.classList.remove("level__buttons--active");
      }
    });

    level = event.currentTarget.textContent;
    checkChosenLevel(level);
  });
});

//Eventlistener for replay button
replay.addEventListener("click", () => {
  checkChosenLevel(level);
});
