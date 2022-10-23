// Questions and answers variable
var myQuestions = [
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            a: 'JavaScript',
            b: 'terminal/bash',
            c: 'for loops',
            d: 'console.log'
        },
        correctAnswer: 'console.log'
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables",
        answers: {
            a: 'commas',
            b: 'curly brackets',
            c: 'quotes',
            d: 'parenthesis'
        },
        correctAnswer: 'quotes'
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: {
            a: 'numbers and strings',
            b: 'other arrays',
            c: 'booleans',
            d: 'all of the above'
        },
        correctAnswer: 'all the above'
    },
        {
        question: "The condition in an if / else statement is enclosed wih ____.",
        answers: {
            a: 'a',
            b: 'b',
            c: 'c',
            d: 'd'
        },
        correctAnswer: '...'
    },
    {
        question: "Commonly used data types DO Not Include:",
        answers: {
            a: 'a',
            b: 'b',
            c: 'c',
            d: 'd'
        },
        correctAnswer: '...'
    }
]

// [x] When timerCount =< 0, game ends
// [x] When last question, game ends
// [ ] make game pretty
// [ ] WHEN the game is over THEN I can save my initials and my score

// Button variables
var startButton = document.querySelector(".start-button");

// Timer variables
var timerContainer = document.getElementById("timer");
var timer;
var timerCount;

// Quiz variables
var quizContainer = document.getElementById('quiz');
var userAnswer;
var numCorrect = 0;
var quizOn = false;
var output = [];
var answersList;
var questionIndex = -1;
var answerContainers;

// Results variables
var resultsContainer = document.getElementById('results');
var numCorrect = 0;
var resultsOutput = '';

// Game Over Variables
var gameOverContainer = document.getElementById('gameOverScreen');
var initials;

// Timer function
function startTimer() {
    timer = setInterval(function(){
        timerCount--;
        timerContainer.innerHTML = '<div>Time Remaining: ' + timerCount + '</div>';
        if (timerCount === 0) {
            clearInterval(timer);
        }
    }, 1000);
}

// shows questions, answers, and submit button for each question
function givePrompts() {
    ++questionIndex;

    answersList = [];
    output = [];

    if (questionIndex < myQuestions.length) {

        for (letter in myQuestions[questionIndex].answers) {
            // fills answers list array with multiple choice ansswers
            answersList.push(
                '<label>'
                    + '<input type="radio" name="question'+questionIndex+'" value="'+myQuestions[questionIndex].answers[letter]+'"onclick=""'+'>'
                    + letter + ': '
                    + myQuestions[questionIndex].answers[letter]
                    +'<br>'
                + '</label>'
                );
        }

        // displays questions, answers, and submit button
        output.push(
            '<div class="question">' + myQuestions[questionIndex].question + '</div>'
            + '<div id="answers" class="answers">' + answersList.join('') + '</div><br>'
            + '<input type="button" class="submit-button" onclick="submitAnswer()" value="Submit Answer">'
        );

        //console.log(output);

        quizContainer.innerHTML = output.join('');
        resultsContainer.innerHTML = '<br>Your Score: ' + numCorrect + '<br>' + resultsOutput;
    } else {
        gameOver();
    }
}

// [ ] WHEN the game is over THEN I can save my initials and my score

function gameOver() {
    // reset game conditions:
    quizContainer.innerHTML = ' ';
    clearInterval(timer);
    timerCount = 0;
    timerContainer.innerHTML = '<div>Time Remaining: ' + timerCount + '</div>';
    quizContainer.innerHTML = ' ';
    startButton.disabled = false;
    startButton.value = 'Start Quiz';
    questionIndex = -1;

    gameOverContainer.innerHTML = '<br><label>Submit Initals: </label><input type="search" id="initialsInput"><input type="submit" onclick="handleClick()">'
}

// function submitInitials() {
//     initials = document.getElementById('initialsInput').value;
//     getHighScoresScreen();
// }

