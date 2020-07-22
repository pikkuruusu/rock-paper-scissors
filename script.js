let round = 0;
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
    if (round >= 5) {
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

function game(e) {
    if (allowedToPlay) {
        let result = playRound(this.id);

        if (round >= 5) {
            end(result.msg);
        } else {
            screen.textContent = result.msg;
        }

        const playerScoreScreen = document.querySelector('#player-score');
        const computerScoreScreen = document.querySelector('#computer-score');
        playerScore += result.playerScore;
        computerScore += result.computerScore;

        playerScoreScreen.textContent = `You: ${ playerScore }`;
        computerScoreScreen.textContent = `Bot: ${ computerScore }`;

        const roundScreen = document.querySelector('#roundbox');

        roundScreen.textContent = `Round: ${ round }`;
    }     
}

function end(endMsg) {
    screen.innerHTML = `${ endMsg } <br> Game Over!`;

    selectionArea.classList.add('fade-selection');

    playerSelection.forEach(selection => selection.classList.remove('playing-selection'));
    playerSelection.forEach(selection => selection.removeEventListener('click', game));

    screen.addEventListener('transitionend', () => {
        screen.innerHTML = '<span id=\'replay\'>Click to replay!</span>';
        screen.classList.remove('hidden');
    })

    setTimeout(function() { screen.classList.add('hidden') }, 1800);
    ;
}

function start() {
    allowedToPlay = true;
    allowPlay.addEventListener('transitionend', () => {
        screen.textContent = 'Choose Rock, Paper or Scissors!';
    })
    allowPlay.classList.add('hidden');

    selectionArea.classList.remove('fade-selection');

    playerSelection.forEach(selection => selection.classList.add('playing-selection'));
    playerSelection.forEach(selection => selection.addEventListener('click', game));
}

const screen = document.querySelector('.gameplay');
const selectionArea = document.querySelector('.player-selection');
const playerSelection = document.querySelectorAll('.selection');
const allowPlay = document.querySelector('#play');

allowPlay.addEventListener('click', start)