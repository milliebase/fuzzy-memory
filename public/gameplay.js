//Variable for the gameboard
const gameBoard = document.querySelector(".game__board");

// Overlay variables
const overlay = document.querySelector(".overlay");
const overlayTextH2 = document.querySelector(".overlay__text h2");
const overlayTextP = document.querySelector(".overlay__text p");
const replay = document.querySelector(".replay");

const overlayTurn = document.querySelector(".overlay__turn");
const turnText = document.querySelector(".turn__text");
const turnTextSpan = document.querySelector(".turn__text span");

// Array for choosed cards
let chosenCards = [];

// Deck and level variables
let level;
let deck;
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

// Variables keeping track of gameplay
let currentTurn = "player one";

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
  if (currentTurn === "player one") {
    if (wasItAMatch) {
      firstPlayerPoints++;
      pointsFirstPlayer.textContent = firstPlayerPoints;
    } else {
      setTimeout(() => {
        gameBoard.classList.remove("game__board--one");
        gameBoard.classList.add("game__board--two");
      }, 1000);

      setTimeout(() => {
        overlayTurn.classList.remove("overlay__turn--hidden");
        turnText.style.backgroundColor = "rgba(28, 4, 31, 0.608)";
        turnTextSpan.textContent = "Player two";
      }, 700);

      currentTurn = "player two";
    }
  } else if (currentTurn === "player two") {
    if (wasItAMatch) {
      secondPlayerPoints++;

      pointsSecondPlayer.textContent = secondPlayerPoints;
    } else {
      setTimeout(() => {
        gameBoard.classList.remove("game__board--two");
        gameBoard.classList.add("game__board--one");
      }, 1000);

      setTimeout(() => {
        overlayTurn.classList.remove("overlay__turn--hidden");
        turnText.style.backgroundColor = "rgba(141, 26, 64, 0.608)";
        turnTextSpan.textContent = "Player one";
      }, 700);

      currentTurn = "player one";
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
        chosenCard.classList.remove("card--locked");
      }, 1000);
    });
  } else if (firstCard === secondCard) {
    return true;
  }
};

/**
 * Functions tells which player is the winner
 *
 * @param {string} numOfPlayers
 */
const getWinner = function(numOfPlayers) {
  if (numOfPlayers === "0") {
    overlayTextH2.textContent = "You made it!";
  }

  if (numOfPlayers === "1") {
    if (firstPlayerPoints === secondPlayerPoints) {
      overlayTextH2.textContent = "It's a tie!";
    }

    if (firstPlayerPoints > secondPlayerPoints) {
      overlayTextH2.textContent = "Player 1 won!";
    }

    if (firstPlayerPoints < secondPlayerPoints) {
      overlayTextH2.textContent = "Player 2 won!";
    }
  }

  overlayTextP.textContent = "Play again or choose another level";

  replay.classList.remove("replay--hidden");
  setTimeout(() => {
    toggleOverlay();
  }, 500);
};

/**
 * Function with eventlisteners for the cards
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
          overlayTurn.classList.add("overlay__turn--hidden");
          getWinner(numOfPlayers);
        }

        //Reset the array with chosen cards
        chosenCards = [];

        setTimeout(() => {
          gameBoard.classList.remove("game__board--locked");
        }, 950);
      }
    });
  });
};