function submitScore(userInitials, highScore) {
    highScoresArr.push({user: {userInitials, highScore}});
    console.log(highScoresArr);
}

function handleClick() {
    initials = document.getElementById('initialsInput').value;
    submitScore(initials, numCorrect);
    getHighScoresScreen();
}

// highScores is an array that will store high scores via the numCorrect and initials var
var userInitials;
var highScore;
var highScoresArr = [];

var gamesPlayed = 0;



function getHighScoresScreen() {
    ++gamesPlayed;
    resultsContainer.innerHTML = ' ';
    gameOverContainer.innerHTML = '<h3>High Scores</h3><p>'+initials+' - '+numCorrect+'</p><input type="button" value="Play Again" id="goBackButton" onclick=""><input type="button" value="Clear High Scores" id="clearHighScoresButton" onclick="">';

    // highSchores
    // highScoresArr.userInitials = initials;
    // highScoresArr.highScore = numCorrect;
    // highScoresArr.push({user: {userInitials, highScore}});
    // //highScoresArr = highScoresArr.concat([initials, numCorrect]);
    // console.log(highScoresArr);


    for (let i = 0; i < highScoresArr.length; i++) {
        console.log(highScoresArr.userInitials);
        console.log(highScoresArr.highScore);
    }
}

// Get Answer - gets answer from user input when user selects an answer
function submitAnswer() {
    
    answerContainers = quizContainer.querySelectorAll('.answers');
    //answerContainers = quizContainer.getElementById('answers');
    //console.log(answerContainers,questionIndex);
    //userAnswer = '';

    userAnswer = (answerContainers[0].querySelector('input[name=question'+questionIndex+']:checked')||{}).value;
    // userAnswer = (answerContainers[questionIndex].querySelector('input[name=question'+questionIndex+']:checked')||{}).value;
        
    // if answer is correct
    if(userAnswer===myQuestions[questionIndex].correctAnswer){
        // add to the number of correct answers
        numCorrect++;
        resultsOutput = '<div>'+'Your answer is correct!'+'<br>'+'</div>';
        givePrompts();
    }
    // if answer is wrong or blank
    else{
        resultsOutput = '<div>'+'Your answer is wrong :('+'<br>'+'</div>'
        givePrompts();
        if (timerCount > 0) {
            timerCount = timerCount - 10;
            if (timerCount <= 0) {
                gameOver();
            }
        }
    }
}

function updateButton() {
    startButton.disabled = true;
    if (startButton.value === 'Start Quiz') {
        startButton.value = 'Stop Quiz';
    } else {
        startButton.value = 'Start Quiz';
    }
}

/*
function updateSubmitButton() {
    if (submitButton === 'Submit Answer') {
        submitButton = 'Next Question';
    } else {
        submitButton = 'Submit Answer';
    }
}
*/

// startQuiz needs to display quesion and answers + update button + start timer
function startQuiz() {
    updateButton();
    timerCount = 30;
    timerContainer.innerHTML = '<div>Time Remaining: ' + timerCount + '</div>';
    startTimer();
    givePrompts();
}

// Activates quiz function when startButton is clicked
startButton.addEventListener("cilck", startQuiz);













