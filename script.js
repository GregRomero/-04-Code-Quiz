const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timeRightDisplay = document.querySelector("#time-right")
const startBtn = document.querySelector("#start-button")
let timeRight = 7

function countDown(){
    setInterval (function(){
        if(timeRight<= 0 ) {
            clearInterval(timeRight = 0)
        }
    timeRightDisplay.innerHTML = timeRight
    timeRight -=1
}, 1000)
}

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
    nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add("correct")    
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")

}
const questions = [
    {
        question: "What's the biggest animal in the world?",
        answers: [
            {text:"The blue whale", correct: true},
            {text: "Elephant", correct: false}
        ]
    },
    {
        question: "What does IPA stand for?",
        answers: [
            {text:"Indian Pale Ale", correct: true},
            {text: "Indica Pals Alien", correct: false}
        ]
    },
    {
        question: "What is the largest country in the world?",
        answers: [
          { text: "Canada", correct: false },
          { text: "Russia", correct: true }
        ]
      },
      {
        question: "What is the longest river in the world?",
        answers: [
          { text: "Mississippi River", correct: false },
          { text: "River Nile", correct: true }
        ]
      }
    ]