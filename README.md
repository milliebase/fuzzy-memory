# Fuzzy memory

<img src="https://media.giphy.com/media/GyN50lHdJbLG0/giphy.gif" width="100%">

Assignment in Javascript course at Yrgo. We were supposed to create our very own memory game and we were given a free choice regarding the design, I was inspired by my favorite disney movies!

__The assignment had to consist of:__
* A memory game
* At least 8 pairs and a maximum of 10 pairs
* The pairs should be randomly positioned before a new game starts
* There should be a replay button to restart the game when finished
* The project can't contain any errors, warning or notices in the developer console

### Built With
* HTML
* CSS
* JavaScript

__We were not allowed to use any other language or framework for this assignment.__

## Features
* One-player or two-player mode
* Choose between two decks
* Three different game levels
* Keep track of your gameplay stats while playing

## Responsive Design and compatibility
As for now the design is only made for desktop.

In the future I'll add media queries and maybe add even more features.

__Browsers:__
- [x] Brave
- [x] Google Chrome
- [x] Firefox

Not yet compatible with Safari

## Installation

1. To be able to play this game, clone this repository to your directory through the terminal.
```
$ git clone https://github.com/milliebase/fuzzy-memory.git
```

2. Change current directory to the cloned repo.
```
$ cd fuzzy-memory
```

3. Start your web server (8000 can be changed to any other 4 digits, ex. 1337 also works).
```
$ php -S localhost:8000
```

__OR__

Visit the game on this link:
<a href="http://milliebasememo.netlify.com">milliebasememo.netlify.com</a>

## Authors
Betsy Alva Soplin

### Deployed and published
9th december 2019

## Tested by
* Andreas Pandzic
* Henrik Björkvall
* Erik Johannesson

## Code review
- [ ] `generate.js:35` - you could maybe add the data-name attribute and its value in the template literal on line 37.
- [x]`gameplay.js:1` - you could add a comment to the gameBoard variable to follow the otherwise excellent structure of defining variables and commenting what they are and what they are for.
- [x] `events.js:9-36` - maybe you could break out the code blocks in the if-statements and make a function instead and call the function to increase readability.
- [x] `events.js:9-103` - it’s quite difficult to follow the code due to the deep nesting. It might be good to break out code where it’s possible to increase readability here.
- [ ] `events.js:106` - you have an event listener on a variable that’s defined in another js-file (gameplay.js: 7). Maybe you could write the event listener in gameplay.js instead?

__Thomas Sönnerstam__

## License
MIT
