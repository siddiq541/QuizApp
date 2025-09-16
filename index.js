let username = ""; // global variable

const StartQuiz = (event) => {
  event.preventDefault();
  username = document.getElementById('username').value.trim();
  if (!username) {
    input.classList.add('ring-2', 'ring-red-500');
  } else {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    document.getElementById("playerName").textContent = username;

    currentQ = 0;
    score = 0;
    loadQuestion(); // start the quiz
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
    score += 10 + timeLeft * 2;
    btn.classList.add("bg-green-500", "bg-opacity-70", "text-white");
  } else {
    btn.classList.add("bg-red-500", "bg-opacity-70", "text-white");

    // Highlight correct answer
    optionBtns.forEach(b => {
      if (b.textContent.includes(correct)) {
        b.classList.add("bg-green-500", "bg-opacity-70", "text-white");
      }
    });
  }

  // Disable all buttons
  optionBtns.forEach(b => (b.disabled = true));

  // Update score
  scoreEl.textContent = score;

  // Move to next question
  setTimeout(nextQuestion, 1500);
}


// Next Question
function nextQuestion() {
  currentQ++;
  if (currentQ < quizData.length) {
    const quizContent = document.getElementById("quizContent");
    quizContent.classList.add("opacity-0");

    setTimeout(() => {
      loadQuestion();
      quizContent.classList.remove("opacity-0");
    }, 300);

  } else {
    // End of quiz: show results
    clearInterval(timer);
    progressBar.style.width = "100%";
    progressText.textContent = "100% Complete";
    endQuiz();
    showResults();

  }
}
// End Quiz
function endQuiz() {
    clearInterval(timer); // stop any running timer
}
function showResults() {
    document.getElementById("quizScreen").classList.add("hidden");
    document.getElementById("resultScreen").classList.remove("hidden");

    document.getElementById("playerNameResult").textContent = username;
    document.getElementById("finalScore").textContent = score;
}

function resetState() {
  clearInterval(timer);
  timeLeft = 15;
  timeEl.textContent = timeLeft;
  timerCircle.style.strokeDashoffset = 0;

  optionBtns.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove(
      "bg-green-500",
      "bg-red-500",
      "bg-opacity-70",
      "text-white"
    );
  });
}
// Restart Button
document.getElementById("restartBtn").addEventListener("click", () => {
  score = 0;
  currentQ = 0;
  document.getElementById("resultScreen").classList.add("hidden");
  document.getElementById("startScreen").classList.remove("hidden");
});