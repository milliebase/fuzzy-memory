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
    <div class="card__front"></div>
	  <img class="card__back" src="images/${image}" alt="${name}"/>
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

  //Change card__front design depending on which deck is chosen
  let cardFronts = document.querySelectorAll(".card__front");
  cardFronts.forEach(cardFront => {
    if (deck === mulan) {
      cardFront.classList.add("card__front--mulan");
    }

    if (deck === lionKing) {
      cardFront.classList.add("card__front--lion-king");
    }
  });
};

/**
 * Function will check which level is chosen and thereafter initiate generating of game deck.
 *
 * @param {string} level
 */
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

/**
 * Functions checks if a level is already chosen
 *
 * @param {array} levelButtons
 */
const isLevelChosen = function(levelButtons) {
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

        setTimeout(() => {
          handleTurns();
        }, 100);
      }
    }
  });
};
