const StartQuiz=(event) =>{
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    if (username==''){
        input.classList.add('ring-2', 'ring-red-500');

    }else{
        //next screen
        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('quizScreen').classList.remove('hidden');
        document.getElementById("playerName").textContent = username;
    }
};
const input = document.getElementById('username');
input.addEventListener('input', () => {
  input.classList.remove('ring-2', 'ring-red-[#ef3a3a]');
});
document.getElementById('startBtn').addEventListener('click', StartQuiz);

// Quiz Data
const quizData = [
  {
    "question": "Which HTML tag is used to define an image?",
    "options": ["<img>", "<image>", "<picture>", "<src>"],
    "answer": "<img>"
  },
  {
    "question": "Which HTML tag is used for the largest heading?",
    "options": ["<h6>", "<head>", "<h1>", "<heading>"],
    "answer": "<h1>"
  },
  {
    "question": "Which attribute is used to provide a unique identifier in HTML?",
    "options": ["class", "id", "name", "key"],
    "answer": "id"
  },
  {
    "question": "Which tag is used to create a hyperlink in HTML?",
    "options": ["<a>", "<link>", "<href>", "<url>"],
    "answer": "<a>"
  },
  {
    "question": "Which tag is used to display a numbered list?",
    "options": ["<ul>", "<ol>", "<li>", "<list>"],
    "answer": "<ol>"
  },
  {
    "question": "Which tag is used to insert a line break in HTML?",
    "options": ["<lb>", "<br>", "<break>", "<line>"],
    "answer": "<br>"
  }
];

// Elements
const questionText = document.getElementById("questionText");
const optionBtns = document.querySelectorAll(".optionBtn");
const progressBar = document.getElementById("progressBar");
const step = document.getElementById("step");
const progressText = document.getElementById("progressText");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const timerCircle = document.getElementById("timerCircle");

let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Init Quiz
function loadQuestion() {
    resetState();
    //set player name
    let q = quizData[currentQ];
    questionText.textContent = q.question;
    step.textContent = `Question ${currentQ + 1} of ${quizData.length}`;
    progressBar.style.width = `${(currentQ / quizData.length) * 100}%`;
    progressText.textContent = `${Math.round((currentQ / quizData.length) * 100)}% Complete`;


    optionBtns.forEach((btn, i) => {
    btn.textContent = `${String.fromCharCode(65 + i)}. ${q.options[i]}`;
    btn.onclick = () => checkAnswer(btn, q.options[i], q.answer);
    });

    startTimer();
}

// Reset options & timer
function resetState() {
  clearInterval(timer);
  timeLeft = 15;
  timeEl.textContent = timeLeft;
  timerCircle.style.strokeDashoffset = 0;
  optionBtns.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove("bg-green-500/70", "bg-red-500/70");
  });
}

// Timer function
function startTimer() {
  const circumference = 176; // stroke-dasharray
  timerCircle.style.strokeDasharray = circumference;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    // Circle progress
    const offset = circumference - (timeLeft / 15) * circumference;
    timerCircle.style.strokeDashoffset = offset;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

// Check answer
function checkAnswer(btn, selected, correct) {
  clearInterval(timer);

  if (selected === correct) {
    score += 10 + (timeLeft * 2);
    btn.classList.add("bg-green-500/70");
  } else {
    btn.classList.add("bg-red-500/70");
    optionBtns.forEach(b => {
      if (b.textContent.includes(correct)) {
        b.classList.add("bg-green-500/70");
      }
    });
  }

  scoreEl.textContent = score;
  optionBtns.forEach(b => (b.disabled = true));

  setTimeout(nextQuestion, 1500);
}

// Next Question
function nextQuestion() {
  currentQ++;
  if (currentQ < quizData.length) {
    const quizContent = document.getElementById("quizContent");
    // fade out
    quizContent.classList.add("opacity-0");

    setTimeout(() => {
    loadQuestion(); // change the content
    quizContent.classList.remove("opacity-0"); // fade back in
    }, 300); // match your CSS transition time

    loadQuestion();
  } else {
    progressBar.style.width = "100%";
    progressText.textContent = "100% Complete";

    endQuiz();
  }
}

// End Quiz
function endQuiz() {
  questionText.textContent = "🎉 Quiz Finished!";
  document.querySelector(".grid").innerHTML = `<p class="text-center">Your final score: <b>${score}</b></p>`;
}

// Start
loadQuestion();
