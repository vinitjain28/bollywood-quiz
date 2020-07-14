
var questions = [{
    question: "The song -Tumhe Jo Maine Dekha- starred which of these people?",
    choices: ["Shahrukh & Rani","Shahrukh & Preity","Shahrukh and Aishwarya","Shahrukh & Sushmita"],
    correctAnswer: 4
}, {
    question: "The megastar of Bollywood, Amitabh Bachchan has also sung a number of hit songs. Which of these films featured a song sung by Bachchan?",
    choices: ["Don", "Silsila", "Shole", "Hum"],
    correctAnswer: 2
}, {
    question: "Which actress played Mary Kom in her biopic?",
    choices: ["Priyanka Chopra", "Deepika Padukon", "Alia Bhatt","Dyna Penti"],
    correctAnswer: 0
}, {
    question: "Which was the first Indian movie nominated for Oscar?",
    choices: ["Salaam Bombay","Lagaan","Mother India","None of these"],
    correctAnswer: 2
}, {
    question: "Which was the first Indian movie to win an Oscar?",
    choices: ["Slumdog Millionaire","Mother India","Gandhi","Ajooba"],
    correctAnswer: 3
}, {
    question: "Which is the highest grossing Indian film ever?",
    choices: ["Dangal", "Bajrangi-Bhaijaan", "PK", "Dhoom 3"],
    correctAnswer: 0	
	
}, {
    question: "Which was the first Cinemascope film in Bollywood?",
    choices: ["Shole", "Naya Dour", "Kagaz ke Phool", "Inayat"],
    correctAnswer: 3	
}, {
    question: "which of these actor is still virgin",
    choices: ["Salman Khan", "Tushaar Kapoor", "Arshad Warsi", "Aamir khan"],
    correctAnswer: 1
}, {
    question: "How many times AR Rahman was nominated for Oscar?",
    choices: ["3", "2", "4", "1"],
    correctAnswer: 2

}, {
    question: "Which of the following regional cinema referred to as Kollywood?",
    choices: ["Tamil", "Telgu", "Kannad", "Punjabi"],
    correctAnswer: 0

}, {
    question: " Aishwarya Rai was crowned Miss World in which year?",
    choices: ["1992", "1997", "1998", "1994"],
    correctAnswer: 4

	}, {
    question: "The first ever Indian feature film is said to be /Raja Harishchandra/ (meaning King Harishchandra), that was released in 1913.It starred Dattatraya Damodar Dabke as Harishchandra.Who was the director of this legendary film?",
    choices: ["Dada Saheb Phalke", "Prem Chopra", "Gani kapoor", "Hirani"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}