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
        correctAnswer: 'all of the above'
    },
        {
        question: "The condition in an if / else statement is enclosed with ____.",
        answers: {
            a: 'quotes',
            b: 'curly brackets',
            c: 'parenthesis',
            d: 'square brackets'
        },
        correctAnswer: 'curly brackets'
    },
    {
        question: "Commonly used data types DO Not Include:",
        answers: {
            a: 'strings',
            b: 'booleans',
            c: 'alerts',
            d: 'numbers'
        },
        correctAnswer: 'alerts'
    }
]

// Start Screen variables
var startContainer = document.getElementById('startScreen');

// Button variables
//var startButton = document.querySelector(".start-button");

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
// highScores is an array that will store high scores via the numCorrect and initials var
var userInitials;
var highScore;
var highScoresArr = [];
var highScoresDisplayInitials = '';
var highScoresDisplayScore = '';
var highScoresDisplay = '';

// Game Over Variables
var gameOverContainer = document.getElementById('gameOverScreen');
var initials;

// Start Screen
function getStartScreen() {
    startContainer.innerHTML = '<div style="text-align:center;"><p>Try to answer the code quiz questions within the time limit. Please note that incorrect answers will reduce your time/score by 10 seconds!</p><br><input type="button" onclick="startQuiz()" value="Start Quiz" enabled/></div>'
}

// Timer function
function startTimer() {
    timer = setInterval(function(){
        timerCount--;
        timerContainer.innerHTML = '<div>Time Remaining: ' + timerCount + '</div>';
        if (timerCount === 0) {
            clearInterval(timer);
            gameOver();
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

        quizContainer.innerHTML = output.join('');
        //resultsContainer.innerHTML = '<br>Your Score: ' + numCorrect + '<br>' + resultsOutput;
        resultsContainer.innerHTML = '<br>' + resultsOutput;
    } else {
        console.log(timerCount);
        gameOver();
    }
}

function gameOver() {
    // reset game conditions:
    startContainer.innerHTML = '';
    quizContainer.innerHTML = ' ';
    timerContainer.innerHTML = ' ';
    console.log('timerCount is:');
    console.log(timerCount);
    // let timerCountDisplay
    // if (timerCount > 0 ) {
    //     timerCountDisplay = timerCount - 10;
    // } else {
    //     timerCountDisplay = 0;
    // }
    resultsContainer.innerHTML = '<br>Your Final Score: ' + timerCount + '<br>';
    gameOverContainer.innerHTML = '<br><div><label>Submit Initals: </label><input type="search" id="initialsInput"></div><input type="submit" onclick="handleClick()">'
    clearInterval(timer);
    questionIndex = -1
}

function submitScore(userInitials, highScore) {
    // highScoresArr.push({userInitials, highScore});
    highScoresArr.push({userInitials, highScore});
    displayHighScores = highScoresArr;
}

function handleClick() {
    //console.log(timerCount);
    //timerCountDisplay = timerCount + 10;
    initials = document.getElementById('initialsInput').value;
    submitScore(initials, timerCount);
    getHighScoresScreen();
}

function getHighScoresScreen() {
    clearInterval(timer);
    //questionIndex = 0;
    timerContainer.innerHTML = ' ';
    quizContainer.innerHTML = ' ';
    startContainer.innerHTML = ' ';
    resultsContainer.innerHTML = ' ';
    highScoresDisplay = '';

    // organizes highScoresArr from highest to lowest scores
    highScoresArr.sort(compare);
    highScoresArr.reverse();

    for (let i = 0; i < highScoresArr.length; i++) {
        highScoresDisplay = highScoresDisplay.concat('<li>'+highScoresArr[i].userInitials+' - '+highScoresArr[i].highScore+'</li>');
    }

    updateGameOverContainer(highScoresDisplay);

}

function compare(a, b) {
    const comparisonA = a.highScore;
    const comparisonB = b.highScore;

    let comparison = 0;
    if (comparisonA > comparisonB) {
        comparison = 1;
    } else if (comparisonA < comparisonB) {
        comparison = -1;
    }
    return comparison;
}

function clearHighScores() {
    highScoresArr = [];
    highScoresDisplay = '';
    updateGameOverContainer(highScoresDisplay);
}

function updateGameOverContainer(a) {
    gameOverContainer.innerHTML = '<h3>High Scores</h3><br><div class="row"><div class="column"><ul>' + a + '</ul></div></div><br>' + '</p><div style="text-align:center;"><input type="button" value="Play Again" id="goBackButton" onclick="startQuiz()"><br><br><input type="button" value="Clear High Scores" id="clearHighScoresButton" onclick="clearHighScores()"></input></div>';
}

// Get Answer - gets answer from user input when user selects an answer
function submitAnswer() {
    
    answerContainers = quizContainer.querySelectorAll('.answers');

    userAnswer = (answerContainers[0].querySelector('input[name=question'+questionIndex+']:checked')||{}).value;
        
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
                timerCount = 0;
                gameOver();
            }
        }
    }
}

// startQuiz needs to display quesion and answers + update button + start timer
function startQuiz() {
    questionIndex = -1;
    numCorrect = 0;
    resultsOutput = ' ';
    startContainer.innerHTML = '';
    gameOverContainer.innerHTML = '';
    resultsContainer.innerHTML
    timerCount = 75;
    timerContainer.innerHTML = '<div>Time Remaining: ' + timerCount + '</div>';
    startTimer();
    givePrompts();
}

// Activates quiz function when startButton is clicked
// startButton.addEventListener("click", startQuiz);

getStartScreen();

/*

GIVEN I am taking a code quiz
[x] WHEN I click the start button THEN a [x] timer starts and [x] I am presented with a question
[x] WHEN I answer a question THEN I am presented with another question
[x] WHEN I answer a question incorrectly THEN time is subtracted from the clock
[x] WHEN all questions are answered or the timer reaches 0 THEN the game is over
[x] WHEN the game is over THEN I can save my initials and my score

*/