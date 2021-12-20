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
var optionA = $(".optionA");
var optionB = $(".optionB");
var optionC = $(".optionC");
var optionD = $(".optionD");


//Countdown Timer Function
var countdownTimer = $(".timeremaining");
function timerFunction() {
    timerStart = setInterval(function() {
        timedCounter--;
        $(".timeremaining").text(timedCounter);

        if(timedCounter <= 0)
        {
            console.log("times up!");
            clearInterval(timerStart);
            $("#questionArea").css("display","none");
            finishPage();

        } else if(timedCounter > 0 && QuestIndex == 6) {
            clearInterval(timerStart);
            $("#questionArea").css("display","none");
            finishPage();
        };

    }, 1000);
};
// create variables for buttons
const startButton = $("#start-button");
const endhighScoreList = $("#highscorelist");
const showScoreButton = $("#highscoreButton");
const clearHighScore = $("#clearHighScore");

// Button event listeners 
$('#start-button').on("click", playGame);
$("#highscoreButton").on("click", viewScores);
$("#clearHighScore").on("click", clearHighScoresList);

//functions for selecting and getting the right answers or incorrect answers. 
var rightAnswer;
var selectedAnswer;

$(".optionA").on("click", function(event) {
    event.preventDefault();
    var optionATarget = event.target;
    if(optionATarget.matches(`${'.optionA'}`) === true) {
        selectedAnswer = 1;
        getRightAnswer();
        console.log("Selected Answer: " + selectedAnswer);
    }
    addQuestion()
});

$(".optionB").on("click", function(event) {
    event.preventDefault();
    var optionBTarget = event.target;
    if(optionBTarget.matches(`${'.optionB'}`) === true) {
        selectedAnswer = 2;
        getRightAnswer();
        console.log("Selected Answer: " + selectedAnswer);
    }
    addQuestion()
});

$(".optionC").on("click", function(event) {
    event.preventDefault();
    var optionCTarget = event.target;
    if(optionCTarget.matches(`${'.optionC'}`) === true) {
        selectedAnswer = 3;
        getRightAnswer();
        console.log("Selected Answer: " + selectedAnswer);
    }
    addQuestion()
});
 
$(".optionD").on("click", function(event) {
    event.preventDefault();
    var optionDTarget = event.target;
    if(optionDTarget.matches((`${'.optionD'}`)) === true) {
        selectedAnswer = 4;
        getRightAnswer();
        console.log("Selected Answer: " + selectedAnswer);
    }
    addQuestion()
});


//Start Game with timer settings
let timerStart = 30;
let timedCounter = 30;
var playerPoints = 0;
let QuestIndex = 0;

function playGame() {
    timerStart = 30;
    timedCounter = 30;
    playerPoints = 0;
    QuestIndex = 0;
    timerFunction();
    $("#highscorelist").css("display","none");
    $("#questionArea").css("display","block");
    $("#start-button").css("display","hidden");
    addQuestion();
};

//Adds next question once user has selected a possible answer. 

function addQuestion() {
    displayQuestionnaire(questArr[QuestIndex]);
    QuestIndex++;
};

//Display the questions on the page
function displayQuestionnaire() {
    $("#quizQuestion").text(questArr[QuestIndex].question);
    $(".optionA").text(questArr[QuestIndex].option1);
    $(".optionB").text(questArr[QuestIndex].option2);
    $(".optionC").text(questArr[QuestIndex].option3);
    $(".optionD").text(questArr[QuestIndex].option4);
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

const showActualQuestion = $("#quizQuestion");
const questionArea = $("#questionArea");
const pointsAcquired = $("#currentPoints");
const totalPoints = $("#totalPoints");


function finishPage() {
    playerPoints = playerPoints + timedCounter;
    $("#totalPoints").text(playerPoints);
    $("#start-button").css("display","visible");
    topPointsChecker(playerPoints)
};

//Add player points
function pointsChecker() {
    $("#currentPoints").text(playerPoints);
};


const TotalTopPoints = 5;
const TopPoints = $('#highScores');

//High scores list.
function topPointsChecker(playerPoints) {
    const highPoints = JSON.parse(localStorage.getItem(`${TopPoints}`)) || [];
    const lowPoints = highPoints[`${TopPoints}` - 1]?.score || 0;

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
    var highPoints = JSON.parse(localStorage.getItem($('#highScores'))) || [];
    var highScoreList = $('#highScores');  
    $("#highscorelist").css("display", "inline");
    highScoreList.html(highPoints)
        .map((playerPoints) => `<li>${playerPoints.playerPoints} - ${playerPoints.name}`);
};

//Save your high score prompt. 
function saveTopPoints(playerPoints, highPoints) {
    var name = prompt('Enter initials:');
    var savePoints = { playerPoints , name};
    highPoints.push(savePoints);
    highPoints.sort((a,b) => b.playerPoints - a.playerPoints);
    highPoints.splice(TotalTopPoints);
    localStorage.setItem(`${TopPoints}`, JSON.stringify(highPoints));
}
