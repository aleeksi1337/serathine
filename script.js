const startButton = document.querySelector("#startButton");
const noteSection = document.querySelector("#note");
const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

startButton.addEventListener("click", () => {
  noteSection.scrollIntoView({ behavior: "smooth" });
  showToast("a tiny birthday gift, just for you ♡");
});

// Flip cards: each card is a real button and works with mouse, touch, and keyboard.
document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    const isFlipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-expanded", String(isFlipped));
  });
});

// Birthday mini-quest. Replace these with your own inside jokes before publishing.
const questions = [
  {
    question: "What is the most important birthday activity?",
    options: ["being iconic", "eating something good", "choking Jewel (lovingly)"],
    answer: 1,
    responses: ["iconic, yes, but food first 😭", "correct. this is a scientifically sound answer.", "💀"]
  },
  {
    question: "What is the official status of our conversations?",
    options: ["always normal", "mostly productive", "at least 70% nonsense"],
    answer: 2,
    responses: ["BOI be serious for one second 😭", "we both know that's questionable", "exactly. peer-reviewed nonsense."]
  },
  {
    question: "What should happen after this quest?",
    options: ["collect birthday happiness", "give Jewel a hug", "pretend this quiz was difficult"],
    answer: 0,
    responses: ["CORRECT. birthday happiness unlocked ♡", "i love you", "you can do both, actually."]
  }
];

let currentQuestion = 0;
const questionNumber = document.querySelector("#quizQuestion");
const questionText = document.querySelector("#questionText");
const optionsContainer = document.querySelector("#quizOptions");
const feedback = document.querySelector("#quizFeedback");
const nextButton = document.querySelector("#nextQuestion");

function renderQuestion() {
  const item = questions[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = item.question;
  feedback.textContent = "";
  nextButton.classList.add("hidden");
  optionsContainer.innerHTML = "";

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => {
      [...optionsContainer.children].forEach((choice) => choice.disabled = true);
      feedback.textContent = item.responses[index];
      nextButton.classList.remove("hidden");
    });
    optionsContainer.appendChild(button);
  });
}

nextButton.addEventListener("click", () => {
  currentQuestion += 1;
  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    questionNumber.textContent = "QUEST COMPLETE";
    questionText.textContent = "Birthday happiness: unlocked ♡";
    optionsContainer.innerHTML = "";
    feedback.textContent = "Your reward is a birthday wish: may this year be kind to you.";
    nextButton.textContent = "play again ↻";
    nextButton.classList.remove("hidden");
    nextButton.onclick = () => {
      currentQuestion = 0;
      nextButton.textContent = "next question →";
      nextButton.onclick = null;
      renderQuestion();
    };
  }
});
renderQuestion();

// Open/close letter; focus moves to the close control for keyboard users.
const openLetter = document.querySelector("#openLetter");
const closeLetter = document.querySelector("#closeLetter");
const letterModal = document.querySelector("#letterModal");

openLetter.addEventListener("click", () => {
  letterModal.classList.remove("hidden");
  letterModal.scrollIntoView({ behavior: "smooth", block: "center" });
  closeLetter.focus();
});
closeLetter.addEventListener("click", () => {
  letterModal.classList.add("hidden");
  openLetter.focus();
});

// Reveal sections as they enter view, with a fallback for browsers without IntersectionObserver.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Detect missing photos so the design displays a friendly placeholder instead of a broken image.
document.querySelectorAll(".photo-frame").forEach((frame) => {
  const image = frame.querySelector("img");
  image.addEventListener("load", () => frame.classList.add("has-image"));
  image.addEventListener("error", () => {
    frame.classList.remove("has-image");
    image.style.display = "none";
  });
  if (image.complete && image.naturalWidth > 0) frame.classList.add("has-image");
});

// Small confetti-like surprise using lightweight DOM elements, no library needed.
document.querySelector("#confettiButton").addEventListener("click", () => {
  const symbols = ["♡", "✦", "✿", "✨", "♥"];
  for (let i = 0; i < 28; i += 1) {
    const piece = document.createElement("span");
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.position = "fixed";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.top = "-30px";
    piece.style.zIndex = "30";
    piece.style.pointerEvents = "none";
    piece.style.fontSize = `${14 + Math.random() * 18}px`;
    piece.style.color = ["#d66b8a", "#b6a1e8", "#e8a4b7"][i % 3];
    piece.style.transition = `transform ${1.5 + Math.random()}s ease-in, opacity 1.7s ease-in`;
    document.body.appendChild(piece);
    requestAnimationFrame(() => {
      piece.style.transform = `translate(${Math.random() * 140 - 70}px, ${window.innerHeight + 80}px) rotate(${Math.random() * 600 - 300}deg)`;
      piece.style.opacity = "0";
    });
    window.setTimeout(() => piece.remove(), 2800);
  }
  showToast("birthday sparkle deployed ✨");
});
