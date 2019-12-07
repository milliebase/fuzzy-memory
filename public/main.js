////////////////////GAMEPLAY///////////////////////
const gameBoard = document.querySelector(".game__board");
let chosenCards = [];

const isMatch = function(chosenCards) {
  let firstCard = chosenCards[0].dataset.name;
  let secondCard = chosenCards[1].dataset.name;

  if (!(firstCard === secondCard)) {
    chosenCards.forEach(chosenCard => {
      setTimeout(() => {
        chosenCard.classList.remove("card--flip");
      }, 1000);
    });
  }
};

/**
 * Function with eventlisteners for playing the game
 */
const playGame = function() {
  const cards = document.querySelectorAll(".card");

  //Eventlistener for flipping card
  cards.forEach(card => {
    card.addEventListener("click", event => {
      event.currentTarget.classList.add("card--flip");

      chosenCards.push(event.currentTarget);

      if (chosenCards.length === 2) {
        gameBoard.classList.add("game__board--locked");
        isMatch(chosenCards);
        chosenCards = [];
        setTimeout(() => {
          gameBoard.classList.remove("game__board--locked");
        }, 1000);
      }
    });
  });
};

//////////////////GENERATE GAME-BOARD////////////////////
const levelButtons = document.querySelectorAll(".level__buttons");

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
 * @param {int} number
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

//Eventlistener for each game level
levelButtons.forEach(levelButton => {
  levelButton.addEventListener("click", event => {
    shuffle(deck);
    gameBoard.innerHTML = "";

    let level = event.currentTarget.textContent;
    let gameDeck;

    if (level === "easy") {
      gameDeck = generateDeck(6);
      generateLevel("card--easy", gameDeck);
    }

    if (level === "medium") {
      gameDeck = generateDeck(8);
      generateLevel("card--medium", gameDeck);
    }

    if (level === "hard") {
      gameDeck = generateDeck(10);
      generateLevel("card--hard", gameDeck);
    }

    playGame();
  });
});