// quiz questions function
function showQuestions() {

    // displays questions and answers
    for (let i = 0; i < myQuestions.length; i++) {
        // displays question
        // [ ] must stop question display so that we don't go to next question without user input/answer

        // resets the list of answers
        answersList = [];
        answerButton = [];

        // displays multiple choice answers
        for(letter in myQuestions[i].answers){
            // display multiple choice ansswers
            answersList.push(
            '<label>'
                + letter + ': '
                + '<input type="radio" name="question'+i+'" value="'+myQuestions[i].answers[letter]+'"onclick="submitAnswer()"'+'>'
                +'<br>'
            + '</label>'
            );
        }
    
        // creates submit button
        //if (questionIndex < (myQuestions.length - 1)) {
            var nextButton = document.createElement("input");
            nextButton.type = "button";
            nextButton.value = "Submit Your Answer";
            //nextButton.addEventListener('click', nextQuestion);
            //document.body.appendChild(nextButton);
        //}

        // add this question and its answers to the output
        output.push(
            '<div class="question">' + myQuestions[i].question + '</div>'
            + '<div class="answers">' + answersList.join('') + '</div>'
            + '<input type="button" class="submitButton" onclick="submitAnswer()" value="Submit Answer">'
            //+ '<div>' + nextButton.addEventListener('click', showQuestions)
            //+ document.body.appendChild(nextButton)
        );

        quizContainer.innerHTML = output.join('');
    }
}

function nextQuestion() {
    //document.body.innerHTML = '';
    //quizContainer.innerHTML = output.join('');
    //contentSectionEl = '';
    ++questionIndex;

    answersList = [];
    output = [];

    // writes question
    quizContainer.innerHTML = myQuestions[questionIndex].question;
    //document.write(myQuestions[questionIndex].question + "<br>");
    //contentSectionEl = myQuestions[questionIndex].question + "<br>";
    //document.innerHTML(myQuestions[questionIndex].question + "<br>");

    // displays multiple choice answers
    //for (letter in myQuestions[questionIndex].answers) {

        for (let i = 0; i < myQuestions.length; i++) {
            for(letter in myQuestions[i].answers){

                // fills answers list array with multiple choice ansswers
                answersList.push(
                '<label>'
                    + letter + ': '
                    + '<input type="radio" name="question'+i+'" value="'+myQuestions[i].answers[letter]+'"onclick="submitAnswer()"'+'>'
                    +'<br>'
                + '</label>'
                );
            }

            // displays questions, answers, and submit button
            output.push(
                '<div class="question">' + myQuestions[i].question + '</div>'
                + '<div class="answers">' + answersList.join('') + '</div>'
                + '<input type="button" class="submitButton" onclick="submitAnswer()" value="Submit Answer">'
            );
        
            quizContainer.innerHTML = output.join('');

        }


        //document.write("<input type=radio id=myRadio name=userAnswer>" + myQuestions[questionIndex].answers[letter] + '<br>');
        //contentSectionEl = "<input type=radio id=myRadio name=userAnswer>" + myQuestions[questionIndex].answers[letter] + '<br>';
        //document.getElementById('quiz').innerHTML = "<input type=radio id=myRadio name=userAnswer>" + myQuestions[questionIndex].answers[letter] + '<br>';
        //quizContainer.appendChild(document.createTextNode(''));
    //}

    // creates button and sets up event listener - waiting for user input
    if (questionIndex < (myQuestions.length - 1)) {
        var nextButton = document.createElement("input");
        nextButton.type = "button";
        nextButton.value = "Next Question [Submit Answer]";
        nextButton.addEventListener('click', nextQuestion);
        document.body.appendChild(nextButton);
    }
}

//document.querySelector(".start-button").onclick = null;

// if quizOn, we want to run the quiz


/*
if (quizOn) {
    console.log("quiz is on");
} else {    // if quiz is off, we want to stop quiz and be able to turn on
    console.log("quiz is off");
}
*/



/*

GIVEN I am taking a code quiz
[x] WHEN I click the start button THEN a [x] timer starts and [x] I am presented with a question
[x] WHEN I answer a question THEN I am presented with another question
[x] WHEN I answer a question incorrectly THEN time is subtracted from the clock
[x] WHEN all questions are answered or the timer reaches 0 THEN the game is over
[ ] WHEN the game is over THEN I can save my initials and my score

PERSONAL:
[x] how to make it so that when I click "start quiz" button multiple times, it doesn't speed up the count-down? I want it to stop the count-down or not affect it all.
[ ] get answer to be recorded
[ ] how to make it so that only one answer can be selected

*/