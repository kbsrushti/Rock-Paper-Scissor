const wrapperDiv = document.querySelector('.wrapper');
const options = document.querySelectorAll('.option');
const gameOptions = document.querySelector('.game__options');
const results = document.querySelector('.results');
const playAgain = document.querySelector('.play-again');
const usersOption = document.querySelector('.option-user');
const compsOption = document.querySelector('.option-comp');
const resultText = document.querySelector('.result-text');
const scoreCount = document.querySelector('.score-count');
const rulesModal = document.querySelector('.rules-modal');
const rulesButton = document.querySelector('.rules');
const rulesClose = document.querySelector('.rules-close');

let userChoice = "";
let compChoice = "";
let score = 0;

function clickEffect(e) {
 const optionClassList = e.currentTarget.classList;
 const chosenOPtion = optionClassList.contains('option-paper') && "paper-clicked" || optionClassList.contains('option-scissors') && "scissors-clicked" || optionClassList.contains('option-rock') && "rock-clicked" ||  optionClassList.contains('option-lizard') && "lizard-clicked" ||  optionClassList.contains('option-spock') && "spock-clicked";
 userChoice = chosenOPtion.split('-')[0];
 
 e.currentTarget.classList.add(chosenOPtion);

 e.currentTarget.addEventListener('mouseup', (e) => {
  e.currentTarget.classList.remove(chosenOPtion);
 });

 e.currentTarget.addEventListener('mouseout', (e) => {
  e.currentTarget.classList.remove(chosenOPtion);
 })

 gameOptions.classList.add('fade-game');

 setTimeout(() => {
  gameOptions.classList.remove('fade-game');
  compTurn();
 }, 800);
}

function compTurn() {
 const choicesArr = ["rock", "paper", "scissors" , "lizard" , "spock"];
 compChoice = choicesArr[Math.floor(Math.random() * choicesArr.length)];

 checkResult(compChoice, userChoice);
}

function checkResult(compChoice, userChoice) {
 const win = {
  "paper beats rock": true,
  "rock beats scissors": true,
  "scissors beats paper": true,
  "rock beats lizard": true,
  "lizard beats spock": true,
  "spock beats scissors": true,
  "scissors beats lizard": true,
  "paper beats spock": true,
  "lizard beats paper": true,
  "spock beats rock": true
 }

 const draw = compChoice === userChoice;

 if (win[`${userChoice} beats ${compChoice}`]) {
  userWins();
 } else if (draw) {
  userDraws();
 } else {
  userLoses()
 }
}

function userWins() {
 addStyles();
 score++;
 scoreCount.textContent = score;
 resultText.textContent = "you win";
 usersOption.classList.add('animate');
}

function userDraws() {
 addStyles();
 resultText.textContent = "draw";
 usersOption.classList.add('animate');
 compsOption.classList.add('animate');
}

function userLoses() {
 addStyles();

 scoreCount.textContent = score;
 resultText.textContent = "you lose";
 compsOption.classList.add('animate');
}

function addStyles() {
 gameOptions.classList.toggle('display');
 results.classList.toggle('display');
 usersOption.classList.add(`option-${userChoice}`);
 compsOption.classList.add(`option-${compChoice}`);

 const usersChoiceImg = `<img src="./images/icon-${userChoice}.svg" alt=""></img>`;
 const compsChoiceImg = `<img src="./images/icon-${compChoice}.svg" alt=""></img>`;
 usersOption.innerHTML = usersChoiceImg;
 compsOption.innerHTML = compsChoiceImg;
}

function resetGame() {
 results.classList.add('fade');
 setTimeout(() => {
  results.classList.toggle('display');
  results.classList.remove('fade');
  gameOptions.classList.toggle('display');

  usersOption.classList.remove(`option-${userChoice}`);
  compsOption.classList.remove(`option-${compChoice}`);

  usersOption.classList.remove('animate');
  compsOption.classList.remove('animate'); 
 }, 500);
}

function showRules() {

  rulesModal.classList.toggle('display-modal');
  wrapperDiv.classList.toggle('wrapper-overlay');
  console.log(wrapperDiv.classList)
  console.log(wrapperDiv)
  console.log(rulesModal)
 
}

options.forEach(option => option.addEventListener('mousedown', clickEffect));
playAgain.addEventListener("click", resetGame);
rulesButton.addEventListener("click", showRules);
rulesClose.addEventListener("click", showRules);