const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "answers": [
            { "text": "Earth", "correct": false },
            { "text": "Mars", "correct": true },
            { "text": "Venus", "correct": false },
            { "text": "Jupiter", "correct": false }
        ]
    },
    {
        "question": "Who wrote 'Romeo and Juliet'?",
        "answers": [
            { "text": "Charles Dickens", "correct": false },
            { "text": "William Shakespeare", "correct": true },
            { "text": "Jane Austen", "correct": false },
            { "text": "Mark Twain", "correct": false }
        ]
    },
    {
        "question": "Which is the fastest land animal?",
        "answers": [
            { "text": "Lion", "correct": false },
            { "text": "Cheetah", "correct": true },
            { "text": "Horse", "correct": false },
            { "text": "Kangaroo", "correct": false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Highlight the correct answer
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true; // Disable buttons after selecting one
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Ensure correct answer is highlighted
        }
    });

    nextButton.style.display = "block"; // Show Next button
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); // Restart the quiz
        nextButton.style.display = "none";
    }
});

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



startQuiz();
