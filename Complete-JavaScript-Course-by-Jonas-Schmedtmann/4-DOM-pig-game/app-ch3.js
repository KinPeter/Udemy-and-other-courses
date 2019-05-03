/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore;

init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    winningScore = document.getElementById('winningScore').value;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0'; 
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


//once the roll button is clicked:
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. get a random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //2. display the result
        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        //3. update the round score IF the rolled number is NOT a 1
        if (dice !== 1 && dice2 !== 1) {
            //add score
            roundScore += (dice + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
        } else {
            //next player
            nextPlayer();
        }           
    }
});


//once the hold button is clicked:
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //update the UI 
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //-->ternary operator '?' IF statement
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //change active player on UI
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';       
    document.querySelector('.dice2').style.display = 'none'; 
}


//once the new game button is clicked:
document.querySelector('.btn-new').addEventListener('click', init); //call init function








