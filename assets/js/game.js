const cards = document.querySelectorAll('.memory-card');
const time = document.querySelector('.timer');
const flips = document.querySelector('.flips');
const win = document.querySelector('.win');

const totalPairs = 12;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let flipCount = 0;
let countMatchingPairs = 0;
let secs=0;
let min=0;
let timeSet;
let timer = setInterval(startTimer, 1000);


function flipCard(){
    if(lockBoard) return;

    // check for double click
    if(this === firstCard) return;

    this.classList.add('flip');
    flipCount++;
    setFlipCount();

    // first card
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    //second card
    secondCard = this;

    matchCards();
}

// match cards

function matchCards(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    
    isMatch ? disableCards() : unFlipCards();

    if(countMatchingPairs == totalPairs) {
        setTimeout(gameOver, 1200);
    }
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    countMatchingPairs++;
    resetBoard();
}

function unFlipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 800);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// shuffle cards

function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * (totalPairs*2));
        card.style.order = randomPos;
    });
}

// onload
shuffle();

// Add flip card event listener to all cards
cards.forEach(card => card.addEventListener('click', flipCard));


// timer
function startTimer() {
    secs++;

    if(secs >= 60){
        secs=0;
        min++;
    }

    timeSet = "Time : ";

    min<10 ? timeSet += "0" + min +":" : timeSet += min +":";
    secs<10 ? timeSet += "0" + secs : timeSet += secs;

    time.innerHTML = timeSet;
}


function setFlipCount(){
    flips.innerHTML = "Flips : "+ flipCount;
}

function gameOver(){
    // stop timer
    clearInterval(timer);

    win.style.visibility = 'visible';
}

function resetGame(){
    cards.forEach(card => card.classList.remove('flip'));

    resetBoard();
    flipCount = 0;
    countMatchingPairs = 0;
    secs=0;
    min=0;

    win.style.visibility = 'hidden';

    shuffle();
    cards.forEach(card => card.addEventListener('click', flipCard));
    setFlipCount();

    timer = setInterval(startTimer, 1000);
}