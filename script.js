const questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        answers: [
            { choice: "< script >" , correct: false },
            { choice:  "< css >" , correct: false },
            { choice:  "< style >", correct: true },
            { choice:   "< span >", correct: false }
        ]
    },
    {
        question: 'Which property is used to change the color in CSS?',
        answers: [
            { choice: 'text-color', correct: false },
            { choice: 'font-color', correct: false },
            { choice: 'text-style', correct: false },
            { choice: 'color', correct: true }
        ]
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        answers: [
            { choice: ' // Comment ', correct: false },
            { choice: ' < !-- Comment -- > ', correct: true },
            { choice: ' /* Comment */ ', correct: false },
            { choice: ' < ! Comment > ', correct: false }
        ]
    }
];






const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('options');
const nextButton = document.getElementById('next');
const question_count = document.querySelector('.question-count');
const score_count = document.querySelector('.score-count');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    nextButton.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.choice;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.style.display = 'none';
}



function selectAnswer(e) {
    const selectedButton = e.target;
    let correct = selectedButton.dataset.correct === 'true';

    // Remove background color from previously selected button
    Array.from(answerButtons.children).forEach(button => {
        button.style.backgroundColor = '';
    });

    // Set background color for the selected button
    selectedButton.style.backgroundColor = '#F9F8DD';
    if (correct) {

        score++;

    }

    // updateLive();

    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.style.display = 'block';
    } else {
        storeResult(score);
        window.location.href = "result.html";
    }
}
// storing
// function result(score){
//     storeResult(score);
    // window location href
    //  = "result.html";
   
// }
function storeResult(score) {
    localStorage.setItem('quizScore', score);
}
// function  updateLive(){
//     score_count.textContent = `Score : ${score}` ;
//     question_count.textContent = `${currentQuestionIndex+1}` + " / 3"
// }
//
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

nextButton.addEventListener('click', () => {
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();

