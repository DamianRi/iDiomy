var finishedGame = false;
var cards = null;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var pares = null;
function loadCards(){
  console.log("Cargando cartas...");
  cards = document.querySelectorAll('.memory-card');
  cards.forEach(card => card.addEventListener('click', flipCard));

  console.log(cards);
  pares = cards.length/2;

  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function flipCard() {
  console.log(pares);
  
  if (lockBoard) console.log("Lock Board");
  

  if (this === firstCard){
    console.log("Mismca carta");
    return;
  }
  if (!hasFlippedCard && firstCard == null) {
    this.classList.add('flip');
    console.log("Primera carta");
    
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }else if(secondCard == null){
    this.classList.add('flip');
    console.log("Segunda Carta");
    
    // second click
    secondCard = this;
    checkForMatch();
  }


}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  //isMatch ? disableCards() : unflipCards();

  if (isMatch) {
    disableCards(); // Deshabilitamos las cartas
    pares--;
    if (pares == 0) {
      console.log("Juego Terminado");
      finishedGame = true;
      setTimeout(() => {
        showNext(current);
      }, 1200);
    }
  }else{
    unflipCards(); // Las volteamos boca abajo
  }

}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  setTimeout(() => {
    console.log("Quitando..");
    firstCard.style.visibility = 'hidden';
    secondCard.style.visibility = 'hidden';
    resetBoard();
  }, 1200);

}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1300);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  if (cards != null) {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });    
  }
})();

//if (cards != null) {
//  cards.forEach(card => card.addEventListener('click', flipCard));
//}
