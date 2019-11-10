var finishedGame = false;
var cards = null;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var pares = null;

function loadCards(){
  var quizData = document.getElementById('quiz-data');
  var quiz = quizData.getAttribute('data-quiz');

  const gamespace = document.getElementById("GameSpace");
  const frontCards = document.querySelectorAll('.front-face');
  const backCards = document.querySelectorAll('.back-face');
  if (quiz == 3) {
    gamespace.classList.remove('game-space');
    gamespace.classList.add('game-space-level3');
    frontCards.forEach(fCrad => {
      fCrad.classList.remove('front-face');
      fCrad.classList.add('front-face-level3');      
    });
    backCards.forEach(bCard => {
      bCard.classList.remove('back-face');
      bCard.classList.add('back-face-level3');
    });

  }else{
    gamespace.classList.add('game-space');
    //$('.front-face').style.padding = "20px";
    //$('.back-face').style.padding = "20px";
  }


  console.log("Cargando cartas...");
  cards = document.querySelectorAll('.memory-card');
  var nCards = 3*quiz*2;
  var par = false;
  var imgCard = 0;
  cards.forEach(card => {
    // Si es la primera carta le ponemos una imagen
    if(!par){
      imgCard = Math.floor(Math.random() * 51);
      card.childNodes[1].src = "assets/img/game-svg/"+imgCard+".svg";
      par = true;
    // A la siguiente carta le ponemos la misma imagen
    }else if (par) {
      card.childNodes[1].src = "assets/img/game-svg/"+imgCard+".svg";
      par = false;      
    }
    // Le agregamos la propiedad de poder funcionar como carta
    card.addEventListener('click', flipCard);

    // Solo mostramos el número de cartas segun el nivel
    if (nCards <= 0) {
      card.style.display = "none";
    }
    nCards--;

    // les damos un orden aleatorio
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;

  });

  pares = 3*quiz;

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

  console.log("Pares Restantes"+pares);
  
  if (isMatch) {
    disableCards(); // Deshabilitamos las cartas
    pares--;
    console.log("Menos un par");
    
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
