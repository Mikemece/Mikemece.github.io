const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const QuizScore = document.getElementById("score");
//const quizScoree = document.getElementById("score");

let shuffledQuestions,currentQuestionIndex;
var quizScore = 0;
var mon = 0
sessionStorage.setItem("m", mon)
startButton.addEventListener("click", startGame);

nextButton.addEventListener("click",() =>{
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add("hide");
    shuffledQuestions=questions.sort(() =>Math.random() -0.5); 
    currentQuestionIndex=0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
    quizScore=0;
    //setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText= question.question;
    question.answers.forEach((answer) =>{
        const button = document.createElement("button");
        button.innerText=answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}


function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton=e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body,correct);
    Array.from(answerButtonsElement.children).forEach((button)=>{
        setStatusClass(button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }


    //document.getElementById("right-answers").innerHTML=quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
        nextButton.classList.remove("hide");
        quizScore++;
        mon++
        sessionStorage.setItem("m", mon)

    } else {
        element.classList.add("wrong");
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }
    QuizScore.innerHTML = "Score " + quizScore;
}


function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}
const questions = [
    {
        question: '¿En qué año se descubrió América?',
        answers: [
            { text: '1390', correct: false},
            { text: '1514', correct: false},
            { text: '1492', correct: true},
            { text: '1387', correct: false}
        ],
    },
    {
        question: '¿Cuál es la capital de España?',
        answers: [
            { text: 'Murcia', correct: false},
            { text: 'Madrid', correct: true},
            { text: 'Sevilla', correct: false},
            { text: 'Barcelona', correct: false}
        ],
    },
    {
        question: '¿Cuántos años tiene CR7?',
        answers: [
            { text: '36', correct: false},
            { text: '37', correct: true},
            { text: '38', correct: false},
            { text: '35', correct: false}
        ],
    },


]