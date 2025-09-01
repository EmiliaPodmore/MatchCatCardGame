const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

// Timer variables
let timer;
let seconds = 0;
let timerStarted = false;

// Start the timer
function startTimer() {
  timer = setInterval(() => {
    seconds++;
    document.getElementById(
      "timer"
    ).innerHTML = `Time: <strong>${seconds}</strong>s`;
  }, 1000);
}

// Stop the timer
function stopTimer() {
  clearInterval(timer);
}

// Flip cards
function flipCard({ target: clickedCard }) {
  // Start timer on very first flip
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }

  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

// Match cards
function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      // Stop timer when game is won
      stopTimer();
      setTimeout(() => {
        alert(`You won in ${seconds} seconds!`);
        shuffleCard(); // restart game
      }, 500);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

// Shuffle deck
function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  seconds = 0;
  timerStarted = false;
  clearInterval(timer);
  document.getElementById("timer").innerHTML = `Time: <strong>0</strong>s`;

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();
