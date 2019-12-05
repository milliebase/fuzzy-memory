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
      console.log("hi");
      event.currentTarget.classList.add("card--flip");
    });
  });
};

//////////////////GENERATE GAME-BOARD////////////////////
const gameBoard = document.querySelector(".game__board");
const levelButtons = document.querySelectorAll(".level__buttons");
//Function to get random number
// const getRandomInt = function(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);

//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

const doubleDeck = [...deck, ...deck];

const shuffle = function(deck) {
  return deck.sort(() => Math.random() - 0.5);
};

let shuffledDeck = shuffle(doubleDeck);

/*
 * Function to create cards to rows.
 */
const generateCards = function() {
  let name;
  let image;

  const card = document.createElement("div");

  shuffledDeck.forEach(item => {
    name = item["name"];
    image = item["image"];
  });

  card.classList.add("card");
  card.setAttribute("data-name", `${name}`);

  const template = `
    <div class="card--front"></div>
	  <img class="card--back" src="${image}" alt="${name}"/>
  `;

  card.innerHTML = template;

  return card;
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

/**
 * Function to generate rows with cards depending on chosen level
 *
 * @param {int} rows
 * @param {string} rowClass
 * @param {int} cards
 * @param {string} cardClass
 */
const generateLevel = function(rows, rowClass, cards, cardClass) {
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

    gameBoard.innerHTML = "";

    if (level === "easy") {
      generateLevel(3, "game__row--other", 4, "card--other");
    }

    if (level === "medium") {
      generateLevel(4, "game__row--other", 4, "card--other");
    }

    if (level === "hard") {
      generateLevel(4, "", 5, "card--hard");
    }
    playGame();
  });
});
