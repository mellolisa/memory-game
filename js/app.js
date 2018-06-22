/*
 * Create a list that holds all of your cards
 */
const cardDeck = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];

let openList = [];
let lastCardLocation = -1;
let numMoves = 1;

//initialize Timer variables
let hours = 0;
let minutes = 0;
let seconds = 0;
let timerRunning = false;
let startTime = 0;
let t = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 const shuffledDeck = shuffle(cardDeck);
 const deckHTML = document.getElementsByClassName("deck");
 const cardHTML = document.getElementsByClassName("card");
 const moveCounterHTML = document.getElementsByClassName("moves");
 const winnerHTML = document.getElementsByClassName("modal-content");
 const modal = document.getElementById('winModal');
 const timerHTML = document.getElementsByClassName("time");

 deckHTML[0].style.visibility = "hidden";

 for(let i = 0; i < cardHTML.length; i++) {
    cardHTML[i].lastElementChild.className  += ' ' + shuffledDeck[i];
 }

 deckHTML[0].style.visibility = "visible";

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Display a card's symbol
function showCard(card) {
   if(card.className.includes("open show") === false){
     card.className += ' open show';
   }
   return;
}

// Add to list of open cards
function addToOpenList(index){
  let currentCard = {location:index, symbol:shuffledDeck[index]};
  let found = openList.find(function(element) {
    return element.location === currentCard.location;
  });

  if(typeof found === 'undefined'){
    openList.push(currentCard);
    return 0;
  }
  return 1;
}

//Determine if the card selected matches any card already in the list
function checkListForMatch(index){
  let currentCard = {location:index, symbol:shuffledDeck[index]};
  let matchLocation = -1;
  let found = openList.find(function(element) {
    matchLocation = element.location;
    return element.symbol === currentCard.symbol;
  });

  if(typeof found === 'undefined') {
    return -1;
  } else {
    return matchLocation;
  }
}

//Hide card if open
function hideCard(card) {
  if(card.className.includes("open show") === true) {
    card.className = card.className.replace(/open show/g, "");
  }
}

//Increment move counter and display it on the page
function incrementMoveCounter() {
  numMoves += 1;
  moveCounterHTML[0].innerHTML = "Moves Completed: ";
  moveCounterHTML[0].innerHTML += (numMoves - 1) / 2;
}

//Display that the game is won
function displayWinGame(){
  let score = (numMoves - 1) / 2;

  //stop the timer
  clearInterval(t);
  timerRunning = false;

  modal.innerHTML = '<div class="modal-content"><p>You won the game in ' + score + ' moves!</p></div>';
  modal.style.display = "block";
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
}
/* Copied zeroFill function from https://stackoverflow.com/questions/1267283/how-can-i-pad-a-value-with-leading-zeros */
function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}


function incrementTime() {
  let currentTime = new Date();
  let updatedTime = currentTime - startTime;

  hours = Math.floor(updatedTime / 1800000);
  minutes = Math.floor((updatedTime % 1800000) / 30000);
  seconds = Math.floor((updatedTime % 30000) / 1000);
  console.log(updatedTime);
  console.log(seconds);
  timerHTML[0].innerHTML = "Game Time: <time>" + zeroFill(hours,2) + ":" + zeroFill(minutes,2) + ":" + zeroFill(seconds,2) + "</time>";
}

function startTimer() {
  timerRunning = true;
  startTime = new Date();
  t = setInterval(incrementTime, 500);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol
 */
let cardAddStatus = 0;
for(let i = 0; i < cardHTML.length; i++) {
  cardHTML[i].addEventListener("click", function(element) {
    showCard(element.target);
    if( timerRunning === false )
    {
      startTimer();
    }

    /*
     *  - add the card to a *list* of "open" cards
     */
    if(numMoves % 2 === 1) {
      cardAddStatus = addToOpenList(i);
      if(cardAddStatus === 0){
         lastCardLocation = openList[openList.length - 1].location;
         incrementMoveCounter();
      }
    } else if(lastCardLocation != i) {

      /*
       *  If it's the second flip, check to see if the two cards match
       */

      let matchedElement = checkListForMatch(i);
      if(matchedElement > 0) {

        cardAddStatus = addToOpenList(i);
        if(cardAddStatus === 0) {
          /*
           * Lock the cards in the open position
           */

          element.target.className += " match";
          cardHTML[lastCardLocation].className += " match";

          incrementMoveCounter();

          //if last match, the game is won!!!
          if(openList.length == 16){
            displayWinGame();
          }
        }
      } else {

        /*
         * remove cards from list and hide card's symbol if no match
         */

        incrementMoveCounter();
        setTimeout(function(){
          hideCard(element.target);

          //remove the first card
          openList.pop();
          hideCard(cardHTML[lastCardLocation]);

        }, 1000);
      }
    }
  });
}


 /*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
