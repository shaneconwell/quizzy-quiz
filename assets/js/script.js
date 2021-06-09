var startQuizEl = document.getElementById("startQuiz");
var tryAgainButton = document.getElementById("tryAgain");
var timerEl = document.querySelector(".timer");
var optionButtons = [document.querySelector("#quizOption1"), document.querySelector("#quizOption2"),
    document.querySelector("#quizOption3"), document.querySelector("#quizOption4")
]
var container = document.querySelector(".container");
var enterInitialsEl = (".enterInitials")
var points = document.querySelector("#points")
var finalScore = document.querySelector("#finalScore")
var userInitials = document.querySelector("#userInitials");
var submitButton = document.querySelector("#submitButton");
var backButton = document.querySelector("#backButton");
var resetButton = document.querySelector("#resetButton");
var savedName = document.querySelector("#saved-name");
var savedScore = document.querySelector("#saved-score");
var userHighscore;

var questions = [{
        title: "From the given array which index is the letter 'b' on? ['a', 'b', 'c', 'd']",
        choices: ["0", "b", "2", "1"],
        answer: "1"
    },
    {
        title: "Data is stored in localStorage as _____.",
        choices: ["strings", "objects", "arrays", "all of the above"],
        answer: "strings"
    },
    {
        title: "What are the two types of scope JavaScript uses?",
        choices: ["Global and Local", "Outside and Inside", "Surrounding and Inner", "Abroad and Local"],
        answer: "Global and Local"
    },
    {
        title: "What operator is used to assign a value to a declared variable?'?",
        choices: ["Colon (:)", "Question mark (?)", "Double-equal (==)", "Equal sign (=)"],
        answer: "Equal sign (=)"
    },
    {
        title: "How do we declare a conditional statement in JavaScript?",
        choices: ["<difference...between>", "if...else", "while loop", "for loop"],
        answer: "if...else"
    },
    {
        title: "Which of the following is not JavaScript Data Types?",
        choices: ["Undefined", "Number", "Boolean", "Float"],
        answer: "Float"
    }
];
var questionNum = 0;
var questionInfo = questions[questionNum];
var questionsAsked = 0;
var timer;
// display time hard-coded into html 1 second higher than "timeLeft" to account for a slight time delay
var timeLeft = 49;

points = 0;

// Event listener checking for answer clicks in its container.
container.addEventListener("click", function (event) {
    var element = event.target;
    startQuizEl.setAttribute("style", "display:none")
    if (element.matches(".answer-button")) {
        checkAnswer();
    } else {
        return
    }
});

function renderHighscores() {
    // Clear todoList element and update todoCountSpan
    highscoreOutput.innerHTML = "score";
    document.getElementById("initialsOutput").innerHTML = userHighscore.userInitials + " - ";
    document.getElementById("highscoreOutput").innerHTML = userHighscore.Score;
}

function init() {
    // Get stored from localStorage
    var storedScores = JSON.parse(localStorage.getItem("userHighscore"));

    if (storedScores !== null) {
        userHighscore = storedScores;
    }
    renderHighscores();
}

// Sets the next question up to display on screen.
function nextQuestion() {

    for (var i = 0; i < optionButtons.length; i++) {
        optionButtons[i].textContent = questionInfo.choices[i];
        optionButtons[i].value = questionInfo.choices[i];
    }
    document.querySelector("#questionPrompt").textContent = questionInfo.title;
}

function checkAnswer() {
    var playerAnswer = event.target.value;
    if (playerAnswer) {
        if (playerAnswer === questions[questionNum].answer) {
            points++;


        } else {
            timeLeft -= 15;

        }

        questionNum++;
        if (questions[questionNum] == undefined) {
            endGame();
            return;
        }

        for (var i = 0; i < optionButtons.length; i++) {

            optionButtons[i].textContent = questions[questionNum].choices[i];
            optionButtons[i].value = questions[questionNum].choices[i];

            document.querySelector("#questionPrompt").textContent = questions[questionNum].title;
        }
    }
}

function endGame() {

    document.querySelector("#questionSection").style = "display: none;";
    document.querySelector("#enterInitials").style = "display: block;";
    timerEl.setAttribute("style", "display:none")
    finalScore.textContent = points
    return;
}

// event listener for submit button to log players score, stores score in local storage.
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    userHighscore = {
        userInitials: userInitials.value.trim(),
        Score: (points)
    };
    localStorage.setItem("userHighscore", JSON.stringify(userHighscore));
    document.querySelector("#enterInitials").style = "display: none;";
    document.querySelector("#tryAgain").style = "display: block;";
    renderHighScore();
    return;

});

// Reports score at the end of the game
function renderHighScore() {


    var lastScore = JSON.parse(localStorage.getItem("userHighscore"));
    document.getElementById("initialsOutput").innerHTML = userHighscore.userInitials + " - ";
    document.getElementById("highscoreOutput").innerHTML = userHighscore.Score;

}

// Starts the timer and sets the fuction to load the first question.
function startTimer() {
    nextQuestion();
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = "Time: " + timeLeft;
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string and end the game
            timerEl.textContent = '';
            endGame();

            clearInterval(timeInterval);

        }
    }, 1000);

}


startQuizEl.addEventListener("click", function (event) {
    event.preventDefault();
    startTimer();
});


init();