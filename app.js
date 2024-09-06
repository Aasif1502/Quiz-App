const questions = [
    {
        question: "Which is largest animal in the world",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ] },
        {
        question: "Which is smallest country in the world",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false}
        ]},
        {
        question: "Which is largest desert in the world",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true}
        ]},
        {
        question: "Which is smallest continent in the world",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false}
        ]},
]
const questionEl = document.querySelector(".question")
const answerButton = document.querySelector(".optionList")
const nextButton = document.querySelector(".nextButton")

let currQuesInd = 0
let score = 0

function startQuiz() {
    reset();
    currQuesInd = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}
 
function showQuestion() {
    reset();  // Clear previous answers before showing the new question
    let currQuestion = questions[currQuesInd]
    let quesNo = currQuesInd + 1;
    questionEl.innerHTML = quesNo + ". " + currQuestion.question
    
    currQuestion.answers.forEach((answer) => {
        let button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("option")
        answerButton.appendChild(button) 
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })   
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
}

function reset() {
    nextButton.style.display = "none"
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

function showScore() {
    reset() 
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextBtn() {
    currQuesInd++
    if (currQuesInd < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", () => {
    if (currQuesInd < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
})

startQuiz();
