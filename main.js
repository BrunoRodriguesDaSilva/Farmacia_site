let quizData = [
    {
        questao: "O que é diabetes tipo 1?",
        options: ["Quando o corpo produz muita insulina","Quando o corpo usa insulina de forma inadequada","Quando o corpo não produz insulina","Quando o corpo não precisa de insulina"],
        correct: "Quando o corpo não produz insulina",
    },
    {
        questao: "Qual é um sintoma comum de diabetes tipo 1?",
        options: ["Menos fome","Sede excessiva","Ganho de peso","Cabelos e unhas mais fortes"],
        correct: "Sede excessiva",
    },
    {
        questao: "Como se trata o diabetes tipo 1?",
        options: ["Com insulina","Com comprimidos","Com exercícios físicos","Com dieta rica em açúcar"],
        correct: "Com insulina",
    },
    {
        questao: "Quem geralmente tem diabetes tipo 1?",
        options: ["Crianças e jovens adultos","Somente idosos","Somente mulheres","Apenas atletas"],
        correct: "Crianças e jovens adultos",
    },
    {
        questao: "O que uma pessoa com diabetes tipo 1 precisa monitorar?",
        options: ["O peso corporal","A frequência cardíaca","A pressão arterial","O nível de açúcar no sangue"],
        correct: "O nível de açúcar no sangue",
    },
    {
        questao: "O que pode acontecer se o nível de açúcar no sangue ficar muito baixo?",
        options: ["Hiperglicemia","Níveis normais de açúcar","Níveis elevados de insulina","Hipoglicemia"],
        correct: "Hipoglicemia",
    },
];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS =  6;

const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
    for(i = 0; i < MAX_QUESTIONS; i++) {
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();

const checkAnswer = (e) => {
    let userAnswer = e.target.textContent
    if (userAnswer === quizData[questionNumber].correct) {
        score++;
        e.target.classList.add("correct");
    } else {
        e.target.classList.add("incorrect");
    }

    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

    let allOptions = document.querySelectorAll(".quiz-container .option");
    allOptions.forEach((o) => {
        o.classList.add("disabled");
    });
};

quizData = shuffleArray(quizData);

const createQuestion = () => {
    options.innerHTML = "";
    question.innerHTML = `<span class="question-number">${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizData[questionNumber].questao}`;

    const shuffledOptions = shuffleArray(quizData[questionNumber].options);

    shuffledOptions.forEach((o) => {
        const option = document.createElement("button");
        option.classList.add("option");
        option.innerHTML = o;
        option.addEventListener("click", (e) => {
            checkAnswer(e);
        })
        options.appendChild(option);
    });
};

const retakeQuiz = () => {
    questionNumber = 0;
    score = 0;
    quizData = shuffleArray(quizData);
    resetLocalStorage();

    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";
};

const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";

    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `Sua pontuação é ${score} de ${MAX_QUESTIONS}.`;
    quizResult.appendChild(resultHeading);

    for (let i = 0; i < MAX_QUESTIONS; i++) {
        const resultItem = document.createElement("div");
        resultItem.classList.add("question-container");


        const userAnswer = localStorage.getItem(`userAnswer_${i}`)
        const correctAnswer = quizData[i].correct;

        let answeredCorrectly = userAnswer === correctAnswer;

        if (!answeredCorrectly) {
            resultItem.classList.add("incorrect");
        }

        resultItem.innerHTML = `<div class="question">Questão ${i + 1}: ${quizData[i].questao}</div>
        <div class="user-answer">Sua resposta: ${userAnswer || "Não respondido"}</div>
        <div class="correct-answer">Resposta Correta: ${correctAnswer}</div>`;

        quizResult.appendChild(resultItem);
    }

    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = 'Refazer Quiz';
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);

};

createQuestion();

const displayNextQuestion = () => {
    if(questionNumber >= MAX_QUESTIONS -1) {
        displayQuizResult();
        return;
    }

    questionNumber++;
    createQuestion();
};

nextBtn.addEventListener("click", displayNextQuestion)