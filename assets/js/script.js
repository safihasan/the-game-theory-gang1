function game() {
    const actions = ["rock", "paper", "scissors", "lizard", "spock"];
    const playerWinResults = ["scissorspaper", 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors',
        'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];
    let playerChoice = " ";
    let compChoice = " ";
    const playChoiceElement = document.querySelector(".player-choice");
    const mainScoreArea = document.querySelector(".main-box");
    const pickedElement = document.querySelector(".section-picked");
    const playerPickElement = document.querySelector(".user-picked");
    const pcPickElement = document.querySelector(".pc-picked");
    const resultElement = document.querySelector(".result");
    const resultTitleElement = resultElement.querySelector(".title");
    const PlayerScoreDisplay = document.getElementById("player-score");
    const computerScoreDisplay = document.getElementById("computer-score");
    let playerScore = 0;
    let computerScore = 0;

    let currentScore = null;

    window.addEventListener('load', () => {
       

        document.querySelectorAll(".player-choice .btn-hand").forEach(hand => {

            hand.addEventListener("click", (e) => {
                playerChoice = getPlayerChoice(e.target);
                compChoice = getCompChoice();
                console.log();

                startGame();
            })
        });
        resultElement.querySelector("button").addEventListener('click', tryAgain);

        document.getElementById("playSoundButton").addEventListener("click", function () {
            var audio = new Audio("assets/sounds/rock-paper-scissors-lizard-spock-game-rules-rock-paper-scissors-lizard-spock-sheldon-big-bang-theory-101soundboards.mp3");
            audio.play();
        });
    })
    function startGame() {
        calculateWinner(playerChoice, compChoice);
        playChoiceElement.classList.add("hidden");
        mainScoreArea.classList.add("hidden");
        pickedElement.classList.remove("hidden");
        clearResultBeforeAppend();
        buildChoiceElement(true, playerChoice);
        buildChoiceElement(false, compChoice);

    }

    function getPlayerChoice(target) {

        if (target.nodeName === 'IMG') {
            return target.parentElement.classList[1];
        }
        return target.classList[1];
    }

    function getCompChoice() {
        return actions[Math.floor(Math.random() * 5)];
    }

    function calculateWinner(player, comp) {
        console.log(player + comp)
        if (player === comp) {
            resultTitleElement.innerText = `Tie`;
        } else if (getPlayerWinsStatus(player + comp)) {
            
            resultTitleElement.innerText = `You WIN!`;
            playerScore++;
            PlayerScoreDisplay.textContent = playerScore;
           
           computerScore++;
           computerScoreDisplay.textContent = computerScore;
        } else {
            resultTitleElement.innerText = `You Lose!` ;
            
           
        }
    }

    function getPlayerWinsStatus(result) {
        return playerWinResults.some(winStr => winStr === result); 
    }

    function buildChoiceElement(isItUserElement, className) {
        const el = document.createElement("button");
        el.innerHTML = `<img src="assets/gallery/${className}.jpeg"
        alt="rock hand">`;
        el.classList = [`btn-hand ${className}`];
        if (isItUserElement) {
            playerPickElement.append(el);
        } else {
            pcPickElement.append(el);
        }
    }

    function tryAgain() {
        playChoiceElement.classList.remove("hidden");
        mainScoreArea.classList.remove("hidden"); 
        pickedElement.classList.add("hidden");
    }

    function clearResultBeforeAppend() {
        playerPickElement.innerHTML = "";
        pcPickElement.innerHTML = "";
    }

    /*function calculateScore(roundResult) {
        currentScore += roundResult;
        updateScoreBoard();
    }
   
    function updateScoreBoard() {
        scoreCountElement.innerText = currentScore;
        window.localStorage.setItem("gameScore", currentScore);
    }*/

}

game()