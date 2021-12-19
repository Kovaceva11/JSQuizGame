// 5 questions with possible answers and Correct Answer.
var questArr = [ 
    {
    question: "Who Invented Javascript?",
    option1: "Kid Cudi",
    option2: "Brendan Eich",
    option3: "Chuck Yeager",
    option4: "Bill Gates",
    correctOption: "2",
  },
  {
    question: "When did Javascript first appear?",
    option1: "January 1, 1983",
    option2: "1993",
    option3: "December 4, 1995",
    option4: "January 31, 1989",
    correctOption: "3",
  },
  {
    question:
      "IF javascript Objects are a collection of Properties, The Properties are made up of what? ",
    option1: "Boolean",
    option2: "Object, Property",
    option3: "Spaghetti and Meatballs",
    option4: "Key-value Pairs",
    correctOption: "4",
  },
  {
    question: "What does HTML stand-for?",
    option1: "Hot Tacos Mini Llamas",
    option2: "Hyper Tigers Making Love",
    option3: "Hyper Text Markup Language",
    option4: "Hyper Train Musk Loop",
    correctOption: "3",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    option1: "<javascript>",
    option2: "<js>",
    option3: "<link>",
    option4: "<script>",
    correctOption: "4",
  }, 

    {
        question: "Finished",
    }
]
// create variables for the answer fields
var optionA = document.querySelector(".optionA");
var optionB = document.querySelector(".optionB");
var optionC = document.querySelector(".optionC");
var optionD = document.querySelector(".optionD");


//Countdown Timer Function
var countdownTimer = document.querySelector(".timeremaining");
function timerFunction() {
    timerStart = setInterval(function() {
        timedCounter--;
        countdownTimer.textContent = timedCounter;

        if(timedCounter <= 0)
        {
            console.log("times up!");
            clearInterval(timerStart);
            questionArea.style.display = "none";
            finishPage();

        } else if(timedCounter > 0 && QuestIndex == 6) {
            clearInterval(timerStart);
            questionArea.style.display = "none";
            finishPage();
        };

    }, 1000);
};
// create variables for buttons
const startButton = document.querySelector("#start-button");
const endhighScoreList = document.querySelector("#highscorelist");
const showScoreButton = document.querySelector("#highscoreButton");
const clearHighScore = document.querySelector("#clearHighScore");

// Button event listeners 
startButton.addEventListener("click", playGame);
showScoreButton.addEventListener("click", viewScores);
clearHighScore.addEventListener("click", clearHighScoresList);

//functions for selecting and getting the right answers or incorrect answers. 
var rightAnswer;
var selectedAnswer;

optionA.addEventListener("click", function(event) {
    event.preventDefault();
    var optionATarget = event.target;
    if(optionATarget.matches(".optionA") === true) {
        selectedAnswer = 1;
        getRightAnswer();
        console.log("Selected Answer: " + selectedAnswer);
    }
    addQuestion()
});

optionB.addEventListener("click", function(event) {
    event.preventDefault();
    var optionBTarget = event.target;
    if(optionBTarget.matches(".optionB") === true) {
        selectedAnswer = 2;
        getRightAnswer();
        console.log("Selected Answer: " + selectedAnswer);
    }
    addQuestion()
});

optionC.addEventListener("click", function(event) {
    event.preventDefault();
    var optionCTarget = event.target;
    if(optionCTarget.matches(".optionC") === true) {
        selectedAnswer = 3;
        getRightAnswer();
        console.log("Selected Answer: " + selectedAnswer);
    }
    addQuestion()
});
 
optionD.addEventListener("click", function(event) {
    event.preventDefault();
    var optionDTarget = event.target;
    if(optionDTarget.matches(".optionD") === true) {
        selectedAnswer = 4;
        getRightAnswer();
        console.log("Selected Answer: " + selectedAnswer);
    }
    addQuestion()
});


//Start Game with timer settings
let timerStart = 30;
let timedCounter = 30;
let playerPoints = 0;
let QuestIndex = 0;

function playGame() {
    timerStart = 30;
    timedCounter = 30;
    playerPoints = 0;
    QuestIndex = 0;
    timerFunction();
    endhighScoreList.style.display = "none";
    questionArea.style.display = "block";
    startButton.style.visibility = "hidden";
    addQuestion();
};

//Adds next question once user has selected a possible answer. 

function addQuestion() {
    displayQuestionnaire(questArr[QuestIndex]);
    QuestIndex++;
};

//Display the questions on the page
function displayQuestionnaire() {
    showActualQuestion.textContent = questArr[QuestIndex].question;
    optionA.textContent = questArr[QuestIndex].option1;
    optionB.textContent = questArr[QuestIndex].option2;
    optionC.textContent = questArr[QuestIndex].option3;
    optionD.textContent = questArr[QuestIndex].option4;
    rightAnswer = questArr[QuestIndex].correctOption;
};

//Get the right answer and if correct, add 5 to playerPoints. if wrong. Subtract 5 seconds from timer. 
function getRightAnswer() {
    if(selectedAnswer == rightAnswer) {
        playerPoints = playerPoints + 5;
        console.log("Correct!");
        pointsChecker();
    } else {
        console.log("INCORRECT!");
        timedCounter = timedCounter - 5;
    };
};

const showActualQuestion = document.querySelector(".quizQuestion");
const questionArea = document.querySelector("#questionArea");
const pointsAcquired = document.querySelector("#currentPoints");
const totalPoints = document.querySelector("#totalPoints");


function finishPage() {
    playerPoints = playerPoints + timedCounter;
    totalPoints.textContent = playerPoints;
    startButton.style.visibility = "visible";
    topPointsChecker(playerPoints)
};

//Add player points
function pointsChecker() {
    pointsAcquired.textContent = playerPoints;
};


const TotalTopPoints = 5;
const TopPoints = 'highScores';

//High scores list.
function topPointsChecker(playerPoints) {
    const highPoints = JSON.parse(localStorage.getItem(TopPoints)) || [];
    const lowPoints = highPoints[TotalTopPoints - 1]?.score || 0;

    if(playerPoints > lowPoints) {
        saveTopPoints(playerPoints, highPoints);
        viewScores();
    };
};

//Clear local storage of saved high scores.
function clearHighScoresList() {
    localStorage.clear();
    viewScores();
};


//View list of high scores.
function viewScores() {
    const highPoints = JSON.parse(localStorage.getItem(TopPoints)) || [];
    const highScoreList = document.getElementById(TopPoints);  
    endhighScoreList.style.display = "block";
    highScoreList.innerHTML = highPoints
        .map((playerPoints) => `<li>${playerPoints.playerPoints} - ${playerPoints.name}`)
        .join('');
};

//Save your high score prompt. 
function saveTopPoints(playerPoints, highPoints) {
    var name = prompt('Enter initials:');
    var savePoints = { playerPoints , name};
    highPoints.push(savePoints);
    highPoints.sort((a,b) => b.playerPoints - a.playerPoints);
    highPoints.splice(TotalTopPoints);
    localStorage.setItem(TopPoints, JSON.stringify(highPoints));
};



