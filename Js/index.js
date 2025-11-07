
const choices=['rock','paper','scissors'];


/* grabbing refernces from the html */
const playerSelectionDisplay=document.getElementById('player-selection');
const computerSelectionDisplay=document.getElementById('computer-choice');
const resultDisplay=document.getElementById('round-result');
const choicebuttons=document.querySelectorAll('#game-choices button');
const playerScoreDisplay=document.getElementById('player-score');
const computerScoreDisplay=document.getElementById('computer-score');
const roundNumberDisplay=document.getElementById('current-round');
const fiverounds=document.getElementById('best-of-5');
const sevenrounds=document.getElementById('best-of-7');
const restartbutton=document.getElementById('restart-game');
const endgamesection=document.getElementById('end-game');
const finalresultsection=document.getElementById('final-result');
/*Keeping track of the game state*/
let playerScore=0;
let computerScore=0;
let roundNumber=0;
let totalrounds=0;
let gameactive=false;

/*starting the game rounds */
fiverounds.addEventListener('click',()=> startgame(5));
sevenrounds.addEventListener('click',()=> startgame(7));
/**start game function */
function startgame(rounds){
    totalrounds=rounds;
    playerScore=0;
    computerScore=0;
    roundNumber=0;
    gameactive=true;
    /**reseting everything on the display */
    playerScoreDisplay.textContent=0;
    computerScoreDisplay.textContent=0;
    roundNumberDisplay.textContent=0;
    resultDisplay.textContent='-';
    playerSelectionDisplay.textContent='-';
    computerSelectionDisplay.textContent='-';
    resultDisplay.textContent=`Game started! Playing best of ${totalrounds}`;
    finalresultsection.textContent='';
    endgamesection.style.display='none';
}

/**adding event listener to each choice */
choicebuttons.forEach(button=>{
  button.addEventListener('click',()=>{
    if(!gameactive)return;
    const userchoice=button.id.split('-')[0];
    playGame(userchoice);
 });
});

/**the game logic function */
function playGame(userchoice){
    /**randomly selects a computer choice */
    const computerchoice=choices[Math.floor(Math.random()*choices.length)];
    console.log('user choice:',userchoice);
    console.log('computer choice:',computerchoice);
    roundNumber++; /**counts the round */

    /**determine the round result */
if(userchoice===computerchoice){
    resultDisplay.textContent=`It's a tie! You both chose ${userchoice}.`;
}
else{
    switch(userchoice){
        case 'rock':
            if(computerchoice==='scissors'){
                resultDisplay.textContent="You Win!";
                playerScore++;
            }else{
                resultDisplay.textContent="You Lose!";
                computerScore++;
            }break;
            case 'paper':
                if(computerchoice==='rock'){
                    resultDisplay.textContent="You Win!";
                    playerScore++;
                }else{
                    resultDisplay.textContent="You Lose!";
                    computerScore++;
                }break;
                case 'scissors':
                    if(computerchoice==='paper'){
                        resultDisplay.textContent="You Win!";
                        playerScore++;
                    }else{
                        resultDisplay.textContent="You Lose!";
                        computerScore++;
                    }break;
        }
    }
    /**updates on screen status */
    playerSelectionDisplay.textContent=userchoice;
    computerSelectionDisplay.textContent=computerchoice;
    playerScoreDisplay.textContent=playerScore;
    computerScoreDisplay.textContent=computerScore;
    roundNumberDisplay.textContent=roundNumber;
/**finishes the game if maximum round is reached */
    if(roundNumber>=totalrounds){
        endgame();
    }
}
function endgame(){
    gameactive=false;
    let finalresult='';
/**determines the final result and sets the winner */
    if(playerScore>computerScore){
        finalresult='Congratulations! You won the game!';
    }else if(computerScore>playerScore){
        finalresult='Computer wins the game! Better luck next time.';
    }else{
        finalresult="It's a tie game!";
    }
    /**displays the final winner */
    finalresultsection.textContent=`Game over! ${finalresult}`;
    endgamesection.style.display='block';
}
/**restart game function */
restartbutton.addEventListener('click',()=>{
    startgame(totalrounds);
    resultDisplay.textContent='';
    playerSelectionDisplay.textContent='-';
    computerSelectionDisplay.textContent='-';
    playerScoreDisplay.textContent=0;
    computerScoreDisplay.textContent=0;
    roundNumberDisplay.textContent=0;
    finalresultsection.textContent='';
    endgamesection.style.display='none';
    gameactive=false;
});