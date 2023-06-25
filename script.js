import { quizQuestions, results } from "./quizQuest.js";

let currentQuestion;
const ansArr = [];
let shuffledQuestions;

function renderQuestion() {
  const questionElement = document.querySelector("#quizHolder");
  if (questionElement) {
    currentQuestion = getNextQuestion();

    questionElement.querySelector("h1").textContent = currentQuestion.question;

    const answerList = questionElement.querySelector("ul");
    if (answerList) {
      answerList.innerHTML = "";

      currentQuestion.answers.forEach((answer, index) => {
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

function getNextQuestion() {
  return quizQuestions[shuffledQuestions[ansArr.length]];
}

function simpleShuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function calculateResult(someArr) {
  const monkeyPoints = {};

  for (const answer of someArr) {
    const { monkeys, points } = answer.answer;
    if (monkeys) {
      for (const monkey of monkeys) {
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

  shuffledQuestions = simpleShuffle([...Array(quizQuestions.length).keys()]); // Create and shuffle array of question indices

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      const selectedAnswer = document.querySelector('input[name="question1"]:checked');

      if (!selectedAnswer) {
        alert("Please select an answer before moving on.");
        return;
      }

      const selectedAnswerObj = currentQuestion.answers.find(answer => answer.text === selectedAnswer.nextElementSibling.textContent);

      ansArr.push({ 
        question: currentQuestion.question, 
        answer: selectedAnswerObj.text, 
        monkeys: selectedAnswerObj.monkeys, 
        points: selectedAnswerObj.points 
      });

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
