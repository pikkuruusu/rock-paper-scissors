let round = 0;
let playerScore = 0;
let computerScore = 0;

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
    
    if (selectionInput == computerSelection) {
        return { msg: `It's a draw! You both chose ${ selectionInput }`, playerScore: 0, computerScore: 0 };
    }
    if (playerWon(selectionInput, computerSelection)) {
        return { msg: `You win! ${ selectionInput[0].toUpperCase() + selectionInput.slice(1) } beats ${ computerSelection }`, playerScore: 1, computerScore: 0 };
    } else {
        return { msg: `You lose! ${ computerSelection[0].toUpperCase() + computerSelection.slice(1) } beats ${ selectionInput }`, playerScore: 0, computerScore: 1 };
    }
}

function game(e) {
    let result = playRound(this.id);

    const screen = document.querySelector('.gameplay');
    screen.textContent = result.msg;

    const playerScoreScreen = document.querySelector('#player-score');
    const computerScoreScreen = document.querySelector('#computer-score');
    playerScore += result.playerScore;
    computerScore += result.computerScore;

    playerScoreScreen.textContent = `You: ${ playerScore }`;
    computerScoreScreen.textContent = `Computer: ${ computerScore }`;

    const roundScreen = document.querySelector('#roundbox');

    roundScreen.textContent = `Round: ${ round }`;
}

const playerSelection = document.querySelectorAll('.selection');
playerSelection.forEach(selection => selection.addEventListener('click', game))
// function game() {
//     let playerScore = 0;
//     let computerScore = 0;
//     for (let i = 0; i < 5; i++) {
//         let playerSelection = playerPrompt();
//         let result = playRound(playerSelection, computerPlay());
//         playerScore += result.playerScore;
//         computerScore += result.computerScore;
//         console.log(result.msg);
//     }
//     console.log(`Player: ${ playerScore }, Computer: ${ computerScore }`)
// }
// game();