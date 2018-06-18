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
let flipNum = 0;
let lastCardLocation = -1;

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
    console.log(currentCard);
  }
  return;
}

//Determine if the card selected matches any card already in the list
function checkListForMatch(index){
  let currentCard = {location:index, symbol:shuffledDeck[index]};
  let matchLocation = -1;
  let found = openList.find(function(element) {
    matchLocation = element.location;
    return element.symbol === currentCard.symbol;
  });

  if(typeof found === 'undefined'){
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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol
 */
for(let i = 0; i < cardHTML.length; i++) {
  cardHTML[i].addEventListener("click", function(element) {
    console.log(element.target)
    showCard(element.target);

    /*
     *  - add the card to a *list* of "open" cards
     */
    if(flipNum === 0) {
      addToOpenList(i);
      lastCardLocation = openList[openList.length - 1].location;
      console.log(lastCardLocation);
      flipNum += 1;
    } else if(lastCardLocation != i) {

      /*
       *  If it's the second flip, check to see if the two cards match
       */

      let matchedElement = checkListForMatch(i);
      console.log("ME: " + matchedElement);
      if(matchedElement > 0) {
        console.log("It's a MATCH with: " + matchedElement);

        addToOpenList(i);

        /*
         * Lock the cards in the open position
         */

         element.target.className += " match";
         cardHTML[lastCardLocation].className += " match";
         console.log("ME: " + matchedElement);

         flipNum = 0;
       } else {

         /*
          * remove cards from list and hide card's symbol if no match
          */

         setTimeout(hideCard(element.target), 8000);
         openList.pop();
         console.log(cardHTML[lastCardLocation]);
         hideCard(cardHTML[lastCardLocation]);
         flipNum = 0;
       }

   }

  });
}




/*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
