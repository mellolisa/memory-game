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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 const shuffledDeck = shuffle(cardDeck);
 const deckHTML = document.getElementsByClassName("deck");
 const cardHTML = document.getElementsByClassName("card");

 deckHTML[0].style.visibility = "hidden";
 console.log(deckHTML);
 console.log(cardHTML);

 for(let i = 0; i < cardHTML.length; i++) {
    cardHTML[i].lastElementChild.className  += ' ' + shuffledDeck[i];
    console.log(cardHTML[i].lastElementChild);
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
   if(card.target.className.includes("open show") === false){
     card.target.className += ' open show';
   }
   return;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol
 */
for(let i = 0; i < cardHTML.length; i++) {
  cardHTML[i].addEventListener("click", function(element) {
    console.log(element)
    showCard(element);
  });
}

 /*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
