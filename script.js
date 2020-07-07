let choices = ['rock', 'paper', 'scissors'];
function computerPlay() {
    let randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}
function playerPrompt() {
    let selection;
    while (true) {
        selection = prompt('Rock, paper, scissors?');
        selection = selection.toLowerCase();
        if (choices.includes(selection)) {
            break;
        } else {
            console.log('Please select rock, paper or scissors!')
        }
    }
    return selection;
}
function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        return { msg: `It's a draw! You both chose ${ playerSelection }`, playerScore: 0, computerScore: 0 };
    }
    if (playerWon(playerSelection, computerSelection)) {
        return { msg: `You win! ${ playerSelection } beats ${ computerSelection }`, playerScore: 1, computerScore: 0 };
    } else {
        return { msg: `You lose! ${ computerSelection } beats ${ playerSelection }`, playerScore: 0, computerScore: 1 };
    }
}
function playerWon(playerSelection, computerSelection) {
    const winLogic = {
        rock: { win: 'scissors', loose: 'paper' },
        paper: { win: 'rock', loose: 'scissors' },
        scissors: { win: 'paper', loose: 'rock'}
    }
    return winLogic[playerSelection].win === computerSelection;
}
function game() {
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < 5; i++) {
        let playerSelection = playerPrompt();
        let result = playRound(playerSelection, computerPlay());
        playerScore += result.playerScore;
        computerScore += result.computerScore;
        console.log(result.msg);
    }
    console.log(`Player: ${ playerScore }, Computer: ${ computerScore }`)
}
game();