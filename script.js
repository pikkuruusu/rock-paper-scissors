let round = 1;
let playerScore = 0;
let computerScore = 0;
let allowedToPlay = false;

function playerWon(selectionInput, computerSelection) {
    const winLogic = {
        rock: { win: 'scissors', loose: 'paper' },
        paper: { win: 'rock', loose: 'scissors' },
        scissors: { win: 'paper', loose: 'rock'}
    }
    return winLogic[selectionInput].win === computerSelection;
}

function playRound(selectionInput) {
    const choices = ['rock', 'paper', 'scissors'];
    let randomNumber = Math.floor(Math.random() * 3);
    let computerSelection = choices[randomNumber];

    round += 1;
    if (round >= 6) {
        allowedToPlay = false;
    }
    
    if (selectionInput == computerSelection) {
        return { msg: `Bot chose ${ computerSelection }! It's a draw!`, playerScore: 0, computerScore: 0 };
    }
    if (playerWon(selectionInput, computerSelection)) {
        return { msg: `Bot chose ${ computerSelection }! You won!`, playerScore: 1, computerScore: 0 };
    } else {
        return { msg: `Bot chose ${ computerSelection }! You lost!`, playerScore: 0, computerScore: 1 };
    }
}

function game() {
    if (allowedToPlay) {
        let result = playRound(this.id);

        if (round >= 6) {
            end(result.msg);
        } else {
            screen.textContent = result.msg;
        }

        playerScore += result.playerScore;
        computerScore += result.computerScore;

        playerScoreScreen.textContent = `You: ${ playerScore }`;
        computerScoreScreen.textContent = `Bot: ${ computerScore }`;
        
        if (round <= 5 ) {
            roundScreen.textContent = `Round: ${ round }`;
        }

    }     
}

function end(endMsg) {
    screen.innerHTML = `${ endMsg } <br> Game Over!`;

    selectionArea.classList.add('fade-selection');

    playerSelection.forEach(selection => selection.classList.remove('playing-selection'));
    playerSelection.forEach(selection => selection.removeEventListener('click', game));

    screen.addEventListener('transitionend', () => {
        screen.innerHTML = '<span id=\'replay\' class=\'play-button\'>Click to replay!</span>';
        screen.classList.remove('hidden');

        const replayButton = document.querySelector('#replay');
        replayButton.addEventListener('click', function() { start(replayButton); });
    }, { once: true });

    setTimeout(function() { screen.classList.add('hidden') }, 1800);
}

function start(playElement) {
    allowedToPlay = true;
    round = 1;
    playerScore = 0;
    computerScore = 0;

    playerScoreScreen.textContent = `You: ${ playerScore }`;
    computerScoreScreen.textContent = `Bot: ${ computerScore }`;
    roundScreen.textContent = `Round: ${ round }`;

    playElement.addEventListener('transitionend', () => {
        console.log('is run');
        screen.textContent = 'Choose Rock, Paper or Scissors!';
    })
    playElement.classList.add('hidden');

    selectionArea.classList.remove('fade-selection');

    playerSelection.forEach(selection => selection.classList.add('playing-selection'));
    playerSelection.forEach(selection => selection.addEventListener('click', game));
}

const screen = document.querySelector('.gameplay');
const selectionArea = document.querySelector('.player-selection');
const playerSelection = document.querySelectorAll('.selection');
const playButton = document.querySelector('#play');
const playerScoreScreen = document.querySelector('#player-score');
const computerScoreScreen = document.querySelector('#computer-score');
const roundScreen = document.querySelector('#roundbox');

playButton.addEventListener('click', function() { start(playButton); } );