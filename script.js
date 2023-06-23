import { quizQuestions, results } from "./quizQuest.js";

const ansArr = [];

function renderQuestion() {
  const questionElement = document.querySelector("#quizHolder");
 console.log(questionElement)
  if (questionElement) {
    const randomQuestion = getRandomQuestion();

    questionElement.querySelector("h1").textContent = randomQuestion.question;

    const answerList = questionElement.querySelector("ul");
    if (answerList) {
      answerList.innerHTML = "";

      randomQuestion.answers.forEach((answer, index) => {
        const li = document.createElement("li");
        const input = document.createElement("input");
        input.type = "radio";
        input.id = `q1-option${index + 1}`;
        input.name = "question1";
        input.value = `option${index + 1}`;

        const label = document.createElement("label");
        label.htmlFor = `q1-option${index + 1}`;
        label.textContent = answer.text;

        li.appendChild(input);
        li.appendChild(label);
        answerList.appendChild(li);
      });
    }
  }
}

function getRandomQuestion() {
  let randomQuestion;

  do {
    randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  } while (ansArr.some(answer => answer.question === randomQuestion.question));

  return randomQuestion;
}

function calculateResult(someArr) {
  const monkeyPoints = {};

  for (const answer of someArr) {
    const { animals, points } = answer.answer;
    if (animals) {
      for (const monkey of animals) {
        monkeyPoints[monkey] = (monkeyPoints[monkey] || 0) + points;
      }
    }
  }

  let maxPoints = 0;
  let resultMonkey = null;

  for (const [monkey, points] of Object.entries(monkeyPoints)) {
    if (points > maxPoints) {
      maxPoints = points;
      resultMonkey = monkey;
    }
  }

  return resultMonkey !== null ? results[resultMonkey] : null;
}

document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.querySelector("#nextQuestion");

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      const selectedAnswer = document.querySelector('input[name="question1"]:checked');

      if (!selectedAnswer) {
        alert("Please select an answer before moving on.");
        return;
      }

      const selectedQuestion = getRandomQuestion();
      const selectedAnswerObj = selectedQuestion.answers.find(answer => answer.text === selectedAnswer.nextElementSibling.textContent);

      ansArr.push({ question: selectedQuestion.question, answer: selectedAnswerObj });

      if (ansArr.length === 10) {
        alert("You have answered all the questions. Click OK to view the result.");
        localStorage.setItem("ansArr", JSON.stringify(ansArr));
        window.location.href = "result.html";
      } else {
        renderQuestion();
      }
    });
  }

  renderQuestion();
});

export { ansArr };
