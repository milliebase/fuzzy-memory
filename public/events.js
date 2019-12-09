///////////////////////////EVENTS////////////////////////////
const deckButtons = document.querySelectorAll(".deck__buttons");
const playerButtons = document.querySelectorAll(".player__buttons");
const levelButtons = document.querySelectorAll(".level__buttons");

const header = document.querySelector("header");

//////////////EVENTLISTENER FOR DECK__BUTTONS////////////////////
deckButtons.forEach(deckButton => {
  deckButton.addEventListener("click", event => {
    if (deckButton.dataset.deck === "mulan") {
      deck = mulan;
      isLevelChosen(levelButtons);
      header.classList.remove("header--lion-king");
      gameBoard.classList.remove("game__board--lion-king");
    }

    if (deckButton.dataset.deck === "lion-king") {
      deck = lionKing;
      isLevelChosen(levelButtons);
      header.classList.add("header--lion-king");
      gameBoard.classList.add("game__board--lion-king");
    }

    //////////////EVENTLISTENER FOR PLAYER__BUTTONS////////////////////
    playerButtons.forEach(playerButton => {
      playerButton.classList.add("player__buttons--clickable");

      playerButton.addEventListener("click", event => {
        chosenCards = [];

        numOfPlayers = event.currentTarget.dataset.players;

        event.currentTarget.classList.add("player__buttons--active");

        playerButtons.forEach(playerButton => {
          if (playerButton !== event.currentTarget) {
            playerButton.classList.remove("player__buttons--active");
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

        //////////////EVENTLISTENER FOR LEVEL_BUTTONS////////////////////
        levelButtons.forEach(levelButton => {
          levelButton.classList.add("level__buttons--clickable");

          levelButton.addEventListener("click", event => {
            chosenCards = [];

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
  });
});

//Eventlistener for replay button
replay.addEventListener("click", () => {
  initiateChosenLevel(level);
});
