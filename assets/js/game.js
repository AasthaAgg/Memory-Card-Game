const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
    if(lockBoard) return;

    // check for double click
    if(this === firstCard) return;

    this.classList.add('flip');

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
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));