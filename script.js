const questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        answers: [
            { choice: "< script>", correct: false },
            { choice:  "< css>", correct: false },
            { choice:  "< style>", correct: true },
            { choice:   "< span>", correct: false }
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
            { choice: '// Comment', correct: false },
            { choice: '< ! -- Comment -->', correct: true },
            { choice: '/ * Comment */', correct: false },
            { choice: '< !Comment>', correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('options');
const nextButton = document.getElementById('next');
const questionCountElement = document.querySelector('.question_count');
const scoreCountElement = document.querySelector('.score_count');

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
    updateLive(); // Update the question count display
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.choice;
        button.classList.add("btn");
        button.addEventListener('click', () => selectAnswer(answer.correct));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.style.display = 'none';
}

function selectAnswer(correct) {
    // Do not update the score if an answer has already been selected
    if (nextButton.style.display !== 'none') return;

    if (correct) {
        score++;
    }

    if (currentQuestionIndex === 2) {
        // Save score to localStorage when reaching the third question
        localStorage.setItem('quizScore', score);
    }

    // Enable the "NEXT" button after selecting an answer
    nextButton.style.display = 'block';
}

function updateLive() {
    scoreCountElement.textContent = `Score: ${score}`;
    questionCountElement.textContent = `Question: ${currentQuestionIndex + 1} / ${questions.length}`;
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex === questions.length - 1) {
        // Redirect to another page after clicking "NEXT" on the last question
        window.location.href = "result.html";
    } else {
        currentQuestionIndex++;
        showQuestion();
    }
});

startQuiz();
