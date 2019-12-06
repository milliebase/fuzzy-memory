/*HARD - 4 rows 5 cards
 * MEDIUM - 4 rows 4 cards
 * EASY - 3 rows 4 cards
 */

////////////////////GAMEPLAY///////////////////////
/**
 * Function with eventlisteners for playing the game
 */
const playGame = function() {
  const cards = document.querySelectorAll(".card");

  //Eventlistener for flipping card
  cards.forEach(card => {
    card.addEventListener("click", event => {
      event.currentTarget.classList.add("card--flip");
    });
  });
};

//////////////////GENERATE GAME-BOARD////////////////////
const gameBoard = document.querySelector(".game__board");
const levelButtons = document.querySelectorAll(".level__buttons");
let doubleDeck = [...deck, ...deck];

/**
 *Function which shuffles deck

 * @param {array} deck
 */
const shuffle = function(deck) {
  return deck.sort(() => Math.random() - 0.5);
};

const generateDeck = function(number) {
  let newDeck = deck.slice(0, number);
  doubleDeck = [...newDeck, ...newDeck];
  shuffle(doubleDeck);

  return doubleDeck;
};

/**
 * Function to create rows in game board
 *
 * @return {string} row
 */
const createRows = function() {
  const row = document.createElement("div");
  row.classList.add("game__row");
  return row;
};

/*
 * Function to create cards to rows.
 */
const generateCards = function(name, image) {
  const card = document.createElement("div");

  card.classList.add("card");

  card.setAttribute("data-name", `${name}`);

  image = "mulan.jpg";
  name = "mulan";

  const template = `
    <div class="card--front"></div>
	  <img class="card--back" src="images/${image}" alt="${name}"/>
  `;

  card.innerHTML = template;

  return card;
};

/**
 * Function to generate rows with cards depending on chosen level
 *
 * @param {int} rows
 * @param {string} rowClass
 * @param {int} cards
 * @param {string} cardClass
 */
const generateLevel = function(rows, rowClass, cards, cardClass, gameDeck) {
  console.log(gameDeck);

  for (let i = 0; i < rows; i++) {
    let row = createRows();

    if (!rowClass === "") {
      row.classList.add(rowClass);
    }

    for (let j = 0; j < cards; j++) {
      let card = generateCards();
      card.classList.add(cardClass);
      row.appendChild(card);
    }
    gameBoard.appendChild(row);
  }
};

//Eventlistener for each game level
levelButtons.forEach(levelButton => {
  levelButton.addEventListener("click", event => {
    let level = event.currentTarget.textContent;
    let gameDeck;

    shuffle(deck);

    gameBoard.innerHTML = "";

    if (level === "easy") {
      gameDeck = generateDeck(6);
      generateLevel(3, "game__row--other", 4, "card--other", gameDeck);
    }

    if (level === "medium") {
      gameDeck = generateDeck(8);
      generateLevel(4, "game__row--other", 4, "card--other", gameDeck);
    }

    if (level === "hard") {
      gameDeck = generateDeck(10);
      generateLevel(4, "", 5, "card--hard", gameDeck);
    }
    playGame();
  });
});
