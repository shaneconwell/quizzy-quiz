

var startQuizEl = document.getElementById("startQuiz");
var timerEl = document.querySelector(".timer");
var optionButtons = [document.querySelector("#quizOption1"), document.querySelector("#quizOption2"),
    document.querySelector("#quizOption3"), document.querySelector("#quizOption4")
]
var container = document.querySelector(".container");
var enterInitialsEl = (".enterInitials")
var points = document.querySelector("#points")
var finalScore = document.querySelector("#finalScore")
var userInitialsInput = document.querySelector("#userInitials");
var initialSubmitBtn = document.querySelector("#initialSubmit");
var savedName = document.querySelector("#saved-name");
var savedScore = document.querySelector("#saved-score");

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

var timer;
var timeLeft = 75;
var questionsAsked = 0;
points = 0;

// Event listener checking for answer clicks in its container.
container.addEventListener("click", function(event) {
    var element = event.target;
    startQuizEl.setAttribute("style", "display:none")
    if (element.matches(".answer-button")) {
    
      console.log("is clicked");
      console.log("#" + questionsAsked);
      checkAnswer();

    }else{
        return
    }
});
// var answerText = " ";



// Sets the next question up to display on screen.
function nextQuestion() {
    

    for (var i = 0; i < optionButtons.length; i++) {
        optionButtons[i].textContent = questionInfo.choices[i];
        optionButtons[i].value = questionInfo.choices[i];
    }

    document.querySelector("#questionPrompt").textContent = questionInfo.title;

}




function checkAnswer(){
        var playerAnswer = event.target.value;
                if (playerAnswer) {
                    if (playerAnswer === questions[questionNum].answer) {
                        points++
                        ;

                        
                    } else {
                        timeLeft -= 15;
                        console.log("wrong");
                    }

                    questionNum++;
                    if (questions[questionNum] == undefined) {
                        
                        console.log("done questions");
                        endGame();
                        return;
                        
                    }

                    for (var i = 0; i < optionButtons.length; i++) {
                        
                        optionButtons[i].textContent = questions[questionNum].choices[i];
                        optionButtons[i].value = questions[questionNum].choices[i];
                    
                    
                    document.querySelector("#questionPrompt").textContent = questions[questionNum].title;
                    }

                    console.log(questions[questionNum]);
                    console.log(questions[questionNum].answer);
                }
            }
    


 
function endGame (){
    var finalPoints = points
    
    document.querySelector("#questionSection").style = "display: none;";
    document.querySelector("#enterInitials").style = "display: block;";
    timerEl.setAttribute("style", "display:none")
    finalScore.textContent = points
    console.log(finalPoints);
    
    

    
}

// initialSubmitBtn.addEventListener("click", function(event) {
//     event.preventDefault();
//     var userHighscore = {
//         userInitials: userInitialsInput.value.trim(),
//         score: ("5")
//     };
    
//     localStorage.setItem("userHighscore", JSON.stringify(userHighscore));
//     document.querySelector(".enterInitials").style = "display: none;";
//     renderHighScore();
    
// });

function renderHighScore() {

   
    var lastScore = JSON.parse(localStorage.getItem(userHighscore));

    // Check if data is returned, if not exit out of the function
    if (lastScore !== null) {
    document.getElementById("saved-name").innerHTML = userHighscore.userInitials;
    document.getElementById("saved-score").innerHTML = userHighscore.score;
  

  }
}
// displays the first question of the quiz and starts the timer countdown 

function startTimer() {
    nextQuestion();
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent ="Time: " +timeLeft;
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerEl.textContent = '';
            endGame();

            clearInterval(timeInterval);

        }
    }, 1000);

}


startQuizEl.addEventListener("click", function () {
    startTimer();
});


