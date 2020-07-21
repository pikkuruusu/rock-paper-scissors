const choices = ['rock', 'paper', 'scissors'];

function gameScreen(e) {
    const screen = document.querySelector('.gameplay');
    let screenMsg = playRound(this.id).msg;
    screen.textContent = screenMsg;
}

const playerSelection = document.querySelectorAll('.selection');
playerSelection.forEach(selection => selection.addEventListener('click', gameScreen))

// function playerPrompt() {
//     let selection;
//     while (true) {
//         selection = prompt('Rock, paper, scissors?');
//         selection = selection.toLowerCase();
//         if (choices.includes(selection)) {
//             break;
//         } else {
//             console.log('Please select rock, paper or scissors!')
//         }
//     }
//     return selection;
// }
function playRound(selectionInput) {
    let randomNumber = Math.floor(Math.random() * 3);
    let computerSelection = choices[randomNumber];
    
    if (selectionInput == computerSelection) {
        return { msg: `It's a draw! You both chose ${ selectionInput }`, playerScore: 0, computerScore: 0 };
    }
    if (playerWon(selectionInput, computerSelection)) {
        return { msg: `You win! ${ selectionInput[0].toUpperCase() + selectionInput.slice(1) } beats ${ computerSelection }`, playerScore: 1, computerScore: 0 };
    } else {
        return { msg: `You lose! ${ computerSelection[0].toUpperCase() + computerSelection.slice(1) } beats ${ selectionInput }`, playerScore: 0, computerScore: 1 };
    }
}
function playerWon(selectionInput, computerSelection) {
    const winLogic = {
        rock: { win: 'scissors', loose: 'paper' },
        paper: { win: 'rock', loose: 'scissors' },
        scissors: { win: 'paper', loose: 'rock'}
    }
    return winLogic[selectionInput].win === computerSelection;
}
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