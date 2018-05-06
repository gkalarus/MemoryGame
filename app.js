//Variables
var gameDiv = document.getElementById("memoryGame");
var cardSize = 100;
var cardSpacing = 10;
var gameWidth = 4;
var gameHeight = 4;
var firstCard = null;
var secondCard = null;
var checkTimeout = null;
var matches = 0;

createGrid(gameWidth,gameHeight);

// Functions

function createGrid(h,v) {
    var array = [];

    for(var  i=0; i<gameWidth*gameHeight/2; i++) {
        array.push(i);
        array.push(i)
    }

    var shuffledArray = [];
    while (array.length > 0) {
        var random = Math.floor(Math.random()*array.length);
        shuffledArray.push(array[random]);
        array.splice(random,1);
    }


    for(var i=0; i<h; i++) {
        for(var j=0; j<v; j++) {
            createCard(shuffledArray.pop(),i,j);
        }
    }
}


function createCard(cardNum, positionX, positionY) {
    var card = document.createElement('img');
    card.num = cardNum;
    card.src = 'images/cardback.png';
    card.style.cssText = '-webkit-user-selec: none; -khtml-user-select: none; -moz-user-select: none; -o-user-select: none; user-select: none; -webkit-user-drag: none;';
    card.style.position = 'absolute';
    card.style.left = (positionX*(cardSize+cardSpacing)+cardSpacing) + 'px';
    card.style.top = (positionY*(cardSize+cardSpacing)+cardSpacing) + 'px';
    card.onclick = clickCard;
    gameDiv.appendChild(card);
}


function clickCard(e) {
    playSound('click.mp3');

    if (checkTimeout != null) {
        clearTimeout(checkTimeout);
        checkCards();
    }

    var card = e.target;
    card.src = 'images/card' + card.num + '.png';


    if (firstCard === null) {
        firstCard = card;
    } else if (firstCard === card) {
        firstCard.src = 'images/cardback.png';
        firstCard = null;
    } else if (secondCard === null) {
        secondCard = card;
        checkTimeout = setTimeout(checkCards, 1000);
    }
}

function checkCards() {
    if(firstCard.num === secondCard.num) {
        gameDiv.removeChild(firstCard);
        gameDiv.removeChild(secondCard);
        playSound('match.mp3');
        matches++;
        if (matches >= gameWidth*gameHeight/2) {
            gameWon();
        }
    } else {
        firstCard.src = 'images/cardback.png';
        secondCard.src = 'images/cardback.png';
    }

    firstCard = null;
    secondCard = null;
    checkTimeout = null;
}

function gameWon() {
    playSound('cat.mp3');
    document.getElementById('gameWin').style.visibility = 'visible';
}

function playSound(fileName) {
    var audio = new Audio(fileName);
    audio.play();
}