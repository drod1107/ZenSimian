import { results } from "./quizQuest.js";

function calculateResult(ansArr) {
  if (!ansArr.length) {
    console.log("Answer array is empty.");
    return null; // return null if array is empty
  }

  let monkeyPoints = {}; // object to store points of monkeys
  console.log("Initial monkey points object:", monkeyPoints);

  // loop over the ansArr to sum the points of each monkey
  ansArr.forEach(answerObj => {
    let monkeys = answerObj.monkeys; // get monkeys from the answer object
    let points = answerObj.points; // get points from the answer object

    monkeys.forEach(monkey => {
      // Convert monkey name to lowercase to match keys in results object
      monkey = monkey.toLowerCase();

      if (monkeyPoints[monkey]) {
        monkeyPoints[monkey] += points; // add points to monkey if monkey already exists in object
        console.log(`Added ${points} points to ${monkey}. Total points: ${monkeyPoints[monkey]}`);
      } else {
        monkeyPoints[monkey] = points; // add monkey to object with points if it doesn't exist
        console.log(`Added ${monkey} with ${points} points to monkey points object.`);
      }
    });
  });

  console.log("Final monkey points object:", monkeyPoints);

  // find monkey with highest points
  let maxPoints = 0;
  let maxMonkey = null;
  for (let monkey in monkeyPoints) {
    if (monkeyPoints[monkey] > maxPoints) {
      maxPoints = monkeyPoints[monkey];
      maxMonkey = monkey;
      console.log(`New max monkey is ${monkey} with ${maxPoints} points.`);
    }
  }

  // return the result associated with the monkey with the highest points
  let selectedMonkey = results[maxMonkey];
  console.log("Selected monkey:", selectedMonkey);
  return selectedMonkey;
}

document.addEventListener("DOMContentLoaded", function () {
  const ansArr = JSON.parse(localStorage.getItem("ansArr")) || [];

  console.log("ansArr:", ansArr);

  const resultSection = document.querySelector("#results");

  if (Array.isArray(ansArr) && ansArr.length === 10 && resultSection) {
    const selectedMonkey = calculateResult(ansArr);

    if (selectedMonkey !== null) {
      const { text, description, imageUrl } = selectedMonkey;

      let resultHtml = `
        <h2>${text}</h2>
        <p>${description}</p>
      `;

      if (imageUrl && imageUrl.trim() !== "") {
        resultHtml += `<img src="${imageUrl}" alt="${text}" />`;
      }

      resultSection.innerHTML = resultHtml;
    } else {
      resultSection.innerHTML = "<p>No result found.</p>";
    }
  } else {
    console.log("No valid ansArr found.");
  }

// Clear the stored ansArr to prevent it from interfering with future quizzes
  localStorage.removeItem("ansArr");
});
